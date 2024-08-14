import { MassHiring } from "@/component/mass-hiring";
import { MassPoint } from "@/component/mass-point";
import {
  massHiring,
  massLabel,
  massPoint,
  massScreen,
  massSearch,
} from "@/mockup-data/data";

export default function Service() {
  return (
    <div className="sm:mx-6 px-6 py-3">
      <div>
        <div className="flex ">
          <div className="font-normal text-default relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-[#F37A20] after:h-[70%] after:bg-black after:my-auto pr-3 mr-3">
            Mass Hiring
          </div>
          <div>Đăng tin tuyển dụng</div>
        </div>
        <div className="text-[10px] font-normal">
          Trải nghiệm gói đăng tim tuyển dụng của Topmass, giúp doanh nghiệp chủ
          động hơn trong việc tìm kiếm ứng viên và tối ưu chi phí
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {massHiring.map((item) => {
            return <MassHiring key={item.title} item={item} />;
          })}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex ">
          <div className="font-normal text-default relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-[#F37A20] after:h-[70%] after:bg-black after:my-auto pr-3 mr-3">
            Mass search
          </div>
          <div>Mở hồ sơ ứng viên</div>
        </div>
        <div className="text-[10px] font-normal">
          Tiếp cận ứng viên một cách chủ động, kết nối với những ứng viên tiềm
          năng nhất.
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {massSearch.map((item) => {
            return <MassHiring key={item.title} item={item} />;
          })}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex ">
          <div className="font-normal text-default relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-[#F37A20] after:h-[70%] after:bg-black after:my-auto pr-3 mr-3">
            Mass Screen
          </div>
          <div>Truyền thông thương hiệu</div>
        </div>
        <div className="text-[10px] font-normal">
          Bộ công cụ giúp quảng bá hình ảnh.
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {massScreen.map((item) => {
            return <MassHiring key={item.title} item={item} />;
          })}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex ">
          <div className="font-normal text-default relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-[#F37A20] after:h-[70%] after:bg-black after:my-auto pr-3 mr-3">
            Mass Label
          </div>
          <div>đánh dấu việc làm</div>
        </div>
        <div className="text-[10px] font-normal">
          Gắn nhãn giúp việc làm của bạn được nổi bật hơn với ứng viên. Dịch vụ
          chỉ áp dụng cho tin đang chạy Mass Hiring.
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {massLabel.map((item) => {
            return <MassHiring key={item.title} item={item} />;
          })}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex ">
          <div className="font-normal text-default relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-[#F37A20] after:h-[70%] after:bg-black after:my-auto pr-3 mr-3">
            Mass Point
          </div>
          <div>Tích lũy tia sét</div>
        </div>
        <div className="text-[10px] font-normal">
          Tích lũy cho mình thật nhiều tia sét để có thể mở khóa và sử dụng các
          dịch vụ tiện ích.
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {massPoint.map((item) => {
            return <MassPoint key={item.title} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
