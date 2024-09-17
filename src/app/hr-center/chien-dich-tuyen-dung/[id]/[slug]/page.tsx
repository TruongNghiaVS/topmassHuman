"use client";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";
import { RecruimentNews } from "./setting/recruiment-new";
import { ApplicationCV } from "./setting/application-cv";
import { CandidateCv } from "./setting/candidate-cv";
import { CvSearch } from "./setting/cv-search";
import { useParams } from "next/navigation";
import { GET_DETAIL_JOB } from "@/utils/api-url";
import useSWR from "swr";
import { fetcher } from "@/utils/axios";

export default function RecruimentPosition() {
  const params = useParams();
  const idCampaign = +(params.id as string);
  const idJob = +(params.slug as string);
  const [selected, setSelected] = useState<number>(1);
  const { data: jobInfo, error } = useSWR(
    `${GET_DETAIL_JOB}?JobId=${idJob}`,
    fetcher
  );

  return (
    <div>
      <div className="bg-white flex whitespace-nowrap space-x-4 items-center p-4 border-b">
        <Link
          href={`/hr-center/chien-dich-tuyen-dung/${idCampaign}`}
          className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
        >
          <ArrowUturnLeftIcon className="w-4 mr-1" />
          Trở vế
        </Link>
        <div>{jobInfo?.name}</div>
      </div>
      <div className="flex space-x-6 p-2">
        <button
          className={`flex-1 bg-[#E2E1E0] rounded py-2 ${
            selected === 1 && "bg-[#F37A20] text-white"
          }`}
          onClick={() => setSelected(1)}
        >
          Tin tuyển dụng
        </button>
        <button
          className={`flex-1 bg-[#E2E1E0] rounded py-2 ${
            selected === 2 && "bg-[#F37A20] text-white"
          }`}
          onClick={() => setSelected(2)}
        >
          CV ứng tuyển
        </button>
        <button
          className={`flex-1 bg-[#E2E1E0] rounded py-2 ${
            selected === 3 && "bg-[#F37A20] text-white"
          }`}
          onClick={() => setSelected(3)}
        >
          Ứng viên xem tin
        </button>
        <button
          className={`flex-1 bg-[#E2E1E0] rounded py-2 ${
            selected === 4 && "bg-[#F37A20] text-white"
          }`}
          onClick={() => setSelected(4)}
        >
          CV tìm kiếm
        </button>
      </div>
      <div className="mt-4">
        {selected === 1 && <RecruimentNews idJob={idJob} />}
        {selected === 2 && <ApplicationCV idJob={idJob} />}
        {selected === 3 && <CandidateCv />}
        {selected === 4 && <CvSearch />}
      </div>
    </div>
  );
}
