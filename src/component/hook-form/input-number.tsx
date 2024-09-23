import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { ITmInputNumber } from "./interface/interface";

const TmInputNumber: React.FC<ITmInputNumber> = ({
  name,
  control,
  icon,
  placeholder = "",
  className,
  classNameCustom,
  min,
  step = 1,
  max,
}) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const increase = () => {
    let newValue = value !== undefined && !isNaN(value) ? value : 0;
    newValue = newValue + step;
    newValue = max ? Math.min(newValue, max) : newValue;
    onChange(newValue);
  };

  const decrease = () => {
    let newValue = value !== undefined && !isNaN(value) ? value : 0;
    newValue = newValue - step;
    newValue = min ? Math.max(newValue, min) : newValue;
    onChange(newValue);
  };

  return (
    <div className={classNameCustom}>
      <div className="flex items-center relative">
        <button
          type="button"
          onClick={decrease}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-l-md border-r border-gray-300 focus:outline-none absolute left-0 top-0 bottom-0"
        >
          -
        </button>
        <input
          type="number"
          value={
            value && !isNaN(value) ? value.toString() : min && 0 < min ? min : 0
          }
          onChange={onChange}
          min={min}
          max={max}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`p-2 border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-md w-full focus-visible:outline-none px-9 ${className} ${
            icon && "pl-10"
          } ${error ? "border-red-500" : "border-gray-300"}`}
        />
        <button
          type="button"
          onClick={increase}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md border-l border-gray-300 focus:outline-none absolute right-0 top-0 bottom-0"
        >
          +
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TmInputNumber;
