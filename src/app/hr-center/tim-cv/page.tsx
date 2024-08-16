"use client";

import CustomMultipleSelectSearchForm from "@/component/hook-form/customMultipleSelectSearchForm";
import TmInput from "@/component/hook-form/input";
import TmRadio from "@/component/hook-form/radio";
import TmSelect from "@/component/hook-form/select";
import { useForm } from "react-hook-form";
import InfomationCv from "./infomation-cv";

export default function SearchCV() {
  const { control } = useForm({
    defaultValues: {
      location: [],
    },
  });
  const gender = [
    {
      label: "Tất cả",
      value: "0",
    },
    {
      label: "Nam",
      value: "1",
    },
    {
      label: "Nữ",
      value: "2",
    },
  ];

  const options = [
    { value: "Tp.Hồ Chí Minh", label: "Tp.Hồ Chí Minh" },
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "Hải Phòng", label: "Hải Phòng" },
  ];

  const list = [1, 2, 3, 4, 5];

  return (
    <div className="px-6 py-3 ">
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
        <div className="col-span-1">
          <div className="p-2 bg-white">
            <div className="text-default uppercase">Tìm kiếm cơ bản</div>
            <div className="mt-2">
              <div>Từ khoá cần tìm</div>
              <TmInput
                name="search_key"
                control={control}
                placeholder="Nhập từ khoá"
              />
            </div>
            <div className="mt-2">Tỉnh thành</div>
            <div className="mt-2">
              <CustomMultipleSelectSearchForm
                name="location"
                control={control}
                options={options}
                placeholder="Chọn ngành nghề"
              />
            </div>
            <div className="mt-2 text-default uppercase">Tìm kiếm nâng cao</div>
            <div className="mt-2">
              Trong CV <span className="text-default">Bắt buộc có</span> từ khoá
            </div>
            <div className="mt-2">
              <TmInput
                name="search_key1"
                control={control}
                placeholder="Nhập từ khoá"
              />
            </div>
            <div className="mt-2">Giới tính</div>
            <div className="mt-2">
              <TmRadio
                name="gender"
                control={control}
                options={gender}
                classNameCustom="flex space-x-2"
              />
            </div>
            <div className="mt-2">Năm sinh</div>
            <div className="mt-2 flex space-x-1">
              <div className="flex-1">
                <TmInput
                  name="from"
                  type="date"
                  control={control}
                  placeholder="Từ"
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <TmInput
                  name="to"
                  type="date"
                  control={control}
                  placeholder="Đến"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="mt-2">Trình độ học vấn</div>
            <div className="mt-2 flex">
              <TmInput
                name="cap_3"
                control={control}
                type="checkbox"
                className="mr-2"
              />
              Trung cấp
            </div>
            <div className="mt-2 flex">
              <TmInput
                name="cap_2"
                control={control}
                type="checkbox"
                className="mr-2"
              />
              Trung học phổ thông
            </div>
            <div className="mt-2 flex">
              <TmInput
                name="collect"
                control={control}
                type="checkbox"
                className="mr-2"
              />
              Cao đẳng
            </div>
            <div className="mt-2 flex">
              <TmInput
                name="unives"
                control={control}
                type="checkbox"
                className="mr-2"
              />
              Đại học
            </div>
            <div className="mt-2 flex">
              <TmInput
                name="cap_3"
                control={control}
                type="checkbox"
                className="mr-2"
              />
              Sau đại học (Thạc Sỹ/Tiến Sỹ)
            </div>
            <div className="mt-2">Trường học</div>
            <div className="mt-2">
              <TmSelect
                name="school"
                control={control}
                placeholder="Trường học"
                options={options}
              />
            </div>
            <div className="mt-4 text-white">
              <button className="w-full bg-[#F37A20] rounded py-2 text-center text-white justify-center flex">
                Tìm CV (Dùng 5{" "}
                <img src="/imgs/arrow.svg" alt="" className="w-3 mx-2" />)
              </button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          {list.map((item) => {
            return (
              <div className="" key={item}>
                <InfomationCv />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
