"use client";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

const AddressSchema = Yup.object({
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string()
    .required("Zip Code is required")
    .matches(/^\d{5}$/, "Zip Code must be exactly 5 digits"),
});

const FormSchema = Yup.object({
  addresses: Yup.array()
    .of(AddressSchema)
    .min(1, "At least one address is required")
    .required("Addresses are required"),
});

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface FormValues {
  addresses: Address[];
}

const FormComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          <Controller
            name={`addresses.${index}.street`}
            control={control}
            render={({ field }) => <input {...field} placeholder="Street" />}
          />
          {errors.addresses?.[index]?.street && (
            <p>{errors.addresses[index].street?.message}</p>
          )}

          <Controller
            name={`addresses.${index}.city`}
            control={control}
            render={({ field }) => <input {...field} placeholder="City" />}
          />
          {errors.addresses?.[index]?.city && (
            <p>{errors.addresses[index].city?.message}</p>
          )}

          <Controller
            name={`addresses.${index}.zipCode`}
            control={control}
            render={({ field }) => <input {...field} placeholder="Zip Code" />}
          />
          {errors.addresses?.[index]?.zipCode && (
            <p>{errors.addresses[index].zipCode?.message}</p>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
