import { useLoading } from "@/app/context/loading";
import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import AvatarUpload from "@/component/hook-form/upload-avatar";
import {
  IReal,
  IUpdateCompany,
  IUpdateInformationProps,
} from "@/interface/interface";
import { UPDATE_COMPANY, UPLOAD_IMG } from "@/utils/api-url";
import axiosInstance, { axiosInstanceImg, fetcher } from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const CustomCKEditor = dynamic(
  () => {
    return import("../../../../component/hook-form/ck-editor");
  },
  { ssr: false }
);

interface IEditCompanyProps extends IUpdateInformationProps {
  setEdit: Dispatch<SetStateAction<boolean>>;
  listRels: IReal[];
}

export default function EditInfomationCompany({
  setEdit,
  currentUser,
  mutate,
  listRels,
}: IEditCompanyProps) {
  const { setLoading } = useLoading();
  const schema = yup.object().shape({
    logo: yup
      .mixed<File>()
      .test(
        "fileType",
        "Unsupported file type",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type))
      )
      .test(
        "fileSize",
        "File size is too large",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 2MB
      ),
    banner: yup
      .mixed<File>()
      .test(
        "fileType",
        "Unsupported file type",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type))
      )
      .test(
        "fileSize",
        "File size is too large",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 2MB
      ),
    taxCode: yup.string(),
    // .matches(/^\d+$/, "mã số thuế phải là chữ số")
    // .min(10, "Mã số thuế tối thiểu 10 ký tự")
    // .max(12, "Mã số thuế tối đa 12 ký tự"),
    fullName: yup.string(),
    website: yup.string(),
    relId: yup.string(),
    capacity: yup.string(),
    addressInfo: yup.string(),
    phone: yup.string(),
    shortDes: yup.string(),
    iframeEmbeddedMap: yup.string(),
    email: yup.string().email("Sai format email"),
  });

  const { handleSubmit, control } = useForm<IUpdateCompany>({
    resolver: yupResolver(schema),
    defaultValues: {
      taxCode: currentUser.companyInfo.taxCode || "",
      fullName: currentUser.companyInfo.fullName || "",
      website: currentUser.companyInfo.website || "",
      relId: currentUser.companyInfo.relId || "",
      capacity: currentUser.companyInfo.capacity || "",
      addressInfo: currentUser.companyInfo.addressInfo || "",
      phone: currentUser.companyInfo.phone,
      shortDes: currentUser.companyInfo.shortDes || "",
      email: currentUser.companyInfo.email || "",
      iframeEmbeddedMap: currentUser.companyInfo.iframeEmbeddedMap || "",
    },
  });

  const onSubmit: SubmitHandler<IUpdateCompany> = async (data) => {
    if (data.logo) {
      try {
        setLoading(true);
        const response = await axiosInstanceImg.post(UPLOAD_IMG, {
          file: data.logo,
        });
        data.logoLink = response.data.shortLink;
        toast.success("Cập nhật ảnh đại diện thành công");
      } catch (error) {
        toast.error("Cập nhật ảnh đại diện thất bại");
      } finally {
        setLoading(false);
      }
    }

    if (data.banner) {
      try {
        setLoading(true);
        const response = await axiosInstanceImg.post(UPLOAD_IMG, {
          file: data.banner,
        });
        data.coverLink = response.data.shortLink;
        toast.success("Cập nhật ảnh bìa thành công");
      } catch (error) {
        toast.error("Cập nhật ảnh bìa thất bại");
      } finally {
        setLoading(false);
      }
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(UPDATE_COMPANY, data);
      if (response) {
        toast.success("Cập nhật thông tin công ty thành công");
        mutate();
        setTimeout(() => {
          setEdit(false);
        }, 300);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="font-medium">Cập nhật thông tin công ty</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-2 items-center">
          <div className="flex-1">
            <div className="">Logo công ty</div>
            <AvatarUpload
              control={control}
              name="logo"
              link={currentUser?.companyInfo.logoLink}
            />
          </div>
          <div className="flex-1">
            <div className="">Ảnh bìa công ty (kích thước 1200x250)</div>
            <AvatarUpload
              name="banner"
              control={control}
              link={currentUser?.companyInfo.coverLink}
            />
          </div>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <div className="flex-1">
            <div className="">Mã số thuế</div>
            <TmInput control={control} name="taxCode" />
          </div>
          <div className="flex-1">
            <div className="">Tên công ty</div>
            <TmInput name="fullName" control={control} />
          </div>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <div className="flex-1">
            <div className="">Website</div>
            <TmInput control={control} name="website" />
          </div>
          <div className="flex-1">
            <div className="">Lĩnh vực hoạt động</div>
            <TmSelect
              name="relId"
              control={control}
              placeholder="Chọn lĩnh vực hoạt động"
              options={
                listRels
                  ? listRels?.map((item: any) => {
                      return { label: item.text, value: item.id };
                    })
                  : []
              }
            />
          </div>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <div className="flex-1">
            <div className="">Quy mô</div>
            <TmInput control={control} name="capacity" />
          </div>
          <div className="flex-1">
            <div className="">Địa chỉ</div>

            <TmInput name="addressInfo" control={control} />
          </div>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <div className="flex-1">
            <div className="">Email</div>
            <TmInput name="email" control={control} type="email" />
          </div>
          <div className="flex-1">
            <div className="">Số điện thoại</div>

            <TmInput name="phone" control={control} />
          </div>
        </div>
        <div className="mt-2">Link google map</div>
        <div className="mt-2">
          <TmInput name="iframeEmbeddedMap" control={control} />
        </div>
        <div className="mt-2">Giới thiệu về công ty</div>
        <div className="mt-2">
          <CustomCKEditor name="shortDes" control={control} />
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}
