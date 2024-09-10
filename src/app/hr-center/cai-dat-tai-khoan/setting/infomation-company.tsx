import { useState } from "react";
import EditInfomationCompany from "./edit-infomation-company";
import { IReal, IUpdateInformationProps } from "@/interface/interface";
import useSWR from "swr";
import { REALS } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";

export default function InfomationCompany({
  currentUser,
  mutate,
}: IUpdateInformationProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const { data: listRels, error } = useSWR(REALS, fetcher);

  const getRelName = (id: string) => {
    const data = listRels?.find((item: IReal) => item.id === id);
    return data ? data.text : "";
  };

  return (
    <div>
      {!edit ? (
        <div>
          <div className="flex justify-between items-center">
            <div className="font-medium">Thông tin công ty</div>
            <button
              className="px-2 py-0.5 rounded-lg rounded-2xl text-default bg-[#FCC575]"
              onClick={() => setEdit(true)}
            >
              Chỉnh sửa
            </button>
          </div>
          <div className="mt-4 flex space-x-3 items-center">
            <img
              src={
                currentUser?.companyInfo.logoLink
                  ? currentUser?.companyInfo.logoLink
                  : "/imgs/logo-work.png"
              }
              alt=""
              className=" rounded-full w-20	"
            />
            <div className="font-medium">
              <div>{currentUser?.companyInfo.fullName}</div>
              <div>{currentUser?.companyInfo.addressInfo}</div>
            </div>
          </div>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1">
              Mã số thuế: {currentUser?.companyInfo.taxCode}
            </div>
            <div className="flex-1">
              Website: {currentUser?.companyInfo.website}
            </div>
          </div>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1">
              Lĩnh vực hoạt động: {getRelName(currentUser?.companyInfo.relId)}
            </div>
            <div className="flex-1">
              Qui mô: {currentUser?.companyInfo.capacity}
            </div>
          </div>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1">
              Email: {currentUser?.companyInfo.email}
            </div>
            <div className="flex-1">
              Số điện thoại: {currentUser?.companyInfo.phone}
            </div>
          </div>
          <div className="mt-2">
            Địa chỉ: {currentUser?.companyInfo.addressInfo}
          </div>
          <div className="mt-2">
            Mô tả công ty: Về {currentUser?.companyInfo.fullName}
          </div>
          <div
            className="mt-2 px-4"
            dangerouslySetInnerHTML={{
              __html: currentUser?.companyInfo.shortDes,
            }}
          ></div>
        </div>
      ) : (
        <div>
          <EditInfomationCompany
            setEdit={setEdit}
            currentUser={currentUser}
            mutate={mutate}
            listRels={listRels}
          />
        </div>
      )}
    </div>
  );
}
