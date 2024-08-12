"use client";

import { AuthorizeLayout } from "@/component/authorize";
import TmInput from "@/component/hook-form/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IResetpassword } from "@/interface/interface";

export default function Login() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Bắt buộc nhập email")
      .email("Sai format email "),
  });

  const { handleSubmit, control } = useForm<IResetpassword>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IResetpassword> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <AuthorizeLayout>
        <div>
          <div className="text-2xl font-normal mb-4 text-[#F37A20]">
            Quên mật khẩu
          </div>
          <div className="mb-4 font-normal">
            Nhập Email mà sử dụng để đăng ký tài khoản, hệ thống sẽ gửi thông
            tin để cập nhật lại mật khẩu.
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div>
                Email <span className="text-[#dc2f2f]">*</span>
              </div>
              <TmInput
                control={control}
                placeholder="Email"
                name="email"
                type="email"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
            >
              Lấy mật khẩu
            </button>
          </form>
          <div className="text-[#8E8D8D] font-normal text-base mt-8 text-center pb-4 ">
            Bạn đã có tài khoản?{" "}
            <Link href="/dang-nhap" className="text-[#F37A20]">
              Đăng nhập
            </Link>{" "}
            ngay
          </div>
        </div>
      </AuthorizeLayout>
    </div>
  );
}
