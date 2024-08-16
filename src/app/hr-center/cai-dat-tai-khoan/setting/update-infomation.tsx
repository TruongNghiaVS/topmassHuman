"use client";
import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import AvatarUpload from "@/component/hook-form/upload-avatar";
import { IUpdateInfomation } from "@/interface/interface";
import { gender } from "@/mockup-data/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function UpdateInfomation() {
  const schema = yup.object().shape({
    avatar: yup
      .mixed<File>()
      .test(
        "fileType",
        "Unsupported file type",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type))
      )
      .test(
        "fileSize",
        "File size is too large",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 2MB
      ),
    username: yup.string(),
    gender: yup.string(),
    phone: yup.string(),
  });

  const { handleSubmit, control } = useForm<IUpdateInfomation>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "test",
      gender: "",
      phone: "0345678901",
    },
  });

  const onSubmit: SubmitHandler<IUpdateInfomation> = (data) => {
    toast.success("Đổi mật khẩu thành công!");
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-base mb-4">Cập nhật thông tin cá nhân</div>
        <div className="sm:block grid justify-center">
          <div className="">
            <AvatarUpload name="avatar" control={control} />
          </div>
          <div className="mt-2">Email: test@vietstargroup.vn</div>
        </div>
        <div className="sm:grid grid-cols-2 gap-4 mt-4">
          <div className="mb-4">
            <div>Họ và tên</div>
            <TmInput
              control={control}
              placeholder="Họ và tên"
              name="username"
            />
          </div>
          <div className="mb-4">
            <div>Giới tính</div>
            <TmSelect
              control={control}
              placeholder="Giới tính"
              name="gender"
              options={gender}
            />
          </div>
          <div className="mb-4">
            <div>Số diện thoại</div>
            <TmInput
              control={control}
              placeholder="Số diện thoại"
              name="phone"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}
