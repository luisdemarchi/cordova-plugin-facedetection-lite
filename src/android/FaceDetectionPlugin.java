package br.com.luisdemarchi;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Base64;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.stream.IntStream;

public class FaceDetectionPlugin extends CordovaPlugin {
    private byte[] faceFinder;
    private boolean initialized;
    private int[] slot;
    private int maxslotsize;
    private int maxndets;
    private int nmemslots;
    private float memory[];
    private int counts[];

    protected static final String TAG = "FaceDetection";
    protected CallbackContext context;

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        context = callbackContext;
        boolean result = true;

        if (action.equals("detections")) {
            cordova.getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        JSONArray jsonArray = detections(data);

                        PluginResult pluginresult = new PluginResult(PluginResult.Status.OK, jsonArray);
                        callbackContext.sendPluginResult(pluginresult);
                    }catch (Exception e) {
                        handleException(e);
                        callbackContext.error("detection error");
                    }
                }
            });
            return true;
        }else{
            try {
                JSONObject input = data.getJSONObject(0);

                if (action.equals("test1")) {
                    test1(input);
                    callbackContext.success();
                } else if (action.equals("initFaceDetection")) {
                    initFaceDetection(input);
                    callbackContext.success();

                } else {
                    handleError("Invalid action");
                    result = false;
                }
            } catch (Exception e) {
                handleException(e);
                result = false;
            }
        }

        return result;
    }
    
    boolean test1(JSONObject input) throws JSONException {
        // Create bitmap with width, height, and 4 bytes color (RGBA)
        int width = input.getInt("width");
        int height = input.getInt("height");
        int totalPixels = width * height;

        JSONObject rgbaDict = input.optJSONObject("rgba");
        int[] rawData = new int[totalPixels];
        int red, green, blue, alpha;
        for (int i = 0; i < totalPixels; i++) {
            red = rgbaDict.getInt(Integer.toString(4 * i));
            green = rgbaDict.getInt(Integer.toString(4 * i + 1));
            blue = rgbaDict.getInt(Integer.toString(4 * i + 2));
            alpha = rgbaDict.getInt(Integer.toString(4 * i + 3));
            // rawData[i] = (byte)(red + green + blue);
            rawData[i] = (alpha << 24 | red << 16 | green << 8 | blue);
        }

        Bitmap out = Bitmap.createBitmap(rawData, 0, width, width, height, Bitmap.Config.ARGB_8888);

        return true;
    }

    boolean initFaceDetection(JSONObject input) throws IOException {
        if (this.initialized) {
            return true;
        }

        AssetManager assetManager = cordova.getActivity().getAssets();
        InputStream is = assetManager.open("www/facefinder");
        this.faceFinder = new byte[is.available()];
        is.read(this.faceFinder);
        is.close();

        this.maxndets = 8;
        this.maxslotsize = 32;
        this.nmemslots = 4;
        this.memory = new float[4 * this.nmemslots * this.maxslotsize];
        this.slot = new int[1];
        this.counts = new int[this.nmemslots];

        this.initialized = true;

        return true;
    }

    JSONArray detections(JSONArray data) throws JSONException {
        JSONObject input = data.getJSONObject(0);


        if (this.maxndets > 0) {
            int width = input.getInt("width");
            int height = input.getInt("height");
            int totalPixels = width * height;

            byte[] rawData;
            ExecutorService esGrayscale = Executors.newSingleThreadExecutor();
            JSONObject rgbaDict = input.optJSONObject("rgba");
            Future<byte[]> result = esGrayscale.submit(threadGrayscale(rgbaDict, totalPixels));
            try {
                rawData = result.get();
            } catch (Exception e) {
                rawData = new byte[0];
            }finally {
                esGrayscale.shutdown();
            }

            float dets[] = new float[4 * this.maxndets];
            int ndets = 0;

            ExecutorService esDetection = Executors.newSingleThreadExecutor();
            Future<Integer> resultDets = esDetection.submit(threadDetection(dets, this.maxndets, this.faceFinder, rawData, height, width,1.1f, 0.16f, width * 0.4f, width * 0.8f));
            try {
                ndets = resultDets.get().intValue();
            } catch (Exception e) {
                ndets = 0;
            }finally {
                esDetection.shutdown();
            }

            ndets = FaceDetectionJni.update_memory(this.slot, this.memory, this.counts, this.nmemslots,
                    this.maxslotsize, dets, ndets, this.maxndets);

            ndets = FaceDetectionJni.cluster_detections(dets, ndets);

            JSONArray detectionArray = new JSONArray();
            float y, x, size, score;
            for (int i = 0; i < ndets; i++) {
                y = dets[4 * i];
                x = dets[4 * i + 1];
                size = dets[4 * i + 2];
                score = dets[4 * i + 3];

                float[] values = { y, x, size, score };

                detectionArray.put(new JSONArray(values));
            }
            return detectionArray;
        }

        return new JSONArray();
    }

    private static Callable<byte[]> threadGrayscale ( JSONObject rgbaDict, int totalPixels) {
        return new Callable<byte[]>() {

            public byte[] call () throws Exception {
                byte[] rawData = new byte[totalPixels];
                float red, green, blue;
                for (int i = 0; i < totalPixels; i++) {
                    red = 0.2126f * rgbaDict.getInt(Integer.toString(4 * i));
                    green = 0.7152f * rgbaDict.getInt(Integer.toString(4 * i + 1));
                    blue = 0.0722f * rgbaDict.getInt(Integer.toString(4 * i + 2));
                    rawData[i] = (byte) (Math.round(red + green + blue));
                }

                return rawData;
            }
        };
    }

    private static Callable<Integer> threadDetection ( float[] dets, int maxndets, byte[] faceFinder, byte[] rawData, int height, int width, float scaleFactor, float strideFactor, float minSize, float maxSize) {
        return new Callable<Integer>() {

            public Integer call () throws Exception {
                int ndets = 0;


                ndets = FaceDetectionJni.find_objects(dets, maxndets, faceFinder, 0.0f, rawData, height, width,
                        width, scaleFactor, strideFactor, minSize, maxSize);


                return ndets;
            }
        };
    }

    /**
     * Handles an error while executing a plugin API method. Calls the registered
     * Javascript plugin error handler callback.
     *
     * @param errorMsg Error message to pass to the JS error handler
     */
    private void handleError(String errorMsg) {
        try {
            Log.e(TAG, errorMsg);
            context.error(errorMsg);
        } catch (Exception e) {
            Log.e(TAG, e.toString());
        }
    }

    private void handleException(Exception exception) {
        handleError(exception.toString());
    }
}