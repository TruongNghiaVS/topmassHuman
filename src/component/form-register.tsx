"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import TmInput from "./hook-form/input";
import { IRegister } from "@/interface/interface";
import { useLoading } from "@/app/context/loading";
import { axiosInstanceNotToken } from "@/utils/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { REGISTER } from "@/utils/api-url";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]{10}$/, "Số điện thoại phải là 10 ký tự"),
  email: yup.string().email("Sai format email ").required("Vui lòngnhập email"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Tối thiểu 6 ký tự")
    .max(50, "Tối đa 50 ký tự")
    .matches(/^(?=.*[A-Z])(?=.*\d)/, "Phải có 1 ký tự in hoa và 1 chữ số"),
  taxCode: yup
    .string()
    .required("Vui lòng nhập mã số thuế")
    .matches(/^\d+$/, "mã số thuế phải là chữ số")
    .min(10, "Mã số thuế tối thiểu 10 ký tự")
    .max(12, "Mã số thuế tối đa 12 ký tự"),
});

export const FormRegister = () => {
  const { setLoading } = useLoading();

  const { handleSubmit, control, reset } = useForm<IRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      taxCode: "",
    },
  });

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    setLoading(true);
    try {
      const response: any = await axiosInstanceNotToken.post(REGISTER, data);
      if (response && response.success) {
        toast.success("Đăng ký thành công");
        reset({
          name: "",
          phone: "",
          email: "",
          password: "",
          taxCode: "",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          (props: any) => {
            return props.data.dataError.map((itemError: any) => {
              return (
                <div key={itemError.errorCode}>
                  {itemError.errorCode} : {itemError.errorMesage}
                </div>
              );
            });
          },
          {
            data: {
              dataError: error.response?.data.dataEror,
            },
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-2xl font-normal mb-4 text-[#F37A20]">
        Đăng ký tài khoản nhà tuyển dụng
      </div>
      <div className="mb-2 font-normal">
        Cùng xây dựng một hệ sinh thái tuyển dụng nhân sự cùng với nguồn ứng
        viên khổng lồ từ Topmass
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <div className="">
            Tên <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput control={control} name="name" />
        </div>
        <div className="mb-2">
          <div className="">
            Số điện thoại <span className="text-[#dc2f2f]">*</span>
          </div>
          <div className="flex-grow">
            <TmInput control={control} name="phone" />
          </div>
        </div>
        <div className="mb-2">
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
        <div className="mb-2">
          <div>
            Mật khẩu <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput
            control={control}
            name="password"
            placeholder="Từ 6 tới 50 ký tự,1 chữ hoa, 1 chữ số"
            type="password"
          />
        </div>
        <div className="mb-2">
          <div>
            Mã số thuế <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput control={control} placeholder="Mã số thuế" name="taxCode" />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
        >
          Đăng ký
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
