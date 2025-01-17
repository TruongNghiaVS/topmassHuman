"use client";

import { useLoading } from "@/app/context/loading";
import { REVALIDATE_ACCOUNT } from "@/utils/api-url";
import { axiosInstanceNotToken } from "@/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AuthorizeLayout } from "@/component/authorize";

export default function VerifyEmailOverview() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState("");
  const { setLoading } = useLoading();

  useEffect(() => {
    const emailCookie = Cookies.get("email");
    setEmail(emailCookie || "");
    let interval: NodeJS.Timeout | null = null;

    if (isDisabled) {
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
  }, [isDisabled]);

  const handleClick = async () => {
    try {
      setLoading(true);
      await axiosInstanceNotToken.post(REVALIDATE_ACCOUNT, { email });
      toast.success("Yêu cầu gửi email thành công");
    } catch (error) {
      toast.success("Yêu cầu gửi email thất bại");
    } finally {
      setLoading(false);
      setIsDisabled(true);
    }
  };

  return (
    <AuthorizeLayout>
      <div>
        <div className="font-medium">
          Bạn chưa xác thực tài khoản. Vui lòng kiểm tra email để xác thực tài
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
    </AuthorizeLayout>
  );
}
