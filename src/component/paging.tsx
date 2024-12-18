import { IPaging } from "@/interface/interface";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export const Paging = ({
  setCurrentPage,
  currentPage,
  lengthData,
}: IPaging) => {
  const [arrPage, setArrPage] = useState<number[]>([]);

  useEffect(() => {
    const length = Math.ceil(lengthData / 10);
    const arrLength = Array.from({ length: length }, (_, i) => {
      return i + 1;
    }).filter((i) => i > 0);
    setArrPage(arrLength);
  }, [lengthData]);

  return (
    <div>
      <div className="flex sm:justify-center mt-4 space-x-1 flex-wrap justify-center">
        <button
          id="prev-hot-job"
          className="border w-[34px] h-[34px] border-[#F37A20] rounded-full border-[1px] mt-1 px-2"
          onClick={() => {
            setCurrentPage(currentPage);
          }}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="text-[#F37A20] w-4" />
        </button>
        {arrPage.map((item) => {
          return (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`w-[34px] h-[34px] border border-[#F37A20] mt-1 ${
                currentPage === item
                  ? "bg-[#F37A20] text-white"
                  : "text-[#F37A20]"
              } rounded-full border-[1px] px-2 py-1 text-xs`}
            >
              {item}
            </button>
          );
        })}
        <button
          id="next-hot-job"
          className="border w-[34px] h-[34px] border-[#F37A20] rounded-full border-[1px] mt-1 px-2"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === length}
        >
          <ChevronRightIcon className="text-[#F37A20] w-4" />
        </button>
      </div>
    </div>
  );
};
