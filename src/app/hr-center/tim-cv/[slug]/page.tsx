"use client";

import { useLoading } from "@/app/context/loading";
import { Option } from "@/component/hook-form/interface/interface";
import TmSelect from "@/component/hook-form/select";
import Modal from "@/component/modal";
import { ISaveCvSearch } from "@/interface/cv";
import { Campaign } from "@/module/helper/master-data";
import { CloudDownLoadFillBoostrapIcon } from "@/theme/icons/cloudDownloadFIllBootstrapIcon";
import {
  GET_ALL_JOB,
  GET_INFOMATIONDETAIL_SEARCH_CV,
  OPEN_CV,
  SAVE_JOB_SEARCH,
  UPLOAD_IMG,
} from "@/utils/api-url";
import axiosInstance, { axiosInstanceImg, fetcher } from "@/utils/axios";
import { ArrowDownTrayIcon, LockOpenIcon } from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import * as yup from "yup";

export default function ProfileDetailCv({
  params,
}: {
  params: { slug: string };
}) {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("idCampaign");
  const idCampaign = campaignId ? +campaignId : -1;
  const { slug } = params;
  const [htmlString, setHtmlString] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [type, setType] = useState("seeCV");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState("0px");
  const [jobs, setJobs] = useState<Option[]>([]);
  const { campaign } = Campaign();
  const { data: dataInfomation, mutate } = useSWR(
    `${GET_INFOMATIONDETAIL_SEARCH_CV}?searchId=${slug}`,
    fetcher
  );

  const getJobs = async (id: number) => {
    const res = await axiosInstance.get(GET_ALL_JOB, {
      params: {
        CampaigId: id,
      },
    });
    if (res.data.data.length > 0) {
      setJobs(
        res.data.data.map((item: any) => {
          return {
            label: item.name,
            value: item.id,
          };
        })
      );
    }
  };

  useEffect(() => {
    getHtml();

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

  const handleOpenCv = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(OPEN_CV, {
        searchId: slug,
        linkFile: "",
        campaign: idCampaign,
      });
      setIsOpenModal(false);
      mutate();
      getHtml();
      toast.success("Mở cv thành công");
    } catch (error) {
      toast.error("Mở cv thất bại");
    } finally {
      setLoading(false);
    }
  };

  const readPDFBuffer = async () => {
    const response = await fetch(`/api/generate-pdf?searchId=${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  };

  const handleDownloadCV = async () => {
    setLoading(true);
    try {
      const response = await readPDFBuffer();
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element for downloading the file
      const a = document.createElement("a");
      a.href = url;
      a.download = `CV-${dataInfomation?.fullName}-${dataInfomation?.posipositionText}-Topmass`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setIsOpenModal(false);
      toast.success("Download cv thành công");
    } catch (error) {
      toast.error("Download cv thất bại");
    } finally {
      setLoading(false);
    }
  };

  const schema = yup.object().shape({
    campaign: yup
      .number()
      .typeError("")
      .required("Vui Vui lòng chọn chiến dịch")
      .min(0, "Vui lòng chọn chiến dịch"),
    jobId: yup.number().typeError(""),
  });

  const { control, handleSubmit } = useForm<ISaveCvSearch>({
    resolver: yupResolver(schema),
    defaultValues: {
      campaign: idCampaign,
      jobId: -1,
    },
  });

  const convertToFile = async () => {
    const res = await readPDFBuffer();
    const pdfBuffer = await res.arrayBuffer();

    // Create a File object from the buffer
    const file = new File([pdfBuffer], `${dataInfomation?.fullName}.pdf`, {
      type: "application/pdf",
    });

    // Create FormData and append the file
    return file;
  };

  const onSubmit: SubmitHandler<ISaveCvSearch> = async (data) => {
    setLoading(true);
    try {
      const file = await convertToFile();
      const response = await axiosInstanceImg.post(UPLOAD_IMG, {
        file: file,
      });

      const dataUpdate = {
        searchId: +slug,
        linkFile: response.data.fullLink,
        ...data,
      };

      const res = axiosInstance.post(SAVE_JOB_SEARCH, dataUpdate);
      setIsOpenModal(false);
      toast.success("Lưu trữ cv thành công");
    } catch (error) {
      toast.error("Lưu trữ cv thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-3 ">
      <div className="p-2 bg-white">
        <div className="grid grid-cols-5 space-x-4">
          <div className="col-span-4">
            <div className="mt-4">
              <iframe
                ref={iframeRef}
                src=""
                srcDoc={htmlString}
                className="w-full"
                style={{
                  height: iframeHeight,
                  overflow: "hidden",
                }}
              ></iframe>
            </div>
          </div>
          <div className="col-span-1 px-2 py-4 space-y-2">
            <button
              className={`w-full py-2 text-white bg-colorBase flex items-center justify-center rounded ${
                !dataInfomation?.isHideInfo ? "bg-slate-400" : ""
              }`}
              disabled={!dataInfomation?.isHideInfo}
              onClick={() => setIsOpenModal(true)}
            >
              <LockOpenIcon className="w-4 mr-2" /> Mở khoá
            </button>
            <button
              className={`w-full py-2 text-white bg-colorBase flex items-center justify-center rounded`}
              onClick={() => {
                setType("saveCV");
                setIsOpenModal(true);
              }}
            >
              <CloudDownLoadFillBoostrapIcon className="w-4 mr-2" /> Lưu CV
            </button>
            <button
              className={`w-full py-2 text-white bg-colorBase flex items-center justify-center rounded ${
                dataInfomation?.isHideInfo ? "bg-slate-400" : ""
              }`}
              onClick={() => {
                setType("downloadCV");
                setIsOpenModal(true);
              }}
              disabled={dataInfomation?.isHideInfo}
            >
              <ArrowDownTrayIcon className="w-4 mr-2" /> Tải CV
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        {type === "seeCV" && (
          <div>
            <div className=" flex space-x-2 justify-center">
              Bạn có đồng ý sử dụng {dataInfomation?.point}{" "}
              <img src="/imgs/arrow.svg" alt="" className="w-2 mr-1" /> để mở CV
            </div>
            <div className="flex justify-center space-x-2 mt-4 ">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-1 rounded"
                onClick={() => setIsOpenModal(false)}
              >
                Huỷ bỏ
              </button>
              <button
                className="border border-[#F37A20] text-mainstream px-4 py-1 hover:text-white hover:bg-mainstream rounded"
                onClick={handleOpenCv}
              >
                Đồng ý
              </button>
            </div>
          </div>
        )}

        {type === "downloadCV" && (
          <div>
            <div className="text-center">Bạn có muốn tải CV</div>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-1 rounded"
                onClick={() => setIsOpenModal(false)}
              >
                Huỷ bỏ
              </button>
              <button
                className="border border-[#F37A20] text-mainstream px-4 py-1 hover:text-white hover:bg-mainstream rounded"
                onClick={handleDownloadCV}
              >
                Đồng ý
              </button>
            </div>
          </div>
        )}

        {type === "saveCV" && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="font-medium">
                  Chiến dịch <span className="text-[#dc2f2f]">*</span>
                </div>
                <div className="flex-1">
                  <TmSelect
                    name="campaign"
                    control={control}
                    options={campaign}
                    placeholder="Chiến dịch"
                    onChange={(e) => getJobs(+e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3">
                <div className="font-medium">
                  Tin <span className="text-[#dc2f2f]">*</span>
                </div>
                <div className="flex-1">
                  <TmSelect
                    name="jobId"
                    control={control}
                    options={jobs}
                    placeholder="Tin"
                  />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full mt-4 py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
