"use client";

import React from "react";
import { useTable, Column } from "react-table";

type LibraryItem = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
};

type LibraryTableProps = {
  data: LibraryItem[];
};

const LibraryTable: React.FC<LibraryTableProps> = ({ data }) => {
  const columns = React.useMemo<Column<LibraryItem>[]>(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Genre",
        accessor: "genre",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-2 px-4 border-b text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-2 px-4 border-b">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LibraryTable;
