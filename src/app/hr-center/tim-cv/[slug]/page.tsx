"use client";

import { useLoading } from "@/app/context/loading";
import { GET_INFOMATIONDETAIL_SEARCH_CV, GET_PROFILE_SEARCH_CV } from "@/utils/api-url";
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

  const { data: dataInfomation } = useSWR(
    `${GET_INFOMATIONDETAIL_SEARCH_CV}?searchId=${slug}`,
    fetcher
  );

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      iframe.onload = () => {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
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
              <div>{dataInfomation?.fullName}</div>
            </div>
            <div className="flex space-x-2">
              <div className="font-medium min-w-40">Giới tính:</div>
              <div>{dataInfomation?.genderText}</div>
            </div>
            <div className="flex space-x-2">
              <div className="font-medium min-w-40">Tỉnh/thành phố:</div>
              <div>{dataInfomation?.locationText}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 items-end ">
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Dùng 5 tia sét để mở CV</button>
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Tải file</button>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Lưu</button>
        
        </div>
        <div className="mt-4 p-4">
          <div className="py-2 text-[#F37A20] text-xl font-bold">
            Thông tin nghề nghiệp
          </div>
          <div className="mt-2 grid grid-cols-2">
            <div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Năm kinh ngiệm:</div>
                <div>{dataInfomation?.experienceText}</div>
              </div>
              {/* <div className="flex space-x-2">
                <div className="font-medium min-w-40">Bằng cấp:</div>
                <div>bằng đại học</div>
              </div> */}
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Cấo bậc:</div>
                <div>{dataInfomation?.levelText}</div>
              </div>
              {/* <div className="flex space-x-2">
                <div className="font-medium min-w-40">Nghề nghiệp:</div>
                <div>IT</div>
              </div> */}
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Cập nhật:</div>
                <div>04/10/2024</div>
              </div>
            </div>
            <div>
              {/* <div className="flex space-x-2">
                <div className="font-medium min-w-40">Ngoại ngữ:</div>
                <div>Tiêngs anh</div>
              </div> */}
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Mức lương mong muốn:</div>
                <div>{dataInfomation?.salaryExpertText}</div>
              </div>
              <div className="flex space-x-2">
                <div className="font-medium min-w-40">Địa điểm:</div>
                <div>{dataInfomation?.locationText}</div>
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
