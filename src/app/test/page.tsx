"use client";
import { useState, ChangeEvent } from "react";

export default function NumberInput() {
  const [value, setValue] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(isNaN(newValue) ? 0 : newValue);
  };

  const increment = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    setValue((prevValue) => Math.max(0, prevValue - 1)); // Prevent negative numbers
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={decrement}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-16 text-center border border-gray-300 rounded"
      />
      <button
        type="button"
        onClick={increment}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}
