# Cordova Plugin Face Detection - LITE

This plug-in makes facial detection offline with a few lines of code, without the need to use TensorFlow. Was designed to run on old smartphones.
This plugin implementation of the method described in [2013 by Markuš et al](http://arxiv.org/abs/1305.4537).

#### Old devices tested:
- Moto E - Android 5.1
- Moto J5 - Android 6.0
- iPhone 6 - iOS 11
- iPhone 6s - iOS 12

PS: For older smartphones, it is ideal that each frame analyzed has a maximum height and width of 60 pixels and the processing loop runs every 100 milliseconds or more. In the sample project this was implemented.

# Installation
```
cordova plugins add cordova-plugin-facedetection-lite
```

# Methods
TODO

# Sample App
TODO

<table>
<tr>
<td>
<h3>iOS</h3>
<img src="https://github.com/luisdemarchi/example-cordova-facedetection/raw/7bb36c3463826f0237705dac6a4c71f2a50f1fd6/images/demo-ios.gif"  height="300">
</td>
<td>
<h3>Browser</h3>
<img src="https://github.com/luisdemarchi/example-cordova-facedetection/raw/7bb36c3463826f0237705dac6a4c71f2a50f1fd6/images/demo-browser.gif" height="300">
</td>
</tr>
</table>

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