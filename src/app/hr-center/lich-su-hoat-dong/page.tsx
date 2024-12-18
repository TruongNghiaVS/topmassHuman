"use client";
import TmInput from "@/component/hook-form/input";
import { HISTORY_LOGIN, HISTORY_UPDATE } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import { ClockIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { HistoryView } from "./history-view";
import { convertParams } from "@/utils/custom-hook";
import dayjs from "dayjs";

export default function ActivityHistory() {
  const [active, setActive] = useState<number>(0);
  const [filterLogin, setFilterLogin] = useState({
    From: dayjs().format("YYYY-MM-DD"),
    To: dayjs().format("YYYY-MM-DD"),
  });
  const [filterUpdate, setFilterUpdate] = useState({
    From: dayjs().format("YYYY-MM-DD"),
    To: dayjs().format("YYYY-MM-DD"),
  });
  const { control } = useForm();

  const { data: historyLogin } = useSWR(
    `${HISTORY_LOGIN}?${convertParams(filterLogin)}`,
    fetcher
  );
  const { data: historyUpdate } = useSWR(
    `${HISTORY_UPDATE}?${convertParams(filterUpdate)}`,
    fetcher
  );

  return (
    <div className="px-6 py-3 bg-white min-h-screen">
      <div className="grid sm:grid-cols-12 sm:gap-4">
        <div className="col-span-4 p-2 bg-[#F9F6F2]">
          <button
            onClick={() => setActive(0)}
            className={`flex p-2 rounded items-center w-full ${
              active === 0 && "bg-white"
            }`}
          >
            <ClockIcon className="w-4 mr-2 text-default" /> Lịch sử truy cập
          </button>
          {/* <button
            onClick={() => setActive(1)}
            className={`flex p-2 rounded items-center w-full ${
              active === 1 && "bg-white"
            }`}
          >
            <BoltIcon className="w-4 mr-2 text-default" /> Lịch sử kích hoạt
            dịch vụ
          </button>
          <button
            onClick={() => setActive(2)}
            className={`flex p-2 rounded items-center w-full ${
              active === 2 && "bg-white"
            }`}
          >
            <IdentificationIcon className="w-4 mr-2 text-default" /> Lịch sử
            dùng điểm
          </button> */}
          <button
            onClick={() => setActive(3)}
            className={`flex p-2 rounded items-center w-full ${
              active === 3 && "bg-white"
            }`}
          >
            <UserCircleIcon className="w-4 mr-2 text-default" /> Cập nhật tài
            khoản
          </button>
        </div>
        <div className="sm:col-span-8">
          <div className="bg-white p-4 rounded-lg">
            {active === 0 && (
              <div>
                <HistoryView
                  title="Tất cả lịch sử"
                  historys={historyLogin?.data}
                  filter={filterLogin}
                  setFilter={setFilterLogin}
                />
              </div>
            )}
            {active === 1 && (
              <div>
                <div className="sm:flex mb-4 justify-between items-center">
                  <div>Lịch sử kích hoạt dịch vụ</div>
                  <div className="flex space-x-2">
                    <TmInput name="from_date" control={control} type="date" />
                    <TmInput name="to_date" control={control} type="date" />
                  </div>
                </div>
                <div className="py-2">
                  <div className="flex mb-6">
                    <div className="mr-3">06/08/2024</div>
                    <div>
                      <ul className="space-y-4 text-gray-500 list-disc list-inside [&>li:not(:last-child)]:after:absolute [&>li:not(:last-child)]:after:left-0 [&>li:not(:last-child)]:after:top-[100%] [&>li:not(:last-child)]:after:w-0.5 [&>li:not(:last-child)]:after:h-4 [&>li:not(:last-child)]:after:bg-[#E5E5E5]">
                        <li className="relative">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2 ">
                            09:00
                          </span>
                          Đăng nhập
                        </li>
                        <li className="relative">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2">
                            16:00
                          </span>
                          Đăng nhập
                        </li>
                        <li className="relative">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2">
                            16:00
                          </span>
                          Đăng nhập
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="mr-3">06/08/2024</div>
                    <div>
                      <ul className="space-y-4 text-gray-500 list-disc list-inside [&>li:not(:last-child)]:after:absolute [&>li:not(:last-child)]:after:left-0 [&>li:not(:last-child)]:after:top-[100%] [&>li:not(:last-child)]:after:w-0.5 [&>li:not(:last-child)]:after:h-4 [&>li:not(:last-child)]:after:bg-[#E5E5E5]">
                        <li className="relative ">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2 ">
                            09:00
                          </span>
                          Đăng nhập
                        </li>
                        <li className="relative">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2">
                            16:00
                          </span>
                          Đăng nhập
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {active === 2 && (
              <div>
                <div className="sm:flex mb-4 justify-between items-center">
                  <div>Lịch sử dùng điểm</div>
                  <div className="flex space-x-2">
                    <TmInput name="from_date" control={control} type="date" />
                    <TmInput name="to_date" control={control} type="date" />
                  </div>
                </div>
                <div className="py-2">
                  <div className="flex mb-6">
                    <div className="mr-3">06/08/2024</div>
                    <div>
                      <ul className="space-y-4 text-gray-500 list-disc list-inside [&>li:not(:last-child)]:after:absolute [&>li:not(:last-child)]:after:left-0 [&>li:not(:last-child)]:after:top-[100%] [&>li:not(:last-child)]:after:w-0.5 [&>li:not(:last-child)]:after:h-4 [&>li:not(:last-child)]:after:bg-[#E5E5E5]">
                        <li className="relative">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2 ">
                            09:00
                          </span>
                          Đăng nhập
                        </li>
                        <li className="relative">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2">
                            16:00
                          </span>
                          Đăng nhập
                        </li>
                        <li className="relative">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2">
                            16:00
                          </span>
                          Đăng nhập
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="mr-3">06/08/2024</div>
                    <div>
                      <ul className="space-y-4 text-gray-500 list-disc list-inside [&>li:not(:last-child)]:after:absolute [&>li:not(:last-child)]:after:left-0 [&>li:not(:last-child)]:after:top-[100%] [&>li:not(:last-child)]:after:w-0.5 [&>li:not(:last-child)]:after:h-4 [&>li:not(:last-child)]:after:bg-[#E5E5E5]">
                        <li className="relative ">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2 ">
                            09:00
                          </span>
                          Đăng nhập
                        </li>
                        <li className="relative">
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2">
                            16:00
                          </span>
                          Đăng nhập
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {active === 3 && (
              <div>
                <HistoryView
                  title="Cập nhật tài khoản"
                  historys={historyUpdate?.data}
                  filter={filterUpdate}
                  setFilter={setFilterUpdate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
