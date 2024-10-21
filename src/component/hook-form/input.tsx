import React from "react";
import { useController } from "react-hook-form";
import { ITmInput } from "./interface/interface";

const TmInput: React.FC<ITmInput> = ({
  name,
  control,
  icon,
  afterIcon,
  placeholder = "",
  type = "text",
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

  return (
    <div className={classNameCustom}>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3">{icon}</div>}
        <input
          type={type}
          {...field}
          {...rest}
          placeholder={placeholder}
          className={`px-2 py-[9px] border rounded-md w-full focus-visible:outline-none ${className} ${
            icon && "pl-10"
          } ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {afterIcon && <div className="absolute right-2">{afterIcon}</div>}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TmInput;
