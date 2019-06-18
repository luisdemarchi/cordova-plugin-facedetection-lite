cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.virtuoworks.cordova-plugin-canvascamera.CanvasCamera",
      "file": "plugins/com.virtuoworks.cordova-plugin-canvascamera/www/CanvasCamera.js",
      "pluginId": "com.virtuoworks.cordova-plugin-canvascamera",
      "clobbers": [
        "plugin.CanvasCamera",
        "CanvasCamera"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-broadcaster.broadcaster",
      "file": "plugins/cordova-plugin-broadcaster/www/broadcaster.js",
      "pluginId": "cordova-plugin-broadcaster",
      "clobbers": [
        "broadcaster"
      ]
    },
    {
      "id": "cordova-plugin-facedetection.FaceDetection",
      "file": "plugins/cordova-plugin-facedetection/www/FaceDetection.js",
      "pluginId": "cordova-plugin-facedetection",
      "clobbers": [
        "cordova.plugins.facedetection"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-compat": "1.2.0",
    "com.virtuoworks.cordova-plugin-canvascamera": "1.1.8",
    "cordova-plugin-device": "2.0.2",
    "cordova-plugin-broadcaster": "3.1.1",
    "cordova-plugin-facedetection": "1.0.0"
  };
});