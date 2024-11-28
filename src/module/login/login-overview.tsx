"use client";

import { AuthorizeLayout } from "@/component/authorize";
import { LoginForm } from "@/component/login";

export default function LoginOverview() {
  return (
    <div>
      <AuthorizeLayout>
        <LoginForm />
      </AuthorizeLayout>
    </div>
  );
}
