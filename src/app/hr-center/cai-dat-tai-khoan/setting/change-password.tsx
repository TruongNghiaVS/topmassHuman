"use client";

import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import { IChangePassword } from "@/interface/interface";
import { CHANGE_PASSWORD } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { EyeIcon } from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    password: false,
    confirm_password: false,
  });
  const { setLoading } = useLoading();
  const schema = yup.object().shape({
    currentPassword: yup.string().required("Vui lòng nhập mật khẩu củ"),
    password: yup
      .string()
      .min(6, "Tối thiểu 6 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .matches(/^(?=.*[A-Z])(?=.*\d)/, "Phải có 1 ký tự in hoa và 1 chữ số")
      .required("Vui lòng nhập mật khẩu"),
    confirm_password: yup
      .string()
      .oneOf(
        [yup.ref("password"), undefined],
        "Nhập lại mật khẩu không chính xác"
      )
      .required("Vui lòng nhập xác nhận mật khẩu"),
  });

  const { handleSubmit, control, reset } = useForm<IChangePassword>({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit: SubmitHandler<IChangePassword> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(CHANGE_PASSWORD, {
        currentPassword: data.currentPassword,
        password: data.password,
      });
      if (response) {
        toast.success("Đổi mật khẩu thành công!");
        reset();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="text-base mb-4">Thay đổi mật khẩu</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div>
            Mật khẩu hiện tại <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput
            control={control}
            placeholder="Mật khẩu hiện tại"
            name="currentPassword"
            type={showPassword.currentPassword ? "text" : "password"}
            afterIcon={
              <button
                onClick={() => {
                  setShowPassword((prevShowPassword) => {
                    return {
                      ...prevShowPassword,
                      currentPassword: !prevShowPassword.currentPassword,
                    };
                  });
                }}
              >
                <EyeIcon className="w-5" />
              </button>
            }
          />
        </div>
        <div className="mb-4">
          <div>
            Mật khẩu mới <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput
            control={control}
            name="password"
            placeholder="Mật khẩu mới"
            type={showPassword.password ? "text" : "password"}
            afterIcon={
              <button
                onClick={() => {
                  setShowPassword((prevShowPassword) => {
                    return {
                      ...prevShowPassword,
                      password: !prevShowPassword.password,
                    };
                  });
                }}
              >
                <EyeIcon className="w-5" />
              </button>
            }
          />
        </div>
        <div className="mb-4">
          <div>
            Nhập lại mật khẩu <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput
            control={control}
            name="confirm_password"
            placeholder="Nhập lại mật khẩu mới"
            type={showPassword.confirm_password ? "text" : "password"}
            afterIcon={
              <button
                onClick={() => {
                  setShowPassword((prevShowPassword) => {
                    return {
                      ...prevShowPassword,
                      confirm_password: !prevShowPassword.confirm_password,
                    };
                  });
                }}
              >
                <EyeIcon className="w-5" />
              </button>
            }
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
}
