"use client";

import { LocationForm } from "@/app/hr-center/chien-dich-tuyen-dung/tao-tin-dang/setting/location-form";
import TmInput from "@/component/hook-form/input";
import TmInputNumber from "@/component/hook-form/input-number";
import TmSelect from "@/component/hook-form/select";
import {
  campaignForm,
  gender,
  locations,
  salaryOptions,
} from "@/mockup-data/data";
import {
  ArrowUturnLeftIcon,
  DocumentTextIcon,
  MapPinIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { TimeWorkingForm } from "./setting/time-working-form";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const CustomCKEditor = dynamic(
  () => {
    return import("../../../../component/hook-form/ck-editor");
  },
  { ssr: false }
);

type FormValues = {
  fields: { value: string }[];
};

interface IFormCreateNew {
  name: string;
  campaign?: string;
  position: string;
  profession: string;
  expired_date: string;
  quantity: number;
  type_of_work: string;
  rank: string;
  experience: string;
  locations: {
    location: string;
    districts: {
      district: string;
      detail_location: string;
    }[];
  }[];
  time_working: {
    day_from: string;
    day_to: string;
    time_from: string;
    time_to: string;
  }[];
  aggrement?: boolean;
  salary_from?: number;
  salary_to?: number;
  type_money?: string;
  gender?: string;
  description: string;
  requirement: string;
  benefit: string;
  skill?: string;
  username: string;
  phone: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  campaign: yup.string(),
  position: yup.string().required("Vui lòng nhập vị trí tuyển dụng"),
  profession: yup.string().required("Chọn ngành nghề"),
  expired_date: yup.string().required("Vui lòng nhập hạn nhận hồ sơ"),
  quantity: yup.number().required("Vui lòng nhập số lượng tuyển"),
  type_of_work: yup.string().required("Vui lòng chọn loại công việc"),
  rank: yup.string().required("Vui lòng chọn cấp bậc"),
  experience: yup.string().required("Vui lòng chọn kinh nghiệm làm việc"),
  locations: yup
    .array()
    .of(
      yup.object().shape({
        location: yup.string().required("Vui lòng chọn khu vực"),
        districts: yup
          .array()
          .of(
            yup.object().shape({
              district: yup.string().required("Vui lòng chọn quận huyện"),
              detail_location: yup
                .string()
                .required("Vui lòng nhập địa chỉ cụ thể"),
            })
          )
          .required("Bắt buộc nhập thông tin")
          .min(1, "Phải có ít nhất 1 thông tin quận huyện"),
      })
    )
    .required("Vui lòng chọn khu vực"),

  time_working: yup
    .array()
    .of(
      yup.object().shape({
        day_from: yup.string().required("Vui lòng chọn ngày bắt đầu"),
        day_to: yup.string().required("Vui lòng chọn ngày kết thúc"),
        time_from: yup.string().required("Vui lòng chọn thời gian bắt đầu"),
        time_to: yup.string().required("Vui lòng chọn thời gian kết thúc"),
      })
    )
    .required("Vui lòng chọn thời gian làm việc"),
  aggrement: yup.boolean(),
  salary_from: yup.number().when("aggrement", ([aggrement], schema) => {
    return aggrement === false
      ? schema.required("Vui lòng nhập số tiền")
      : schema;
  }),
  salary_to: yup.number().when("aggrement", ([aggrement], schema) => {
    return aggrement === false
      ? schema.required("Vui lòng nhập số tiền")
      : schema;
  }),
  type_money: yup.string(),
  gender: yup.string(),
  description: yup.string().required("Vui lòng nhập mô tả công việc"),
  requirement: yup.string().required("Vui lòng nhập yêu cầu ứng viên"),
  benefit: yup.string().required("Vui lòng nhập quyền lợi của ứng viên"),
  skill: yup.string(),
  username: yup.string().required("Vui lòng nhập họ và tên ứng viên"),
  phone: yup
    .string()
    .required("Bắt buộc nhập số điện thoại")
    .matches(/^[0-9]{10}$/, "Số điện thoại phải là 10 ký tự"),
});

