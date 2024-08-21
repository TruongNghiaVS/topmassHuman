import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function DetailNotification() {
  return (
    <div className="min-h-screen">
      <div className="p-4 bg-white flex whitespace-nowrap space-x-4 items-center">
        <Link
          href="/hr-center/thong-bao"
          className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
        >
          <ArrowUturnLeftIcon className="w-4 mr-1" />
          Trở vế
        </Link>
        <div>Chi tiết thông báo</div>
      </div>
      <div className="m-6 bg-white p-4">
        <div className="font-medium">
          Cập nhật chính sách mới cho việc sử dụng tia sét đổi CV
        </div>
        <div className="mt-4">
          Từ ngày 20/08/2024 Hạn sử dụng của các tia set qui đổi từ chương trình
          đổi Cv sẽ được gia hạn đến 1 tháng 20 ngày. Vui lòng cập nhật thông
          tin và sử dụng tia sét hợp lý để không bỏ qua bất kì tia sét nào.
        </div>
      </div>
    </div>
  );
}
