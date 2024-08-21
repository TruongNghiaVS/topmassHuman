import Link from "next/link";

export default function Notification() {
  return (
    <div>
      <div className="p-4 bg-white">Thông báo từ hệ thống</div>
      <div className="m-6">
        <div className="bg-white">
          <Link href="/hr-center/thong-bao/chi-tiet-thong-bao/1">
            <div className="flex space-x-2 border-b items-center px-6 py-3">
              <div className="px-3 py-1 rounded-lg bg-[#FFF5D9] text-[#FFB600]">
                Thông báo
              </div>
              <div>19/08/2024</div>
              <div>Cập nhật chính sách mới cho việc sử dụng tia sét đổi CV</div>
            </div>
          </Link>
        </div>
        <div className="bg-white">
          <Link href="/hr-center/thong-bao/chi-tiet-thong-bao/1">
            <div className="flex space-x-2 border-b items-center px-6 py-3">
              <div className="px-3 py-1 rounded-lg bg-[#FFF5D9] text-[#FFB600]">
                Thông báo
              </div>
              <div>19/08/2024</div>
              <div>Cập nhật chính sách mới cho việc sử dụng tia sét đổi CV</div>
            </div>
          </Link>
        </div>
        <div className="bg-white">
          <Link href="/hr-center/thong-bao/chi-tiet-thong-bao/1">
            <div className="flex space-x-2 border-b items-center px-6 py-3">
              <div className="px-3 py-1 rounded-lg bg-[#FFF5D9] text-[#FFB600]">
                Thông báo
              </div>
              <div>19/08/2024</div>
              <div>Cập nhật chính sách mới cho việc sử dụng tia sét đổi CV</div>
            </div>
          </Link>
        </div>
        <div className="bg-white">
          <Link href="/hr-center/thong-bao/chi-tiet-thong-bao/1">
            <div className="flex space-x-2 border-b items-center px-6 py-3">
              <div className="px-3 py-1 rounded-lg bg-[#FFF5D9] text-[#FFB600]">
                Thông báo
              </div>
              <div>19/08/2024</div>
              <div>Cập nhật chính sách mới cho việc sử dụng tia sét đổi CV</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
