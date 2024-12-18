"use client";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RecruimentNews } from "./setting/recruiment-new";
import { ApplicationCV } from "./setting/application-cv";
import { CandidateCv } from "./setting/candidate-cv";
import { CvSearch } from "./setting/cv-search";
import { useParams } from "next/navigation";
import {
  GET_ALL_CV_SAVE_SEARCH,
  GET_DETAIL_JOB,
  GET_STATUS_APPLY_CV,
} from "@/utils/api-url";
import useSWR from "swr";
import axiosInstance, { fetcher } from "@/utils/axios";
import { useLoading } from "@/app/context/loading";
import { Option } from "@/component/hook-form/interface/interface";

export default function RecruimentPosition() {
  const params = useParams();
  const idCampaign = +(params.id as string);
  const idJob = +(params.slug as string);
  const [selected, setSelected] = useState<number>(1);

  const { data: jobInfo, error } = useSWR(
    `${GET_DETAIL_JOB}?JobId=${idJob}`,
    fetcher
  );

  const { data: candidateCv, mutate } = useSWR(
    `${GET_ALL_CV_SAVE_SEARCH}?JobId=${idJob}`,
    fetcher
  );

  const [statusApply, setStatusApply] = useState<Option[]>([]);

  const { setLoading } = useLoading();

  const getStatusApply = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_STATUS_APPLY_CV);
      const data = response.data.map((item: any) => ({
        label: item.text,
        value: item.id,
      }));
      setStatusApply([{ label: "Tất cả", value: -1 }, ...data]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatusApply();
  }, []);

  return (
    <div>
      <div className="bg-white flex whitespace-nowrap space-x-4 items-center p-4 border-b">
        <Link
          href={`/hr-center/chien-dich-tuyen-dung/${idCampaign}`}
          className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
        >
          <ArrowUturnLeftIcon className="w-4 mr-1" />
          Trở về
        </Link>
        <div>{jobInfo?.name}</div>
      </div>
      <div className="flex sm:space-x-6 p-2 sm:flex-row flex-col space-y-1 sm:space-y-0">
        <button
          className={`flex-1 bg-[#E2E1E0] rounded py-2 whitespace-nowrap ${
            selected === 1 && "bg-[#F37A20] text-white"
          }`}
          onClick={() => setSelected(1)}
        >
          Tin tuyển dụng
        </button>
        <button
          className={`flex-1 bg-[#E2E1E0] rounded py-2 whitespace-nowrap ${
            selected === 2 && "bg-[#F37A20] text-white"
          }`}
          onClick={() => setSelected(2)}
        >
          CV ứng tuyển
        </button>
        <button
          className={`flex-1 bg-[#E2E1E0] rounded py-2 whitespace-nowrap ${
            selected === 3 && "bg-[#F37A20] text-white"
          }`}
          onClick={() => setSelected(3)}
        >
          Ứng viên xem tin
        </button>
        <button
          className={`flex-1 bg-[#E2E1E0] rounded py-2 whitespace-nowrap ${
            selected === 4 && "bg-[#F37A20] text-white"
          }`}
          onClick={() => setSelected(4)}
        >
          CV tìm kiếm
        </button>
      </div>
      <div className="mt-4">
        {selected === 1 && (
          <RecruimentNews idJob={idJob} statusApply={statusApply} />
        )}
        {selected === 2 && (
          <ApplicationCV idJob={idJob} statusApply={statusApply} />
        )}
        {selected === 3 && (
          <CandidateCv idJob={idJob} statusApply={statusApply} />
        )}
        {selected === 4 && (
          <CvSearch
            candidateCv={candidateCv?.data}
            mutate={mutate}
            idJob={idJob}
            statusApply={statusApply}
          />
        )}
      </div>
    </div>
  );
}
