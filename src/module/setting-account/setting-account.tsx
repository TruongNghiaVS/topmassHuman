"use client";
import {
  BoltIcon,
  ClockIcon,
  IdentificationIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import useSWR from "swr";
import { GET_CURRENT_USER } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import ChangePassword from "./change-password";
import UpdateInfomation from "./update-infomation";
import BusinessRegistration from "./business-registration";
import InfomationCompany from "./infomation-company";

export default function SettingAccountOverview() {
  const { data: currentUser, error, mutate } = useSWR(
    GET_CURRENT_USER,
    fetcher
  );

  const left = [
    {
      title: "Đổi mật khẩu",
      icon: <ClockIcon className="w-4 mr-2 text-default" />,
      tab: <ChangePassword />,
    },
    {
      title: "Thông tin cá nhân",
      icon: <BoltIcon className="w-4 mr-2 text-default" />,
      tab: <UpdateInfomation currentUser={currentUser} mutate={mutate} />,
    },
    {
      title: "Chứng từ doanh nghiệp",
      icon: <IdentificationIcon className="w-4 mr-2 text-default" />,
      tab: <BusinessRegistration currentUser={currentUser} mutate={mutate} />,
    },
    {
      title: "Thông tin công ty",
      icon: <UserCircleIcon className="w-4 mr-2 text-default" />,
      tab: <InfomationCompany currentUser={currentUser} mutate={mutate} />,
    },
  ];
  const [active, setActive] = useState<number>(0);

  return (
    <div className="px-6 py-3 bg-white min-h-screen">
      <div className="grid sm:grid-cols-12 gap-4">
        <div className="sm:col-span-4 p-2 bg-[#F9F6F2]">
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
        <div className="sm:col-span-8">{left[active] && left[active].tab}</div>
      </div>
    </div>
  );
}
