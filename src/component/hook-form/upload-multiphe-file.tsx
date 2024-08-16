"use client";
import React, { useRef, useState } from "react";
import { IUpload } from "./interface/interface";
import { useController } from "react-hook-form";
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const CustomUploadMulti: React.FC<IUpload> = ({ name, control }) => {
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

  const convertArrayToFileList = (filesArray: File[]): FileList => {
    const dataTransfer = new DataTransfer();

    filesArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    console.log(filesArray);
    console.log(dataTransfer);
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
        {value && value[0].name}
        <div className="sm:flex justify-center items-center grid ">
          <CloudArrowUpIcon className="w-6 text-default font-semibold sm:mx-0 mx-auto" />
          <div>Tải CV lên từ máy tính, chọn hoặc kéo thả</div>
        </div>
        <div className="text-center mt-4">
          Dung lượng tối đa 5MB, định dạng: Jpeg, JPG, PNG, PDF
        </div>
      </div>
      {error !== null && error?.message !== "" && (
        <div style={{ color: "red", margin: "8px 0" }}>{error?.message}</div>
      )}

      <div className="flex space-2 items-center whitespace-nowrap flex-wrap  mt-4">
        {files &&
          files.map((item) => {
            return (
              <div key={item.name} className="flex text-base items-center mr-4">
                <DocumentTextIcon className="w-6 text-default" />
                <div className="mx-2">{item.name}</div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(item)}
                  style={{ marginLeft: "10px" }}
                >
                  <TrashIcon className="w-6 text-default" />
                </button>
              </div>
            );
          })}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpeg, .jpg, .png, .pdf"
        className="hidden"
        multiple
        onChange={handleFileChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomUploadMulti;
