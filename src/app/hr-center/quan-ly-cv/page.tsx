"use client";

import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { WechatBootstrapIcon } from "@/theme/icons/wechatBootstrapIcon";
import {
  EllipsisHorizontalCircleIcon,
  PhoneIcon,
  ShoppingBagIcon,
} from "@heroicons/react/16/solid";
import { ClockIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";

const options = [
  {
    value: "test",
    label: "test",
  },
];

export default function ManagerCV() {
  const { control } = useForm({
    defaultValues: {
      key: "",
      recruitment: "",
      status: "",
      cv: "",
      search: "",
      test: "",
    },
  });

  const header = [
    "Ứng viên",
    "Chiến dịch",
    "Thông tin liên hệ",
    "Insights",
    "Trạng thái",
  ];

  const data = [
    {
      name: "Trần Ngọc Phú",
      campaign: "Hỗ trợ Cv cho ứng viên",
      tag: "123345",
      email: "test@gmail.com",
      phone: "0345678012",
      status: "Phù hợp",
    },
    {
      name: "Trần Ngọc Phú 1",
      campaign: "Hỗ trợ Cv cho ứng viên",
      tag: "123345",
      email: "test@gmail.com",
      phone: "0345678012",
      status: "Phù hợp",
    },
    {
      name: "Trần Ngọc Phú 2",
      campaign: "Hỗ trợ Cv cho ứng viên",
      tag: "123345",
      email: "test@gmail.com",
      phone: "0345678012",
      status: "Phù hợp",
    },
  ];

  return (
    <div className="px-6 py-3 ">
      <div className="text-base font-normal">Quản lý cv ứng viên</div>
      <div className="mt-4 p-2 bg-white border rounded">
        <div className="flex space-x-2">
          <div className="flex-1">
            <TmInput
              className="w-full"
              name="key"
              control={control}
              placeholder="Tìm kiếm tên,Email,Số điện thoại"
            />
          </div>
          <div className="flex-1">
            <TmSelect
              className="w-full"
              name="recruitment"
              control={control}
              options={options}
              placeholder="Chọn chiến dịch tuyển dụng"
            />
          </div>
          <div className="flex-1">
            <TmSelect
              className="w-full"
              name="status"
              control={control}
              options={options}
              placeholder="Trạng thái"
            />
          </div>
          <div className="flex-1">
            <TmSelect
              className="w-full"
              name="cv"
              control={control}
              options={options}
              placeholder="Nguồn cv"
            />
          </div>
          <div className="flex-1">
            <TmSelect
              className="w-full"
              name="test"
              control={control}
              options={options}
              placeholder="Tất cả nhãn"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items center">
        <div className="flex items-center">
          Tìm thấy <span className="text-default mx-1">201</span> ứng viên
        </div>
        <TmSelect
          name="search"
          control={control}
          options={options}
          placeholder="Hiển thị tất cả"
        />
      </div>
      <div className="mt-4 bg-white">
        <div className="overflow-x-auto ">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {header.map((item) => {
                  return (
                    <th
                      key={item}
                      className="p-4 whitespace-nowrap lg:min-w-fit sm:min-w-fit min-w-[200px] font-medium uppercase"
                    >
                      {item}{" "}
                    </th>
                  );
                })}
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row) => (
                <tr key={row.name} className={` `}>
                  <td className="p-4">
                    <div className="flex space-x-2 items-center">
                      <img
                        src="/imgs/logo-work.png"
                        alt=""
                        className="w-10 rounded-full"
                      />
                      <div>
                        <div className="font-normal line-clamp-3">
                          {row.name}
                        </div>
                        <div className="text-xs inline-block p-1 rounded bg-[#F5F8FA]">
                          Đã xem
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="line-clamp-1">{row.campaign}</div>
                    <div className="text-xs inline-block p-1 rounded bg-[#F5F8FA]">
                      #{row.tag}
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="flex">
                      <EnvelopeIcon className="w-4 mr-2" /> {row.email}
                    </div>
                    <div className="flex mt-1">
                      <PhoneIcon className="w-5 px-1 rounded-full border mr-2" />
                      {row.phone}
                    </div>
                    <div className="flex text-[#42B155] mt-1">
                      <WechatBootstrapIcon className="w-4 mr-2 text-[#42B155]" />
                      Chat với ứng viên
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="flex mt-1">
                      <ShoppingBagIcon className="w-4 mr-2" />
                      CV đề xuất
                    </div>
                    <div className="flex mt-1">
                      <ClockIcon className="w-4 mr-2" />
                      14/08/2024 15:45
                    </div>
                  </td>
                  <td>
                    <div className="text-center rounded-lg px-4 py-1 bg-[#FFFAF5] text-[#FFA24F]">
                      Phù hợp
                    </div>
                  </td>
                  <td className="min-w-[30px] ">
                    <div className="grid h-full justify-center items-center">
                      <EllipsisHorizontalCircleIcon className="w-4" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
