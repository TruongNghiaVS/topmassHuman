import { useFieldArray } from "react-hook-form";
import { ILocationForm } from "./location-form";
import TmInput from "@/component/hook-form/input";
import { ClockIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { dayOfWeek } from "@/mockup-data/data";
import TmSelect from "@/component/hook-form/select";

export const TimeWorkingForm = ({ control, name }: ILocationForm) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-4 items-start mt-4">
          <ClockIcon className="w-7 text-default" />
          <TmSelect
            classNameCustom="flex-1"
            placeholder="Chọn ngày"
            name={`${name}.${index}.day_from`}
            control={control}
            options={dayOfWeek}
          />
          <div>-</div>
          <TmSelect
            classNameCustom="flex-1"
            placeholder="Chọn ngày"
            name={`${name}.${index}.day_to`}
            control={control}
            options={dayOfWeek}
          />
          <TmInput
            classNameCustom="flex-1"
            name={`${name}.${index}.time_from`}
            control={control}
            type="time"
          />
          <TmInput
            classNameCustom="flex-1"
            name={`${name}.${index}.time_to`}
            control={control}
            type="time"
          />
          <button
            onClick={() => {
              remove(index);
            }}
          >
            <TrashIcon className="w-7 text-default" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({ day_from: "", day_to: "", time_from: "", time_to: "" })
        }
        className="flex text-default mt-4"
      >
        <PlusIcon className="w-4 mr-2" />
        Thêm địa chỉ
      </button>
    </div>
  );
};
