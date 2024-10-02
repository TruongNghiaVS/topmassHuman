// components/SearchSelect.tsx
"use client";
import React, { useState } from "react";
import { useController } from "react-hook-form";
import { Option, SearchSelectProps } from "./interface/interface";

const CustomSelectSearchForm: React.FC<SearchSelectProps> = ({
  name,
  control,
  options,
  placeholder = "",
  customSelect,
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
    onChange(option.value);
    setIsOpen(false);
    if (customSelect) {
      customSelect();
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 border rounded-md cursor-pointer bg-white ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {value !== "" && value > -1 ? (
          <span>{options.find((opt) => opt.value === value)?.label}</span>
        ) : (
          <span className="">{placeholder}</span>
        )}
      </div>
      {isOpen && (
        <div className="relative mt-1">
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border rounded-md w-full focus-visible:outline-none"
              placeholder="Search..."
            />
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">Không có dữ liệu phù hợp</li>
            )}
          </ul>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default CustomSelectSearchForm;
