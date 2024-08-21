import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";

export const CvSearch = () => {
  const { control } = useForm({
    defaultValues: {
      name: "",
      cv: "",
      status: "",
    },
  });

  const header = ["Tên ứng viên", "Số điện thoại", "Email", "Trạng thái cv"];

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
      <div className="mt-4 px-2">
        <TmInput
          name="name"
          className="sm:!w-1/2"
          icon={<MagnifyingGlassIcon className="w-4" />}
          control={control}
          placeholder="Tìm kiếm ứng viên, tên, số điện thoại"
        />
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
                    <div className="mt-1">
                      <div className="flex lg:justify-between items-center lg:flex-row flex-col ">
                        <div>
                          <div>{row.name}</div>
                          <div className="text-default">{row.cv_name}</div>
                        </div>
                        <div className="bg-[#DAFFD7] text-[#137F04] px-3 py-1  mt-1 rounded-xl">
                          Mức độ phù hợp: 87%
                        </div>
                      </div>
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
                  <td className="p-4 ">
                    <div className="inline-block px-3 py-1 rounded-xl bg-[#DAFFD7] text-[#137F04]">
                      {row.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
