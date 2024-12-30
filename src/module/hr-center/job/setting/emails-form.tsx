import { useFieldArray } from "react-hook-form";
import TmInput from "@/component/hook-form/input";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { IMultipleFieldForm } from "@/interface/interface";

export const EmailsForm = ({ control, name }: IMultipleFieldForm) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-4 items-start mt-4">
          <TmInput
            classNameCustom="flex-1"
            name={`${name}.${index}.email`}
            control={control}
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
        onClick={() => append({ email: "" })}
        className="flex text-default mt-4 items-center"
      >
        <PlusIcon className="w-4 mr-2" />
        Thêm email
      </button>
    </div>
  );
};
