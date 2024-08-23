"use client";

import TmInput from "@/component/hook-form/input";
import TmTextArea from "@/component/hook-form/textarea";
import { IContact } from "@/interface/interface";
import { SendFillBootstrapIcon } from "@/theme/icons/sendFillBootstrapIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function Contact() {
  const schema = yup.object().shape({
    name: yup.string().required("Tên là bắt buộc"),
    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Sai format email "),
    phone: yup.string().required("Số điện thoại là bắt buộc"),
    title: yup.string().required("Tiêu đề là bắt buộc"),
    content: yup.string().required("Nội dung là bắt buộc"),
  });

  const { handleSubmit, control } = useForm<IContact>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<IContact> = (data) => {
    toast.success("Gửi thông tin thành công!");
    console.log(data);
  };

  return (
    <div className="max-1280:p-4">
      <div className="container mx-auto shadow-lg	p-4 mx-4 my-6">
        <div className="flex items-center lg:space-x-4 space-y-2 lg:space-y-0 lg:flex-row flex-col">
          <div className="flex-1 w-full">
            <div className="w-full h-full">
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
          </div>
          <div className="flex-1 w-full">
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
                  name="phone"
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
      </div>
    </div>
  );
}
