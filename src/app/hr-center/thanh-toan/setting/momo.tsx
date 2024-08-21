import {
  DocumentDuplicateIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export const Momo = () => {
  return (
    <div>
      <div className="uppercase font-normal">
        Ngân hàng thương mại cổ phần Việt Nam thương tín
      </div>
      <div className="font-normal mt-2">
        Tên chủ tài khoản:
        <span className="ml-1 font-medium">
          Cong ty co phan tap doan vietstar
        </span>
      </div>
      <div className="font-normal mt-2 flex justify-center">
        Số tài khoản:
        <span className="ml-1 font-medium">09877665786</span>
        <DocumentDuplicateIcon className="w-4 ml-2 text-default" />
      </div>
      <div className="font-normal mt-2 flex justify-center">
        Nội dung chuyển khoản:
        <span className="ml-1 font-medium">#102378</span>
        <DocumentDuplicateIcon className="w-4 ml-2 text-default" />
      </div>
      <div className="font-normal mt-2">
        Số tiền thanh toán:
        <span className="ml-1 font-medium">2.000.000</span>
      </div>
      <div className="mt-4 flex justify-center">
        <img src="/imgs/logo-new.svg" alt="" className="w-[150px]" />
      </div>
      <div className="mt-2 flex justify-center">
        <img src="/imgs/qr-code.svg" className="w-[200px]" alt="" />
      </div>
      <div className="mt-2 text-center">
        Hoặc có thể thanh toán bằng mã QR code
      </div>
      <div className="mt-2 flex justify-center mb-6">
        <Link
          href="/hr-center/quan-ly-don-hang"
          className="flex justify-center font-medium px-3 py-1 rounded-lg text-default bg-[#FFE39C]"
        >
          <QueueListIcon className="w-4 text-default mr-2" />
          Kiểm tra trạng thái đơn hàng
        </Link>
      </div>
    </div>
  );
};
