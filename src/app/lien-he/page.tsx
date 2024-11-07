"use client";

import TmInput from "@/component/hook-form/input";
import TmTextArea from "@/component/hook-form/textarea";
import { SendFillBootstrapIcon } from "@/theme/icons/sendFillBootstrapIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { IContact } from "../../interface/interface";
import { BellIcon, UserIcon } from "@heroicons/react/16/solid";
import { BagPlusFillBootstrapIcon } from "@/theme/icons/bagPlusFillBootstrapIcon";

export default function Contact() {
  const schema = yup.object().shape({
    name: yup.string().required("Tên là bắt buộc"),
    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Sai format email "),
    phoneNumber: yup.string().required("Số điện thoại là bắt buộc"),
    title: yup.string().required("Tiêu đề là bắt buộc"),
    content: yup.string().required("Nội dung là bắt buộc"),
  });

  const { handleSubmit, control, reset } = useForm<IContact>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<IContact> = (data) => {
    toast.success("Gửi thông tin thành công!");
    console.log(data);
  };

  return (
    <div className="max-1280:p-4 bg-white">
      <div className="container mx-auto shadow-lg	p-4 mx-4 my-6">
        <div className="flex lg:space-x-4 space-y-2 lg:space-y-0 lg:flex-row flex-col">
          <div className="flex-1 w-full">
            <div className="flex justify-center">
              <img src="/imgs/logo-contact.png" alt="" className="w-[200px]" />
            </div>
            <div className="mt-4 text-center text-base font-bold">
              GIẢI PHÁP CUNG ỨNG NHÂN LỰC TOÀN DIỆN
            </div>
            <div className="flex items-center space-x-1 font-medium my-4">
              <BellIcon className="w-4 text-colorBase" />{" "}
              <div>Liên hệ Topmass</div>
            </div>
            <p className="mt-4">
              Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe mọi ý kiến từ quý
              khách hàng. Để đáp ứng tốt nhất nhu cầu của bạn, vui lòng liên hệ
              với các phòng ban phù hợp dưới đây:
            </p>
            <div className="text-center text-base font-bold text-colorBase mb-4">
              Hotline: 1900 255 836
            </div>
            <p>
              Đội ngũ tư vấn viên của chúng tôi sẽ hỗ trợ bạn từ Thứ Hai đến Thứ
              Sáu, trong giờ hành chính.
            </p>
            <p className="pb-2 border-b border-black">
              Hoặc bạn có thể liên hệ trực tiếp với các phòng bạn hỗ trợ theo
              thông tin dưới đây:
            </p>
            <div className="flex space-x-1 mb-4">
              <BagPlusFillBootstrapIcon className="w-4 mr-2 text-colorBase" />{" "}
              <div className="font-medium">Phòng Kinh Doanh</div>
            </div>
            <ul className="pl-8 list-disc mb-4 space-y-2">
              <li>
                <span className="font-medium">Trưởng Phòng:</span>Nguyễn Ý Nhi
              </li>
              <li>
                <span className="font-medium">Số Điện Thoại:</span>0903 972 940
              </li>
            </ul>
            <p>
              Liên hệ để biết thêm chi tiết về dịch vụ tuyển dụng, các gói quảng
              cáo, và hợp tác kinh doanh cùng Topmass.
            </p>

            <div className="mb-4 flex space-x-1">
              <UserIcon className="w-4 mr-2 text-colorBase" />{" "}
              <div className="font-medium">Phòng Headhunt – Tuyển dụng</div>
            </div>
            <ul className="pl-8 list-disc mb-4 space-y-2">
              <li>
                <span className="font-medium">Trưởng Phòng 1:</span>Dung Mi - Số
                Điện Thoại: 0903 972 940
              </li>
              <li>
                <span className="font-medium">Trưởng Phòng 2:</span>Thanh Hương
                - Số Điện Thoại: 0903 972 940
              </li>
            </ul>
            <p>
              Chuyên tư vấn và tìm kiếm ứng viên phù hợp, mang đến cho doanh
              nghiệp nguồn nhân lực chất lượng cao.
            </p>

            <div className="mb-4 flex space-x-1">
              <UserIcon className="w-4 mr-2 text-colorBase" />{" "}
              <div className="font-medium">
                Phòng Tiếp Thị Quảng Cáo & Banner, Bài tuyển dụng.
              </div>
            </div>
            <ul className="pl-8 list-disc mb-4 space-y-2">
              <li>
                <span className="font-medium">Trưởng Phòng:</span>Minh Phạm - Số
                Điện Thoại: 1900 255 638
              </li>
            </ul>
            <p className="border-b border-black">
              Hỗ trợ dịch vụ đăng bài và quảng cáo banner, đảm bảo truyền tải
              thông tin đến đúng đối tượng một cách hiệu quả trên nền tảng Mạng
              Xã Hội và Website. Liên hệ với chúng tôi để biết thêm chi tiết về
              các gói dịch vụ quảng cáo của Topmass.
            </p>
          </div>
          <div className="flex-1 w-full">
            <div className="mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0974982069993!2d106.66421827481837!3d10.803844289346571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529250f8a7267%3A0xf1f3a728cbdddbef!2zNTQvMzEgxJAuIFBo4buVIFF1YW5nLCBQaMaw4budbmcgMiwgVMOibiBCw6xuaCwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1724398401903!5m2!1svi!2s"
                width="600"
                height="450"
                className="w-full"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <TmInput control={control} placeholder="Tên" name="name" />
              </div>
              <div className="mb-4">
                <TmInput
                  control={control}
                  name="email"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="mb-4">
                <TmInput
                  control={control}
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                />
              </div>
              <div className="mb-4">
                <TmInput control={control} name="title" placeholder="Tiêu đề" />
              </div>
              <div className="mb-4">
                <TmTextArea
                  name="content"
                  control={control}
                  placeholder="Tin nhắn"
                  rows={5}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white bg-[#FF7D55] flex items-center justify-center space-x-2 rounded-lg text-base font-bold"
              >
                Gửi ngay <SendFillBootstrapIcon className="w-4 ml-2" />
              </button>
            </form>
          </div>
        </div>
        <p className="mt-6">
          Topmass.vn cam kết mang đến cho khách hàng sự chuyên nghiệp và tận tâm
          trong từng dịch vụ. Chúng tôi rất mong nhận được sự tin tưởng và đồng
          hành từ quý khách hàng trong hành trình tuyển dụng và phát triển nhân
          lực.
        </p>
      </div>
    </div>
  );
}
