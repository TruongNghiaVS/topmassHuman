import { useLoading } from "@/app/context/loading";
import CustomUpload from "@/component/hook-form/custom-upload";
import {
  ICompanyBusiness,
  ICurrentUser,
  IUpdateInfomation,
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
  });

  const { handleSubmit, control } = useForm<ICompanyBusiness>({
    resolver: yupResolver(schema),
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

  const conditionalRender=( currentUserInfo : ICurrentUser)=> {
  
      if( currentUser ==null)
      {
        return <></>;
      }
      if( currentUser.businessLicenseInfo==null)
      {
        return <></>;
      }
      const statusCodeGet = currentUser.businessLicenseInfo.statusCode;
      if( statusCodeGet === 3)
      {
          return  ( 

            <div className="bg-[#64D885] rounded-2xl px-2 py-1">
            {currentUser?.businessLicenseInfo.statusText}
          </div>
          )
      } 
      else if(statusCodeGet === 2 )
      {
        return (
          <div className="bg-[#FF0000] rounded-2xl px-2 py-1 text-default">
          {currentUser?.businessLicenseInfo.statusText}
        </div>)
      }
      else if(statusCodeGet === 1 )  {
        return (
          <div className="bg-[#FCC575] rounded-2xl px-2 py-1 text-default">
          {currentUser?.businessLicenseInfo.statusText}
        </div>)
     }
     else 
     {
      return <></>;
     }
 }
 

  return (
    

    <div>
      <div className="flex space-x-2 items-center">
        <div className="font-semibold">Thông tin giấy đăng ký doanh nghiệp</div>
        {conditionalRender(currentUser)}

      </div>
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
        <div></div>
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
