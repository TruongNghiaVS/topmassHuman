// components/CustomSelect.tsx
import React from "react";
import { useController } from "react-hook-form";
import { ITmSelect } from "./interface/interface";

const TmSelect: React.FC<ITmSelect> = ({
  name,
  control,
  label,
  icon,
  options,
  placeholder = "Select an option...",
  className,
  classNameCustom,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={classNameCustom}>
      <div className="relative flex items-center">
        <label className="block text-gray-700 mb-2">{label}</label>
        {icon && <div className="absolute left-3">{icon}</div>}
        <select
          value={value}
          onChange={onChange}
          className={`p-2 border rounded-md w-full ${className} ${
            icon && "pl-10"
          }  ${error ? "border-red-500" : "border-gray-300"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    </div>
  );
};

export default TmSelect;
