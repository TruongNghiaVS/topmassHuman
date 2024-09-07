"use client";

import { AuthorizeLayout } from "@/component/authorize";
import TmInput from "@/component/hook-form/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance, { axiosInstanceNotToken } from "@/utils/axios";
import {
  CONFIRM_FORGOT_PASSWORD,
  FORGOT_CHANGE_PASSWORD,
} from "@/utils/api-url";
import { setToken } from "@/utils/token";
import { useLoading } from "../context/loading";
import { IConfirmResetPassword } from "@/interface/interface";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(0);
  const { setLoading } = useLoading(); // Access loading context

  const schema = yup.object().shape({
    password: yup.string().required("Vui lòng nhập mật khẩu củ"),
  });

  useEffect(() => {
    const code = searchParams.get("code"); // 'myParam' is the query param key

    if (code) {
      setLoading(true);
      axiosInstanceNotToken
        .post(CONFIRM_FORGOT_PASSWORD, {
          code: code,
        })
        .then((response: any) => {
          if (response && response.token) {
            setToken(response.token);
            setStatus(1);
          }
        })
        .catch((error) => {
          setStatus(2);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams]);

  const { handleSubmit, control } = useForm<IConfirmResetPassword>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IConfirmResetPassword> = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post(FORGOT_CHANGE_PASSWORD, data);
      toast.success("Đổi mật khẩu thành công!");
      router.push("/dang-nhap");
    } catch (error) {
      toast.error("Đổi mật khẩu không thành công!");
    } finally {
      setLoading(false);
    }
  };

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

          {status === 0 && (
            <div className="mb-4 font-medium">
              Đang kiểm tra thông tin xác thực
            </div>
          )}

          {status === 1 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <div>
                  Mật khẩu <span className="text-[#dc2f2f]">*</span>
                </div>
                <TmInput
                  control={control}
                  placeholder="Mật khẩu"
                  name="password"
                  type="password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
              >
                Xác nhận
              </button>
            </form>
          )}

          {status === 2 && (
            <div className="mb-4 font-medium text-red-700">
              Xác thực không thành công. Vui lòng kiểm tra lại email
            </div>
          )}

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
