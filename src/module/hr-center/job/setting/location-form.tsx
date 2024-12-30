import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { ILocationForm } from "@/interface/interface";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useFieldArray } from "react-hook-form";

export const LocationForm = ({
  control,
  name,
  locationId,
  options = [],
  getValues,
  setValue,
  watch,
}: ILocationForm) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleChangeDistrict = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    if (event.target.value && event.target.value === "-1") {
      setValue(`locations.${index}.districts`, [
        {
          district: event.target.value,
          detail_location: "",
        },
      ]);
    }
    const watchedName = watch(`locations.${index}.districts`);
  };

  return (
    <div className="mt-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2 items-start mb-2 ">
          <div className="flex-1 flex sm:space-x-2 items-start mb-2 sm:flex-row flex-col space-y-2 sm:space-y-0">
            <TmSelect
              placeholder="Chọn quận huyện"
              classNameCustom="w-full"
              name={`${name}.${index}.district`}
              disabled={(locationId && locationId === "-1") || false}
              onChange={(e) => handleChangeDistrict(e, index)}
              control={control}
              options={options}
            />
            <TmInput
              classNameCustom="w-full"
              placeholder="Nhập Số nhà, Tên đường, Phường/Xã"
              disabled={
                (locationId && locationId === "-1") ||
                getValues(`locations.${index}.districts.${index}.district`) ===
                  "-1"
                  ? true
                  : false
              }
              name={`${name}.${index}.detail_location`}
              control={control}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              remove(index);
            }}
            className=""
          >
            <TrashIcon className="w-8 text-default" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ district: "", detail_location: "" })}
        className="flex text-default items-center"
      >
        <PlusIcon className="w-4 mr-2" />
        Thêm địa chỉ
      </button>
    </div>
  );
};
