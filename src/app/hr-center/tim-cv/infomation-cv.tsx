import {
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ClockIcon,
  CurrencyDollarIcon,
  EyeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function InfomationCv() {
  return (
    <div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-x-4 p-4 bg-white pb-6 border-b">
        <div className="col-span-1">
          <div className="flex">
            <div>
              <img
                src="/imgs/no-avatar.png"
                alt=""
                className="w-auto p-0.5 bg-[#F37A20] rounded-full mr-2"
              />
            </div>
            <div>
              <div className="text-base">M.K</div>
              <div className="inline-block mt-2 text-white bg-[#CC0000] rounded-xl px-2 py-0.5 text-xs">
                Đang tìm việc
              </div>
              <div className="flex items-start">
                <BriefcaseIcon className="w-4 mr-1 " /> Sale support
              </div>
              <div className="flex items-start">
                <MapPinIcon className="w-4 mr-1 " /> Hồ Chí Minh
              </div>
              <div className="mt-1 p-2 bg-[#F7F2EB]">
                <div className="flex text-xs mt-0.5">
                  <ClockIcon className="w-4 mr-1 " /> Cập nhật 2 giờ trước
                </div>
                <div className="flex text-xs mt-0.5">
                  <CurrencyDollarIcon className="w-4 mr-1 " /> Thoả thuận
                </div>
                <div className="flex text-xs mt-0.5">
                  <EyeIcon className="w-4 mr-1 " /> 10 lượt xem
                </div>
                <div className="flex text-xs mt-0.5">
                  <BookOpenIcon className="w-4 mr-1 " /> 25 lượt liên hệ
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2 sm:mt-0 mt-2">
          <div>Kinh nghiệm (4 năm 11 tháng)</div>
          <div className="flex items-start">
            <BriefcaseIcon className="w-4 mr-1 " /> Sale admin tại VietStar
            Group
          </div>
          <div className="flex items-start">
            <BriefcaseIcon className="w-4 mr-1 " /> Sale admin tại Topmass
          </div>
          <div className="mt-2">Học vấn</div>
          <div className="flex items-start">
            <AcademicCapIcon className="w-4 mr-1 " /> Marjor: Kế toán - Trường
            đại học tài chính Marketing Thành phố Hồ Chí Minh
          </div>
          <div className="mt-2">Mục tiêu sự nghiệp</div>
          <div className="flex items-start">
            <AcademicCapIcon className="w-4 mr-1 " /> Muốn trở thành best saler
            trong tương lai. Phấn đấu trở thành teamleader phát triển công ty
          </div>
          <div className="text-default">
            <Link href="#"> Xem thêm...</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
