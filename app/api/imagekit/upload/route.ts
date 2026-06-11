// import { auth } from "@clerk/nextjs/server"
// import ImageKit from "imagekit"
// import { NextResponse } from "next/server";
// import { file } from "zod";

// // Initialize ImageKit
// const imageKit=new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
// })

// export async function POST(request){
//     try{
//      const {userId}= await auth();
//      if(!userId){
//         return NextResponse.json({error:"Unauthorized"},{status:401})
//      }

//      // Get form data
//      const formData=await request.formData();
//      const file=formData.get("file")
//      const fileName=formData.get("fileName");

//      if(!file){
//         return NextResponse.json({error:"No file provided"},
//           {status:400})
//      }
    
//       // Convert file to buffer
//      const bytes=await file.arrayBuffer();
//      const buffer=Buffer.from(bytes)

//     // Generate unique filename

//     const timestamp= Date.now();
//     const sanitizedFileName=fileName?.replace(/[^a-zA-Z0-9.-]/g, "_") ||"upload"
//     const uniqueFileName=`${userId}/${timestamp}_${sanitizedFileName}`

//     // Upload to ImageKit - Simple server-side upload
//     const uploadResponse = await imageKit.upload({
//       file: buffer,
//       fileName: uniqueFileName,
//       folder: "/blog_images",
//     });
   
//       // Return upload data
//     return NextResponse.json({
//       success: true,
//       url: uploadResponse.url,
//       fileId: uploadResponse.fileId,
//       width: uploadResponse.width,
//       height: uploadResponse.height,
//       size: uploadResponse.size,
//       name: uploadResponse.name,
//     });
// }

//     catch(error){
//        console.error("ImageKit upload error:", error);
//      return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to upload image",
//         details: error.message,
//       },
//       { status: 500 }
//     );
  
//     }
// }

import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";
import { ImageKitUploadResponse } from "@/types/index";

// ✅ ImageKit initialized with proper env types
const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const fileName = formData.get("fileName") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const sanitizedFileName =
      fileName?.replace(/[^a-zA-Z0-9.-]/g, "_") || "upload";
    const uniqueFileName = `${userId}/${timestamp}_${sanitizedFileName}`;

    // ✅ Typed upload response
    const uploadResponse: ImageKitUploadResponse = await imageKit.upload({
      file: buffer,
      fileName: uniqueFileName,
      folder: "/blog_images",
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      width: uploadResponse.width,
      height: uploadResponse.height,
      size: uploadResponse.size,
      name: uploadResponse.name,
    });
  } catch (error) {
    const err = error as Error;
    console.error("ImageKit upload error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload image",
        details: err.message,
      },
      { status: 500 }
    );
  }
}