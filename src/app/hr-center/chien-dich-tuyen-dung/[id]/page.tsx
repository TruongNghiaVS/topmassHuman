"use client";

import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { browsings, campaignDetails, shows } from "@/mockup-data/data";
import {
  ArrowUturnLeftIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function DetailCampaign() {
  const { control } = useForm({
    defaultValues: {
      show: "",
      browsing: "",
    },
  });

  const header = [
    "Tin tuyển dụng",
    "Hoạt động",
    "Tình trạng",
    "Tìm CV",
    "Tên dịch vụ",
    "Thời gian chạy",
  ];

  return (
    <div className="min-h-screen">
      <div className="flex justify-between sm:items-center p-4 sm:flex-row flex-col sm:space-y-0 space-y-2">
        <div className="bg-white flex whitespace-nowrap space-x-4 items-center">
          <Link
            href="/hr-center/chien-dich-tuyen-dung"
            className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
          >
            <ArrowUturnLeftIcon className="w-4 mr-1" />
            Trở vế
          </Link>
          <div>Tuyển dụng MKT tháng 9</div>
        </div>
        <div>
          <div className="flex sm:space-x-2 sm:flex-row flex-col space-y-2 sm:space-y-0">
            <Link
              href="/hr-center/chien-dich-tuyen-dung/tao-moi"
              className="rounded px-4 py-1 bg-[#F37A20] text-white flex"
            >
              <PencilSquareIcon className="w-4 mr-2" /> Tạo tin đăng
            </Link>
            <Link
              href="/hr-center/them-moi-chien-dich"
              className="rounded px-4 py-1 bg-[#F37A20] text-white flex"
            >
              <PlusCircleIcon className="w-4 mr-2" /> Thêm mới chiến dịch
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4 flex sm:space-x-2 sm:flex-row flex-col space-y-2 sm:space-y-0 px-2">
        <TmInput
          name="search"
          classNameCustom="flex-1"
          control={control}
          icon={<MagnifyingGlassIcon className="w-4" />}
          placeholder="Tìm kiếm theo tiêu đề hoặc mã tin"
        />
        <div className="flex-1 flex space-x-2">
          <TmSelect
            classNameCustom="flex-1"
            name="show"
            control={control}
            options={shows}
            placeholder="Tất cả"
          />
          <TmSelect
            classNameCustom="flex-1"
            name="browsing"
            control={control}
            options={browsings}
            placeholder="Tất cả"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="overflow-x-auto col-span-2 mt-2">
          <table className="border-collapse	 min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-100">
              <tr>
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
            <tbody className="divide-y divide-gray-200 text-xs">
              {campaignDetails.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4 text-left">
                    <div>{row.tag}</div>
                    <div className="flex justify-between items-center">
                      {row.name}
                      <Link href="/hr-center/chien-dich-tuyen-dung/1/test">
                        <PencilIcon className="w-6 p-1 rounded-full bg-[#E3E3E3]" />
                      </Link>
                    </div>
                    <div className="inline-block bg-[#DAFFD7] text-[#137F04] px-2 py-1 rounded-lg">
                      Xem cv ứng tuyển
                    </div>
                  </td>
                  <td className="font-normal p-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="check"
                        defaultChecked={row.status}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-[#9A9A9B] peer-focus:outline-none min-w-11 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-500 peer-checked:bg-gradient-to-r peer-checked:from-[#F89E1B] peer-checked:to-[#F37A20]"></div>
                    </label>
                  </td>
                  <td className="p-4 ">
                    <div
                      className={`inline-block px-2 py-1 rounded-xl ${
                        row.status
                          ? "bg-[#DAFFD7] text-[#137F04]"
                          : "bg-[#FFE9E9] text-[#AF0000]"
                      }`}
                    >
                      {row.recruitment_news}
                    </div>
                    {!row.status && <div className="mt-1">Xem lý do</div>}
                  </td>
                  <td className={`p-4`}>
                    <div
                      className={`${
                        row.status &&
                        "inline-block px-4 py-1 rounded text-default border border-[#F37A20]"
                      }`}
                    >
                      {row.search_cv}
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="text default inline-block px-3 py-1 rounded border border-[#F37A20]">
                      {row.service}
                    </div>
                  </td>
                  <td className="p-4 ">{row.date_start}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
