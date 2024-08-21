import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";

export const ApplicationCV = () => {
  const { control } = useForm({
    defaultValues: {
      name: "",
      cv: "",
      status: "",
    },
  });

  const header = ["Tên ứng viên", "Số điện thoại", "Email", "Trạng thái"];

  const data = [
    {
      name: "Phạm Hoàng Thái",
      cv_name: "CV_Marketing_Coordinator",
      phone: "0967477852",
      email: "test@gmail.com",
      status: "Phù hợp",
    },
  ];

  return (
    <div>
      <div className="mt-4 flex sm:space-x-2 space-y-2 sm:space-y-0 px-2 flex-col sm:flex-row">
        <TmInput
          name="name"
          icon={<MagnifyingGlassIcon className="w-4" />}
          control={control}
          placeholder="Tìm kiếm ứng viên, tên, số điện thoại"
          classNameCustom="flex-1"
        />
        <div className="flex-1 flex space-x-2">
          <TmSelect
            control={control}
            name="cv"
            classNameCustom="flex-1"
            placeholder="Tất cả"
            options={[
              { label: "Đã xem", value: "Đã xem" },
              { label: "Chưa xem", value: "Chưa xem" },
            ]}
          />
          <TmSelect
            control={control}
            name="status"
            classNameCustom="flex-1"
            placeholder="Tất cả"
            options={[
              { label: "Phù hợp", value: "Phù hợp" },
              { label: "Chưa phù hợp", value: "Chưa phù hợp" },
              { label: "Pending", value: "Pending" },
              { label: "Mời phỏng vấn", value: "Mời phỏng vấn" },
              { label: "Nhận việc", value: "Nhận việc" },
            ]}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="overflow-x-auto col-span-2 mt-2">
          <table className="border-collapse	 min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-100">
              <tr>
                {header.map((item) => {
                  return (
                    <th
                      key={item}
                      className="p-4 text-center whitespace-nowrap font-medium uppercase sm:min-w-fit min-w-[200px]"
                    >
                      {item}{" "}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs">
              {data.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 text-center`}>
                  <td className="p-4 text-left">
                    <div className="mt-1">{row.name}</div>
                    <div className="text-[#FFB600] mt-1">{row.cv_name}</div>
                    <div className="bg-[#DAFFD7] text-[#137F04] inline-flex px-3 py-1  mt-1 rounded-xl">
                      Mức độ phù hợp: 87%
                    </div>
                  </td>
                  <td className="font-normal p-4">
                    <div className="inline-block px-3 py-1 rounded-xl bg-[#F37A20] text-white">
                      {row.phone}
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="inline-block px-3 py-1 rounded-xl bg-[#E9F0FF] text-[#004ED8]">
                      {row.email}
                    </div>
                  </td>
                  <td className="p-4 ">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
