"use client";

import CustomMultipleSelectSearchForm from "@/component/hook-form/customMultipleSelectSearchForm";
import TmInput from "@/component/hook-form/input";
import TmRadio from "@/component/hook-form/radio";
import TmSelect from "@/component/hook-form/select";
import { useForm } from "react-hook-form";
import InfomationCv from "./infomation-cv";
import { useSearchParams } from "next/navigation";
import { Provinces } from "@/module/helper/master-data";
import { useLoading } from "@/app/context/loading";
import axiosInstance from "@/utils/axios";
import { SEARCH_CV } from "@/utils/api-url";
import { useState } from "react";
import { ICvSearch } from "@/interface/cv";

export default function SearchCV() {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("idCampaign");
  const idCampaign = campaignId ? +campaignId : -1;

  const [cvSearch, setCvSearch] = useState<ICvSearch[]>([]);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      locations: [],
      KeyWord: "",
      CvKey: "",
      Gender: 0,
      DayOfBirth: "",
      SchoolSearch: " ",
      cap_2: false,
      cap_3: false,
      college: false,
      university: false,
      after_university: false,
    },
  });

  const mapLevelSearch = (
    cap2: boolean,
    cap3: boolean,
    college: boolean,
    university: boolean,
    after_university: boolean
  ) => {
    const arrData = [];
    if (cap2) arrData.push(1);
    if (cap3) arrData.push(2);
    if (college) arrData.push(3);
    if (university) arrData.push(4);
    if (after_university) arrData.push(5);

    return arrData.join(",");
  };

  const { setLoading } = useLoading();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const dataSearch = {
        KeyWord: data.KeyWord,
        LocationCode: data.locations.join(","),
        CvKey: data.CvKey,
        Gender: data.Gender,
        DayOfBirth: data.DayOfBirth,
        SchoolSearch: data.SchoolSearch,
        EducationalLevelArray: mapLevelSearch(
          data.cap_2,
          data.cap_3,
          data.college,
          data.university,
          data.after_university
        ),
      };

      const res = await axiosInstance.get(SEARCH_CV, { params: dataSearch });
      setCvSearch(res.data.data);
      console.log(res);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const gender = [
    {
      label: "Tất cả",
      value: 0,
    },
    {
      label: "Nam",
      value: 1,
    },
    {
      label: "Nữ",
      value: 2,
    },
  ];

  const { provinces } = Provinces();

  const list = [1, 2, 3, 4, 5];

  return (
    <div className="px-6 py-3 ">
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
        <div className="col-span-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-2 bg-white">
              <div className="text-default uppercase">Tìm kiếm cơ bản</div>
              <div className="mt-2">
                <div>Từ khoá cần tìm</div>
                <TmInput
                  name="KeyWord"
                  control={control}
                  placeholder="Nhập từ khoá"
                />
              </div>
              <div className="mt-2">Tỉnh thành</div>
              <div className="mt-2">
                <CustomMultipleSelectSearchForm
                  name="locations"
                  control={control}
                  options={provinces}
                  placeholder="Chọn ngành nghề"
                />
              </div>
              <div className="mt-2 text-default uppercase">
                Tìm kiếm nâng cao
              </div>
              <div className="mt-2">
                Trong CV <span className="text-default">Bắt buộc có</span> từ
                khoá
              </div>
              <div className="mt-2">
                <TmInput
                  name="CvKey"
                  control={control}
                  placeholder="Nhập từ khoá"
                />
              </div>
              <div className="mt-2">Giới tính</div>
              <div className="mt-2">
                <TmRadio
                  name="Gender"
                  control={control}
                  options={gender}
                  classNameCustom="flex space-x-2"
                />
              </div>
              <div className="mt-2">Năm sinh</div>
              <div className="mt-2">
                <TmInput
                  name="DayOfBirth"
                  type="date"
                  control={control}
                  placeholder="Từ"
                  className="w-full"
                />
              </div>
              <div className="mt-2">Trình độ học vấn</div>
              <div className="mt-2 flex">
                <TmInput
                  name="cap_2"
                  control={control}
                  type="checkbox"
                  className="mr-2"
                />
                Trung cấp
              </div>
              <div className="mt-2 flex">
                <TmInput
                  name="cap_3"
                  control={control}
                  type="checkbox"
                  className="mr-2"
                />
                Trung học phổ thông
              </div>
              <div className="mt-2 flex">
                <TmInput
                  name="college"
                  control={control}
                  type="checkbox"
                  className="mr-2"
                />
                Cao đẳng
              </div>
              <div className="mt-2 flex">
                <TmInput
                  name="university"
                  control={control}
                  type="checkbox"
                  className="mr-2"
                />
                Đại học
              </div>
              <div className="mt-2 flex">
                <TmInput
                  name="after_university"
                  control={control}
                  type="checkbox"
                  className="mr-2"
                />
                Sau đại học (Thạc Sỹ/Tiến Sỹ)
              </div>
              <div className="mt-2">Trường học</div>
              <div className="mt-2">
                <TmInput
                  name="SchoolSearch"
                  control={control}
                  placeholder="Trường học"
                />
              </div>
              <div className="mt-4 text-white">
                <button className="w-full bg-[#F37A20] rounded py-2 text-center text-white justify-center flex">
                  Tìm CV (Dùng 5{" "}
                  <img src="/imgs/arrow.svg" alt="" className="w-3 mx-2" />)
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="sm:col-span-2">
          {cvSearch.map((item, idx) => {
            return (
              <div className="" key={idx}>
                <InfomationCv item={item} idCampaign={idCampaign} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
