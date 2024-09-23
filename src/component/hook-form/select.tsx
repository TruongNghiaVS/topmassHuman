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
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    field.onChange(selectedValue); // Update React Hook Form state
    if (rest.onChange) {
      rest.onChange(event); // Call the custom onChange handler
    }
  };

  const getValue = (value: any) => {
    return typeof value === "string" ? "" : -1;
  };

  return (
    <div className={classNameCustom}>
      <div className="relative flex items-center">
        <label className="block text-gray-700 mb-2">{label}</label>
        {icon && <div className="absolute left-3">{icon}</div>}
        <select
          {...field}
          {...rest}
          onChange={handleChange}
          className={`px-2 py-2.5 border rounded-md w-full ${className} ${
            icon && "pl-10"
          }  ${error ? "border-red-500" : "border-gray-300"}`}
        >
          {placeholder.length && (
            <option value={getValue(field.value)} disabled>
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
