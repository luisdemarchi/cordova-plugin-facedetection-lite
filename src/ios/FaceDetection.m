/********* FaceDetection-Lite.m Cordova Plugin Implementation *******/
#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#include "libpicornt.h"

@interface FaceDetection-Lite : CDVPlugin {
    bool initialized;
    int faceFrameMemory;
    UInt8* faceFinder;
    int maxslotsize;
    int maxndets;
    Float32* memory;
    UInt32* counts;
}

@end

@implementation FaceDetection-Lite

- (void) test1:(CDVInvokedUrlCommand*)command{
    NSDictionary* data = [command argumentAtIndex:0];
    NSDictionary* rgbaDict = [data objectForKey:@"rgba"];
    
    size_t height = [[data objectForKey:@"height"]  intValue];
    size_t width = width = [rgbaDict count]/4/height;
    
    long totalPixels = height*width;
    UInt8 rawData[totalPixels];
    for(int i=0; i < totalPixels; ++i) {
        // gray = red(20%) + green(70%) + blue(10%)
        int red = 0.2126 * [[rgbaDict valueForKey:[NSString stringWithFormat:@"%d", 4*i]] intValue];
        int green = 0.7152 * [[rgbaDict valueForKey:[NSString stringWithFormat:@"%d", 4*i+1]] intValue];
        int blue = 0.0722 * [[rgbaDict valueForKey:[NSString stringWithFormat:@"%d", 4*i+2]] intValue];
        rawData[i] = red + green + blue;
    }
    
    
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceGray();
    size_t bytesPerPixel = 1;
    size_t bitsPerComponent = 8;
    size_t bytesPerRow = bytesPerPixel * width;
    CGContextRef context = CGBitmapContextCreate(rawData, width, height, bitsPerComponent, bytesPerRow, colorSpace, kCGImageAlphaNone);

    CGImageRef cgImage = CGBitmapContextCreateImage(context);
    UIImage *image = [UIImage imageWithCGImage:cgImage];
    CGImageRelease(cgImage);
    CGColorSpaceRelease(colorSpace);
    CGContextRelease(context);
    
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)initFaceDetection-Lite:(CDVInvokedUrlCommand*)command{
//    NSDictionary* data = [command argumentAtIndex:0];
    if (initialized) {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        return;
    }

    NSURL *URL = [NSURL URLWithString:@"https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder"];
     NSURLSession *session = [NSURLSession sessionWithConfiguration:
                              [NSURLSessionConfiguration defaultSessionConfiguration]];
     NSURLSessionTask  *task = [session downloadTaskWithURL:URL
                                          completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
                                              if ( !error){
                                                  NSData* file =  [NSData dataWithContentsOfURL: location];
                                                  UInt8* faceFinderTemp = malloc(sizeof(UInt8) * file.length);
                                                  [file getBytes:faceFinderTemp length:file.length];
                                                  self->faceFinder = faceFinderTemp;
                                                  
                                                  self->maxndets = 20;
                                                  
//                                                  self->detections = malloc(sizeof(Float32) * 4 * self->maxndets);
                                                  
                                                  int nmemslots = 5;
                                                  self->maxslotsize = 256;
       
                                                  self->memory = malloc(sizeof(Float32*) * 4*nmemslots*self->maxslotsize);
                    
                                                  
                                                  [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
                                              }
                                          }];
    [task resume];
    initialized = true;
}

- (void)detections:(CDVInvokedUrlCommand*)command{
    
    if (self->maxndets > 0){
        NSDictionary* data = [command argumentAtIndex:0];
        NSDictionary* rgbaDict = [data objectForKey:@"rgba"];
        
        int height = [[data objectForKey:@"height"]  intValue];
        int width = [[data objectForKey:@"width"]  intValue];
        
        long totalPixels = height*width;
        UInt8 rawData[totalPixels];
        for(int i=0; i < totalPixels; ++i) {
            // gray = red(20%) + green(70%) + blue(10%)
            int red = 0.2126 * [[rgbaDict valueForKey:[NSString stringWithFormat:@"%d", 4*i]] intValue];
            int green = 0.7152 * [[rgbaDict valueForKey:[NSString stringWithFormat:@"%d", 4*i+1]] intValue];
            int blue = 0.0722 * [[rgbaDict valueForKey:[NSString stringWithFormat:@"%d", 4*i+2]] intValue];
            rawData[i] = red + green + blue;
        }
        
        float dets[4 * self->maxndets];
        
        
        int ndets;
        ndets = find_objects(
                             &dets, self->maxndets,
                             self->faceFinder, 0.0,
                             rawData, height, width, width,
                             1.1, 0.1, 10, 100
                             );
        
        int nmemslots = 5;
        int* slot[1];
        slot[0] = 0;
        
        UInt32* counts = malloc(sizeof(UInt32) * nmemslots);
        for(int i=0; i < nmemslots; ++i) {
            counts[i] = 0;
        }
        
        ndets = update_memory(
                              slot,
                              &self->memory, counts, nmemslots, self->maxslotsize,
                              &dets, ndets, self->maxndets
                              );
        ndets = cluster_detections(
                                   &dets, ndets
                                   );
        NSMutableArray* detectionArray = [NSMutableArray arrayWithCapacity:ndets];
        for (int i = 0; i < ndets; i++) {
            NSNumber *y = [NSNumber numberWithFloat:dets[4*i]];
            NSNumber *x = [NSNumber numberWithFloat:dets[4*i+1]];
            NSNumber *size = [NSNumber numberWithFloat:dets[4*i+2]];
            NSNumber *score = [NSNumber numberWithFloat:dets[4*i+4]];

            [detectionArray addObject:@[y, x, size, score]];
        }
        
//        free(dets);
//        free(rawData);
//        free(slot);
        counts = NULL;
        free(counts);
        for(int i=0; i < totalPixels; ++i) {
            rawData[i] = 0;
        }
        data = nil;
        rgbaDict = nil;
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:detectionArray];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        detectionArray = nil;
        
    }else{
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[]];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
    
}

@end
