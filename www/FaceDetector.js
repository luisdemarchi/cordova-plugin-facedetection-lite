var exec = require('cordova/exec');

var exec = require('cordova/exec');

var faceFrameMemory;
var faceFinderClassifyRegion;
var initialized = false;

function initFaceDetector(sizeFrameMemory, faceFinderPath, result) {
    console.log("I0 -> 1");

    if (initialized) {
        result(false);
        return;
    }

    faceFinderClassifyRegion = function (r, c, s, pixels, ldim) {
        return -1.0;
    };
    var callback = function (data) {
        faceFrameMemory = data.faceFrameMemory;
        faceFinderClassifyRegion = data.faceFinderClassifyRegion;

        result(true);
    }

    exec(callback, callback, "FaceDetector", "initFaceDetector", { sizeFrameMemory: sizeFrameMemory, faceFinderPath: faceFinderPath });
};

function detections(rgba, height, width, minSizeFace, maxSizeFace, iouthreshold, result) {
    var params = {
        "shiftfactor": 0.1,
        "minsize": minSizeFace,
        "maxsize": maxSizeFace,
        "scalefactor": 1.1
    }

    var cluster = function (_dets) {
        result(_dets);
    }

    var detections = function (_dets) {
        var dets = faceFrameMemory(_dets);
        exec(cluster, cluster, "FaceDetector", "cluster", { iouthreshold: iouthreshold, detections: dets });
    }

    exec(detections, detections, "FaceDetector", "detections", { rgba: rgba, height: height, width: width, params: params, faceFinderClassifyRegion: faceFinderClassifyRegion });
}

module.exports = {
    initFaceDetector: initFaceDetector,
    detections: detections
};