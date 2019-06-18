var exec = require('cordova/exec');

function test1(rgba, width, height, result) {
    exec(result, result, "FaceDetection-Lite", "test1", [{ rgba: rgba, width: width, height: height }]);
}

function initFaceDetection(sizeFrameMemory, faceFinderPath, result) {
    exec(result, result, "FaceDetection-Lite", "initFaceDetection", [{ sizeFrameMemory: sizeFrameMemory, faceFinderPath: faceFinderPath }]);
};

function detections(rgba, width, height, minSizeFace, maxSizeFace, iouthreshold, result) {
    exec(result, result, "FaceDetection-Lite", "detections", [{ rgba: rgba, width: width, height: height, minSizeFace: minSizeFace, maxSizeFace: maxSizeFace, iouthreshold: iouthreshold }]);
}

module.exports = {
    initFaceDetection: initFaceDetection,
    detections: detections,
    test1: test1
};