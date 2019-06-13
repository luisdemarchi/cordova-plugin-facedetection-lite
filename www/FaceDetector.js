var exec = require('cordova/exec');

function init(result){
    // this.faceFrameMemory = window.pico.instantiate_detection_memory(30);
    //   this.faceFinderClassifyRegion = function(r, c, s, pixels, ldim) {
    //     return -1.0;
    //   };
    // donwload file
};

function detections(rgba, height, width, result){
    // image = {
    //     "pixels": rgba_to_grayscale(rgba, height, width),
    //     "nrows": height,
    //     "ncols": width,
    //     "ldim": width
    // }
    // params = {
    //     "shiftfactor": 0.1, // move the detection window by 10% of its size
    //     "minsize": width*0.4,     // minimum size of a face
    //     "maxsize": width,    // maximum size of a face
    //     "scalefactor": 1.1  // for multiscale processing: resize the detection window by 10% when moving to the higher scale
    // }
    // // run the cascade over the frame and cluster the obtained detections
    // // dets is an array that contains (r, c, s, q) quadruplets
    // // (representing row, column, scale and detection score)
    // dets = pico.run_cascade(image, facefinder_classify_region, params);
    // dets = update_memory(dets);
    // dets = pico.cluster_detections(dets, 0.3);
}

function instantiateDetectionMemory(size, result) {
    exec(success, error, "FaceDetector", "ActiveView", [name, top, left, width, height, data]);
};

function unpackCascade(bytes, result) {
    exec(success, error, "FaceDetector", "CreateView", [name, data]);
};

function runCascade(image, params) {
    exec(success, error, "FaceDetector", "RestartView", [name]);
};


module.exports = {
  RestartView: RestartView,
  SendViewToBack: SendViewToBack,
  BringViewToFront: BringViewToFront,
  ActiveView: ActiveView,
  CreateView: CreateView,
  MoveView: MoveView,
  ShowView: ShowView,
  HideView: HideView,
  DeleteView: DeleteView,
  RemoveAllViews: RemoveAllViews,
  SetURL: SetURL
};