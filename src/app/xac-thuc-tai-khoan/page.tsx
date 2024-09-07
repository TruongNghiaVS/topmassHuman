"use client";

import { AuthorizeLayout } from "@/component/authorize";
import Link from "next/link";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstanceNotToken } from "@/utils/axios";
import { setToken } from "@/utils/token";
import { useLoading } from "../context/loading";
import { CONFIRMACCOUNT } from "@/utils/api-url";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(0);
  const { setLoading } = useLoading(); // Access loading context

  const schema = yup.object().shape({
    password: yup.string().required("Vui lòng nhập mật khẩu củ"),
  });

  useEffect(() => {
    const code = searchParams.get("code"); // 'myParam' is the query param key

    if (code) {
      setLoading(true);
      axiosInstanceNotToken
        .post(CONFIRMACCOUNT, {
          code: code,
        })
        .then((response: any) => {
          if (response) {
            setStatus(1);
            toast.success("Xác thực thông tin thành công");
          }
        })
        .catch((error) => {
          setStatus(2);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams]);

  return (
    <div>
      <AuthorizeLayout>
        <div>
          <div className="text-2xl font-normal mb-4 text-[#F37A20]">
            Chào mừng bạn đến với Topmass
          </div>
          <div className="mb-4 font-normal">
            Cùng xây dựng một hệ sinh thái tuyển dụng nhân sự cùng với nguồn ứng
            viên khổng lồ từ Topmass
          </div>

          {status === 0 && (
            <div className="mb-4 font-medium">
              Đang kiểm tra thông tin xác thực
            </div>
          )}

          {status === 1 && (
            <div>
              <div className="mt-2 text-base">
                Xác thực thông tin thành công
              </div>
              <div className="mt-2 text-base">
                Chúc mừng bạn đã tạo thành công thông tin tài khoản của Topmass
              </div>
              <div className="mt-2 text-base">
                Vui lòng{" "}
                <Link href="/dang-nhap" className="text-default font-medium">
                  đăng nhập
                </Link>
              </div>
            </div>
          )}

          {status === 2 && (
            <div className="mb-4 font-medium text-red-700">
              Xác thực không thành công. Vui lòng kiểm tra lại email
            </div>
          )}

          <div className="text-[#8E8D8D] font-normal text-base mt-8 text-center pb-4 ">
            Bạn chưa có tài khoản?{" "}
            <Link href="/dang-ky" className="text-[#F37A20]">
              Đăng ký
            </Link>{" "}
            ngay
          </div>
        </div>
      </AuthorizeLayout>
    </div>
  );
}
