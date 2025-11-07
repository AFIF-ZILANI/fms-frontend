"use client";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UploadfileProps {
  setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setPublicId: React.Dispatch<React.SetStateAction<string | null>>;
  uploadedImage: string | null;
  preset: string;
}

export default function Uploadfile<T>({
  setUploadedImage,
  setPublicId,
  uploadedImage,
  preset = "temp",
}: UploadfileProps) {
  // const fullPreset = `${process.env
  //   .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_BASE!}-${preset}`;
    // console.log(fullPreset)
  return (
    <div className="flex items-center gap-2">
      <CldUploadWidget
        uploadPreset={"fms-sup"}
        onSuccess={(result) => {
          // Type narrowing — Cloudinary always returns this shape on success
          const info = result?.info as {
            secure_url: string;
            public_id: string;
          };

          if (info?.secure_url && info?.public_id) {
            // console.log(info.public_id, info.secure_url);
            setUploadedImage(info.secure_url);
            setPublicId(info.public_id);
          }
        }}
      >
        {({ open }) => (
          <Button type="button" onClick={() => open?.()} variant="outline">
            {uploadedImage ? "Change Photo" : "Upload Photo"}
          </Button>
        )}
      </CldUploadWidget>

      {uploadedImage && (
        <Avatar>
          <AvatarImage src={uploadedImage} alt="Uploaded image" />
          <AvatarFallback>FMS</AvatarFallback>
          {/* <AvatarFallback></AvatarFallback> */}
        </Avatar>
      )}
    </div>
  );
}
