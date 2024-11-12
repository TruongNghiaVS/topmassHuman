"use client";

import { XCircelFillBootstrapIcon } from "@/theme/icons/xCircelFiilBootstrapIcon";
import { GET_DETAIL_HISTORY_CHANGE_CV } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import { getFileName } from "@/utils/custom-hook";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import useSWR from "swr";

export default function DetailChangeCv({ params }: { params: { id: number } }) {
  const { id } = params;
  const { data: detail, error } = useSWR(
    `${GET_DETAIL_HISTORY_CHANGE_CV}?id=${id}`,
    fetcher
  );

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
      <div className="container mx-auto mt-4 max-1280:px-2">
        <div className="text-2xl">Chi tiết đổi CV</div>
        <div className="mt-4 flex justify-between items-center">
          <div className="font-bold">{detail?.title}</div>
          <div className="">
            Ngày thực hiện: {dayjs(detail?.businessTime).format("DD/MM/YYYY")}
          </div>
          <div className="">
            Trạng thái:{" "}
            {detail?.status === 0 ? (
              <span className="bg-[#FFB3A4] text-[#FF4936] inline-block px-3 py-1 rounded-xl">
                Đang chờ duyệt
              </span>
            ) : detail?.status === 1 ? (
              <span className="bg-[#A9E2FF] text-[#0067CE] inline-block px-3 py-1 rounded-xl">
                Xác thực
              </span>
            ) : (
              <span className="bg-[#E5E5E5] text-[#777777] inline-block px-3 py-1 rounded-xl">
                Từ chối
              </span>
            )}
          </div>
          <div className="flex space-x-1">
            <div>Tia sét nhận được: +{detail?.point} </div>
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
                {detail?.linkCVs.map((row: any, idx: number) => (
                  <tr
                    key={idx}
                    className={`text-center divide-x divide-[#F37A20]`}
                  >
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4 text-left">
                      <div className="mt-1">
                        <div className="text-[#008CFF]">
                          {getFileName(row.linkfile)}
                        </div>
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

                    <td className="p-4">{row.noted}</td>
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
              <div>{detail?.position}</div>
            </div>
            <div className="font-medium text-base">
              <div>Chức vụ</div>
              <div>{detail?.rankName}</div>
            </div>
            <div className="font-medium text-base">
              <div>Năm kinh nghiệm</div>
              <div>{detail?.experienceName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
