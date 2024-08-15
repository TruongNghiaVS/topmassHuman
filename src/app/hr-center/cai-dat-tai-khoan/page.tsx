"use client";
import {
  BoltIcon,
  ClockIcon,
  IdentificationIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ChangePassword from "./setting/change-password";
import UpdateInfomation from "./setting/update-infomation";

export default function SettingAccount() {
  const left = [
    {
      title: "Đổi mật khẩu",
      icon: <ClockIcon className="w-4 mr-2 text-default" />,
      tab: <ChangePassword />,
    },
    {
      title: "Thông tin cá nhân",
      icon: <BoltIcon className="w-4 mr-2 text-default" />,
      tab: <UpdateInfomation />,
    },
    {
      title: "Giấy đăng ký doanh nghiệp",
      icon: <IdentificationIcon className="w-4 mr-2 text-default" />,
      tab: "Giấy đăng ký doanh nghiệp",
    },
    {
      title: "Thông tin công ty",
      icon: <UserCircleIcon className="w-4 mr-2 text-default" />,
      tab: "Thông tin công ty",
    },
  ];
  const [active, setActive] = useState<number>(0);

  return (
    <div className="px-6 py-3 bg-white min-h-screen">
      <div className="grid sm:grid-cols-12 gap-4">
        <div className="col-span-4 p-2 bg-[#F9F6F2]">
          {left.map((item, index) => {
            return (
              <button
                key={item.title}
                onClick={() => setActive(index)}
                className={`flex p-2 rounded items-center w-full ${
                  active === index && "bg-white"
                }`}
              >
                {item.icon} {item.title}
              </button>
            );
          })}
        </div>
        <div className="sm:col-span-8">
          <div className="bg-white p-4 rounded-lg">
            {left[active] && left[active].tab}
          </div>
        </div>
      </div>
    </div>
  );
}
