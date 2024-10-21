"use client";

import { useLoading } from "@/app/context/loading";
import { INotification } from "@/interface/interface";
import { GET_ALL_NOTIFICATION, UPDATE_NOTIFICATION } from "@/utils/api-url";
import axiosInstance, { fetcher } from "@/utils/axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { MouseEvent } from "react";
import { toast } from "react-toastify";

export default function Notification() {
  const [notification, setNotification] = useState<INotification[]>([]);
  const { setLoading } = useLoading();
  const { data: listNotification, error } = useSWR(
    `${GET_ALL_NOTIFICATION}?status=-1`,
    fetcher
  );

  useEffect(() => {
    if (listNotification) {
      setNotification(listNotification.data);
    }
  }, [listNotification, setNotification]);

  const handleUpdateStatusView = async (
    e: MouseEvent<HTMLAnchorElement>,
    id: number,
    link: string
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(UPDATE_NOTIFICATION, {
        id,
        status: 1,
      });
      if (response) {
        window.open(link, "_self");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-4 bg-white">Thông báo từ hệ thống</div>
      <div className="m-6">
        {notification.map((item, idx) => {
          return (
            <div key={idx} className="bg-white">
              <Link
                href={`/hr-center/thong-bao/chi-tiet-thong-bao/${item.relId}`}
                legacyBehavior
              >
                <a
                  onClick={(e) => {
                    handleUpdateStatusView(
                      e,
                      item.id,
                      `/hr-center/thong-bao/chi-tiet-thong-bao/${item.id}`
                    );
                  }}
                >
                  <div
                    className={`flex space-x-2 border-b items-center px-6 py-3 ${
                      item.status === 0 && "font-medium"
                    }`}
                  >
                    <div className="px-3 py-1 rounded-lg bg-[#FFF5D9] text-[#FFB600]">
                      Thông báo
                    </div>
                    <div>{dayjs(item.createAt).format("DD-MM-YYYY")}</div>
                    <div>{item.title}</div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
