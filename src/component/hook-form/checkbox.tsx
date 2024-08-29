// components/CustomCheckbox.tsx
import React from "react";
import { useController } from "react-hook-form";
import { ITmCheckBox } from "./interface/interface";

const TmCheckbox: React.FC<ITmCheckBox> = ({ name, control, label }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className={`form-checkbox h-5 w-5 text-blue-600 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <span className="ml-2 text-gray-700">{label}</span>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TmCheckbox;
