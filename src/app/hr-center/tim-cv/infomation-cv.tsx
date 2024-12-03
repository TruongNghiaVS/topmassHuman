import { ISearchCvDetailProps } from "@/interface/cv";
import { formatDateDifference, renderRangeSalary } from "@/utils/custom-hook";
import {
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ClockIcon,
  CurrencyDollarIcon,
  EyeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function InfomationCv({
  item,
  idCampaign,
}: ISearchCvDetailProps) {
  return (
    <div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-x-4 p-4 bg-white pb-6 border-b">
        <div className="col-span-1">
          <div className="flex space-x-1">
            <div className="flex-auto w-20">
              <img
                src={
                  item.avatarlink.length > 0
                    ? item.avatarlink
                    : "/imgs/no-avatar.png"
                }
                alt=""
                className="w-10 h-10 p-0.5 bg-[#F37A20] rounded-full mr-2"
              />
            </div>
            <div className="flex-auto w-72">
              <div className="text-base hover:text-[#F37A20]">
                <Link
                  href={`/hr-center/tim-cv/${item.searchId}?idCampaign=${idCampaign}`}
                >
                  {item.fullName}
                </Link>
              </div>
              <div className="inline-block mt-2 text-white bg-[#CC0000] rounded-xl px-2 py-0.5 text-xs">
                {item.statusProfile}
              </div>
              <div className="flex items-start">
                <BriefcaseIcon className="w-4 mr-1 " /> {item.position}
              </div>
              <div className="flex items-start">
                <MapPinIcon className="w-4 mr-1 " /> {item.location}
              </div>
              <div className="mt-1 p-2 bg-[#F7F2EB]">
                <div className="flex text-xs mt-0.5">
                  <ClockIcon className="w-4 mr-1 " />
                  {formatDateDifference(item.lastUpdate)}
                </div>
                <div className="flex text-xs mt-0.5">
                  <CurrencyDollarIcon className="w-4 mr-1 " />{" "}
                  {renderRangeSalary(item.salaryFrom, item.salaryTo, "0")}
                </div>
                <div className="flex text-xs mt-0.5">
                  <EyeIcon className="w-4 mr-1 " /> {item.totalView} lượt xem
                </div>
                <div className="flex text-xs mt-0.5">
                  <BookOpenIcon className="w-4 mr-1 " /> {item.totalContact}{" "}
                  lượt liên hệ
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2 sm:mt-0 mt-2">
          <div>Kinh nghiệm ({item.experienceText})</div>
          <div className="flex items-start">
            <BriefcaseIcon className="w-4 mr-1 " /> {item.experienceContent}
          </div>
          <div className="mt-2">Học vấn</div>
          <div className="flex items-start">
            <AcademicCapIcon className="w-4 mr-1 " /> Marjor:
            {item.educationText}
          </div>
          <div className="mt-2">Mục tiêu sự nghiệp</div>
          <div className="flex items-start">
            <div>
              <AcademicCapIcon className="w-4 mr-1 " />{" "}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: item.jobObjectiveText }}
            ></div>
          </div>
          <div className="text-default">
            <Link
              href={`/hr-center/tim-cv/${item.searchId}?idCampaign=${idCampaign}`}
            >
              Xem thêm...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
