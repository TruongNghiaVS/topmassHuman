"use client";
import React, { useEffect, useRef, useState } from "react";
import { IUpload } from "./interface/interface";
import { useController } from "react-hook-form";
import axios from "axios";

const AvatarUpload: React.FC<IUpload> = ({
  name,
  control,
  className,
  link = "",
}) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const readImageFromUrl = async (url: string) => {
    try {
      // Fetch the image as a Blob
      const response = await axios.get(link, {
        responseType: "blob", // Important to get the response as a blob
      });
      const blob = response.data;

      const file = new File([blob], "image.jpg", { type: blob.type });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        const event = new Event("change", { bubbles: true });
        fileInputRef.current.dispatchEvent(event);
      }
      // Create a FileReader to read the Blob
      const reader = new FileReader();

      // Define what happens when the FileReader has read the Blob
      reader.onloadend = () => {
        setPreview(reader.result);
      };

      // Read the Blob as a data URL (base64 encoded)
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error reading image from URL:", error);
    }
  };

  useEffect(() => {
    if (link.length > 0) {
      readImageFromUrl(link);
    }
  }, [link]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      setPreview(null);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="sm:block grid justify-center">
      {preview || link ? (
        <img
          src={preview ? (preview as string) : link}
          alt="Avatar Preview"
          className={`rounded-full w-28 h-28 ${className}`}
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500">No Avatar</span>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      <button
        type="button"
        onClick={handleClick}
        className="mt-2 text-sm mt-2 text-default sm:text-start text-center hover:underline"
      >
        Thay đổi
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default AvatarUpload;
