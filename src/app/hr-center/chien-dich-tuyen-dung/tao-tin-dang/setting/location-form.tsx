import TmInput from "@/component/hook-form/input";
import TmSelect from "@/component/hook-form/select";
import { locations } from "@/mockup-data/data";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Control, useFieldArray } from "react-hook-form";

export interface ILocationForm {
  control: Control<any>;
  name: string;
}

export const LocationForm = ({ control, name }: ILocationForm) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="mt-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2 items-start mb-2 ">
          <div className="flex-1 flex sm:space-x-2 items-start mb-2 sm:flex-row flex-col space-y-2 sm:space-y-0">
            <TmSelect
              placeholder="Chọn quận huyện"
              classNameCustom="w-full"
              name={`${name}.${index}.district`}
              control={control}
              options={locations}
            />
            <TmInput
              classNameCustom="w-full"
              placeholder="Nhập địa chỉ làm việc cụ thể"
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
        className="flex text-default"
      >
        <PlusIcon className="w-4 mr-2" />
        Thêm địa chỉ
      </button>
    </div>
  );
};
