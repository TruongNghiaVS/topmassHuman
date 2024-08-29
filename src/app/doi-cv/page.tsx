"use client";

import Link from "next/link";
import { PopupChangeCv } from "./popup-change-cv";
import { useState } from "react";

export default function ChangeCv() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const header = [
    "Lịch sử đổi CV",
    "Ngày đổi CV",
    "Trạng Thái",
    "Tia sét nhận được",
    "Thao tác",
  ];

  const data = [
    {
      name: "Chăm sóc khách hàng",
      id: 1,
      date: "23/08/2024",
      status: 0,
    },
    {
      name: "Nhân viên tư vấn",
      id: 2,
      date: "23/08/2024",
      status: 1,
    },
    {
      name: "Nhân viên tư vấn",
      id: 3,
      date: "23/08/2024",
      status: 2,
    },
    {
      name: "Chăm sóc khách hàng",
      id: 4,
      date: "23/08/2024",
      status: 1,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto container">
        <div className="flex justify-between items-center mt-4">
          <div className="font-bold">Lịch sử đổi CV</div>
          <button
            className="bg-[#F37A20] text-white px-4 py-2 rounded-lg"
            onClick={() => setIsOpen(true)}
          >
            Đổi CV ngay
          </button>
        </div>
        <div className="mt-4">
          <div className="overflow-x-auto col-span-2 mt-2">
            <table className="border-collapse	 min-w-full text-sm text-left bg-white">
              <thead className="bg-[#F89E1B] text-white ">
                <tr className="divide-x divide-white">
                  {header.map((item) => {
                    return (
                      <th
                        key={item}
                        className="p-4 text-center whitespace-nowrap font-medium uppercase sm:min-w-fit min-w-[200px]"
                      >
                        {item}{" "}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-white text-xs bg-[#FFF6CF]">
                {data.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`text-center divide-x divide-white`}
                  >
                    <td className="p-4 text-left">
                      <div className="mt-1">
                        <div className="flex lg:justify-between items-center lg:flex-row flex-col">
                          <div className="text-[#008CFF]">{row.name}</div>
                          <div className="text-[#008CFF] px-3 py-1  mt-1 rounded-xl">
                            <Link href={`/doi-cv/${row.id}`}>Xem chi tiết</Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-normal p-4">{row.date}</td>
                    <td className="p-4 ">
                      {row.status === 0 ? (
                        <div className="bg-[#FFB3A4] text-[#FF4936] inline-block px-3 py-1 rounded-xl">
                          Chờ xác thực
                        </div>
                      ) : row.status === 1 ? (
                        <div className="bg-[#A9E2FF] text-[#0067CE] inline-block px-3 py-1 rounded-xl">
                          Đã xác thưc
                        </div>
                      ) : (
                        <div className="bg-[#E5E5E5] text-[#777777] inline-block px-3 py-1 rounded-xl">
                          Đã huỷ
                        </div>
                      )}
                    </td>
                    <td className="p-4 ">
                      <div className="inline-flex">
                        <div className="mr-2">
                          {row.status === 1 ? "+20" : "- -"}
                        </div>
                        <img src="/imgs/arrow.svg" alt="" className="w-3" />
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        className={
                          row.status === 1 || row.status === 0
                            ? "text-[#FF4936]"
                            : "text-[#777777]"
                        }
                        disabled={row.status !== 0 && row.status !== 1}
                      >
                        Huỷ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PopupChangeCv isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
