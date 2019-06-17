/********* FaceDetector.m Cordova Plugin Implementation *******/
#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#include "libpicornt.h"

@interface FaceDetector : CDVPlugin {
    bool initialized;
    UInt8* faceFinder;
    Float32* detections;
    int maxslotsize;
    int maxndets;
    UInt32* slot;
    Float32* memory;
    UInt32* counts;
}

@end

@implementation FaceDetector

- (void)initFaceDetector:(CDVInvokedUrlCommand*)command{
    NSDictionary* data = [command argumentAtIndex:0];
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
                                                  
                                                  Float32* detectionsTemp = malloc(sizeof(Float32) * 4 * self->maxndets);
                                                  for(int i=0; i < 4*self->maxndets; ++i) {
                                                      detectionsTemp[i] = 0;
                                                  }
                                                  self->detections = detectionsTemp;
                                                  
                                                  int nmemslots = 5;
                                                  self->maxslotsize = 256;
                                                  self->slot = malloc(sizeof(UInt32) * 1);
                                                  for(int i=0; i < 1; ++i) {
                                                      self->slot[i] = 0;
                                                  }
                                                  self->memory = malloc(sizeof(Float32*) * 4*nmemslots*self->maxslotsize);
                                                  for(int i=0; i < 4*nmemslots*self->maxslotsize; ++i) {
                                                      self->memory[i] = 0;
                                                  }
                                                  
                                                  self->counts = malloc(sizeof(UInt32) * nmemslots);
                                                  for(int i=0; i < nmemslots; ++i) {
                                                      self->counts[i] = 0;
                                                  }
                                                  
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
        
        int ndets;
        ndets = find_objects(
                             &self->detections, maxndets,
                             self->faceFinder, 0.0,
                             rawData, height, width, width,
                             1.1, 0.1, 10, 100
                             );
        
        int nmemslots = 5;
        UInt32* slot = malloc(sizeof(UInt32) * 1);
        for(int i=0; i < 1; ++i) {
            slot[i] = 0;
        }
        
        UInt32* counts = malloc(sizeof(UInt32) * nmemslots);
        for(int i=0; i < nmemslots; ++i) {
            counts[i] = 0;
        }
        
        ndets = update_memory(
                              slot,
                              &self->memory, counts, nmemslots, self->maxslotsize,
                              &self->detections, ndets, self->maxndets
                              );
        ndets = cluster_detections(
                                   &self->detections, ndets
                                   );
    
    NSMutableArray* detectionArray = [NSMutableArray arrayWithCapacity:ndets];
    for (int i = 0; i < ndets; i++) {
        NSNumber *number1 = [NSNumber numberWithFloat:self->detections[4*i]];
        NSNumber *number2 = [NSNumber numberWithFloat:self->detections[4*i+1]];
        NSNumber *number3 = [NSNumber numberWithFloat:self->detections[4*i+2]];
        
        [detectionArray addObject:number];
    }
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:self->detections];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        
    }
}

@end
