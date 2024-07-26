export const HomeTop = () => {
  return (
    <div className="relative">
      <div>
        <img src="/imgs/bg-top.png" alt="" className="w-full h-auto" />
      </div>
      <div className="absolute xl:left-0 right-0 xl:bottom-[184px] lg:bottom-[100px] left-4 sm:bottom-14 bottom-3">
        <div className="container mx-auto">
          <div className="flex items-center">
            <img
              src="/imgs/img-title-top.png"
              alt=""
              className="mr-2 w-4 h-4"
            />
            <div className="sm:text-lg text-sm font-medium">
              Đăng tin miễn phí, kết nối nhanh chóng.
            </div>
          </div>
          <div className="flex items-center">
            <img
              src="/imgs/img-title-top.png"
              alt=""
              className="mr-2 w-4 h-4"
            />
            <div className="sm:text-lg text-sm font-medium">
              Nguồn ứng viên lớn, cập nhật liên tục.
            </div>
          </div>
          <div className="flex items-center">
            <img
              src="/imgs/img-title-top.png"
              alt=""
              className="mr-2 w-4 h-4"
            />
            <div className="sm:text-lg text-sm font-medium">
              Nhân viên hỗ trợ 24/7, giải đáp thắc mắc.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
