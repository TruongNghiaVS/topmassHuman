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

  return (
    <div className="my-4">
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
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
