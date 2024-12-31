"use client";
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Recruitment } from "./setting/recruitment";
import { SupportContact } from "./setting/support";
import SupportForm from "./setting/support-form";

export default function SettingAndSupportOverview() {
  const left = [
    {
      title: "Yêu cầu hỗ trợ và báo cáo vi phạm",
      icon: <EnvelopeIcon className="w-4 mr-2 text-default" />,
      tab: <SupportForm />,
    },
    {
      title: "Tư vấn tuyển dụng",
      icon: <ChatBubbleLeftRightIcon className="w-4 mr-2 text-default" />,
      tab: <Recruitment />,
    },
    {
      title: "Hotline CSKH & Hỗ trợ dịch vụ",
      icon: <PhoneIcon className="w-4 mr-2 text-default" />,
      tab: <SupportContact />,
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
        <div className="sm:col-span-8">
          <div className="bg-white p-4 rounded-lg">
            {left[active] && left[active].tab}
          </div>
        </div>
      </div>
    </div>
  );
}
