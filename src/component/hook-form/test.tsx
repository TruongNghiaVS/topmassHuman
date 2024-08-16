"use client";
import React from "react";
import { useController, FieldValues } from "react-hook-form";

interface CustomFileUploadProps<T extends FieldValues> {
  name: string;
  control: any;
  rules?: object;
}

const CustomFileUpload = <T extends FieldValues>({
  name,
  control,
  rules,
}: CustomFileUploadProps<T>) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onChange(files);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        onBlur={onBlur}
        accept="image/*"
      />
      {error && <p className="text-red-500">{error.message}</p>}
      <p>{value && value.length} files selected</p>
    </div>
  );
};

export default CustomFileUpload;
