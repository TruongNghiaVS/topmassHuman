import React from "react";
import { useController, Control } from "react-hook-form";
import { ITmTextareaProps } from "./interface/interface";

const TmTextArea: React.FC<ITmTextareaProps> = ({
  name,
  control,
  label,
  placeholder = "",
  rows = 4,
}) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        className={`p-2 border rounded-md w-full resize-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TmTextArea;
