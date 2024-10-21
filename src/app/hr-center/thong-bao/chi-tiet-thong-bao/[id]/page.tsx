"use client";

import { GET_DETAIL_NOTIFICATION } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import useSWR from "swr";

export default function DetailNotification({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const { data: detailNoti, error } = useSWR(
    `${GET_DETAIL_NOTIFICATION}?Id=${id}`,
    fetcher
  );

  return (
    <div className="min-h-screen">
      <div className="p-4 bg-white flex whitespace-nowrap space-x-4 items-center">
        <Link
          href="/hr-center/thong-bao"
          className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
        >
          <ArrowUturnLeftIcon className="w-4 mr-1" />
          Trở về
        </Link>
        <div>Chi tiết thông báo</div>
      </div>
      <div className="m-6 bg-white p-4">
        <div className="font-medium">{detailNoti?.title} </div>
        <div className="mt-4">{detailNoti?.content}</div>
      </div>
    </div>
  );
}
