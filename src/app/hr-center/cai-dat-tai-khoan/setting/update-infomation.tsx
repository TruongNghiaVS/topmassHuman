"use client";
import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import AvatarUpload from "@/component/hook-form/upload-avatar";
import {
  IUpdateInfomation,
  IUpdateInformationProps,
} from "@/interface/interface";
import { gender } from "@/mockup-data/data";
import { UPDATE_INFOMATION, UPLOAD_IMG } from "@/utils/api-url";
import axiosInstance, { axiosInstanceImg } from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function UpdateInfomation({
  currentUser,
  mutate,
}: IUpdateInformationProps) {
  const [avatarLink, setAvatarLink] = useState("");
  const { setLoading } = useLoading();

  useEffect(() => {
    if (currentUser) {
      setAvatarLink(currentUser.avatarLink);
    }
  }, [currentUser]);

  const schema = yup.object().shape({
    avatar: yup
      .mixed<File>()
      .required("Vui lòng chọn ảnh đại diện")
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
    name: yup.string(),
    gender: yup.number(),
    phone: yup.string(),
  });

  const { handleSubmit, control } = useForm<IUpdateInfomation>({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: undefined,
      fullName: currentUser?.name || "",
      gender: currentUser?.gender || 0,
      phone: currentUser?.phone || "",
    },
  });

  const onSubmit: SubmitHandler<IUpdateInfomation> = async (data) => {
    if (data.avatar) {
      try {
        setLoading(true);
        const response = await axiosInstanceImg.post(UPLOAD_IMG, {
          file: data.avatar,
        });
        if (response.data) {
          setAvatarLink(response.data.fullLink);
          toast.success("Cập nhật hình ảnh thành công");
          try {
            setLoading(true);
            const dataUpdate = await axiosInstance.post(UPDATE_INFOMATION, {
              fullName: data.fullName,
              gender: data.gender,
              phone: data.phone,
              avatarLink: response.data.shortLink,
            });
            if (dataUpdate) {
              toast.success("Cập nhật thông tin thành công");
              mutate();
            }
          } catch (error) {
            toast.error("Cập nhật thông tin thất bại");
          } finally {
            setLoading(false);
          }
        }
      } catch (error) {
        toast.error("Cập nhật hình ảnh thất bại");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-base mb-4">Cập nhật thông tin cá nhân</div>
        <div className="sm:block grid justify-center">
          <div className="">
            <AvatarUpload name="avatar" control={control} link={avatarLink} />
          </div>
          <div className="mt-2">Email: {currentUser?.email}</div>
        </div>
        <div className="sm:grid grid-cols-2 gap-4 mt-4">
          <div className="mb-4">
            <div>Tên</div>
            <TmInput control={control} placeholder="Tên" name="fullName" />
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
            <div>Số điện thoại</div>
            <TmInput
              control={control}
              placeholder="Số điện thoại"
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
