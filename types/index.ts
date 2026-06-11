// Post related types
export interface PostFormValues {
  title: string;
  content: string;
  category?: string;
  tags: string[];
  featuredImage?: string;
  scheduledFor?: string;
}

export interface PostData {
  title: string;
  content: string;
  category?: string;
  tags: string[];
  featuredImage?: string;
  status: "published" | "draft" | "scheduled";
  scheduledFor?: number;
}

export interface InitialPostData {
  _id?: string;
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  scheduledFor?: number;
}

export interface ImageData {
  url: string;
  fileId?: string;
  width?: number;
  height?: number;
}

export interface ImageKitUploadResponse {
  url: string;
  fileId: string;
  width: number;
  height: number;
  size: number;
  name: string;
}