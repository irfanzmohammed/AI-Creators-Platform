// "use client";
// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import z from 'zod'
// import {zodResolver} from  "@hookform/resolvers/zod"
// import { useMutation } from 'convex/react'
// import { useConvexMutation } from '@/Hooks/use-convex.query'
// import { api } from '@/convex/_generated/api'
// import { useRouter } from 'next/navigation'
// import PostEditorHeader from './post-editor-header'
// import PostEditorContent from './post-editor-content'
// import PostEditorSettings from './post-editor-settings';
// import { toast } from 'sonner';
// import ImageUploadModal from './ui/image-upload-modal';

// const postSchema=z.object({
//   title:z.string().min(1,'Title is required').max(20,'title too long'),
//    content: z.string().min(1, "Content is required"),
//   category: z.string().optional(),
//   tags: z.array(z.string()).max(10, "Maximum 10 tags allowed"),
//   featuredImage: z.string().optional(),
//   scheduledFor: z.string().optional(),
// })

// const PostEditor = ({initialData=null,mode="create"}) => {

//   const[isSettingsOpen,setIsSettingsOpen]=useState(false);
//   const[isImageModalOpen,setIsImageModalOpen]=useState(false);
//   const[imageModalType,setImageModalType]=useState("featured");
//   const[quillRef,setQuillRef]=useState(null);

//   const router=useRouter();

// const{mutate:createPost, isLoading:isCreateLoading}=useConvexMutation(api.posts.create)
// const{mutate:updatePost, isLoading:isUpdating}=useConvexMutation(api.posts.update)

//   const form= useForm({
//     resolver:zodResolver(postSchema),
//     defaultValues: {
//       title: initialData?.title || "",
//       content: initialData?.content || "",
//       category: initialData?.category || "",
//       tags: initialData?.tags || [],
//       featuredImage: initialData?.featuredImage || "",
//       scheduledFor: initialData?.scheduledFor
//         ? new Date(initialData.scheduledFor).toISOString().slice(0, 16)
//         : "",
//     },
//   })

//   const {handleSubmit,watch,setValue}=form;
//   const watchedValues=watch();

 
//  //autosave drafts
//   useEffect(()=>{
//      if(!watchedValues.title && !watchedValues.content) return;
//      const autoSave=setInterval(()=>{
//            if(watchedValues.title || watchedValues.content) {
//             if(mode === "create" ) handleSave(true) //silent save
//            }
//      },30000)
//      return(()=>clearInterval(autoSave))
//   },[watchedValues.content, watchedValues.title])

//   const onSubmit=async(data, action, silent=false)=>{
//     try{
//       const postData = {
//         title: data.title,
//         content: data.content,
//         category: data.category || undefined,
//         tags: data.tags,
//         featuredImage: data.featuredImage || undefined,
//         status: action === "publish" ? "published" : "draft",
//         scheduledFor: data.scheduledFor
//           ? new Date(data.scheduledFor).getTime()
//           : undefined,
//       };

//       let resultId;

//       if(mode==="edit" && initialData?._id){
//           // Always use update for edit mode
//           resultId=await updatePost({
//             id:initialData?._id,
//             ...postData,
//           })
//       }

//       else if(initialData?._id && action==="draft"){
//            // If we have existing draft data, update it
//          resultId=await updatePost({
//             id:initialData?._id,
//             ...postData,
//           })
//       }
//       else{
//          // Create new post (will auto-update existing draft if needed)
//         resultId=await createPost(postData);
//       }

//       if(!silent){
//         const message=
//         action==="publish"? "Post published!":"Draft Saved"
//         toast.success(message)

//         if(action==="publish") router.push("/dashboard/posts");
//         return resultId
//       }
//     }

//     catch(error){
//      if(!silent) toast.error(error.message || "Failed to save post");
//      throw error
//     }
//   }

//    const handleSave=(silent=false)=>{
//    handleSubmit((data)=>onSubmit(data, "draft", silent))();

//   }

//   const handlePublish=()=>{
//      handleSubmit((data)=>onSubmit(data, "publish"))();

//   }
//   const handleSchedule=()=>{
//     if(!watchedValues.scheduledFor){
//       toast.error("Plaese select a a date and time to schedule");
//       return;
//     }
//       handleSubmit((data)=>onSubmit(data, "schedule"))();
//   }

//   const handleImageSelect=(imageData)=>{
//      if(imageModalType==="featured"){
//       setValue("featuredImage", imageData.url)
//       toast.success("Featured image added!")
//      }
//      else if(imageModalType==="content" &&quillRef){
//         const quill=quillRef.getEditor();
//         const range=quill.getSelection();
//         const index=range? range.index : quill.getLength();

//         quill.insertEmbed(index, "image",imageData.url)
//         quill.setSelection(index +1);
//         toast.success("Image inserted!")
//      }

//      setIsImageModalOpen(false)
//   }

//   return (
//     <div className='min-h-screen bg-slate-900 text-white'>

//       {/* Header */}
//     <PostEditorHeader
//         mode={mode}
//         initialData={initialData}
//         isPublishing={isCreateLoading || isUpdating}
//         onSave={handleSave}
//         onPublish={handlePublish}
//         onSchedule={handleSchedule}
//         onSettingsOpen={() => setIsSettingsOpen(true)}
//         onBack={() => router.push("/dashboard")}
//       />

