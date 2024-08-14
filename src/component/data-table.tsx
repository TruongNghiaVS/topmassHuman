"use client";

import { useState } from "react";

interface RowData {
  id: number;
  name: string;
  email: string;
}

interface CustomTableProps {
  data: RowData[];
  header: string[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data, header }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
    if (selectedRows.length + 1 == data.length) setSelectAll(true);
    if (selectedRows.length - 1 == 0) setSelectAll(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="cursor-pointer"
              />
            </th>
            {header.map((item) => {
              return (
                <th key={item} className="p-4">
                  {item}{" "}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr
              key={row.id}
              className={`hover:bg-gray-100 ${
                selectedRows.includes(row.id) ? "bg-blue-50" : "bg-white"
              }`}
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                  className="cursor-pointer"
                />
              </td>
              <td className="p-4">{row.name}</td>
              <td className="p-4">{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
