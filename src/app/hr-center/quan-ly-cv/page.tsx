"use client";

import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { ICampaign, IManagerCv, ISearchManagerCv } from "@/interface/interface";
import { WechatBootstrapIcon } from "@/theme/icons/wechatBootstrapIcon";
import {
  GET_ALL_CAMPAIGN,
  GET_MANAGER_CV_APPLY,
  GET_STATUS_APPLY_CV,
} from "@/utils/api-url";
import axiosInstance, { fetcher } from "@/utils/axios";
import { PencilSquareIcon, PhoneIcon } from "@heroicons/react/16/solid";
import { ClockIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { ModalChangeStatus } from "../chien-dich-tuyen-dung/[id]/[slug]/setting/modal-change-status";
import { useLoading } from "@/app/context/loading";
import { Option } from "@/component/hook-form/interface/interface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Campaign } from "@/module/helper/master-data";

export default function ManagerCV() {
  const [managerCv, setManagerCv] = useState<IManagerCv[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idUpdate, setIdUpdate] = useState(-1);
  const [statusUpdate, setStatusUpdate] = useState(-1);
  const [statusApply, setStatusApply] = useState<Option[]>([]);
  const { setLoading } = useLoading();
  const { data: listManagerCV, error, mutate } = useSWR(
    GET_MANAGER_CV_APPLY,
    fetcher
  );

  const { listCampaign } = Campaign();

  const getStatusApply = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_STATUS_APPLY_CV);
      const data = response.data.map((item: any) => ({
        label: item.text,
        value: item.id,
      }));
      setStatusApply([{ value: -1, label: "Tất cả" }, ...data]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listManagerCV) {
      setManagerCv(listManagerCV);
    }
    getStatusApply();
  }, [listManagerCV, setManagerCv]);

  const schema = yup.object().shape({
    KeyWord: yup.string(),
    CampaignId: yup.number(),
    StatusCode: yup.number(),
    Source: yup.number(),
  });

  const { control, handleSubmit } = useForm<ISearchManagerCv>({
    resolver: yupResolver(schema),
    defaultValues: {
      KeyWord: "",
      CampaignId: -1,
      StatusCode: -1,
      Source: -1,
    },
  });

  const header = [
    "Ứng viên",
    "Chiến dịch",
    "Thông tin liên hệ",
    "Thời gian mở",
    "Trạng thái",
  ];

  const onSubmit: SubmitHandler<ISearchManagerCv> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_MANAGER_CV_APPLY, {
        params: data,
      });
      setManagerCv(response.data);
      toast.success("Tìm kiếm thông tin thành công");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-3 ">
      <div className="text-base font-normal">Quản lý CV ứng viên</div>
      <div className="mt-4 p-2 bg-white border rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-x-2">
            <div className="flex-1">
              <TmInput
                className="w-full"
                name="KeyWord"
                control={control}
                placeholder="Tìm kiếm tên, Email, Số điện thoại"
              />
            </div>
            <div className="flex-1">
              <TmSelect
                className="w-full"
                name="CampaignId"
                control={control}
                options={listCampaign}
              />
            </div>
            <div className="flex-1">
              <TmSelect
                className="w-full"
                name="StatusCode"
                control={control}
                options={statusApply}
              />
            </div>
            <div className="flex-1">
              <TmSelect
                className="w-full"
                name="Source"
                control={control}
                options={[
                  { value: -1, label: "Tất cả" },
                  { label: "Ứng viên đã ứng tuyển", value: 0 },
                  { label: "Tìm kiếm CV", value: 1 },
                ]}
              />
            </div>
            <button
              type="submit"
              className="px-2 py-1.5 text-white bg-[#FF7D55] rounded-lg font-bold"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 flex justify-between items center">
        <div className="flex items-center">
          Tìm thấy <span className="text-default mx-1">{managerCv.length}</span>{" "}
          ứng viên
        </div>
      </div>
      <div className="mt-4 bg-white">
        <div className="overflow-x-auto ">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {header.map((item) => {
                  return (
                    <th
                      key={item}
                      className="p-4 whitespace-nowrap lg:min-w-fit sm:min-w-fit min-w-[200px] font-medium uppercase"
                    >
                      {item}{" "}
                    </th>
                  );
                })}
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {managerCv.map((row, idx) => (
                <tr key={idx} className={` `}>
                  <td className="p-4">
                    <div className="flex space-x-2 items-center">
                      <img
                        src="/imgs/logo-work.png"
                        alt=""
                        className="w-10 rounded-full"
                      />
                      <div>
                        <div className="font-normal line-clamp-3">
                          {row.fullName}
                        </div>
                        <div className="text-xs inline-block p-1 rounded bg-[#F5F8FA]">
                          {row.viewModeText}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="line-clamp-1">{row.campagnText}</div>
                  </td>
                  <td className="p-4 ">
                    <div className="flex">
                      <EnvelopeIcon className="w-4 mr-2" /> {row.email}
                    </div>
                    <div className="flex mt-1">
                      <PhoneIcon className="w-5 px-1 rounded-full border mr-2" />
                      {row.phone}
                    </div>
                    {/* <div className="flex text-[#42B155] mt-1">
                      <WechatBootstrapIcon className="w-4 mr-2 text-[#42B155]" />
                      Chat với ứng viên
                    </div> */}
                  </td>
                  <td className="p-4 ">
                    <div className="flex mt-1">
                      <ClockIcon className="w-4 mr-2" />
                      {dayjs(row.createAt).format("DD-MM-YYYY HH:mm")}
                    </div>
                  </td>
                  <td>
                    <div className="text-center rounded-lg px-4 py-1 bg-[#FFFAF5] text-[#FFA24F]">
                      {row.statusText}
                    </div>
                  </td>
                  <td className="min-w-[30px] ">
                    <button
                      onClick={() => {
                        setStatusUpdate(row.statusCode);
                        setIdUpdate(row.id);
                        setIsOpenModal(true);
                      }}
                    >
                      <PencilSquareIcon className="w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalChangeStatus
        id={idUpdate}
        isOpenModal={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        listStatus={statusApply}
        status={statusUpdate}
        mutate={mutate}
      />
    </div>
  );
}
