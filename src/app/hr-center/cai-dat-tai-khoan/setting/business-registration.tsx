import { useLoading } from "@/app/context/loading";
import CustomUpload from "@/component/hook-form/custom-upload";
import TmRadio from "@/component/hook-form/radio";
import {
  ICompanyBusiness,
  IUpdateInformationProps,
} from "@/interface/interface";
import { ADD_BUSINESSLICENSE, UPLOAD_IMG } from "@/utils/api-url";
import axiosInstance, { axiosInstanceImg } from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function BusinessRegistration({
  currentUser,
  mutate,
}: IUpdateInformationProps) {
  const SUPPORTED_FORMATS = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  const { setLoading } = useLoading();

  const schema = yup.object().shape({
    company_business: yup
      .mixed<File>()
      .test(
        "fileFormat",
        "Định dạng file không hợp lệ. Chỉ chấp nhận các định dạng: JPEG, JPG, PNG, PDF.",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      )
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= 5 * 1024 * 1024;
      }),
    DocumentType: yup.string().required("Vui lòng chọn loại giấy tờ"),
  });

  const { handleSubmit, control } = useForm<ICompanyBusiness>({
    resolver: yupResolver(schema),
    defaultValues: {
      DocumentType: currentUser?.businessLicenseInfo.documnetType,
    },
  });

  const onSubmit: SubmitHandler<ICompanyBusiness> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstanceImg.post(UPLOAD_IMG, {
        file: data.company_business,
      });
      if (response.data) {
        toast.success("Cập nhật hình ảnh thành công");
        try {
          setLoading(true);
          const dataUpdate = await axiosInstance.post(ADD_BUSINESSLICENSE, {
            documentLink: response.data.shortLink,
            documentType: data.DocumentType,
          });
          if (dataUpdate) {
            toast.success("Cập nhật thông tin thành công");
            mutate();
          }
        } catch (error) {
          toast.error("Cập nhật thông tin thất bại");
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      toast.success("Cập nhật hình ảnh thất bại");
    } finally {
      setLoading(false);
    }
  };

  const getNameFile = (link: string) => {
    const arrSplit = link.split("/");
    const result = arrSplit[arrSplit.length - 1];
    return result;
  };

  return (
    <div>
      <div className="">
        <div className="font-semibold">Thông tin giấy đăng ký doanh nghiệp</div>
      </div>
      <div className="mt-2">
        <div className="underline text-colorBase font-medium">
          Lựa chọn một trong các chứng từ sau để xác thực tài khoản:
        </div>
        <TmRadio
          name="DocumentType"
          control={control}
          classNameCustom="flex flex-col"
          options={[
            { label: "Giấy đăng ký kinh doanh", value: "0" },
            { label: "Giấy uỷ quyền", value: "1" },
            { label: "Thẻ nhân viên", value: "2" },
            { label: "Giấy xác nhận  mẫu dấu", value: "3" },
            { label: "Giấy xác nhận mã số thuế", value: "4" },
          ]}
        />
      </div>
      <div className="mt-2 flex space-x-1">
        <div className="font-medium">Trạng thái chứng từ: </div>
        <div
          className={` ${
            currentUser?.businessLicenseInfo.statusCode === 1
              ? "text-[#FCC575]"
              : currentUser?.businessLicenseInfo.statusCode === 2
              ? "text-[#eb4034]"
              : "text-rose-600"
          }`}
        >
          {currentUser?.businessLicenseInfo?.statusText}
        </div>
      </div>
      {currentUser?.businessLicenseInfo.reasonRejectText.length > 0 ? (
        <div className="font-medium">
          Lý do từ chối:{" "}
          <span className="font-normal">
            {currentUser?.businessLicenseInfo.reasonRejectText}
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="mt-4">
        {currentUser?.businessLicenseInfo.linkFile.length > 0 && (
          <div className="flex justify-between p-4 border border-dashed border-2 border-[#F37A20] mb-2 rounded-lg">
            <div className="text-default">
              {getNameFile(currentUser?.businessLicenseInfo.linkFile)}
            </div>
            <Link
              href={currentUser?.businessLicenseInfo.linkFile}
              target="_blank"
              className="text-default"
            >
              Xem
            </Link>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomUpload name="company_business" control={control} />
          <button
            type="submit"
            className="w-full mt-4 py-3 text-white bg-[#FF7D55] rounded-lg text-base font-bold"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
}
