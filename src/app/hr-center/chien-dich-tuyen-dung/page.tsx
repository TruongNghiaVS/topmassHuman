"use client";
import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { optionCampaigns } from "@/mockup-data/data";
import { ChANGE_STATUS, GET_ALL_CAMPAIGN } from "@/utils/api-url";
import axiosInstance, { fetcher } from "@/utils/axios";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import dayjs from "dayjs";
import { ICampaign } from "@/interface/interface";
import { useEffect, useState } from "react";
import { PopupCampaign } from "@/component/popup-edit-campaign";
import { usePopupLevelStore } from "@/store-zustand/useModalStore";
import { ProfileUser } from "@/module/helper/master-data";

const generateJob = (data: { id: number; name: string }) => {
  return (
    <div>
      <Link
        href={
          data.id > 0
            ? `/hr-center/chien-dich-tuyen-dung/cap-nhat?idUpdate=${data.id}`
            : "/hr-center/chien-dich-tuyen-dung/tao-tin-dang"
        }
      >
        <div className="line-clamp-1">
          {data.id > 0 ? data.name : "Đăng tin tuyển dụng"}
        </div>
      </Link>
    </div>
  );
};

export default function RecruimentCampaign() {
  const { setLoading } = useLoading();
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [listDataSearch, setListDataSearch] = useState<ICampaign[]>([]);
  const [status, setStatus] = useState(-1);
  const [nameUpdate, setNameUpdate] = useState("");
  const [idUpdate, setIdUpdate] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: listCampaign, error, mutate } = useSWR(
    `${GET_ALL_CAMPAIGN}?status=${status}`,
    fetcher
  );
  const { openModal } = usePopupLevelStore();
  const { currentUser } = ProfileUser();

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setCampaigns(listCampaign ? listCampaign.data : []);
    setListDataSearch(listCampaign ? listCampaign.data : []);
    if (currentUser?.level < 2) {
      openModal();
    }
  }, [listCampaign, setCampaigns, setListDataSearch, currentUser]);

  const { control } = useForm({
    defaultValues: {
      campaign: "",
    },
  });

  const header = [
    "Tên chiến dịch",
    "Hoạt động",
    "Tin tuyển dụng",
    "Tìm CV",
    "Thời gian tạo",
  ];

  const handleChangeStatus = async (checked: boolean, id: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(ChANGE_STATUS, {
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

  const handleFilterStatus = async (value: string) => {
    setStatus(+value);
    mutate();
  };

  const handleOpenPopup = (name: string, id: number) => {
    setNameUpdate(name);
    setIdUpdate(id);
    onOpen();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) {
      const listSearchResult = listDataSearch.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setCampaigns(listSearchResult);
    } else {
      setCampaigns(listDataSearch);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between sm:items-center p-4 sm:flex-row flex-col  border-b">
        <div>Quản lý chiến dịch tuyển dụng</div>
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
      <div className="mt-4 px-2 sm:space-x-2 sm:items-center sm:flex-row flex-col space-y-2 sm:space-y-0 flex">
        <TmSelect
          name="campaign"
          control={control}
          onChange={(e) => handleFilterStatus(e.target.value)}
          options={optionCampaigns}
        />
        <TmInput
          className="flex-1"
          name="search"
          classNameCustom="flex-1"
          control={control}
          onChange={handleChange}
          placeholder="Tìm kiếm chiến dịch"
          icon={<MagnifyingGlassIcon className="w-4" />}
        />
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
                      {item}{" "}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs">
              {campaigns?.map((row: any, idx: number) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4 text-start">
                    <div>
                      <Link
                        href={`/hr-center/chien-dich-tuyen-dung/${row.id}`}
                        className="text-default text-sm"
                      >
                        {row.name}
                      </Link>
                    </div>
                    <button onClick={() => handleOpenPopup(row.name, row.id)}>
                      Sửa tên chiến dịch
                    </button>
                  </td>
                  <td className="font-normal p-4 whitespace-nowrap">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="check"
                        checked={row.status || false}
                        onChange={(e) =>
                          handleChangeStatus(e.target.checked, row.id)
                        }
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-[#9A9A9B] peer-focus:outline-none min-w-11 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-500 peer-checked:bg-gradient-to-r peer-checked:from-[#F89E1B] peer-checked:to-[#F37A20]"></div>
                      <span className="ms-3 t ext-sm font-medium text-[#555555]">
                        {row.status
                          ? "Chiến dịch đang chạy"
                          : " Chiến dịch đang tắt"}
                      </span>
                    </label>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div
                      className={`${
                        row.status &&
                        "inline-block px-2 py-1 rounded-xl text-[#C65000] bg-[#FFE39C]"
                      }`}
                    >
                      {generateJob(row.childItems)}
                    </div>
                  </td>
                  <td className={`p-4 whitespace-nowrap`}>
                    <div
                      className={`${
                        row.status &&
                        "inline-block px-4 py-1 rounded-xl text-default border border-[#F37A20]"
                      }`}
                    >
                      <div>
                        <Link href={`/hr-center/tim-cv?idCampaign=${row.id}`}>
                          Tìm CV
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 ">
                    {dayjs(row.createAt).format("DD-MM-YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PopupCampaign
        isOpen={isOpen}
        onClose={onClose}
        nameUpdate={nameUpdate}
        id={idUpdate}
        mutate={mutate}
      />
    </div>
  );
}
