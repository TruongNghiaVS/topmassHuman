"use client";

import { XCircelFillBootstrapIcon } from "@/theme/icons/xCircelFiilBootstrapIcon";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { PopupChangeCv } from "../popup-change-cv";
import { useState } from "react";

export default function DetailChangeCv() {
  const header = ["STT", "File CV", "Tình trạng", "Lý do từ chối"];

  const data = [
    {
      id: 1,
      cv_name: "HoangThai_IT.PDF",
      status: 1,
      reason: "",
    },
    {
      id: 2,
      cv_name: "HoangThai_IT.PDF",
      status: 1,
      reason: "",
    },
    {
      id: 3,
      cv_name: "HoangThai_IT.PDF",
      status: 2,
      reason: "Trùng Data (Đổi CV 007 ngày 25/8/2024)",
    },
    {
      id: 4,
      cv_name: "HoangThai_IT.PDF",
      status: 2,
      reason: "Số điện thoại không liên lạc được",
    },
    {
      id: 5,
      cv_name: "HoangThai_IT.PDF",
      status: 2,
      reason: "Không có thông tin liên hệ",
    },
    {
      id: 1,
      cv_name: "HoangThai_IT.PDF",
      status: 2,
      reason: "File bị lỗi!",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto mt-4">
        <div className="text-2xl">Chi tiết đổi CV</div>
        <div className="mt-4 flex justify-between items-center">
          <div className="">Đổi CV 001</div>
          <div className="">Ngày thực hiện: 24/08/2024</div>
          <div className="">
            Trạng thái:{" "}
            <span className="px-2 py-1 rounded-2xl bg-[#A9E2FF] text-[#0067CE]">
              Đã xác thực
            </span>
          </div>
          <div className="flex space-x-1">
            <div>Tia sét nhận được: +20 </div>
            <img src="/imgs/arrow_blue.svg" alt="" className="w-3" />
          </div>
        </div>
        <div className="mt-4">
          <div className="overflow-x-auto col-span-2 mt-2">
            <table className="border-collapse	 min-w-full text-sm text-left bg-white border border-[#F37A20]">
              <thead className="border-b border-[#F37A20]">
                <tr className="divide-x divide-[#F37A20]">
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
              <tbody className="divide-y divide-[#F37A20] text-xs ">
                {data.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`text-center divide-x divide-[#F37A20]`}
                  >
                    <td className="p-4">{row.id}</td>
                    <td className="p-4 text-left">
                      <div className="mt-1">
                        <div className="text-[#008CFF]">{row.cv_name}</div>
                      </div>
                    </td>
                    <td className="p-4 ">
                      {row.status === 1 ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="w-4 text-[#0067CE]" />
                          <div className="text-[#0067CE]">Đã xác thực</div>
                        </div>
                      ) : (
                        <div className=" flex items-center space-x-2 ">
                          <XCircelFillBootstrapIcon className="w-4 text-[#D60000]" />
                          <div className="text-[#D60000]">Đã từ chối</div>
                        </div>
                      )}
                    </td>

                    <td className="p-4">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-3 px-4">
            <div className="font-medium text-base">
              <div>Vị trí ứng tuyển</div>
              <div>Nhân viên kinh doanh</div>
            </div>
            <div className="font-medium text-base">
              <div>Chức vụ</div>
              <div>Nhân viên</div>
            </div>
            <div className="font-medium text-base">
              <div>Năm kinh nghiệm</div>
              <div>2 - 3 năm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
