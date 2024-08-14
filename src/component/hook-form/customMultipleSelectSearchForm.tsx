// components/SearchSelect.tsx
"use client";
import React, { useRef, useState } from "react";
import { useController } from "react-hook-form";
import { SearchSelectProps } from "./interface/interface";
import { CheckIcon } from "@heroicons/react/16/solid";

interface Option {
  value: string;
  label: string;
}

const CustomMultipleSelectSearchForm: React.FC<SearchSelectProps> = ({
  name,
  control,
  options,
  placeholder = "Search...",
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleSelect = (option: Option) => {
    if (!value.includes(option.value)) {
      onChange([...value, option.value]);
    } else {
      onChange(value.filter((v: string) => v !== option.value));
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleParentClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <div
          className="mt-2 flex flex-wrap space-x-1 space-y-1 border p-1 bg-white rounded-lg items-center cursor-text	hover:border hover:border-[#F37A20]"
          onClick={() => {
            setIsOpen(!isOpen);
            handleParentClick();
          }}
        >
          {value.map((val: string) => {
            const selectedOption = options.find(
              (option) => option.value === val
            );
            return (
              <span
                key={val}
                className="p-2 bg-[#F37A20] text-white rounded-md flex items-center"
              >
                {selectedOption?.label}
                <button
                  type="button"
                  onClick={() => handleSelect(selectedOption!)}
                  className="ml-2 text-white"
                >
                  &times;
                </button>
              </span>
            );
          })}
          <input
            type="text"
            value={search}
            ref={inputRef}
            onChange={(e) => setSearch(e.target.value)}
            className={`py-2 focus-visible:outline-none ${
              value.length === 0 && "w-full"
            }`}
            placeholder={value.length > 0 ? "" : placeholder}
          />
        </div>
        {isOpen && (
          <ul className="absolute top-[100%] z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => (handleSelect(option), setIsOpen(false))}
                  className={`cursor-pointer p-2 hover:text-default flex items-center justify-between ${
                    value.includes(option.value) ? "text-default" : ""
                  }`}
                >
                  {option.label}
                  {value.includes(option.value) && (
                    <CheckIcon className="w-4" />
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options found</li>
            )}
          </ul>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default CustomMultipleSelectSearchForm;
