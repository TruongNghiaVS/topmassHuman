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
  placeholder = "",
  className,
  classNameCustom,
  onChangeValue,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    field.onChange(e.target.value); // Update the form value
    if (onChangeValue) onChangeValue(e.target.value); // Map the value to other components
  };

  return (
    <div className={classNameCustom}>
      <div className="relative flex items-center">
        <label className="block text-gray-700 mb-2">{label}</label>
        {icon && <div className="absolute left-3">{icon}</div>}
        <select
          {...field}
          onChange={handleChange}
          className={`p-2 border rounded-md w-full ${className} ${
            icon && "pl-10"
          }  ${error ? "border-red-500" : "border-gray-300"}`}
        >
          {placeholder.length && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TmSelect;
