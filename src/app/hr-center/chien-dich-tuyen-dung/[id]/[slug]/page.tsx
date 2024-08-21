"use client";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";
import { RecruimentNews } from "./setting/recruiment-new";
import { ApplicationCV } from "./setting/application-cv";
import { CandidateCv } from "./setting/candidate-cv";
import { CvSearch } from "./setting/cv-search";

export default function RecruimentPosition() {
  const [selected, setSelected] = useState<number>(1);
  return (
    <div>
      <div className="bg-white flex whitespace-nowrap space-x-4 items-center p-4 border-b">
        <Link
          href="/hr-center/chien-dich-tuyen-dung/1"
          className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
        >
          <ArrowUturnLeftIcon className="w-4 mr-1" />
          Trở vế
        </Link>
        <div>Tuyển dụng MKT tháng 9</div>
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
        {selected === 1 && <RecruimentNews />}
        {selected === 2 && <ApplicationCV />}
        {selected === 3 && <CandidateCv />}
        {selected === 4 && <CvSearch />}
      </div>
    </div>
  );
}
