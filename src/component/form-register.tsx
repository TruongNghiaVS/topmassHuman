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
import { REGISTER, REVALIDATE_ACCOUNT } from "@/utils/api-url";
import { useEffect, useState } from "react";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  EyeIcon,
  IdentificationIcon,
  KeyIcon,
  PhoneIcon,
} from "@heroicons/react/16/solid";

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
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("password"), undefined],
      "Nhập lại mật khẩu không chính xác"
    )
    .required("Vui lòng nhập xác nhận mật khẩu"),
});

export const FormRegister = () => {
  const { setLoading } = useLoading();
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });
  const { handleSubmit, control, reset } = useForm<IRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      taxCode: "",
      confirm_password: "",
    },
  });
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isDisabled && isSuccess) {
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
  }, [isDisabled, isSuccess]);

  const handleClick = async () => {
    try {
      setLoading(true);
      await axiosInstanceNotToken.post(REVALIDATE_ACCOUNT, { email });
      toast.success("Yêu cầu gửi email thành công");
    } catch (error) {
      toast.error("Yêu cầu gửi email thất bại");
    } finally {
      setLoading(false);
      setIsDisabled(true);
    }
  };

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      setEmail(data.email);
      setLoading(true);
      const response: any = await axiosInstanceNotToken.post(REGISTER, data);
      if (response && response.success) {
        toast.success("Đăng ký thành công");
        reset({});
        setIsSuccess(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Đăng ký không thành công");
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
      {!isSuccess ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <div>
              Email <span className="text-[#dc2f2f]">*</span>
            </div>
            <TmInput
              control={control}
              placeholder="Sử dụng email có thật để xác thực"
              name="email"
              icon={<EnvelopeIcon className="w-5" />}
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
              placeholder="Từ 6 tới 25 ký tự,1 chữ hoa, 1 chữ số"
              type={showPassword.password ? "text" : "password"}
              icon={<KeyIcon className="w-5" />}
              afterIcon={
                <button
                  type="button"
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
              icon={<KeyIcon className="w-5" />}
              afterIcon={
                <button
                  type="button"
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
          <div className="mb-2">
            <div className="">
              Số điện thoại <span className="text-[#dc2f2f]">*</span>
            </div>
            <div className="flex-grow">
              <TmInput
                control={control}
                name="phone"
                icon={<PhoneIcon className="w-5" />}
                placeholder="Số điện thoại"
              />
            </div>
          </div>
          <div className="mb-2">
            <div className="">
              Tên công ty <span className="text-[#dc2f2f]">*</span>
            </div>
            <TmInput
              control={control}
              name="name"
              placeholder="Tên công ty"
              icon={<BuildingOffice2Icon className="w-5" />}
            />
          </div>
          <div className="mb-2">
            <div>
              Mã số thuế <span className="text-[#dc2f2f]">*</span>
            </div>
            <TmInput
              control={control}
              placeholder="Mã số thuế"
              name="taxCode"
              icon={<IdentificationIcon className="w-5" />}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
          >
            Đăng ký
          </button>
        </form>
      ) : (
        <div>
          <div className="font-medium">
            Bạn đã đăng ký thành công. Vui lòng kiểm tra email để xác thực tài
            khoản
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
