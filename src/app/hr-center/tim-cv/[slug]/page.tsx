"use client";

import { useLoading } from "@/app/context/loading";
import { GET_PROFILE_SEARCH_CV } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function ProfileDetailCv({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [htmlString, setHtmlString] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState("0px");
  const { data, error } = useSWR(
    `${GET_PROFILE_SEARCH_CV}?searchId=${slug}`,
    fetcher
  );

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      iframe.onload = () => {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
          // Set iframe height to the content height
          const height = iframeDocument.documentElement.scrollHeight;
          setIframeHeight(`${height}px`);
        }
      };
    }
  }, [htmlString]);

  const { setLoading } = useLoading();

  const getHtml = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/generate-html?searchId=${slug}`, {
        method: "GET",
      });

      if (response.ok) {
        const body = await response.json();
        setHtmlString(body.htmlContent);
      } else {
        console.error("Failed to generate PDF");
        toast.error("Lấy thông tin cv thành công");
      }
    } catch (error) {
      toast.error("Lấy thông tin cv thành công");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHtml();
  }, []);

  return (
    <div className="m-3 ">
      <div className="p-2 bg-white">
        <div className="flex space-x-3 ">
          <div className="w-40">
            <img src="/imgs/bg-authorize.png" className="w-full" alt="" />
          </div>
          <div>
            <div className="flex space-x-2">
              <div className="font-medium min-w-40">Ứng viên:</div>
              <div>Nguyễn Văn A</div>
            </div>
            <div className="flex space-x-2">
              <div className="font-medium min-w-40">Giới tính:</div>
              <div>Nam</div>
            </div>
            <div className="flex space-x-2">
              <div className="font-medium min-w-40">Tỉnh/thành phố:</div>
              <div>Hồ Chí Minh</div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-4">
          <div className="py-2 text-[#F37A20] text-xl font-bold">
            Thông tin nghề nghiệp
          </div>
          <div className="mt-2 grid grid-cols-2">
            <div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Năm kinh ngiệm:</div>
                <div>3 năm</div>
              </div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Bằng cấp:</div>
                <div>bằng đại học</div>
              </div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Cấo bậc:</div>
                <div>Quản lý</div>
              </div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Nghề nghiệp:</div>
                <div>IT</div>
              </div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Cập nhật:</div>
                <div>04/10/2024</div>
              </div>
            </div>
            <div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Ngoại ngữ:</div>
                <div>Tiêngs anh</div>
              </div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Mức lương mong muốn:</div>
                <div>Thoả thuận</div>
              </div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Địa điểm:</div>
                <div>Hồ Chí Minh</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <iframe
            ref={iframeRef}
            src=""
            srcDoc={htmlString}
            className="w-full"
            style={{
              height: iframeHeight,
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
