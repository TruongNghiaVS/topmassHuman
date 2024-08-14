import React from "react";
import { useController } from "react-hook-form";
import { ITmRadioProps } from "./interface/interface";

const TmRadio: React.FC<ITmRadioProps> = ({
  name,
  control,
  options,
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
    <div>
      <div className={classNameCustom && classNameCustom}>
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center ">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="form-radio text-blue-600 h-4 w-4"
            />
            <span className="ml-2 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TmRadio;
