"use client";

import TmInput from "@/component/hook-form/input";
import { ICampaign } from "@/interface/interface";
import {
  ArrowUturnLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function CreateCampaign() {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên chiến dịch"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver<ICampaign>(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<ICampaign> = (data) => {
    toast.success("Thêm mới chiến dịch thành công!");
    console.log(data);
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
            Trở vế
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
                Tên chiến dịch tuyển dụng
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
                  Cập nhật
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
