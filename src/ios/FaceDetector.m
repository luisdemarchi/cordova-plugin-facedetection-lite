/********* FaceDetector.m Cordova Plugin Implementation *******/
#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#include "hello.h"
#include "picornt.h"

@interface FaceDetector : CDVPlugin {
}
@end

@implementation FaceDetector

- (void) unpackCascade:(const uint8_t*)bytes{
    
}

- (void)initFaceDetector:(CDVInvokedUrlCommand*)command{
    // NSURL *URL = [NSURL URLWithString:@"https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder"];
    // NSURLSession *session = [NSURLSession sessionWithConfiguration:
    //                          [NSURLSessionConfiguration defaultSessionConfiguration]];
    // NSURLSessionTask  *task = [session downloadTaskWithURL:URL
    //                                      completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
    //                                          if ( !error){
    //                                              NSData *data = [NSData dataWithContentsOfURL: location];
    //                                              UInt8 buf[data.length]; // local stack array
    //                                              [data getBytes:buf length:data.length];
    //                                          }
    //                                      }];
    // [task resume];
    // NSLog(@"-> VEIO: 1");

    
    // NSDictionary* test = @{@"faceFrameMemory": @"1", @"faceFinderClassifyRegion": @"2"};
    // CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:test];
    // NSLog(@"-> VEIO: 2");
    // [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
    //c_hello();
    NSString* input = @"OIIIIII ESTOU TESTANDO C!!"
    char* c_input = strdup([input UTF8String]);
    NSString* output = [NSString stringWithFormat: @"iOS says: %s", c_hello(c_input)];
    NSLog(output);
}

- (void)detections:(CDVInvokedUrlCommand*)command{
    
    
    
    NSArray* test = @[];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:test];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}

- (void)cluster:(CDVInvokedUrlCommand*)command{
    
    
    
    NSArray* test = @[];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:test];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}
@end
