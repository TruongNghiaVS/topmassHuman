"use client";

import { LocationForm } from "@/app/hr-center/chien-dich-tuyen-dung/tao-tin-dang/setting/location-form";
import TmInput from "@/component/hook-form/input";
import TmInputNumber from "@/component/hook-form/input-number";
import TmSelect from "@/component/hook-form/select";
import { gender, salaryOptions } from "@/mockup-data/data";
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
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { TimeWorkingForm } from "./setting/time-working-form";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { EmailsForm } from "./setting/emails-form";
import { useLoading } from "@/app/context/loading";
import axiosInstance from "@/utils/axios";
import { ADD_JOB, GET_DISTRICT } from "@/utils/api-url";
import { IFormCreateNew, IProvinces } from "@/interface/interface";
import { useEffect, useState } from "react";
import { Option } from "@/component/hook-form/interface/interface";
import { SkillsForm } from "./setting/skills-form";
import CustomSelect from "@/component/hook-form/customSelectSearchForm";
import {
  Campaign,
  Career,
  Experiences,
  JobType,
  Provinces,
  Rank,
} from "@/module/helper/master-data";
import { AxiosError } from "axios";

const CustomCKEditor = dynamic(
  () => {
    return import("../../../../component/hook-form/ck-editor");
  },
  { ssr: false }
);

