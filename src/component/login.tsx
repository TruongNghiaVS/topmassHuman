import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import TmInput from "./hook-form/input";
import Link from "next/link";
import { axiosInstanceNotToken } from "@/utils/axios";
import { useLoading } from "@/app/context/loading";
import Cookies from "js-cookie";
import { ILogin, ILoginForm } from "@/interface/interface";
import { LOGIN } from "@/utils/api-url";

export const LoginForm = ({ onClose }: ILoginForm) => {
  const { setLoading } = useLoading();

  const schema = yup.object().shape({
    userName: yup
      .string()
      .required("Email không được để trống")
      .email("Sai format email "),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(6, "Tối thiểu 6 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .matches(/^(?=.*[A-Z])(?=.*\d)/, "Phải có 1 ký tự in hoa và 1 chữ số"),
  });

  const { handleSubmit, control } = useForm<ILogin>({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    setLoading(true);
    try {
      const response: any = await axiosInstanceNotToken.post(LOGIN, data);
      if (response && response.token) {
        Cookies.set("token", response.token, { expires: 7 });
        toast.success("Đăng nhập thành công");
      }
      if (onClose) {
        onClose();
      }
      router.push("/hr-center/bang-tin");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          (props: any) => {
            return props.data.dataError.map((itemError: any) => {
              return (
                <div key={itemError.errorCode}>
                  {itemError.errorCode}: {itemError.errorMesage}
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
        Chào mừng bạn đến với Topmass
      </div>
      <div className="mb-4 font-normal">
        Cùng xây dựng một hệ sinh thái tuyển dụng nhân sự cùng với nguồn ứng
        viên khổng lồ từ Topmass
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div>
            Email <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput
            control={control}
            placeholder="Email"
            name="userName"
            type="email"
          />
        </div>
        <div className="mb-4">
          <div>
            Mật khẩu <span className="text-[#dc2f2f]">*</span>
          </div>
          <TmInput
            control={control}
            name="password"
            placeholder="Mật khẩu"
            type="password"
          />
        </div>
        <div className="font-normal text-base text-right mb-4 text-[#F37A20]">
          <Link href="quen-mat-khau">Quên mật khẩu</Link>
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
        >
          Đăng nhập
        </button>
      </form>
      <div className="text-[#8E8D8D] font-normal text-base mt-8 text-center pb-4 ">
        Bạn chưa có tài khoản?{" "}
        <Link href="/dang-ky" className="text-[#F37A20]">
          Đăng ký
        </Link>{" "}
        ngay
      </div>
    </div>
  );
};
