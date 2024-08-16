import React from "react";
import { useController } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorInputProps } from "./interface/interface";

const CKEditorInput: React.FC<CKEditorInputProps> = ({ ...props }) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController(props);
  const editorConfiguration = {
    height: `80px`, // 20px per row height as an example
  };
  return (
    <div className="h-[150px]">
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};

export default CKEditorInput;
