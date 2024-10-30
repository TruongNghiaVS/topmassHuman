import React from "react";
import { useController, Control } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface CustomCKEditorProps {
  name: string;
  control: Control<any>;
}

const CustomCKEditor: React.FC<CustomCKEditorProps> = ({ name, control }) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("upload", file);

    const response = await fetch("/api/upload-img-editor", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const { url } = await response.json();
    return url; // CKEditor requires the URL to be returned in this format
  };

  return (
    <div className="my-4 ckeditor-wrapper">
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        config={{
          toolbar: [
            "Undo",
            "Redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "|",
            "link",
            "bulletedList",
            "numberedList",
            "imageUpload",
            "mediaEmbed",
            "insertTable",
          ],
        }}
        onReady={(editor) => {
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader: any
          ) => {
            return {
              upload: async () => {
                const file = await loader.file;
                const url = await uploadImage(file);
                return { default: url }; // Trả về URL cho CKEditor
              },
            };
          };
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default CustomCKEditor;
