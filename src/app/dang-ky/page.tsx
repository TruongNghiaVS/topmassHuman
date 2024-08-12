import { AuthorizeLayout } from "@/component/authorize";
import { FormRegister } from "@/component/form-register";

export default function Register() {
  return (
    <div className="bg-white max-1280:px-2">
      <AuthorizeLayout>
        <FormRegister />
      </AuthorizeLayout>
    </div>
  );
}

export const revalidate = 100;
