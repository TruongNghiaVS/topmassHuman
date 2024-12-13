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
import {
  FORGOT_PASSWORD,
  REQUEST_RESENDMAIL_CHANGPASSWORD,
} from "@/utils/api-url";
import { useLoading } from "../context/loading";
import { IResetpassword } from "@/interface/interface";
import { useEffect, useState } from "react";
import { axiosInstanceNotToken } from "@/utils/axios";

export default function Login() {
  const { setLoading } = useLoading();
  const [type, setType] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState("");

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Bắt buộc nhập email")
      .email("Sai format email "),
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isDisabled && type) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsDisabled(false);
            return 30; // Reset timer for next cycle
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDisabled, type]);

  const handleClick = async () => {
    try {
      setLoading(true);
      await axiosInstanceNotToken.post(REQUEST_RESENDMAIL_CHANGPASSWORD, {
        email,
      });
      toast.success("Yêu cầu gửi email thành công");
    } catch (error) {
      toast.error("Yêu cầu gửi email thất bại");
    } finally {
      setLoading(false);
      setIsDisabled(true);
    }
  };

  const { handleSubmit, control } = useForm<IResetpassword>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IResetpassword> = async (data) => {
    try {
      setLoading(true);
      setEmail(data.email);
      await axiosInstanceNotToken.post(FORGOT_PASSWORD, data);
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
            <div>
              <div className="text-base font-medium">
                Gửi thông tin thành công. Vui lòng kiểm tra email để thay đổi
                mật khẩu
              </div>
              {isDisabled ? (
                <div className="font-medium text-colorBase">
                  (Vui lòng đợi {timer}s để yêu cầu gửi lại email)
                </div>
              ) : (
                <div className="font-medium">
                  Nếu chưa nhận được email. Vui lòng bấm vào{" "}
                  <button onClick={handleClick} className="text-colorBase">
                    đây
                  </button>{" "}
                  sau để nhận lại email
                </div>
              )}
            </div>
          )}
        </div>
      </AuthorizeLayout>
    </div>
  );
}
