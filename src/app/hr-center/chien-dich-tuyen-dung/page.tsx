"use client";
import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { campaigns, dataBill, optionCampaigns } from "@/mockup-data/data";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RecruimentCampaign() {
  const { control } = useForm({
    defaultValues: {
      campaign: "",
    },
  });

  const header = [
    "Tên chiến dịch",
    "Hoạt động",
    "Tin tuyển dụng",
    "Tìm CV",
    "Thời gian tạo",
  ];

  return (
    <div className="">
      <div className="flex justify-between sm:items-center p-4 sm:flex-row flex-col  border-b">
        <div>Quản lý chiến dịch tuyển dụng</div>
        <div className="flex sm:space-x-2 sm:flex-row flex-col space-y-2 sm:space-y-0">
          <Link
            href="/hr-center/chien-dich-tuyen-dung/tao-moi"
            className="rounded px-4 py-1 bg-[#F37A20] text-white flex"
          >
            <PencilSquareIcon className="w-4 mr-2" /> Tạo tin đăng
          </Link>
          <Link
            href="/hr-center/chien-dich-tuyen-dung/them-moi-chien-dich"
            className="rounded px-4 py-1 bg-[#F37A20] text-white flex"
          >
            <PlusCircleIcon className="w-4 mr-2" /> Thêm mới chiến dịch
          </Link>
        </div>
      </div>
      <div className="mt-4 px-2 sm:space-x-2 sm:items-center sm:flex-row flex-col space-y-2 sm:space-y-0 flex">
        <TmSelect
          name="campaign"
          control={control}
          placeholder="Tất cả chiến dịch"
          options={optionCampaigns}
        />
        <TmInput
          className="flex-1"
          name="search"
          classNameCustom="flex-1 "
          control={control}
          placeholder="Tìm kiếm chiến dịch"
          icon={<MagnifyingGlassIcon className="w-4" />}
        />
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
              {campaigns.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4">
                    <div>
                      <Link href="/hr-center/chien-dich-tuyen-dung/1">
                        {row.name}
                      </Link>
                    </div>
                    <div>Tin tuyển dụng</div>
                    <div>Xem CV ứng tuyển</div>
                    <div>Sửa tên chiến dịch</div>
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
                      <span className="ms-3 t ext-sm font-medium text-[#555555]">
                        {row.status
                          ? "Chiến dịch đang chạy"
                          : " Chiến dịch đang tắt"}
                      </span>
                    </label>
                  </td>
                  <td className="p-4 ">
                    <div
                      className={`${
                        row.status &&
                        "inline-block px-2 py-1 rounded-xl text-[#C65000] bg-[#FFE39C]"
                      }`}
                    >
                      {row.recruitment_news}
                    </div>
                  </td>
                  <td className={`p-4`}>
                    <div
                      className={`${
                        row.status &&
                        "inline-block px-4 py-1 rounded-xl text-default border border-[#F37A20]"
                      }`}
                    >
                      {row.search_cv}
                    </div>
                  </td>
                  <td className="p-4 ">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
