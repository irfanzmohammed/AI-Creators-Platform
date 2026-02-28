import { Check, Crop, ImageIcon, Loader2,  RefreshCw, Type, Wand2, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ASPECT_RATIOS } from '@/lib/image-transform';
import { SMART_CROP_OPTIONS } from '@/lib/image-transform';
import { TEXT_POSITIONS } from '@/lib/image-transform';

const TransformImage = ({
  transformedImage,
  setTransformedImage,
  uploadedImage,
  isTransforming,
  handleSelectImage,
  handleClose,
  applyTransformations,
  resetTransformations,
  watchedValues,
  setValue,
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
      
      {/* Left column – controls  */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg flex items-center">
            <Wand2 className="h-5 w-5 mr-2"/>
            AI Transformations
          </h3>

           {/* Background Removal */}
           <div className="bg-slate-800/50 p-4 border border-slate-700 rounded-lg">
           <div className="flex items-center justify-between mb-2">
            <Label className="text-white font-medium">Remove Background</Label>
            <Button 
            type="button"
            variant={
              watchedValues.backgroundRemoved?
              "default":"outline"
            }
            size="sm"
            onClick={()=>
              setValue("backgroundRemoved",!watchedValues.backgroundRemoved)
            }
            >
              {watchedValues.backgroundRemoved?(
                  <Check className="w-4 h-4"/>)
                  :( <X className="w-4 h-4"/>)       
              }
            </Button>
           </div>
             <p className="text-sm text-slate-400">
                AI-powered background removal
            </p>
           </div>
           
               {/* Drop Shadow */}
             <div className="bg-slate-800/50 p-4 border border-slate-700 rounded-lg">
           <div className="flex items-center justify-between mb-2">
            <Label className="text-white font-medium">Drop Shadow</Label>
            <Button 
            type="button"
            variant={
              watchedValues.dropShadow?
              "default":"outline"
            }
            size="sm"
            disabled={!watchedValues.backgroundRemoved}
            onClick={()=>
              setValue("dropShadow",!watchedValues.dropShadow)
            }
            >
              {watchedValues.dropShadow?(
                  <Check className="w-4 h-4"/>)
                  :( <X className="w-4 h-4"/>)       
              }
            </Button>
           </div>
             <p className="text-sm text-slate-400">
               {
                watchedValues.backgroundRemoved? "Add realistic shadow"
                : "Requires background removal"
               }
            </p>
           </div>
            </div>
            
              {/* Aspect Ratio & Cropping */}
            <div className="space-y-4">
              <h3 className="text-white flex items-center text-lg font-semibold">
                <Crop className="h-5 w-5 mr-2"/>
                  Resize & Crop
              </h3>
              <div className="space-y-3">
                <Label className="text-white">Aspect Ratio</Label>
                <Select value={watchedValues.aspectRatio} 
                onValueChange={(value)=>setValue("aspectRatio",value)}>

      <SelectTrigger >
      <SelectValue  />
    </SelectTrigger>
    <SelectContent>
    {
      ASPECT_RATIOS.map((ratio)=>(
            <SelectItem key={ratio.value} value={ratio.value}>
              {ratio.label}
              </SelectItem>
      ))}
      </SelectContent>
   </Select>  
              </div>
              {
                watchedValues.aspectRatio=="custom"&&(
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-white">Width</Label>
                      <Input
                      type="number"
                      value={watchedValues.customWidth}
                      onChange={(e)=>
                        setValue("customWidth",parseInt(e.target.value)||800)}
                        min="100"
                        max="2000"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Height</Label>
                      <Input
                      type="number"
                      value={watchedValues.customHeight}
                      onChange={(e)=>
                        setValue("customHeight",parseInt(e.target.value)||800)}
                        min="100"
                        max="2000"
                      />
                    </div>
                  </div>
                )}

                {watchedValues.aspectRatio!=="original" &&(
                    <div className="space-y-3">
                <Label className="text-white">Smart Crop Focus</Label>
                <Select value={watchedValues.smartCropFocus} 
                onValueChange={(value)=>setValue("smartCropFocus",value)}>

      <SelectTrigger >
      <SelectValue  />
    </SelectTrigger>
    <SelectContent>
    {
      SMART_CROP_OPTIONS.map((option)=>(
            <SelectItem key={option.value} value={option.value}>
              {option.label}
              </SelectItem>
      ))}
      </SelectContent>
   </Select>  
              </div>
                  )}
              </div>  

              {/* Text Overlay */}
              <div className="space-y-4">
                  <h3 className="text-white flex items-center text-lg font-semibold">
                    <Type className="h-5 w-5 mr-2"/> Text Overlay
                  </h3>
              <div className="space-y-3">
                <Label className="text-white">Text</Label>

                <Textarea
                value={watchedValues.textOverlay}
                onChange={(e)=>setValue("textOverlay",e.target.value)}
                 placeholder="Enter text to overlay..."
                 rows={3}
                />
                </div>    
                {
                  watchedValues.textOverlay&&
                    <>
                    <div className="space-y-3">
                      <Label className="text-white">
                        Font Size:{watchedValues.textFontSize}px
                        </Label>
                        <Slider 
                        value={[watchedValues.textFontSize]}
                        onValueChange={ (value)=>setValue("textFontSize",value[0])}
                         max={200}
                          min={12}
                          step={2}
                          className="w-full"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                          <Label className="text-white">
                      Text Color
                        </Label>
                        <Input
                        type="color"
                        value={watchedValues.textColor}
                        onChange={(e)=>setValue("textColor",e.target.value)}
                        />
                      </div>
                    </div>

                  <div className="space-y-3">
                <Label className="text-white">Position</Label>
                <Select value={watchedValues.textPosition} 
                onValueChange={(value)=>setValue("textPosition",value)}>

        <SelectTrigger >
        <SelectValue  />
      </SelectTrigger>
      <SelectContent>
       {
         TEXT_POSITIONS.map((position)=>(
            <SelectItem key={position.value} value={position.value}>
              {position.label}
              </SelectItem>
       ))}
      </SelectContent>
       </Select>  
              </div>  
                    </>
                  
                }
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                onClick={applyTransformations}
                variant="primary"
                disabled={isTransforming}
                >
                {
                  isTransforming?(
                    <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                  ):(
                     <Wand2 className="w-4 h-4 "/>
                  )
                }
                Apply Transformations
                </Button>
                <Button
                onClick={resetTransformations}
                variant="outline"
                >
                <RefreshCw className="w-4 h-4 "/>
                Reset 
                </Button>

              </div>
       
      </div>

      {/* Right column – preview */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold flex items-center">
          <ImageIcon className="h-5 w-5 mr-2" />
          Preview
        </h3>

        {transformedImage && (
          <div className="relative">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <img
                src={transformedImage}
                alt="Transformed preview"
                className="w-full h-auto max-h-96 object-contain mx-auto rounded-lg"
                onError={() => {
                  toast.error("Failed to load transformed image");
                  setTransformedImage(uploadedImage?.url);
                }}
              />
            </div>

            {isTransforming && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="bg-slate-800 rounded-lg p-4 flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="text-white">
                    Applying transformations...
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {
          uploadedImage && transformedImage &&(
            <div className="text-center space-y-4">
              <div className="text-sm text-slate-400">
                Current image URL ready for use
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                onClick={handleSelectImage}
                className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="h-4 w-4 mr-2"/>
                  Use This Image
                </Button>

                <Button
                onClick={handleClose}
                variant="outline"
                className="border-slate-600 hover:bg-slate-700"
                >
                Cancel
                </Button>

              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TransformImage;
