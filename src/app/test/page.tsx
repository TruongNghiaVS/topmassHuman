"use client";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  name: string;
  email: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmitWithValidation = async (data: FormValues) => {
    console.log("Form submitted with validation", data);
  };

  const onSubmitWithoutValidation = (data: FormValues) => {
    console.log("Form submitted without validation", data);
  };

  const submitHandler = (skipValidation: boolean) => {
    if (skipValidation) {
      handleSubmit(onSubmitWithoutValidation)(); // Call without Yup validation
    } else {
      handleSubmit(onSubmitWithValidation)(); // Call with Yup validation
    }
  };

  return (
    <form>
      <div>
        <label>Name:</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="button" onClick={() => submitHandler(false)}>
        Submit with Validation
      </button>
      <button type="button" onClick={() => submitHandler(true)}>
        Submit without Validation
      </button>
    </form>
  );
}
