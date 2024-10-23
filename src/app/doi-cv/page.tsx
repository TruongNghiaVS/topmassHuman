"use client";

import Link from "next/link";
import { PopupChangeCv } from "./popup-change-cv";
import { useState } from "react";
import useSWR from "swr";
import { GET_HISTORY_CHANGE_CV } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import dayjs from "dayjs";
import Modal from "@/component/modal";
import { PopupCancleChangeCV } from "./popup-cancle";

export default function ChangeCv() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModalCancle, setIsOpenModalCancle] = useState<boolean>(false);
  const [idCancle, setIdCancle] = useState(0);
  const header = [
    "Lịch sử đổi CV",
    "Ngày đổi CV",
    "Trạng Thái",
    "Tia sét nhận được",
    "Thao tác",
  ];

  const { data: historyCv, error, mutate } = useSWR(
    `${GET_HISTORY_CHANGE_CV}?status=-1`,
    fetcher
  );

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
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-white text-xs bg-[#FFF6CF]">
                {historyCv?.map((row: any, idx: number) => (
                  <tr key={idx} className={`text-center divide-x divide-white`}>
                    <td className="p-4 text-left">
                      <div className="mt-1">
                        <div className="flex lg:justify-between items-center lg:flex-row flex-col">
                          <div className="text-[#008CFF]">{row.title}</div>
                          <div className="text-[#008CFF] px-3 py-1  mt-1 rounded-xl">
                            <Link href={`/doi-cv/${row.id}`}>Xem chi tiết</Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-normal p-4">
                      {dayjs(row.businessTime).format("DD/MM/YYYY")}
                    </td>
                    <td className="p-4 ">
                      {row.status === 0 ? (
                        <div className="bg-[#FFB3A4] text-[#FF4936] inline-block px-3 py-1 rounded-xl">
                          {row.statusName}
                        </div>
                      ) : row.status === 1 ? (
                        <div className="bg-[#A9E2FF] text-[#0067CE] inline-block px-3 py-1 rounded-xl">
                          {row.statusName}
                        </div>
                      ) : (
                        <div className="bg-[#E5E5E5] text-[#777777] inline-block px-3 py-1 rounded-xl">
                          {row.statusName}
                        </div>
                      )}
                    </td>
                    <td className="p-4 ">
                      <div className="inline-flex">
                        <div className="mr-2">
                          {row.status === 1 ? `+${row.point}` : "- -"}
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
                        onClick={() => {
                          setIdCancle(row.id);
                          setIsOpenModalCancle(true);
                        }}
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
      <PopupChangeCv
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mutate={mutate}
      />

      <PopupCancleChangeCV
        isOpen={isOpenModalCancle}
        onClose={() => setIsOpenModalCancle(false)}
        mutate={mutate}
        id={idCancle}
      />
    </div>
  );
}
