"use client";

import TmInput from "@/component/hook-form/input";
import { IChangePassword } from "@/interface/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function ChangePassword() {
  const schema = yup.object().shape({
    old_password: yup.string().required("Vui lòng nhập mật khẩu củ"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    confirm_password: yup.string().required("Vui lòng nhập xác nhận mật khẩu"),
  });

  const { handleSubmit, control } = useForm<IChangePassword>({
    resolver: yupResolver(schema),
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit: SubmitHandler<IChangePassword> = (data) => {
    toast.success("Đổi mật khẩu thành công!");

    console.log(data);
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
            placeholder="Password"
            name="old_password"
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
            placeholder="Password"
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
