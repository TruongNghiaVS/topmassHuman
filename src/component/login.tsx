"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import TmInput from "./hook-form/input";
import Link from "next/link";
import { axiosInstanceNotToken, fetcher } from "@/utils/axios";
import { useLoading } from "@/app/context/loading";
import Cookies from "js-cookie";
import { ILogin, ILoginForm } from "@/interface/interface";
import { LOGIN } from "@/utils/api-url";
import { EnvelopeIcon, EyeIcon, KeyIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { ProfileUser } from "@/module/helper/master-data";
import { AxiosError } from "axios";

export const LoginForm = ({ onClose }: ILoginForm) => {
  const { setLoading } = useLoading();
  const [showPassword, setShowPassword] = useState(false);
  const schema = yup.object().shape({
    userName: yup
      .string()
      .required("Email không được để trống")
      .email("Sai format email "),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(6, "Tối thiểu 6 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .matches(/^(?=.*[A-Z])(?=.*\d)/, "Phải có 1 ký tự in hoa và 1 chữ số"),
  });

  const { handleSubmit, control } = useForm<ILogin>({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const router = useRouter();
  const { mutateUser } = ProfileUser();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    setLoading(true);
    let redirectUrl = "/hr-center/bang-tin";
    try {
      const response: any = await axiosInstanceNotToken.post(LOGIN, data);
      if (response && response.authenLevel === 0) {
        Cookies.set("email", data.userName, { expires: 7 });
        toast.warning(
          "Bạn chưa xác thực email. Vui lòng xác thực email và đăng nhập lại"
        );
        redirectUrl = "/xac-thuc-email";
      } else {
        if (response.token) {
          Cookies.set("token", response.token, { expires: 7 });
          toast.success("Đăng nhập thành công");
        }
      }
      if (onClose) {
        onClose();
      }
      mutateUser();
      router.push(redirectUrl);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
            icon={<EnvelopeIcon className="w-5" />}
            name="userName"
            type="email"
          />
        </div>
        <div className="mb-4">
          <div>
            Mật khẩu <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput
            control={control}
            name="password"
            icon={<KeyIcon className="w-5" />}
            placeholder="Mật khẩu"
            type={showPassword ? "text" : "password"}
            afterIcon={
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <EyeIcon className="w-5" />
              </button>
            }
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
        tại đây
      </div>
    </div>
  );
};
