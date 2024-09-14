"use client";

import { INotification } from "@/interface/interface";
import { GET_ALL_NOTIFICATION } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Notification() {
  const [notification, setNotification] = useState<INotification[]>([]);

  const { data: listNotification, error } = useSWR(
    `${GET_ALL_NOTIFICATION}?status=-1`,
    fetcher
  );

  useEffect(() => {
    if (listNotification) {
      setNotification(listNotification.data);
    }
  }, [listNotification, setNotification]);

  return (
    <div>
      <div className="p-4 bg-white">Thông báo từ hệ thống</div>
      <div className="m-6">
        {notification.map((item) => {
          return (
            <div key={item.title} className="bg-white">
              <Link
                href={`/hr-center/thong-bao/chi-tiet-thong-bao/${item.relId}`}
              >
                <div className="flex space-x-2 border-b items-center px-6 py-3">
                  <div className="px-3 py-1 rounded-lg bg-[#FFF5D9] text-[#FFB600]">
                    Thông báo
                  </div>
                  <div>{dayjs(item.createAt).format("DD-MM-YYYY")}</div>
                  <div>{item.title}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
