"use client";

import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { ICampaign, IJob, IKeySearchJob } from "@/interface/interface";
import { browsings, campaignDetails, shows } from "@/mockup-data/data";
import {
  CHANGE_STATUS_JOB,
  GET_ALL_CAMPAIGN,
  GET_ALL_JOB,
} from "@/utils/api-url";
import axiosInstance, { fetcher } from "@/utils/axios";
import {
  ArrowUturnLeftIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function DetailCampaign({ params }: { params: { id: number } }) {
  const { id } = params;
  const { setLoading } = useLoading();
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [jobsSearch, setJobsSearch] = useState<IJob[]>([]);
  const [keySearch, setKeySearch] = useState<IKeySearchJob>({
    keyword: "",
    reasonCode: -1,
    resultCode: -1,
  });

  const { data: listJobs, error, mutate } = useSWR(
    `${GET_ALL_JOB}?CampaigId=${id}`,
    fetcher
  );

  const getCampaign = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_ALL_CAMPAIGN, {
        params: {
          status: -1,
        },
      });
      setCampaigns(response.data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (listJobs) {
      setJobs(listJobs ? listJobs.data : []);
      setJobsSearch(listJobs ? listJobs.data : []);
    }
    getCampaign();
  }, [listJobs, setKeySearch, setJobs, setJobsSearch]);

  const { control } = useForm({
    defaultValues: {
      show: "",
      browsing: "",
    },
  });

  const header = [
    "Tin tuyển dụng",
    "Hoạt động",
    "Tình trạng",
    "Trạng thái duyệt",
    "Tìm CV",
    "Tên chiến dịch",
    "Thời gian tạo",
  ];

  const getCampaignName = (idCampaign = -1) => {
    const idSearch = idCampaign === -1 ? id : idCampaign;
    const campaign = campaigns.find((item) => item.id === +idSearch);
    return campaign?.name;
  };

  const handleChangeStatus = async (checked: boolean, id: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(CHANGE_STATUS_JOB, {
        idUpdate: id,
        status: checked ? 1 : 0,
      });
      if (response) {
        toast.success("Cập nhật trạng thái thành công");
        mutate();
      }
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyword = (value: string) => {
    setKeySearch((preKey) => ({ ...preKey, keyword: value }));
    const data = jobsSearch.filter(
      (item) =>
        value === "" ||
        (item.name.toLowerCase().includes(value.toLowerCase()) &&
          (keySearch.reasonCode === -1 ||
            item.reason === keySearch.reasonCode) &&
          (keySearch.resultCode === -1 ||
            item.resultCode === keySearch.resultCode))
    );
    setJobs(data);

    if (
      value === "" &&
      keySearch.reasonCode === -1 &&
      keySearch.resultCode === -1
    ) {
      setJobs(jobsSearch);
    }
  };

  const handleReasonCode = (value: string) => {
    setKeySearch((preKey) => ({ ...preKey, reasonCode: +value }));
    const data = jobsSearch.filter(
      (item) =>
        keySearch.keyword === "" ||
        (item.name.toLowerCase().includes(keySearch.keyword.toLowerCase()) &&
          (+value === -1 || item.reason === +value) &&
          (keySearch.resultCode === -1 ||
            item.resultCode === keySearch.resultCode))
    );
    setJobs(data);

    if (
      keySearch.keyword === "" &&
      +value === -1 &&
      keySearch.resultCode === -1
    ) {
      setJobs(jobsSearch);
    }
  };

  const handleResultCode = (value: string) => {
    setKeySearch((preKey) => ({ ...preKey, resultCode: +value }));
    const data = jobsSearch.filter(
      (item) =>
        keySearch.keyword === "" ||
        (item.name.toLowerCase().includes(keySearch.keyword.toLowerCase()) &&
          (keySearch.reasonCode === -1 ||
            item.reason === keySearch.reasonCode) &&
          (+value === -1 || item.resultCode === +value))
    );
    setJobs(data);

    if (
      keySearch.keyword === "" &&
      keySearch.reasonCode === -1 &&
      +value === -1
    ) {
      setJobs(jobsSearch);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between sm:items-center p-4 sm:flex-row flex-col sm:space-y-0 space-y-2">
        <div className="bg-white flex whitespace-nowrap space-x-4 items-center">
          <Link
            href="/hr-center/chien-dich-tuyen-dung"
            className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
          >
            <ArrowUturnLeftIcon className="w-4 mr-1" />
            Trở về
          </Link>
          <div>{getCampaignName()}</div>
        </div>
        <div>
          <div className="flex sm:space-x-2 sm:flex-row flex-col space-y-2 sm:space-y-0">
            <Link
              href="/hr-center/chien-dich-tuyen-dung/tao-tin-dang"
              className="rounded px-4 py-1 bg-[#F37A20] text-white flex"
            >
              <PencilSquareIcon className="w-4 mr-2" /> Tạo tin đăng
            </Link>
            <Link
              href="/hr-center/chien-dich-tuyen-dung/them-moi-chien-dich"
              className="rounded px-4 py-1 bg-[#F37A20] text-white flex"
            >
              <PlusCircleIcon className="w-4 mr-2" /> Thêm mới chiến dịch
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4 flex sm:space-x-2 sm:flex-row flex-col space-y-2 sm:space-y-0 px-2">
        <TmInput
          name="search"
          classNameCustom="flex-1"
          control={control}
          icon={<MagnifyingGlassIcon className="w-4" />}
          onChange={(e) => handleKeyword(e.target.value)}
          placeholder="Tìm kiếm theo tiêu đề hoặc mã tin"
        />
        <div className="flex-1 flex space-x-2">
          <TmSelect
            classNameCustom="flex-1"
            name="show"
            control={control}
            onChange={(e) => handleReasonCode(e.target.value)}
            options={shows}
            placeholder="Tình trạng"
          />
          <TmSelect
            classNameCustom="flex-1"
            name="browsing"
            control={control}
            onChange={(e) => handleResultCode(e.target.value)}
            options={browsings}
            placeholder="Trạng thái duyệt"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="overflow-x-auto col-span-2 mt-2">
          <table className="border-collapse	 min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-100">
              <tr>
                {header.map((item) => {
                  return (
                    <th
                      key={item}
                      className="p-4 text-center whitespace-nowrap font-medium uppercase sm:min-w-fit min-w-[200px]"
                    >
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs">
              {jobs.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4 text-left">
                    <div className="flex mb-1">
                      <div className="text-sm">{row.name}</div>
                      <Link
                        href={`/hr-center/chien-dich-tuyen-dung/cap-nhat?idUpdate=${row.id}`}
                      >
                        <PencilSquareIcon className="w-4 ml-2 hover:text-[#F37A20]" />
                      </Link>
                    </div>
                    <Link
                      href={`/hr-center/chien-dich-tuyen-dung/${id}/${row.id}`}
                    >
                      <div className="inline-block bg-[#DAFFD7] text-[#137F04] px-2 py-1 rounded-lg">
                        Xem cv ứng tuyển
                      </div>
                    </Link>
                  </td>
                  <td className="font-normal p-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="check"
                        disabled={row.status !== 5 ? false : true}
                        checked={row.status === 1 ? true : false}
                        className="sr-only peer"
                        onChange={(e) =>
                          handleChangeStatus(e.target.checked, row.id)
                        }
                      />
                      <div className="relative w-11 h-6 bg-[#9A9A9B] peer-focus:outline-none min-w-11 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-500 peer-checked:bg-gradient-to-r peer-checked:from-[#F89E1B] peer-checked:to-[#F37A20]"></div>
                    </label>
                  </td>
                  <td className="p-4 ">
                    <div
                      className={`inline-block px-2 py-1 rounded-xl ${
                        row.status === 1
                          ? "bg-[#DAFFD7] text-[#137F04]"
                          : "bg-[#FFE9E9] text-[#AF0000]"
                      }`}
                    >
                      {row.reasonText}
                    </div>
                    {row.status === 2 && <div className="mt-1">Xem lý do</div>}
                  </td>
                  <td className="p-4 ">
                    <div className={`inline-block px-2 py-1 rounded-xl`}>
                      {row.resultText}
                    </div>
                  </td>
                  <td className={`p-4`}>
                    <div
                      className={`${
                        row.status === 1 &&
                        "inline-block px-4 py-1 rounded text-default border border-[#F37A20]"
                      }`}
                    >
                      {row.status ? (
                        <div>
                          <Link
                            href={`/hr-center/tim-cv?idCampaign=${row.campaignId}`}
                          >
                            Tìm CV
                          </Link>
                        </div>
                      ) : (
                        "Bật chiến dịch để thực hiện tìm CV"
                      )}
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="text default inline-block px-3 py-1 rounded border border-[#F37A20]">
                      {row.campaignName}
                    </div>
                  </td>
                  <td className="p-4 ">
                    {dayjs(row.createAt).format("DD-MM-YYYY HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
