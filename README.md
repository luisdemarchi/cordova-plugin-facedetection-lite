# Cordova Plugin Face Detection - LITE

This plug-in makes facial detection offline with a few lines of code, without the need to use TensorFlow. Was designed to run on old smartphones.
This plugin implementation of the method described in [2013 by Markuš et al](http://arxiv.org/abs/1305.4537).

#### Old devices tested:
- Moto E - Android 5.1
- Moto J5 - Android 6.0
- iPhone 6 - iOS 11
- iPhone 6s - iOS 12

PS: For older smartphones, it is ideal that each frame analyzed has a maximum height and width of 60 pixels and the processing loop runs every 100 milliseconds or more. In the sample project this was implemented.

<!-- blank line -->
----
<!-- blank line -->

# Installation
```
cordova plugins add cordova-plugin-facedetection-lite
```

# Methods

### initFaceDetection(`sizeFrameMemory`, faceFinderPath, resultCallback)

* `sizeFrameMemory` - Number of frames that will be used to reinforce the detection of all faces. Defaults to 5
* `faceFinderPath` - Facial training file location, being allowed offline. Defaults to [cascades/facefinder](https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder)
* `resultCallback` - Callback function


##### Code:
```javascript
facedetection.initFaceDetection(5, "./facefinder", function (result) {
    /* Here you can create the loop to detect frames */
});
```
<info>**Warning**: Until the current version, the parameters are being ignored on some platforms, being ixed default value in the code.</info>

### detections(rgba, width, height, minSizeFace, maxSizeFace, iouthreshold, resultCallback)

* `rgba` - Image in byte array
* `width` - Image width
* `height` - Image height
* `minSizeFace` - Minimum size of selected faces
* `maxSizeFace` - Minimum size of selected faces
* `iouthreshold` - Maximum size of selected faces
* `resultCallback` - Callback function

##### Code:
```javascript
facedetection.detections(rgba, cameraWidth, cameraHeight, cameraWidth * 0.2, cameraWidth * 1.2, 0.1, function (dets) {
    for (i = 0; i < dets.length; ++i) {
        var box = dets[i];

        var canvasPreviewCtx = canvasPreview.getContext('2d');
        canvasPreviewCtx.beginPath();
        canvasPreviewCtx.arc(box[1], box[0], box[2] / 2, 0, 2 * Math.PI, false);
        canvasPreviewCtx.lineWidth = 1;
        canvasPreviewCtx.strokeStyle = 'red';
        canvasPreviewCtx.stroke();
    }
});
```
<info>**Warning**: Until the current version, only the first 3 parameters are implemented and the rest of the parameters are being ignored on some of the platforms, being fixed default value in the code.</info>

<!-- blank line -->
----
<!-- blank line -->

# Sample App

## Camera
TODO

<table>
<tr>
<td>
<h3>iOS</h3>
<img src="https://github.com/luisdemarchi/cordova-plugin-facedetection-lite/raw/a3dd61fa8f7de022b165accaa12d788758698ba3/images/demo-ios.gif"  height="300">
</td>
<td>
<h3>Browser</h3>
<img src="https://github.com/luisdemarchi/cordova-plugin-facedetection-lite/raw/a3dd61fa8f7de022b165accaa12d788758698ba3/images/demo-browser.gif" height="300">
</td>
</tr>
</table>

## Image
```javascript
function sampleImageDetector() {
    var width = 319;
    var height = 480;

    var canvasPreview = document.createElement('canvas');
    canvasPreview.width = width;
    canvasPreview.height = height;

    var canvasPreviewCtx = canvasPreview.getContext('2d');

    var url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Will_Smith_by_Gage_Skidmore.jpg/319px-Will_Smith_by_Gage_Skidmore.jpg';
    var baseImage = new Image();
    baseImage.src = url + '?' + new Date().getTime();
    baseImage.setAttribute('crossOrigin', '');
    baseImage.onload = function () {
        canvasPreviewCtx.drawImage(baseImage, 0, 0);
        var rgba = canvasPreviewCtx.getImageData(0, 0, width, height).data;

        facedetection.initFaceDetection(0, "./facefinder", function (result) {
            facedetection.detections(rgba, width, height, width * 0.2, width * 1.2, 0.1,
                function (dets) {
                    var greaterFace = Math.max.apply(
                        Math,
                        dets.map(function (o) {
                            return o[2];
                        })
                    );
    
                    for (i = 0; i < dets.length; ++i) {
                        var box = dets[i];
                        if (box[2] != greaterFace || box[3] === undefined) {
                            continue;
                        }

                        if (box !== undefined) {
                            canvasPreviewCtx.beginPath();
                            canvasPreviewCtx.arc(box[1], box[0], box[2] / 2, 0, 2 * Math.PI, false);
                            canvasPreviewCtx.lineWidth = 3;
                            canvasPreviewCtx.strokeStyle = 'red';
                            canvasPreviewCtx.stroke();
                        }
                    }
                    document.body.appendChild(canvasPreview);
                });
        });

    };
}
```

<!-- blank line -->
----
<!-- blank line -->

# Task List
- [x] Basic structure of the plugin;
- [x] Add PicoJS library to the Browser
- [x] Compile Pico library in C for iOS
- [x] Compile Pico library in C for Android
- [ ] Process dynamic path to training file
- [ ] Process dynamic parameters when calling each function

<!-- blank line -->
----
<!-- blank line -->

# Development
If you intend to do some improvement in the project, follow some instructions, such as compiling library in the C language.

## Recompiling libraries
If you modify the C source files, be sure to re-build the compiled libraries.

#### Android

You can re-build the `libpicornt.so` binaries using the ndk-build script.

To do so:

- Install Android NDK as [instructed here](https://developer.android.com/ndk/guides/index.html)
- Add the NDK install path to your path environment variable
    - By default it's installed under $ANDROID_SDK_HOME/ndk-bundle
    - e.g. `export PATH=$PATH;$ANDROID_SDK_HOME/ndk-bundle`
- Set the ANDROID_NDK_HOME environment variable to your NDK install path
    - e.g. `export ANDROID_NDK_HOME=$ANDROID_SDK_HOME/ndk-bundle`
- Open terminal in plugin root folder
- Run `./compile-android` (`compile-android.cmd` on Windows)
    
#### iOS
If you modify the C source code in `common/picornt/` you'll need to rebuild the static library and headers in `src/ios/libs`.

- Open terminal in plugin root folder
- Run `./compile-ios`


# Credits
Created by Luís De Marchi [@luisdemarchi](https://github.com/luisdemarchi) - [Linkedin](https://www.linkedin.com/in/luis5/)

#### Libraries used:
  - Mobile (Language C) : [nenadmarkus/pico](https://github.com/nenadmarkus/pico)
  - Browser (Language JS): [tehnokv/picojs](https://github.com/tehnokv/picojs)