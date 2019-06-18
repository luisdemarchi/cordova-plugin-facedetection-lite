var faceFrameMemory;
var faceFinderClassifyRegion;

function initFaceDetection(success, error, args) {
    // { sizeFrameMemory: sizeFrameMemory, faceFinderPath: faceFinderPath }
    var self = this;
    var data = args[0];
    
    faceFrameMemory = window.pico.instantiate_detection_memory(data.sizeFrameMemory);
    fetch(data.faceFinderPath).then(function (response) {
        response.arrayBuffer().then(function (buffer) {
            var bytes = new Int8Array(buffer);
            faceFinderClassifyRegion = pico.unpack_cascade(bytes);

            success();
        })
    })
};

function detections(success, error, args) {
    // { rgbaX: rgbaX, height: height, width: width }
    var data = args[0];
    var params = {
        "shiftfactor": 0.1,
        "minsize": data.minSizeFace,
        "maxsize": data.maxSizeFace,
        "scalefactor": 1.1
    }

    let image = {
        "pixels": _convertRgbaToGrayscale(data.rgba, data.height, data.width),
        "nrows": data.height,
        "ncols": data.width,
        "ldim": data.width
    }

    var dets = window.pico.run_cascade(image, faceFinderClassifyRegion, params);

    dets = window.pico.cluster_detections(dets, data.iouthreshold);

    success(dets);
};

function _convertRgbaToGrayscale(rgba, nrows, ncols) {
    var gray = new Uint8Array(nrows * ncols);
    for (var r = 0; r < nrows; ++r)
        for (var c = 0; c < ncols; ++c)
            // gray = 0.2*red + 0.7*green + 0.1*blue
            gray[r * ncols + c] =
                (0.2126 * rgba[r * 4 * ncols + 4 * c + 0] +
                    0.7152 * rgba[r * 4 * ncols + 4 * c + 1] +
                    0.0722 * rgba[r * 4 * ncols + 4 * c + 2]);
    return gray;
}

module.exports = {
    initFaceDetection: initFaceDetection,
    detections: detections
};

cordovaProxy.add("FaceDetection", module.exports);