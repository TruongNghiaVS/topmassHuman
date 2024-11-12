import React from "react";
import numeral from "numeral";
import { ITmInput } from "./interface/interface";
import { useController } from "react-hook-form";

const TmInputNumber: React.FC<ITmInput> = ({
  value,
  name,
  control,
  label,
  afterIcon,
  icon,
  className,
  ...rest
}) => {
  // Handle formatting and unformatting with Numeral.js
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value;
    const numericValue = numeral(formattedValue).value();
    if (numericValue !== null) {
      field.onChange(numericValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers and specific keys (like backspace, delete, etc.)
    if (
      !/^\d$/.test(e.key) && // Allow digits 0-9
      e.key !== "Backspace" && // Allow Backspace
      e.key !== "Delete" && // Allow Delete
      e.key !== "ArrowLeft" && // Allow left arrow
      e.key !== "ArrowRight" && // Allow right arrow
      e.key !== "Tab" // Allow Tab for navigation
    ) {
      e.preventDefault(); // Prevent any non-numeric input
    }
  };

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const increase = () => {
    let numValue = numeral(field.value).value();
    if (numValue !== null) {
      numValue = rest.step ? numValue + +rest.step : numValue;
      numValue = rest.max ? Math.min(numValue, +rest.max) : numValue;
    }
    field.onChange(numValue);
  };

  const decrease = () => {
    let numValue = numeral(field.value).value();
    if (numValue !== null) {
      numValue = rest.step ? numValue - +rest.step : numValue;
      numValue = rest.min ? Math.max(numValue, +rest.min) : numValue;
    }
    field.onChange(numValue);
  };

  return (
    <div className={`relative ${rest.step && "px-8"}`}>
      {rest.step ? (
        <button
          type="button"
          onClick={decrease}
          className="w-[39px] h-[39px] bg-gray-200 text-gray-700 rounded-l-md border-r border-gray-300 focus:outline-none absolute left-0 top-0 bottom-0"
        >
          -
        </button>
      ) : (
        ""
      )}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3">{icon}</div>}
        <input
          type="text"
          {...field}
          {...rest}
          value={numeral(field.value).format("0,0")}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`p-2 border ${
            !rest.step && "rounded-md"
          } w-full focus-visible:outline-none ${className} ${icon && "pl-10"} ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {afterIcon && <div className="absolute right-1">{afterIcon}</div>}
      </div>
      {rest.step ? (
        <button
          type="button"
          onClick={increase}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md border-l border-gray-300 focus:outline-none absolute right-0 top-0 bottom-0"
        >
          +
        </button>
      ) : (
        ""
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TmInputNumber;
