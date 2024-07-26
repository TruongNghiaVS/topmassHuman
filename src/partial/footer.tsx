import Image from "next/image";
import Link from "next/link";
import {
  DocumentTextIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/16/solid";

export const Footer = () => {
  const topMass = [
    "Giới thiệu",
    "Tuyển dụng",
    "Liên hệ",
    "Chính sách bảo mật",
    "Điều khoản dịch vụ",
  ];

  const cv = [
    "Quản lý hồ sơ",
    "Hướng dẫn viết CV",
    "Thư viện CV mẫu",
    "CV theo ngành nghề",
  ];

  const blog = [
    "Việc làm tốt nhất",
    "Việc làm cho sinh viên",
    "Việc làm online",
    "Việc làm lương cao",
    "Việc làm tài chính",
  ];

  return (
    <>
      <div className=" bg-white px-2 sm:px-0">
        <div className="container mx-auto pt-[60px] pb-[30px] gap-x-28	">
          <div className="lg:grid grid-cols-12 lg:px-0 px-6 items-center">
            <div className="lg:col-span-5 col-span-4 bg-[url(/imgs/bg-logo-footer.png)] bg-no-repeat bg-[lenght:100% 100%] py-4 mb-2">
              <Link href="#">
                <Image
                  src="imgs/logo-new.svg"
                  width={100}
                  height={100}
                  alt=""
                  className="w-[180px] "
                ></Image>
              </Link>
            </div>
            <div className="col-span-7">
              <div className="text-[28px] font-bold">
                Thuộc sở hữu công ty Cổ phần tập đoàn{" "}
                <span className="text-[#F89E1B]">Vietstar</span>
              </div>
              <div className="flex mt-2">
                <DocumentTextIcon className="w-6 mr-2 text-[#F37A20]" />
                Giấy phép đăng ký kinh doanh số:{" "}
                <span className="font-bold">0315196162</span>
              </div>
              <div className="flex mt-2">
                <MapPinIcon className="w-6 mr-2 text-[#F37A20]" />
                Trụ sở làm việc: 54/31 Phổ Quang, Phường 02, Tân Bình, Hồ Chí
                Minh
              </div>
              <div className="w-[90%] h-2.5 bg-gradient-to-r from-[#d14b00] to-[#f89e1b] mt-6"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#F55D00] to-[#3F2300] pt-3.5 pb-10 px-2 sm:px-0">
        <div className="container mx-auto text-white">
          <div className="md:grid grid-cols-3">
            <div className="col-span-1">
              <div className="text-4xl	font-bold">Liên hệ</div>
              <div className="text-[13px] flex items-center">
                <PhoneIcon className="w-4 mr-1" />
                Hotline hỗ trợ cho người tìm việc
              </div>
              <div className="text-lg	">0938797478</div>
              <div className="text-[13px] flex items-center">
                <PhoneIcon className="w-4 mr-1" />
                Hotline hỗ trợ cho nhà tuyển dụng
              </div>
              <div className="text-lg	">0938797478</div>
            </div>
            <div className="col-span-2">
              <div className="md:grid grid-cols-3">
                <div className="col-span-1">
                  <div className="text-lg font-bold">Về Topmass</div>
                  {topMass.map((value: string) => {
                    return (
                      <div className="font-normal" key={value}>
                        {value}
                      </div>
                    );
                  })}
                </div>
                <div className="col-span-1">
                  <div className="text-lg font-bold">Tạo CV Chuyên Nghiệp</div>
                  {cv.map((value: string) => {
                    return (
                      <div className="font-normal" key={value}>
                        {value}
                      </div>
                    );
                  })}
                </div>
                <div className="col-span-1">
                  <div className="text-lg font-bold">Blog tuyển dụng</div>
                  {blog.map((value: string) => {
                    return (
                      <div className="font-normal" key={value}>
                        {value}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
