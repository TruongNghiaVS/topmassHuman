"use client";

import CustomMultipleSelectSearchForm from "@/component/hook-form/customMultipleSelectSearchForm";
import TmInput from "@/component/hook-form/input";
import TmRadio from "@/component/hook-form/radio";
import TmSelect from "@/component/hook-form/select";
import { SubmitHandler, useForm } from "react-hook-form";
import InfomationCv from "./infomation-cv";
import { useSearchParams } from "next/navigation";
import { Provinces } from "@/module/helper/master-data";
import { useLoading } from "@/app/context/loading";
import { fetcher } from "@/utils/axios";
import { SEARCH_CV } from "@/utils/api-url";
import { useState } from "react";
import { ICvSearch } from "@/interface/cv";
import useSWR from "swr";
import { convertParams } from "@/utils/custom-hook";
import * as yup from "yup";
import { ISearchCv, ISearchCvState } from "@/interface/interface";
import { yupResolver } from "@hookform/resolvers/yup";

const years = Array.from({ length: 52 }, (_, i) => {
  const item = {
    label: `${new Date().getFullYear() - i - 13}`,
    value: new Date().getFullYear() - i - 13,
  };
  return item;
});

export default function SearchCV() {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("idCampaign");
  const idCampaign = campaignId ? +campaignId : -1;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchObj, setSearchObj] = useState<ISearchCvState>({
    KeyWord: "",
    LocationCode: "",
    CvKey: "",
    Gender: 0,
    FromYear: -1,
    ToYear: -1,
    SchoolSearch: "",
    EducationalLevelArray: "",
    Limit: 10,
    Page: currentPage,
  });

  const schema = yup.object().shape({
    KeyWord: yup.string(),
    Location: yup.array().of(yup.string()),
    CvKey: yup.string(),
    Gender: yup.number(),
    FromYear: yup.number(),
    ToYear: yup
      .number()
      .test(
        "is-greater-than-or-equal-to-minValue",
        "Năm kết thúc phải lớn hơn năm bắt đầu",
        function (ToYear) {
          const { FromYear } = this.parent;
          return FromYear > -1 &&
            ToYear !== undefined &&
            ToYear > -1 &&
            FromYear > ToYear
            ? false
            : true;
        }
      ),
    SchoolSearch: yup.string(),
    cap_2: yup.boolean(),
    cap_3: yup.boolean(),
    college: yup.boolean(),
    university: yup.boolean(),
    after_university: yup.boolean(),
  });

  const { data: cvSearch, error, isLoading } = useSWR(
    SEARCH_CV + "?" + convertParams(searchObj),
    fetcher
  );

  const { control, handleSubmit } = useForm<ISearchCv>({
    resolver: yupResolver(schema),
    defaultValues: {
      Locations: [],
      KeyWord: "",
      CvKey: "",
      Gender: 0,
      FromYear: -1,
      ToYear: -1,
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

  const onSubmit: SubmitHandler<ISearchCv> = async (data) => {
    setLoading(true);
    try {
      const dataSearch = {
        KeyWord: data.KeyWord,
        LocationCode: data.Locations?.join(","),
        CvKey: data.CvKey,
        Gender: data.Gender,
        FromYear: data.FromYear,
        ToYear: data.ToYear,
        SchoolSearch: data.SchoolSearch,
        EducationalLevelArray: mapLevelSearch(
          data.cap_2 || false,
          data.cap_3 || false,
          data.college || false,
          data.university || false,
          data.after_university || false
        ),
        Limit: 10,
        Page: currentPage,
      };

      setSearchObj(dataSearch);
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
                <div className="font-medium">Từ khoá cần tìm</div>
                <TmInput
                  name="KeyWord"
                  control={control}
                  placeholder="Vị trí, tên công việc"
                />
              </div>
              <div className="mt-2 font-medium">Tỉnh/TP</div>
              <div className="">
                <CustomMultipleSelectSearchForm
                  name="Locations"
                  control={control}
                  options={provinces}
                  placeholder="Chọn tỉnh thành"
                />
              </div>
              <div className="mt-2 text-default uppercase">
                Tìm kiếm nâng cao
              </div>
              <div className="mt-2 font-medium">
                <span className="text-default">Từ khoá</span> trong CV
              </div>
              <div className="mt-2">
                <TmInput
                  name="CvKey"
                  control={control}
                  placeholder="Nhập từ khoá"
                />
              </div>
              <div className="mt-2 font-medium">Giới tính</div>
              <div className="mt-2">
                <TmRadio
                  name="Gender"
                  control={control}
                  options={gender}
                  classNameCustom="flex space-x-2"
                />
              </div>
              <div className="mt-2 font-medium">Năm sinh</div>
              <div className="flex space-x-2 mt-2">
                <div className=" flex-1">
                  <TmSelect
                    name="FromYear"
                    control={control}
                    placeholder="Từ"
                    className="w-full"
                    options={years}
                  />
                </div>
                <div className="flex-1">
                  <TmSelect
                    name="ToYear"
                    control={control}
                    placeholder="Đến"
                    className="w-full"
                    options={years}
                  />
                </div>
              </div>
              <div className="mt-2 font-medium">Trình độ học vấn</div>
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
              {/* <div className="mt-2">Trường học</div>
              <div className="mt-2">
                <TmInput
                  name="SchoolSearch"
                  control={control}
                  placeholder="Trường học"
                />
              </div> */}
              <div className="mt-4 text-white">
                <button className="w-full bg-[#F37A20] rounded py-2 text-center text-white justify-center flex">
                  Tìm CV
                  {/* <img src="/imgs/arrow.svg" alt="" className="w-3 mx-2" />) */}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="sm:col-span-2">
          {cvSearch?.data.map((item: ICvSearch, idx: number) => {
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
