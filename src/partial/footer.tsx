import Image from "next/image";
import Link from "next/link";
import {
  DocumentTextIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/16/solid";

export const Footer = () => {
  const topMass = [
    {
      title: "Giới thiệu",
      link: "/new/1",
    },
    {
      title: "Tuyển dụng",
      link: "/new/1",
    },
    {
      title: "Liên hệ",
      link: "/lien-he",
    },
    {
      title: "Chính sách bảo mật",
      link: "/hr-center/chinh-sach-bao-mat",
    },
    {
      title: "Điều khoản dịch vụ",
      link: "/new/1",
    },
  ];

  const cv = [
    {
      title: "Quản lý hồ sơ",
      link: "/new/1",
    },
    {
      title: "Hướng dẫn viết CV",
      link: "/new/1",
    },
    {
      title: "Thư viện CV mẫu",
      link: "/new/1",
    },
    {
      title: "CV theo ngành nghề",
      link: "/new/1",
    },
  ];

  const blog = [
    {
      title: "Việc làm tốt nhất",
      link: "/new/1",
    },
    {
      title: "Việc làm cho sinh viên",
      link: "/new/1",
    },
    {
      title: "Việc làm online",
      link: "/new/1",
    },
    {
      title: "Việc làm lương cao",
      link: "/new/1",
    },
    {
      title: "Việc làm tài chính",
      link: "/new/1",
    },
  ];

  return (
    <>
      <div className=" bg-white px-0 max-1280:px-2">
        <div className="container mx-auto pt-[60px] pb-[30px] gap-x-28	">
          <div className="lg:grid grid-cols-12 items-center">
            <div className="lg:col-span-5 col-span-4 bg-[url(/imgs/bg-logo-footer.png)] bg-no-repeat bg-[lenght:100% 100%] py-4 mb-2">
              <Link href="#">
                <Image
                  src="/imgs/logo-new.svg"
                  width={100}
                  height={100}
                  priority={true}
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
      <div className="bg-gradient-to-r from-[#F55D00] to-[#3F2300] pt-3.5 pb-10 px-0 max-1280:px-2">
        <div className="container mx-auto text-white">
          <div className="md:grid grid-cols-3">
            <div className="col-span-1 mb-2">
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
                <div className="col-span-1 mb-2">
                  <div className="text-lg font-bold">Về Topmass</div>
                  {topMass.map((item) => {
                    return (
                      <div className="font-normal" key={item.title}>
                        <Link href={item.link}>{item.title}</Link>
                      </div>
                    );
                  })}
                </div>
                <div className="col-span-1 mb-2">
                  <div className="text-lg font-bold">Tạo CV Chuyên Nghiệp</div>
                  {cv.map((item) => {
                    return (
                      <div className="font-normal" key={item.title}>
                        <Link href={item.link}>{item.title}</Link>
                      </div>
                    );
                  })}
                </div>
                <div className="col-span-1 mb-2">
                  <div className="text-lg font-bold">Blog tuyển dụng</div>
                  {blog.map((item) => {
                    return (
                      <div className="font-normal" key={item.title}>
                        <Link href={item.link}>{item.title}</Link>
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
