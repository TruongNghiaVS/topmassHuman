"use client";

import TmInput from "@/component/hook-form/input";
import { IHistoryProps } from "@/interface/interface";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

export const HistoryView = ({ title, historys }: IHistoryProps) => {
  const { control } = useForm();

  return (
    <div>
      <div>
        <div className="sm:flex mb-4 justify-between items-center">
          <div>{title}</div>
          <div className="flex space-x-2">
            <TmInput name="from_date" control={control} type="date" />
            <TmInput name="to_date" control={control} type="date" />
          </div>
        </div>
        <div className="py-2">
          {historys?.map((item, idx) => {
            return (
              <div className="flex mb-6" key={idx}>
                <div className="mr-3">{item.groupDate}</div>
                <div>
                  <ul className="space-y-4 text-gray-500 list-disc list-inside [&>li:not(:last-child)]:after:absolute [&>li:not(:last-child)]:after:left-0 [&>li:not(:last-child)]:after:top-[100%] [&>li:not(:last-child)]:after:w-0.5 [&>li:not(:last-child)]:after:h-4 [&>li:not(:last-child)]:after:bg-[#E5E5E5]">
                    {item.data.map((history, index) => {
                      return (
                        <li className="relative" key={index}>
                          <span className="p-1 rounded-lg bg-[#F9DCB9] text-default mr-2 ">
                            {dayjs(history.timeBusiness).format("HH:mm")}
                          </span>
                          {history.content}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
