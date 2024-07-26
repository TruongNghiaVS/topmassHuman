export const Description = () => {
  const description = [
    {
      title: "Nguồn ứng viên chất lượng",
      description:
        "Hơn 10 triệu hồ sơ ứng viên thuộc các lĩnh vực mass được cập nhật liên tục và hơn 5000 lượt truy cập mỗi ngày.",
      img: "user.png",
      width: 39,
      height: 43,
    },
    {
      title: "Trải nghiệm toàn diện",
      description:
        "Các chức năng được Topmass tích hợp và phát triển một cách tối ưu, thuận tiện cho việc sử dụng và quản lý số lượng lớn ứng viên.",
      img: "setting.png",
      width: 46,
      height: 32,
    },
    {
      title: "Chi phí hợp lý",
      description:
        "Hỗ trợ tin đăng miến phí và các gói dùng thử mỗi năm, tối ưu chi phí và quy trình tuyển dụng.",
      img: "price.png",
      width: 39,
      height: 39,
    },
    {
      title: "Nhân Viên CSKH hỗ trợ tận tâm",
      description:
        "Đội ngũ CSKH kịp thời giải đáp thắc mắc và hỗ trợ Nhà tuyển dụng xuyên suốt, mang lại hiệu quả tối ưu cho quá trình tuyển dụng.",
      img: "umbrella.png",
      width: 51,
      height: 56,
    },
  ];

  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto">
        <div className="font-bold sm:text-2xl text-lg text-center pt-5 relative after:absolute after:content-[''] after:left-0 after:right-0 after:top-0 after:w-11 after:h-2 after:rounded-2xl after:bg-gradient-to-r after:from-[#F89D1B] after:to-[#F37A20] after:mx-auto mb-[30px] ">
          Topmass - Website tìm việc uy tín, chất lượng cho <br />
          Doanh Nghiệp với gần 10 năm kinh nghiệm trên thị trường
        </div>
        <div className="lg:px-[110px] px-2 sm:grid grid-cols-2 gap-[52px]">
          {description.map((value) => {
            return (
              <div key={value.title} className="col-span-1 mb-2 sm:mb-0">
                <div className="flex items-center">
                  <div className="mr-4 xl:w-16 w-24">
                    <img
                      src={`/imgs/${value.img}`}
                      alt=""
                      style={{ width: value.width, height: value.height }}
                    />
                  </div>
                  <div>
                    <div className="md:text-lg text-base font-bold mb-2">
                      {value.title}
                    </div>
                    <div className="text-sm font-normal">
                      {value.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 font-bold sm:text-2xl text-lg text-center">
          Trải nghiệm dịch vụ đăng tin tại Topmass
        </div>
        <div className="text-center text-sm font-normal text-white mt-6 mb-10">
          <span className="px-6 py-2 bg-gradient-to-r from-[#F89E1B] to-[#F37A20]">
            Đăng ký ngay!
          </span>
        </div>
      </div>
    </div>
  );
};
