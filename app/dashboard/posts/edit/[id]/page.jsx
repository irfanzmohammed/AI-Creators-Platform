"use client"
import { api } from "@/convex/_generated/api";
import PostEditor from '@/components/post-editor';
import { useConvexQuery } from '@/Hooks/use-convex.query';
import { useParams } from 'next/navigation'
import React from 'react'
import { BarLoader } from 'react-spinners';
const EditPostPage = () => {

    const params=useParams();
    const postId=params.id

    const{
        data:post,
        isLoading,
        error
    }=useConvexQuery(api.posts.getById,{id:postId})

    if(isLoading){
         return <BarLoader width={"100%"} color="#D8B4FE"/>
    }
   
    if(error||!post){
        return(
            <div className='min-h-screen bg-slate-900 flex items-center'>
                <div className='text-center'>
                    <h1 className='text-2xl mb-2 font-bold text-white'>Post Not Found</h1>
                    <p className='text-slate-400'>
                        The post you're looking doesn't exist
                    </p>

                </div>

            </div>
        )
    }

  return <PostEditor initialData={post} mode="edit"/>
}

export default EditPostPage