export default function CreateNew() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCreateNew>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      campaign: "",
      position: "",
      profession: "",
      expired_date: new Date().toISOString().split("T")[0],
      quantity: 0,
      type_of_work: "",
      rank: "",
      experience: "",
      locations: [
        {
          location: "",
          districts: [
            {
              district: "",
              detail_location: "",
            },
          ],
        },
      ],
      time_working: [
        {
          day_from: "",
          day_to: "",
          time_from: "",
          time_to: "",
        },
      ],
      aggrement: false,
      salary_from: 0,
      salary_to: 0,
      type_money: "",
      gender: "",
      description: "",
      requirement: "",
      benefit: "",
      skill: "",
      username: "",
      phone: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  const onSubmit: SubmitHandler<IFormCreateNew> = (data) => {
    toast.success("Đăng tin thành công");
    console.log(data);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="p-4 border-b flex justify-between">
        <div className="bg-white flex whitespace-nowrap space-x-4 items-center">
          <Link
            href="/hr-center/chien-dich-tuyen-dung"
            className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
          >
            <ArrowUturnLeftIcon className="w-4 mr-1" />
            Trở vế
          </Link>
          <div>Tạo tin đăng</div>
        </div>
        <Link
          href="/hr-center/chien-dich-tuyen-dung/them-moi-chien-dich"
          className="rounded px-4 py-1 bg-[#F37A20] text-white flex"
        >
          <PlusCircleIcon className="w-4 mr-2" /> Thêm mới chiến dịch
        </Link>
      </div>
      <div className="mt-4 px-40">
        <div className="font-medium">Thông tin chung</div>
        <form
          action=""
          className="mt-2 pb-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-2">
            <div className="font-medium">
              Tên tiêu đề <span className="text-[#dc2f2f]">*</span>
            </div>
            <TmInput name="name" control={control} placeholder="Tên tiêu đề" />
          </div>
          <div className="mt-4">
            <div className="font-medium">Chiến dịch</div>
            <TmSelect
              name="campaign"
              control={control}
              options={campaignForm}
              placeholder="Chiến dịch"
            />
          </div>
          <div className="flex mt-4 space-x-2">
            <div className="flex-1">
              <div className="font-medium">
                Vị trí tuyển dụng <span className="text-[#dc2f2f]">*</span>
              </div>
              <TmInput
                name="position"
                control={control}
                placeholder="VD:Tuyển nhân viên marketing"
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">
                Ngành nghề <span className="text-[#dc2f2f]">*</span>
              </div>
              <div>
                <TmSelect
                  name="profession"
                  control={control}
                  options={campaignForm}
                  placeholder="Ngành nghề"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-4 space-x-2">
            <div className="flex-1">
              <div className="font-medium">
                Hạn nhận hồ sơ <span className="text-[#dc2f2f]">*</span>
              </div>
              <TmInput name="expired_date" type="date" control={control} />
            </div>
            <div className="flex-1">
              <div className="font-medium">
                Số lượng tuyển <span className="text-[#dc2f2f]">*</span>
              </div>
              <TmInputNumber name="quantity" control={control} />
            </div>
          </div>
          <div className="mt-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-8 bg-[#FFF5D9] rounded-lg mt-4 relative"
              >
                <button
                  className="absolute right-1 top-1"
                  onClick={() => {
                    remove(index);
                    delete fields[index];
                  }}
                >
                  <XMarkIcon className="w-6" />
                </button>
                <div className="">
                  <div className="flex space-x-2 items-start ">
                    <MapPinIcon className="w-7" />
                    <div>Khu vực {index + 1}:</div>
                    <TmSelect
                      classNameCustom="flex-1"
                      name={`locations.${index}.location`}
                      control={control}
                      options={locations}
                      placeholder="Chọn thành phố"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <LocationForm
                    control={control}
                    name={`locations.${index}.districts`}
                  />
                </div>
              </div>
            ))}
            {errors && errors.locations && (
              <p className="text-red-500">{errors.locations.message}</p>
            )}

            <button
              type="button"
              onClick={() =>
                append({
                  location: "",
                  districts: [
                    {
                      district: "",
                      detail_location: "",
                    },
                  ],
                })
              }
              className="flex text-white px-2 py-1 bg-[#F37A20] mt-4"
            >
              <PlusIcon className="w-4 mr-2" />
              Thêm khu vực
            </button>
          </div>
          <div className="mt-6">
            <div className="font-medium">Yêu cầu chung</div>
            <div className="flex space-x-2 mt-4">
              <div className="flex-1">
                <div className="font-medium">
                  Loại công việc <span className="text-[#dc2f2f]">*</span>
                </div>
                <div>
                  <TmSelect
                    name="type_of_work"
                    control={control}
                    options={campaignForm}
                    placeholder="Loại công việc"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="font-medium">
                  Cấp bậc <span className="text-[#dc2f2f]">*</span>
                </div>
                <div>
                  <TmSelect
                    name="rank"
                    control={control}
                    options={campaignForm}
                    placeholder="Cấp bậc"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <div className="flex-1">
                <div className="font-medium">
                  Kinh nghiệm <span className="text-[#dc2f2f]">*</span>
                </div>
                <div>
                  <TmSelect
                    name="experience"
                    control={control}
                    options={campaignForm}
                    placeholder="Kinh nghiệm"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="font-medium">
                    Mức lương <span className="text-[#dc2f2f]">*</span>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <TmInput
                      name="aggrement"
                      type="checkbox"
                      control={control}
                    />
                    <div>Thoả thuận</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-1">
                    <TmInput
                      name="salary_from"
                      control={control}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex-1">
                    <TmInput
                      name="salary_to"
                      control={control}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex-1">
                    <TmSelect
                      name="type_money"
                      type="checkbox"
                      control={control}
                      options={salaryOptions}
                      placeholder="Chọn loại tiền"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-medium">Thời giam làm việc</div>
            <div>
              <TimeWorkingForm control={control} name={`time_working`} />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-medium">Giới tính</div>
            <div>
              <TmSelect
                name="gender"
                control={control}
                placeholder="Giới tính"
                options={gender}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="font-medium">Thông tin chi tiết</div>
            <div className="mt-4">
              <div className="font-medium ">
                Mô tả công việc <span className="text-[#dc2f2f]">*</span>
              </div>
              <CustomCKEditor name="description" control={control} />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-medium ">
              Yêu cầu ứng viên <span className="text-[#dc2f2f]">*</span>
            </div>
            <CustomCKEditor name="requirement" control={control} />
          </div>
          <div className="mt-4">
            <div className="font-medium ">
              Quyền lợi ứng viên <span className="text-[#dc2f2f]">*</span>
            </div>
            <CustomCKEditor name="benefit" control={control} />
          </div>
          <div className="mt-4">
            <div className="font-medium ">Kỹ năng cần có</div>
            <TmSelect name="" control={control} options={campaignForm} />
          </div>
          <div className="mt-6">
            <div className="font-medium">Thông tin chi tiết</div>
            <div className="mt-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <div className="font-medium">
                    Họ và tên người nhận{" "}
                    <span className="text-[#dc2f2f]">*</span>
                  </div>
                  <TmInput name="username" control={control} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">
                    Số điện thoại <span className="text-[#dc2f2f]">*</span>
                  </div>
                  <TmInput name="phone" control={control} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex space-x-4 justify-end">
            <button className="bg-[#137F04] text-white rounded flex space-x-1 items-center px-3 py-1 text-base">
              <DocumentTextIcon className="w-4" /> Lưu nháp
            </button>
            <button
              className="bg-[#137F04] text-white rounded flex space-x-1 items-center px-3 py-1 text-base"
              type="submit"
            >
              <PencilSquareIcon className="w-4" /> Đăng tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
