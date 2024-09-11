"use client";

import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import { IChangePassword } from "@/interface/interface";
import { FORGOT_CHANGE_PASSWORD } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function ChangePassword() {
  const { setLoading } = useLoading();
  const [isUpdate, setIsUpdate] = useState(false);
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
      const response = await axiosInstance.post(FORGOT_CHANGE_PASSWORD, {
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
            type="password"
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
            type="password"
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
    </div>
  );
}
