"use client";

import { LocationForm } from "@/app/hr-center/chien-dich-tuyen-dung/tao-tin-dang/setting/location-form";
import TmInput from "@/component/hook-form/input";
import TmInputNumber from "@/component/hook-form/input-number";
import TmSelect from "@/component/hook-form/select";
import { gender, salaryOptions } from "@/mockup-data/data";
import {
  ArrowUturnLeftIcon,
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
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useLoading } from "@/app/context/loading";
import axiosInstance, { fetcher } from "@/utils/axios";
import {
  GET_ALL_CAMPAIGN,
  GET_CAREER,
  GET_DISTRICT,
  GET_EXPERIENCE,
  GET_INFO_TO_EDIT,
  GET_JOB_TYPE,
  GET_PROVINCE,
  GET_RANK_CANDIDATE,
  UPDATE_JOB,
} from "@/utils/api-url";
import {
  ICampaign,
  ICareer,
  IFormCreateNew,
  IProvinces,
} from "@/interface/interface";
import { useEffect, useState } from "react";
import { Option } from "@/component/hook-form/interface/interface";
import { TimeWorkingForm } from "../tao-tin-dang/setting/time-working-form";
import { SkillsForm } from "../tao-tin-dang/setting/skills-form";
import { EmailsForm } from "../tao-tin-dang/setting/emails-form";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

const CustomCKEditor = dynamic(
  () => {
    return import("../../../../component/hook-form/ck-editor");
  },
  { ssr: false }
);

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
  type_of_work: yup.number().required("Vui lòng chọn loại công việc"),
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
      ? schema.required("Vui lòng nhập số tiền").min(1, "Vui lòng nhập số tiền")
      : schema;
  }),
  salary_to: yup.number().when("aggrement", ([aggrement], schema) => {
    return aggrement === false
      ? schema.required("Vui lòng nhập số tiền").min(1, "Vui lòng nhập số tiền")
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
    .max(5, "Tối đa 5 email")
    .required("Vui nhập email"),
});

export default function UpdateJob() {
  const { setLoading } = useLoading();
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [district, setDistrict] = useState<Option[][]>([[]]);
  const [campaigns, setCampaigns] = useState<Option[]>([]);
  const [careers, setCareers] = useState<Option[]>([]);
  const [jobTypes, setJobTypes] = useState<Option[]>([]);
  const [ranks, setRanks] = useState<Option[]>([]);
  const [experiences, setExperiences] = useState<Option[]>([]);

  const searchParams = useSearchParams();
  const idUpdate = searchParams.get("idUpdate");
  const router = useRouter();
  const { data: jobInfo, error } = useSWR(
    `${GET_INFO_TO_EDIT}?jobId=${idUpdate}`,
    fetcher
  );

  const getAllData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_PROVINCE);
      const listData = response.data.data.map((item: IProvinces) => {
        return {
          value: item.code,
          label: item.name,
        };
      });
      setProvinces(listData);
      const resCampaign = await axiosInstance.get(GET_ALL_CAMPAIGN, {
        params: {
          code: -1,
        },
      });
      const listCampaigns = resCampaign.data.data.map((item: ICampaign) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setCampaigns(listCampaigns);
      const resCareers = await axiosInstance.get(GET_CAREER);
      const listCareers = resCareers.data.map((item: ICareer) => {
        return {
          value: item.id,
          label: item.text,
        };
      });
      setCareers(listCareers);
      const resJobTypes = await axiosInstance.get(GET_JOB_TYPE);
      const listJobTypes = resJobTypes.data.map((item: ICareer) => {
        return {
          value: item.id,
          label: item.text,
        };
      });
      setJobTypes(listJobTypes);
      const resRanks = await axiosInstance.get(GET_RANK_CANDIDATE);
      const listRanks = resRanks.data.map((item: ICareer) => {
        return {
          value: item.id,
          label: item.text,
        };
      });
      setRanks(listRanks);
      const resExperiences = await axiosInstance.get(GET_EXPERIENCE);
      const listExperiences = resExperiences.data.map((item: ICareer) => {
        return {
          value: item.id,
          label: item.text,
        };
      });
      setExperiences(listExperiences);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IFormCreateNew>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      campagnId: -1,
      position: "",
      profession: -1,
      expired_date: new Date().toISOString().split("T")[0],
      quantity: -1,
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
      type_money: "",
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

  useEffect(() => {
    getAllData();
    if (jobInfo) {
      jobInfo.expired_date = jobInfo.expired_date
        ? jobInfo.expired_date.split("T")[0]
        : new Date().toISOString().split("T")[0];
      jobInfo.time_working = jobInfo.timeWorks;
      jobInfo.campagnId = jobInfo.campaign;
      reset(jobInfo);
      handleFilterListDistrict(
        jobInfo.locations.map((item: any) => item.location)
      );
    }
  }, [jobInfo]);

  const handleFilterListDistrict = (ids: number[]) => {
    ids.forEach((id, index) => {
      handleFilterDistrict(id.toString(), index);
    });
  };

  const handleFilterDistrict = async (value: string, index: number) => {
    setLoading(true);
    try {
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
        prevItem[index] = listDistrict;
        return prevItem;
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  const onSubmit: SubmitHandler<IFormCreateNew> = async (data) => {
    setLoading(true);
    console.log("___");
    try {
      const dataUpdate: any = { ...data };
      dataUpdate.jobId = idUpdate ? +idUpdate : 0;
      const response = await axiosInstance.post(UPDATE_JOB, dataUpdate);
      toast.success("Cập nhật thành công");
      router.push(`/hr-center/chien-dich-tuyen-dung/${data.campagnId}`);
    } catch (error) {
      toast.error("Cập nhật lỗi");
    } finally {
      setLoading(false);
    }
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
            Trở vế
          </Link>
          <div>Chỉnh sửa tin đăng</div>
        </div>
        <Link
          href="/hr-center/chien-dich-tuyen-dung/them-moi-chien-dich"
          className="rounded px-4 py-1 bg-[#F37A20] text-white flex"
        >
          <PlusCircleIcon className="w-4 mr-2" /> Thêm mới chiến dịch
        </Link>
      </div>
      <div className="mt-4 lg:px-40 px-2">
        <div className="font-medium">Thông tin chung</div>
        <form className="mt-2 pb-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <div className="font-medium">
              Tên tiêu đề <span className="text-[#dc2f2f]">*</span>
            </div>
            <TmInput name="name" control={control} placeholder="Tên tiêu đề" />
          </div>
          <div className="mt-4">
            <div className="font-medium">Chiến dịch</div>
            <TmSelect
              name="campagnId"
              control={control}
              options={campaigns}
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
                  options={careers}
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
                    setDistrict((prevItem) =>
                      prevItem.filter(
                        (data: Option[], idx: number) => idx !== index
                      )
                    );
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
                      value={getValues(`locations.${index}.location`)}
                      onChange={(e) =>
                        handleFilterDistrict(e.target.value, index)
                      }
                      options={provinces}
                      placeholder="Chọn thành phố"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <LocationForm
                    control={control}
                    options={district[index]}
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
                    options={jobTypes}
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
                    options={ranks}
                    placeholder="Cấp bậc"
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
            {errors && errors.emails && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emails.message}
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
            <div>
              <SkillsForm control={control} name="skills" />
            </div>
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
                {errors.emails.message}
              </p>
            )}
          </div>
          <div className="mt-4 flex space-x-4 justify-end">
            <button
              className="bg-[#137F04] text-white rounded flex space-x-1 items-center px-3 py-1 text-base"
              type="submit"
            >
              <PencilSquareIcon className="w-4" /> Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
