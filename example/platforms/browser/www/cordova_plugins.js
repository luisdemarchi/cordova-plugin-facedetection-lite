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
        "file": "plugins/cordova-plugin-facedetection/www/FaceDetection.js",
        "id": "cordova-plugin-facedetection.FaceDetection",
        "pluginId": "cordova-plugin-facedetection",
        "clobbers": [
            "cordova.plugins.facedetection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-facedetection/src/browser/FaceDetectionProxy.js",
        "id": "cordova-plugin-facedetection.FaceDetectionProxy",
        "pluginId": "cordova-plugin-facedetection",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-facedetection/src/browser/pico.min.js",
        "id": "cordova-plugin-facedetection.Pico",
        "pluginId": "cordova-plugin-facedetection",
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
    "cordova-plugin-facedetection": "1.0.0"
}
// BOTTOM OF METADATA
});