export default function CreateNew() {
  const { setLoading } = useLoading();
  const [district, setDistrict] = useState<Option[][]>([[]]);
  const [isSkipValidate, setIsSkipValidate] = useState(true);
  const { listProvinces } = Provinces();
  const { campaign } = Campaign();
  const { careers } = Career();
  const { jobTypes } = JobType();
  const { ranks } = Rank();
  const { experiences } = Experiences();

  useEffect(() => {}, [setIsSkipValidate]);

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên"),
    campagnId: yup.number(),
    position: yup.string().required("Vui lòng nhập vị trí tuyển dụng"),
    profession: yup
      .number()
      .required("Vui lòng chọn ngành nghề")
      .min(0, "Vui lòng chọn ngành nghề"),

    expired_date: yup.string().required("Vui lòng nhập hạn nhận hồ sơ"),
    quantity: yup
      .number()
      .required("Vui lòng nhập số lượng tuyển")
      .min(1, "Vui lòng nhập số lượng tuyển"),
    type_of_work: yup
      .number()
      .required("Vui lòng chọn loại công việc")
      .min(0, "Vui lòng chọn loại công việc"),
    rank: yup
      .number()
      .required("Vui lòng chọn cấp bậc")
      .min(0, "Vui lòng chọn cấp bậc"),
    experience: yup
      .number()
      .required("Vui lòng chọn kinh nghiệm làm việc")
      .min(0, "Vui lòng chọn kinh nghiệm làm việc"),
    locations: yup
      .array()
      .of(
        yup.object().shape({
          location: yup.string().required("Vui lòng chọn khu vực"),
          districts: yup
            .array()
            .of(
              yup.object().shape({
                district: yup
                  .string()
                  .test(
                    "validate-district",
                    "Vui lòng nhập quận huyện",
                    function (value) {
                      console.log(value);
                      const location = this.from?.[1].value.location;
                      if (location === "-1") {
                        return true;
                      }
                      return !!value;
                    }
                  ),
                detail_location: yup
                  .string()
                  .test(
                    "validate-detail-location",
                    "Vui lòng nhập địa chỉ cụ thể",
                    function (value) {
                      const location = this.from?.[1].value.location;
                      if (location === "-1") {
                        return true;
                      }
                      return !!value;
                    }
                  ),
              })
            )
            .required("Bắt buộc nhập thông tin")
            .min(1, "Phải có ít nhất 1 thông tin quận huyện"),
        })
      )
      .min(1, "Phải có ít nhất 1 khu vực")
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
      .min(1, "Phải có ít nhất 1 đoạn thời gian")
      .required("Vui lòng chọn thời gian làm việc"),
    aggrement: yup.boolean(),
    salary_from: yup.number().when("aggrement", ([aggrement], schema) => {
      return aggrement === false
        ? schema
            .required("Vui lòng nhập số tiền")
            .min(1, "Vui lòng nhập số tiền")
        : schema;
    }),
    salary_to: yup.number().when("aggrement", ([aggrement], schema) => {
      return aggrement === false
        ? schema
            .required("Vui lòng nhập số tiền")
            .min(1, "Vui lòng nhập số tiền")
        : schema;
    }),
    type_money: yup.string(),
    gender: yup.number(),
    description: yup.string().required("Vui lòng nhập mô tả công việc"),
    requirement: yup.string().required("Vui lòng nhập yêu cầu ứng viên"),
    benefit: yup.string().required("Vui lòng nhập quyền lợi của ứng viên"),
    skills: yup.array().of(
      yup.object().shape({
        skill: yup.string(),
      })
    ),
    username: yup.string().required("Vui lòng nhập họ và tên ứng viên"),
    phone: yup
      .string()
      .required("Bắt buộc nhập số điện thoại")
      .matches(/^[0-9]{10}$/, "Số điện thoại phải là 10 ký tự"),
    emails: yup
      .array()
      .of(
        yup.object().shape({
          email: yup
            .string()
            .required("Bắt buộc nhập email")
            .email("Sai format email "),
        })
      )
      .min(1, "Tối thiểu 1 email")
      .max(5, "Tối đa 3 email")
      .required("Vui nhập email"),
  });

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormCreateNew>({
    resolver: isSkipValidate ? yupResolver(schema) : undefined,
    defaultValues: {
      name: "",
      campagnId: -1,
      position: "",
      profession: -1,
      expired_date: new Date().toISOString().split("T")[0],
      quantity: 0,
      type_of_work: -1,
      rank: -1,
      experience: -1,
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
      type_money: "0",
      gender: 0,
      description: "",
      requirement: "",
      benefit: "",
      skills: [{ skill: "" }],
      username: "",
      phone: "",
      emails: [{ email: "" }],
    },
  });

  const isAggrement = watch("aggrement");

  const handleFilterDistrict = async (value: string, index: number) => {
    setLoading(true);
    try {
      if (value !== "-1") {
        const response = await axiosInstance.get(GET_DISTRICT, {
          params: {
            code: value,
          },
        });
        const listDistrict = response.data.data.map((item: IProvinces) => {
          return {
            value: item.code,
            label: item.name,
          };
        });

        setDistrict((prevItem) => {
          prevItem[index] = [{ label: "Tất cả", value: -1 }, ...listDistrict];
          return prevItem;
        });
      } else {
        setValue(`locations.${index}.districts`, [
          {
            district: "",
            detail_location: "",
          },
        ]);
        setDistrict((prevItem) => {
          return prevItem.filter((item, idx) => idx !== index);
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  const onSubmit = async (data: IFormCreateNew) => {
    setLoading(true);
    try {
      const dataSubmit: any = { ...data };
      dataSubmit.Campaign = data.campagnId;
      if (isSkipValidate) {
        dataSubmit.status = 1;
      } else {
        dataSubmit.status = 5;
      }
      const response = await axiosInstance.post(ADD_JOB, dataSubmit);
      toast.success("Tạo tin thành công");
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Tạo tin lỗi");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitData = (isDraff: boolean) => {
    setIsSkipValidate(isDraff);
    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 200);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="p-4 border-b flex justify-between sm:flex-row flex-col space-y-2 sm:space-y-0">
        <div className="bg-white flex whitespace-nowrap space-x-4 items-center ">
          <Link
            href="/hr-center/chien-dich-tuyen-dung"
            className="flex rounded-2xl py-1 px-2 bg-[#BFBFBF]"
          >
            <ArrowUturnLeftIcon className="w-4 mr-1" />
            Trở về
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
      <div className="mt-4 lg:px-40 px-2">
        <div className="font-medium text-base text-colorBase">
          Thông tin chung
        </div>
        <form className="mt-2 pb-10">
          <div className="mt-2">
            <div className="font-medium">
              Tên tiêu đề <span className="text-[#dc2f2f]">*</span>
            </div>
            <TmInput
              name="name"
              control={control}
              placeholder="Tiêu đề không được để trống"
            />
          </div>
          <div className="mt-4">
            <div className="font-medium">
              Chiến dịch <span className="text-[#dc2f2f]">*</span>
            </div>
            <TmSelect
              name="campagnId"
              control={control}
              options={campaign}
              placeholder="Chọn chiến dịch"
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
                placeholder="VD:Tuyển nhân viên marketing..."
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">
                Ngành nghề <span className="text-[#dc2f2f]">*</span>
              </div>
              <div>
                <CustomSelect
                  name="profession"
                  control={control}
                  options={careers}
                  placeholder="Chọn ngành nghề"
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
              <TmInputNumber name="quantity" control={control} step={1} />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-medium text-base">
              Khu vực <span className="text-[#dc2f2f]">*</span>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-8 bg-[#FFF5D9] rounded-lg mt-4 relative"
              >
                <button
                  className="absolute right-1 top-1"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <XMarkIcon className="w-6" />
                </button>

                <div className="mt-2">
                  <div className="flex space-x-2 items-start ">
                    <MapPinIcon className="w-7" />
                    <div className="whitespace-nowrap">
                      Khu vực {index + 1}:
                    </div>
                    <CustomSelect
                      name={`locations.${index}.location`}
                      control={control}
                      customSelect={() =>
                        handleFilterDistrict(
                          getValues(`locations.${index}.location`),
                          index
                        )
                      }
                      options={listProvinces}
                      placeholder="Chọn thành phố"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <LocationForm
                    control={control}
                    options={district[index]}
                    locationId={getValues(`locations.${index}.location`)}
                    name={`locations.${index}.districts`}
                  />
                </div>
              </div>
            ))}
            {errors && errors.locations && (
              <p className="text-red-500">{errors.locations.root?.message}</p>
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
              className="flex text-white px-2 items-center py-1 bg-[#F37A20] mt-4"
            >
              <PlusIcon className="w-4 mr-2" />
              Thêm khu vực
            </button>
          </div>
          <div className="mt-6">
            <div className="font-medium text-base text-colorBase">
              Yêu cầu chung
            </div>
            <div className="flex space-x-2 mt-4">
              <div className="flex-1">
                <div className="font-medium">
                  Loại công việc <span className="text-[#dc2f2f]">*</span>
                </div>
                <div>
                  <TmSelect
                    name="type_of_work"
                    control={control}
                    options={jobTypes}
                    placeholder="Chọn loại công việc"
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
                    options={ranks}
                    placeholder="Chọn cấp bậc"
                  />
                </div>
              </div>
            </div>
            <div className="flex sm:space-x-2 mt-4 sm:flex-row flex-col space-y-2 sm:space-y-0">
              <div className="flex-1">
                <div className="font-medium">
                  Kinh nghiệm <span className="text-[#dc2f2f]">*</span>
                </div>
                <div>
                  <TmSelect
                    name="experience"
                    control={control}
                    options={experiences}
                    placeholder="Chọn kinh nghiệm"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="font-medium">
                    Thu nhập <span className="text-[#dc2f2f]">*</span>
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
                    <TmInputNumber
                      name="salary_from"
                      disabled={isAggrement}
                      control={control}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex-1">
                    <TmInputNumber
                      disabled={isAggrement}
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
            {errors && errors.time_working && (
              <p className="text-red-500 text-sm mt-1">
                {errors.time_working.root?.message}
              </p>
            )}
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
            <div className="font-medium text-base text-colorBase">
              Thông tin chi tiết
            </div>
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
          {/* <div className="mt-4">
            <div className="font-medium ">Kỹ năng cần có</div>
            <div>
              <SkillsForm control={control} name="skills" />
            </div>
          </div> */}
          <div className="mt-6">
            <div className="font-medium text-base text-colorBase">
              Thông tin liên hệ
            </div>
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
          <div className="mt-4">
            <div className="font-medium">
              Email nhận hồ sơ (
              <span className="font-normal">tối đa 5 email</span>){" "}
              <span className="text-[#dc2f2f]">*</span>
            </div>
            <div>
              <EmailsForm control={control} name="emails" />
            </div>
            {errors && errors.emails && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emails.root?.message}
              </p>
            )}
          </div>
          <div className="mt-4 flex space-x-4 justify-end">
            <button
              type="button"
              onClick={() => handleSubmitData(false)}
              className="bg-[#137F04] text-white rounded flex space-x-1 items-center px-3 py-1 text-base"
            >
              <DocumentTextIcon className="w-4" /> Lưu nháp
            </button>
            <button
              className="bg-[#137F04] text-white rounded flex space-x-1 items-center px-3 py-1 text-base"
              onClick={() => handleSubmitData(true)}
              type="button"
            >
              <PencilSquareIcon className="w-4" /> Đăng tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
