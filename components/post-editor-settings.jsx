"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";

const CATEGORIES = [
  "Technology",
  "Design",
  "Marketing",
  "Business",
  "Lifestyle",
  "Education",
  "Health",
  "Travel",
  "Food",
  "Entertainment",
];

const PostEditorSettings = ({
    isOpen,
    onClose,
    mode,
    form
}) => {

    const[tagInput,setTagInput]=useState("");
     const { watch, setValue } = form;
     const watchedValues=watch();

     const handleTagInput=()=>{}

  return (
   <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle className="text-white">Post Settings</DialogTitle>
      <DialogDescription>
      Configure your post details
      </DialogDescription>
    </DialogHeader>
    <div className='space-y-6'>
        <div className='space-y-2'>
 <Select
 value={watchedValues.category}
 onValueChange={(value)=>setValue("category",value)}
 >
  <SelectTrigger className="bg-slate-800 border-slate-600">
     <SelectValue placeholder="Select category..." />
  </SelectTrigger>
  <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
</Select>
        </div>
        <div className='space-y-3'>
            <label className='text-sm font-medium text-white'>Tags</label>
            <div className='flex space-x-2'>
                <Input
                value={setTagInput}
                onChange={(e)=>setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
                className="bg-slate-800 border-slate-600" 
                placeholder="Add tags..."
            
                />

            </div>

        </div>
    </div>
  </DialogContent>
  </Dialog>
  )
}

export default PostEditorSettings