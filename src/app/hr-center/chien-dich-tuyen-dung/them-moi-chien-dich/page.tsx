"use client";

import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import { ICampaignUpdate } from "@/interface/interface";
import { ProfileUser } from "@/module/helper/master-data";
import { usePopupLevelStore } from "@/store-zustand/useModalStore";
import { ADD_CAMPAIGN } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {
  ArrowUturnLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function CreateCampaign() {
  const { setLoading } = useLoading();
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên chiến dịch"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver<ICampaignUpdate>(schema),
    defaultValues: {
      name: "",
    },
  });
  const { openModal } = usePopupLevelStore();
  const { currentUser } = ProfileUser();

  useEffect(() => {
    if (currentUser?.level < 2) {
      openModal();
    }
  }, [currentUser]);

  const onSubmit: SubmitHandler<ICampaignUpdate> = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(ADD_CAMPAIGN, data);
      if (response) {
        toast.success("Thêm mới chiến dịch thành công!");
        reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Thêm mới chiến dịch thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between sm:items-center p-4 sm:flex-row flex-col sm:space-y-0 space-y-2  border-b">
        <div className="bg-white flex whitespace-nowrap space-x-4 items-center">
          <Link
            href="/hr-center/chien-dich-tuyen-dung"
            className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
          >
            <ArrowUturnLeftIcon className="w-4 mr-1" />
            Trở về
          </Link>
          <div>Thêm chiến dịch</div>
        </div>
        <div>
          <div className="flex sm:space-x-2 sm:flex-row flex-col space-y-2 sm:space-y-0">
            <Link
              href="/hr-center/chien-dich-tuyen-dung/tao-tin-dang"
              className="rounded px-4 py-1 bg-[#F37A20] text-white flex"
            >
              <PencilSquareIcon className="w-4 mr-2" /> Tạo tin đăng
            </Link>
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="relative p-4">
          <div className="absolute sm:w-[150%] bg-[#F49854] sm:rotate-3 top-[-20px] left-[-15px] bottom-0 sm:bottom-[20%] right-0"></div>
          <div className="flex space-x-6 py-6 relative z-[2] sm:flex-row flex-col">
            <div className="flex-1">
              <img src="/imgs/campaign-user.png" alt="" />
            </div>
            <div className="flex-1 mt-16">
              <div className="text-white text-base font-bold">
                Tạo chiến dịch tuyển dụng mới
              </div>
              <div className="text-white font-normal">
                Tên chiến dịch tuyển dụng (
                <span className="text-xs">Tối đa 150 ký tự</span>)
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TmInput
                  name="name"
                  control={control}
                  placeholder="VD: Tuyển dụng tháng 8"
                />
                <button
                  type="submit"
                  className="w-full mt-4 py-3 text-white bg-[#0F7A00] rounded-lg text-base font-bold"
                >
                  Thêm mới
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
