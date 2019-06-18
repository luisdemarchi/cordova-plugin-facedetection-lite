cordova.define("cordova-plugin-facedetector.FaceDetector", function (require, exports, module) {
    var exec = require('cordova/exec');

    var exec = require('cordova/exec');

    var faceFrameMemory;
    var faceFinderClassifyRegion;
    var initialized = false;

    function test1(rgba, width, height, result) {
        exec(result, result, "FaceDetector", "test1", [{ rgba: rgba, width: width, height: height }]);
    }

    function initFaceDetector(sizeFrameMemory, faceFinderPath, result) {
        exec(result, result, "FaceDetector", "initFaceDetector", [{ sizeFrameMemory: sizeFrameMemory, faceFinderPath: faceFinderPath }]);
    };

    function detections(rgba, width, height, minSizeFace, maxSizeFace, iouthreshold, result) {
        exec(result, result, "FaceDetector", "detections", [{ rgba: rgba, width: width, height: height, minSizeFace: minSizeFace, maxSizeFace: maxSizeFace, iouthreshold: iouthreshold }]);
    }

    module.exports = {
        initFaceDetector: initFaceDetector,
        detections: detections,
        test1: test1
    };
});
