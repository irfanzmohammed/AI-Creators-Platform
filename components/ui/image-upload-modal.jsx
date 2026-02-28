"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from 'react-dropzone';
import { Check, Loader, Loader2, Upload, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { uploadToImageKit,buildTransformationUrl } from '@/lib/imagekit';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TransformImage from './transform-image';
import { ASPECT_RATIOS } from '@/lib/image-transform';
import { SMART_CROP_OPTIONS } from '@/lib/image-transform';
import { TEXT_POSITIONS } from '@/lib/image-transform';
import { Overlay } from '@radix-ui/react-dialog';
import { resolve } from 'styled-jsx/css';
import { fa } from 'zod/v4/locales';


// Form validation schema
const transformationSchema = z.object({
  aspectRatio: z.string().default("original"),
  customWidth: z.number().min(100).max(2000).default(800),
  customHeight: z.number().min(100).max(2000).default(600),
  smartCropFocus: z.string().default("auto"),
  textOverlay: z.string().optional(),
  textFontSize: z.number().min(12).max(200).default(50),
  textColor: z.string().default("#ffffff"),
  textPosition: z.string().default("center"),
  backgroundRemoved: z.boolean().default(false),
  dropShadow: z.boolean().default(false),
});

const ImageUploadModal = ({
    isOpen,onClose,onImageSelect,
    title="Upload & Transform Image"
}) => {
    
   const[activeTab,setActiveTab]=useState("upload")
   const[uploadedImage,setUploadedImage]=useState(null)
   const[isUploading,setIsUploading]=useState(false)

   const[transformedImage,setTransformedImage]=useState(null)
   const[isTransforming,setIsTransforming]=useState(false)

   const{watch,setValue,reset} =useForm({
    resolver:zodResolver(transformationSchema),
      defaultValues: {
      aspectRatio: "original",
      customWidth: 800,
      customHeight: 600,
      smartCropFocus: "auto",
      textOverlay: "",
      textFontSize: 50,
      textColor: "#ffffff",
      textPosition: "center",
      backgroundRemoved: false,
      dropShadow: false,
    },
   })

   
   const watchedValues=watch();

   const resetForm=()=>{
    setUploadedImage(null);
    setTransformedImage(null);
    setActiveTab("upload");
    reset();
   }

    const handleClose=()=>{
        onClose();
        resetForm();
    }

    const onDrop=async(acceptedFiles)=>{
      const file=acceptedFiles[0];
      if(!file) return;
      console.log(file)

       // Validate file type
      if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

     // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);

    try{
      const fileName=`post-image-${Date.now()}-${file.name}`
      const result=await uploadToImageKit(file,fileName)

      if(result.success){
        setUploadedImage(result.data);
        setTransformedImage(result.data.url);
        setActiveTab("transform")
        toast.success("Image uploaded successfully!")
      }
      else{
        toast.error(result.error || "Upload failed")
      }
    }
    catch(error){
      console.error("Upload error:",error)
      toast.error("Upload failed. Please try again")   
    }

    finally{
      setIsUploading(false)
    }
    }

     const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept:{
          "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
        },
        multiple:false,
    })

    
   // Apply transformations
    const applyTransformations=async()=>{
      if(!uploadedImage) return
      setIsTransforming(true)

      try{
          let transformationChain=[];

        // Aspect ratio and resizing
        if(watchedValues.aspectRatio!=="original"){
          const ratio=ASPECT_RATIOS.find(
            (r)=>r.value===watchedValues.aspectRatio
          )

          if(ratio&&ratio.height&&ratio.width){
            transformationChain.push({
               width:ratio.width,
               height:ratio.height,
               focus:watchedValues.smartCropFocus,

            });
          }
          else if(watchedValues.aspectRatio=="custom"){
            transformationChain.push({
              width:watchedValues.customWidth,
              height:watchedValues.customHeight,
              focus:watchedValues.smartCropFocus,
            })
          }
        }

        
      // Background removal
      if(watchedValues.backgroundRemoved){
        transformationChain.push({
          effect:"removedotbg"
        })
      }

        // Drop shadow (only works with transparent background)
      if(watchedValues.dropShadow&& watchedValues.backgroundRemoved){
        transformationChain.push({
          effect:"dropshadow"
        })
      }  
     
       // Text overlay
       if(watchedValues.textOverlay?.trim()){
        transformationChain.push({
          overlayText:watchedValues.textOverlay,
          overlayTextFontSize:watchedValues.textFontSize,
          overlayTextColor:watchedValues.textColor,
          gravity:watchedValues.textPosition,
          overlayTextPadding:10,
          
        })
       }

         // Apply transformations
         const transformedUrl=buildTransformationUrl(
          uploadedImage.url,
          transformationChain
         );

         // Add a small delay to show loading state and allow ImageKit to process
         await new Promise((resolve)=> setTimeout(resolve,3000));
         setTransformedImage(transformedUrl);
         toast.success("Transformations applied!")
      }
      catch(error){
        console.error("Transformation error:", error);
        toast.error("Failed to apply transformations ")
      }

      finally{
        setIsTransforming(false)
      }
    }

     // Reset transformations
    const resetTransformations=()=>{
      reset();
      setTransformedImage(uploadedImage?.url)
    }

    // Handle image selection
    const handleSelectImage=()=>{
      if(transformedImage){
         onImageSelect({
        url: transformedImage,
        originalUrl: uploadedImage?.url,
        fileId: uploadedImage?.fileId,
        name: uploadedImage?.name,
        width: uploadedImage?.width,
        height: uploadedImage?.height,
      });
      onClose();
      resetForm();
      }
    }

  return (
   <Dialog open={isOpen} onOpenChange={handleClose}>
 
  <DialogContent className='!max-w-6xl !h-[90vh] overflow-y-auto'>
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
            Upload an image and apply AI-powered transformations
      </DialogDescription>
    </DialogHeader>

    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
  <TabsList className='grid w-full grid-cols-2'>
    <TabsTrigger value="upload">Upload</TabsTrigger>
    <TabsTrigger value="transform" disabled={!uploadedImage}>Transform</TabsTrigger>
  </TabsList>

  <TabsContent value="upload" className='space-y-4'>
    <div
    {...getRootProps()}
    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors`}
    >
     <input {...getInputProps()}/>
    {isUploading?(
      <div className='space-y-4'>
       <Loader2 className='h-12 w-12 text-purple-400 mx-auto animate-spin'/>
       <p className='text-slate-300'>Uploading image...</p>
      </div>
    ):(
    <div className="space-y-4">
      <Upload className='mx-auto h-12 w-12 text-slate-400'/>
      <div>
        <p className='text-white text-lg'>
          {
            isDragActive
            ?"Drop the image here"
            :"Drag & drop an image here"
          }
        </p>
        <p className='text-sm text-slate-400 mt-2'>
          or click to select a file (JPG, PNG, WebP, GIF - Max 10MB)
        </p>
      </div>
    </div>
    )}
    </div>

     {
      uploadedImage&&(
        <div className='text-center space-y-4'>
          <Badge
          variant="secondary"
          className="bg-green-500/20 text-green-300 border-green-500/30">
            <Check className='h-3 w-3 mr-1'/>
           Image uploaded successfully!
          </Badge>
          <div className='text-slate-400 text-sm'>
         {uploadedImage.width} × {uploadedImage.height} •{" "}
          {Math.round(uploadedImage.size / 1024)}KB
          </div>
          <Button
          onClick={()=>setActiveTab("transform")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Wand2 className='h-4 w-4 mr-2'/>
                Start Transforming
          </Button>

        </div>
      )
     }
    </TabsContent>
  <TabsContent value="transform" className='space-y-6'>
    <TransformImage transformedImage={transformedImage} setTransformedImage={setTransformedImage}
    isTransforming={isTransforming}
    uploadedImage={uploadedImage}
    handleClose={handleClose}
    handleSelectImage={handleSelectImage}
    applyTransformations={applyTransformations}
    resetTransformations={resetTransformations}
    watchedValues={watchedValues}
    setValue={setValue}
    />
  </TabsContent>
</Tabs>

  </DialogContent>
</Dialog>
  )
}

export default ImageUploadModal