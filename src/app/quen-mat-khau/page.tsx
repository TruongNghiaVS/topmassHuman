"use client";

import { AuthorizeLayout } from "@/component/authorize";
import TmInput from "@/component/hook-form/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { HOST_API } from "@/config-global";
import { FORGOT_PASSWORD } from "@/utils/api-url";
import { useLoading } from "../context/loading";
import { IResetpassword } from "@/interface/interface";
import { useState } from "react";

export default function Login() {
  const { setLoading } = useLoading();
  const [type, setType] = useState(false);

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

  const onSubmit: SubmitHandler<IResetpassword> = async (data) => {
    try {
      setLoading(true);
      const axiosInstance = axios.create({
        baseURL: HOST_API,
        headers: { "Content-Type": "application/json" },
      });
      axiosInstance.interceptors.response.use((response) => response.data);
      await axiosInstance.post(FORGOT_PASSWORD, data);
      setType(true);
      toast.success("Gửi thông tin thành công");
    } catch (error) {
      toast.error("Gửi thông tin thất bại");
    } finally {
      setLoading(false);
    }
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
          {!type ? (
            <div>
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
          ) : (
            <div className="text-base font-medium">
              Gửi thông tin thành công. Vui lòng kiểm tra email để thay đổi mật
              khẩu
            </div>
          )}
        </div>
      </AuthorizeLayout>
    </div>
  );
}
