"use client";

import TmInput from "@/component/hook-form/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthorizeLayout } from "@/component/authorize";
import { useGlobalContext } from "../global-context";
import { ILogin } from "@/interface/interface";

export default function Login() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Bắt buộc nhập email")
      .email("Sai format email "),
    password: yup.string().required("Bắt buộc nhập password"),
  });

  const { handleSubmit, control } = useForm<ILogin>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    setGlobalParam(true);
    toast.success("Đăng nhập thành công!");

    router.push("/");
    console.log(data);
  };

  const { globalParam, setGlobalParam } = useGlobalContext();

  return (
    <div>
      <AuthorizeLayout>
        <div>
          <div className="text-2xl font-normal mb-4 text-[#F37A20]">
            Chào mừng bạn đến với Topmass
          </div>
          <div className="mb-4 font-normal">
            Cùng xây dựng một hệ sinh thái tuyển dụng nhân sự cùng với nguồn ứng
            viên khổng lồ từ Topmass
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
            <div className="mb-4">
              <div>
                Password <span className="text-[#dc2f2f]">*</span>
              </div>
              <TmInput
                control={control}
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="font-normal text-base text-right mb-4 text-[#F37A20]">
              <Link href="quen-mat-khau">Quên mật khẩu</Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
            >
              Đăng nhập
            </button>
          </form>
          <div className="text-[#8E8D8D] font-normal text-base mt-8 text-center pb-4 ">
            Bạn chưa có tài khoản?{" "}
            <Link href="/dang-ky" className="text-[#F37A20]">
              Đăng ký
            </Link>{" "}
            ngay
          </div>
        </div>
      </AuthorizeLayout>
    </div>
  );
}
