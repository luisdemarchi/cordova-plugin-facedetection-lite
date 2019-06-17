var exec = require('cordova/exec');

var exec = require('cordova/exec');

var faceFrameMemory;
var faceFinderClassifyRegion;
var initialized = false;

function initFaceDetector(sizeFrameMemory, faceFinderPath, result) {
    // if (initialized) {
    //     result(false);
    //     return;
    // }

    // faceFinderClassifyRegion = function (r, c, s, pixels, ldim) {
    //     return -1.0;
    // };
    // var callback = function (data) {
    //     faceFrameMemory = data.faceFrameMemory;
    //     faceFinderClassifyRegion = data.faceFinderClassifyRegion;

    //     result(true);
    // }

    exec(result, result, "FaceDetector", "initFaceDetector", [{ sizeFrameMemory: sizeFrameMemory, faceFinderPath: faceFinderPath }]);
};


function detections(rgba, width, height, minSizeFace, maxSizeFace, iouthreshold, result) {
    // var params = {
    //     "shiftfactor": 0.1,
    //     "minsize": minSizeFace,
    //     "maxsize": maxSizeFace,
    //     "scalefactor": 1.1
    // }

    // var cluster = function (_dets) {
    //     result(_dets);
    // }

    // var detections = function (_dets) {
    //     var dets = faceFrameMemory(_dets);
    //     exec(cluster, cluster, "FaceDetector", "cluster", [{ iouthreshold: iouthreshold, detections: dets }]);
    // }

    exec(result, result, "FaceDetector", "detections", [{ rgba: rgba, width: width, height: height }]);
}

module.exports = {
    initFaceDetector: initFaceDetector,
    detections: detections
};