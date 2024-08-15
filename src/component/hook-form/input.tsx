import React from "react";
import { useController, Control } from "react-hook-form";
import { ITmInput } from "./interface/interface";

const TmInput: React.FC<ITmInput> = ({
  name,
  control,
  icon,
  placeholder = "",
  type = "text",
  className,
}) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`p-2 border rounded-md w-full focus-visible:outline-none ${className} ${
            icon && "pl-10"
          } ${error ? "border-red-500" : "border-gray-300"}`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TmInput;
