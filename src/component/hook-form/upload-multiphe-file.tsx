"use client";
import React, { useEffect, useRef, useState } from "react";
import { IUpload } from "./interface/interface";
import { useController } from "react-hook-form";
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const CustomUploadMulti: React.FC<IUpload> = ({
  name,
  control,
  title = "Tải CV lên từ máy tính, chọn hoặc kéo thả",
  link = "",
  acceptFile = ".jpeg, .jpg, .png, .pdf",
}) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLoadFiles = async (links: string) => {
    const dataTransfer = new DataTransfer();
    const listLink = links.split(",");
    for (const link of listLink) {
      try {
        // Fetch the file from the URL
        const response = await fetch(link);
        const blob = await response.blob();
        const fileName = link.split("/").pop() || "file";
        const file = new File([blob], fileName, { type: blob.type });
        // Add the file to the DataTransfer object
        dataTransfer.items.add(file);
      } catch (error) {
        console.error(`Error fetching file from ${link}:`, error);
      }
    }

    // Assign files to the file input
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      const event = new Event("change", { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
    setFiles(Array.from(dataTransfer.files));
  };

  useEffect(() => {
    if (link.length > 0) {
      handleLoadFiles(link);
    }
  }, [link]);

  const convertArrayToFileList = (filesArray: File[]): FileList => {
    const dataTransfer = new DataTransfer();

    filesArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const handleRemoveFile = (fileToRemove: File) => {
    onChange(
      convertArrayToFileList(files.filter((file) => file !== fileToRemove))
    );
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      onChange(selectedFiles);
      setFiles(Array.from(selectedFiles));
    }
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

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      setFiles(Array.from(droppedFiles));
    }
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
          <div>{title}</div>
        </div>
        <div className="text-center mt-4">Dung lượng tối đa 5MB</div>
      </div>
      {error !== null && error?.message !== "" && (
        <div style={{ color: "red", margin: "8px 0" }}>{error?.message}</div>
      )}

      <div className="flex space-2 items-center whitespace-nowrap flex-wrap  mt-4">
        {files &&
          files.map((item, idx) => {
            return (
              <div key={idx} className="flex text-xs items-center mr-4">
                <DocumentTextIcon className="w-4 text-default" />
                <div className="mx-1">{item.name}</div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(item)}
                  style={{ marginLeft: "3px" }}
                >
                  <TrashIcon className="w-4 text-default" />
                </button>
              </div>
            );
          })}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptFile}
        className="hidden"
        multiple
        onChange={handleFileChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomUploadMulti;
