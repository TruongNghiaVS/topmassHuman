"use client";
import React, { useRef, useState } from "react";
import { IUpload } from "./interface/interface";
import { useController } from "react-hook-form";
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const CustomUpload: React.FC<IUpload> = ({ name, control }) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleRemoveFile = () => {
    setFile(null);
    onChange(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onChange(file);
    setFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  return (
    <div className="">
      <div
        style={{
          border: "2px dashed #F37A20",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          marginBottom: "20px",
          cursor: "pointer",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="sm:flex justify-center items-center grid ">
          <CloudArrowUpIcon className="w-6 text-default font-semibold sm:mx-0 mx-auto" />
          <div>Tải file lên, chọn hoặc kéo thả</div>
        </div>
        <div className="text-center mt-4">
          Dung lượng tối đa 5MB, định dạng: Jpeg, JPG, PNG, PDF
        </div>
      </div>
      {error !== null && error?.message !== "" && (
        <div style={{ color: "red", margin: "8px 0" }}>{error?.message}</div>
      )}

      <div className="text-center flex items-center justify-center mt-4">
        {file && (
          <div className="flex text-xs items-center mr-4">
            <DocumentTextIcon className="w-4 text-default" />
            <div className="mx-2">{file.name}</div>
            <button
              type="button"
              onClick={handleRemoveFile}
              style={{ marginLeft: "10px" }}
            >
              <TrashIcon className="w-4 text-default" />
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpeg, .jpg, .png, .pdf"
        className="hidden"
        onChange={handleFileChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomUpload;
