"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { StarIcon } from "@heroicons/react/16/solid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import TmInput from "./hook-form/input";
import { IRegister } from "@/interface/interface";
import TmSelect from "./hook-form/select";
import { areaCode } from "@/mockup-data/data";

const FlagStarVN = () => {
  return (
    <div className="py-1 px-2 bg-[#D32F2F] border">
      <StarIcon className="text-[#EBA432] w-3" />
    </div>
  );
};

const schema = yup.object().shape({
  last_name: yup.string(),
  first_name: yup.string(),
  first_phone: yup.string(),
  phone_number: yup
    .string()
    .required("Bắt buộc nhập số điện thoại")
    .matches(/^[0-9]{10}$/, "Số điện thoại phải là 10 ký tự"),
  email: yup
    .string()
    .email("Sai format email ")
    .required("Bắt buộc nhập email"),
  password: yup
    .string()
    .required("Bắt buộc nhập password")
    .min(6, "Tối thiểu 6 ký tự")
    .max(50, "Tối đa 50 ký tự")
    .matches(/^(?=.*[A-Z])(?=.*\d)/, "Phải có 1 ký tự in hoa và 1 chữ số"),
  is_used: yup
    .boolean()
    .required("Please check")
    .oneOf([true], "Vui lòng chọn xác nhận với thoả thuận"),
});

export const FormRegister = () => {
  const { handleSubmit, control } = useForm<IRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      last_name: "",
      first_name: "",
      first_phone: "0",
      phone_number: "",
      email: "",
      password: "",
      is_used: false,
    },
  });

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="text-2xl font-normal mb-4 text-[#F37A20]">
        Đăng ký tài khoản nhà tuyển dụng
      </div>
      <div className="mb-4 font-normal">
        Cùng xây dựng một hệ sinh thái tuyển dụng nhân sự cùng với nguồn ứng
        viên khổng lồ từ Topmass
      </div>
      <div className="grid grid-cols-2 gap-x-8 mb-8">
        <div className="col-span-1">
          <button className="flex items-center justify-center border border-solid border-[#8E8D8D] w-full py-2 bg-[#F9F9F9] rounded">
            <img src="/imgs/facebook.png" alt="" className="w-6 mr-2" />
            <div className="text-xs font-normal">Với tài khoản Facebook</div>
          </button>
        </div>
        <div className="col-span-1">
          <button className="flex items-center justify-center border border-solid border-[#8E8D8D] w-full py-2 bg-[#F9F9F9] rounded">
            <img src="/imgs/google.png" alt="" className="w-6 mr-2" />
            <div className="text-xs font-normal">Với tài khoản Google</div>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:grid grid-cols-2 gap-x-8 mb-8">
          <div className="col-span-1">
            <div className="">Tên</div>
            <TmInput name="last_name" control={control} />
          </div>
          <div className="col-span-1">
            <div className="col-span-1">
              <div className="">Họ</div>
              <TmInput control={control} name="first_name" />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="">
            Số điện thoại <span className="text-[#dc2f2f]">*</span>
          </div>
          <div className="flex">
            <TmSelect
              control={control}
              name="first_phone"
              icon={<FlagStarVN />}
              className="py-2.5 pr-2 mr-2"
              options={areaCode}
            />
            <div className="flex-grow">
              <TmInput control={control} name="phone_number" />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div>
            Email <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput
            control={control}
            placeholder="Sử dụng email có thật để xác thực"
            name="email"
            type="email"
          />
        </div>
        <div className="mb-8">
          <div>
            Password <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput
            control={control}
            name="password"
            placeholder="Từ 6 tới 50 ký tự,1 chữ hoa, 1 chữ số"
            type="password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
        >
          Hoàn tất
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
  );
};
