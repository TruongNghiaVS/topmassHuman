"use client";

import { AuthorizeLayout } from "@/component/authorize";
import { LoginForm } from "@/component/login";

export default function Login() {
  return (
    <div>
      <AuthorizeLayout>
        <LoginForm />
      </AuthorizeLayout>
    </div>
  );
}
