"use client";
import React, { useRef, useState } from "react";
import { IUpload } from "./interface/interface";
import { useController } from "react-hook-form";

const AvatarUpload: React.FC<IUpload> = ({ name, control, classNameImg }) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

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
      {preview ? (
        <img
          src={preview as string}
          alt="Avatar Preview"
          className={`rounded-full w-28 h-28 ${classNameImg}`}
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500">No Avatar</span>
        </div>
      )}

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