//       {/* Post Editor */}
//       <PostEditorContent
//       form={form}
//       setQuillRef={setQuillRef}
//       onImageUpload={(type)=>{
//          setImageModalType(type)
//          setIsImageModalOpen(true)
//       }}
//       />
//       {/* settings dialog */}
//       <PostEditorSettings
//       isOpen={isSettingsOpen}
//       onClose={()=>setIsSettingsOpen(false)}
//       form={form}
//       mode={mode}
//       />
//       {/* image dialog */}
//       <ImageUploadModal
//       isOpen={isImageModalOpen}
//       onClose={()=>setIsImageModalOpen(false)}
//       onImageSelect={handleImageSelect}
//       title={
//         imageModalType==="featured"?
//         "Upload & Transform Image":
//         "Insert Image"

//       }
//       />

//     </div>
//   )
// }

// export default PostEditor

"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConvexMutation } from "@/Hooks/use-convex.query";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import PostEditorHeader from "./post-editor-header";
import PostEditorContent from "./post-editor-content";
import PostEditorSettings from "./post-editor-settings";
import { toast } from "sonner";
import ImageUploadModal from "./ui/image-upload-modal";
import { InitialPostData, PostData, ImageData } from "@/types/index";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(20, "title too long"),
  content: z.string().min(1, "Content is required"),
  category: z.string().optional(),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed"),
  featuredImage: z.string().optional(),
  scheduledFor: z.string().optional(),
});

//  Type inferred directly from Zod schema
type PostFormValues = z.infer<typeof postSchema>;

type PostAction = "publish" | "draft" | "schedule";

type ImageModalType = "featured" | "content";

interface PostEditorProps {
  initialData?: InitialPostData | null;
  mode?: "create" | "edit";
}

const PostEditor = ({ initialData = null, mode = "create" }: PostEditorProps) => {

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [imageModalType, setImageModalType] = useState<ImageModalType>("featured");
  const [quillRef, setQuillRef] = useState<any>(null); // Quill has no official TS type

  const router = useRouter();

  const { mutate: createPost, isLoading: isCreateLoading } =
    useConvexMutation<string>(api.posts.create);

  const { mutate: updatePost, isLoading: isUpdating } =
    useConvexMutation<string>(api.posts.update);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      featuredImage: initialData?.featuredImage || "",
      scheduledFor: initialData?.scheduledFor
        ? new Date(initialData.scheduledFor).toISOString().slice(0, 16)
        : "",
    },
  });

  const { handleSubmit, watch, setValue } = form;
  const watchedValues = watch();

  useEffect(() => {
    if (!watchedValues.title && !watchedValues.content) return;
    const autoSave = setInterval(() => {
      if (watchedValues.title || watchedValues.content) {
        if (mode === "create") handleSave(true);
      }
    }, 30000);
    return () => clearInterval(autoSave);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValues.content, watchedValues.title]);

  const onSubmit = async (
    data: PostFormValues,
    action: PostAction,
    silent: boolean = false
  ): Promise<string | undefined> => {
    try {
      const postData: PostData = {
        title: data.title,
        content: data.content,
        category: data.category || undefined,
        tags: data.tags,
        featuredImage: data.featuredImage || undefined,
        status: action === "publish" ? "published" : "draft",
        scheduledFor: data.scheduledFor
          ? new Date(data.scheduledFor).getTime()
          : undefined,
      };

       let resultId: string | undefined;

      if (mode === "edit" && initialData?._id) {
        resultId = await updatePost({ id: initialData._id, ...postData });
      } else if (initialData?._id && action === "draft") {
        resultId = await updatePost({ id: initialData._id, ...postData });
      } else {
        resultId = await createPost(postData);
      }

      if (!silent) {
        const message = action === "publish" ? "Post published!" : "Draft Saved";
        toast.success(message);
        if (action === "publish") router.push("/dashboard/posts");
        return resultId;
      }
    } catch (error) {
      const err = error as Error;
      if (!silent) toast.error(err.message || "Failed to save post");
      throw error;
    }
  };

  const handleSave = (silent: boolean = false): void => {
    handleSubmit((data) => onSubmit(data, "draft", silent))();
  };

  const handlePublish = (): void => {
    handleSubmit((data) => onSubmit(data, "publish"))();
  };

  const handleSchedule = (): void => {
    if (!watchedValues.scheduledFor) {
      toast.error("Please select a date and time to schedule");
      return;
    }
    handleSubmit((data) => onSubmit(data, "schedule"))();
  };

  const handleImageSelect = (imageData: ImageData): void => {
    if (imageModalType === "featured") {
      setValue("featuredImage", imageData.url);
      toast.success("Featured image added!");
    } else if (imageModalType === "content" && quillRef) {
      const quill = quillRef.getEditor();
      const range = quill.getSelection();
      const index = range ? range.index : quill.getLength();
      quill.insertEmbed(index, "image", imageData.url);
      quill.setSelection(index + 1);
      toast.success("Image inserted!");
    }
    setIsImageModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <PostEditorHeader
        mode={mode}
        initialData={initialData}
        isPublishing={isCreateLoading || isUpdating}
        onSave={handleSave}
        onPublish={handlePublish}
        onSchedule={handleSchedule}
        onSettingsOpen={() => setIsSettingsOpen(true)}
        onBack={() => router.push("/dashboard")}
      />
      <PostEditorContent
        form={form}
        setQuillRef={setQuillRef}
        onImageUpload={(type: ImageModalType) => {
          setImageModalType(type);
          setIsImageModalOpen(true);
        }}
      />
      <PostEditorSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        form={form}
        mode={mode}
      />
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={handleImageSelect}
        title={
          imageModalType === "featured"
            ? "Upload & Transform Image"
            : "Insert Image"
        }
      />
    </div>
  );
};

export default PostEditor;