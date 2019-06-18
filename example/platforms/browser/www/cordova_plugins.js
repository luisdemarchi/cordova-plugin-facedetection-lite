cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.virtuoworks.cordova-plugin-canvascamera/www/CanvasCamera.js",
        "id": "com.virtuoworks.cordova-plugin-canvascamera.CanvasCamera",
        "pluginId": "com.virtuoworks.cordova-plugin-canvascamera",
        "clobbers": [
            "plugin.CanvasCamera",
            "CanvasCamera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-broadcaster/www/broadcaster.js",
        "id": "cordova-plugin-broadcaster.broadcaster",
        "pluginId": "cordova-plugin-broadcaster",
        "clobbers": [
            "broadcaster"
        ]
    },
    {
        "file": "plugins/cordova-plugin-broadcaster/src/browser/BroadcasterProxy.js",
        "id": "cordova-plugin-broadcaster.broadcasterProxy",
        "pluginId": "cordova-plugin-broadcaster",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-facedetector/www/FaceDetector.js",
        "id": "cordova-plugin-facedetector.FaceDetector",
        "pluginId": "cordova-plugin-facedetector",
        "clobbers": [
            "cordova.plugins.facedetector"
        ]
    },
    {
        "file": "plugins/cordova-plugin-facedetector/src/browser/FaceDetectorProxy.js",
        "id": "cordova-plugin-facedetector.FaceDetectorProxy",
        "pluginId": "cordova-plugin-facedetector",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-facedetector/src/browser/pico.min.js",
        "id": "cordova-plugin-facedetector.Pico",
        "pluginId": "cordova-plugin-facedetector",
        "merges": [
            "Pico"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-compat": "1.2.0",
    "com.virtuoworks.cordova-plugin-canvascamera": "1.1.8",
    "cordova-plugin-device": "2.0.2",
    "cordova-plugin-broadcaster": "3.1.1",
    "cordova-plugin-facedetector": "1.0.0"
}
// BOTTOM OF METADATA
});