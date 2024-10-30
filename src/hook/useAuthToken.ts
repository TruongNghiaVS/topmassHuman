import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Cookies from "js-cookie";

const useAuth = () => {
  const router = useRouter();
  const path = usePathname();
  const listPath = ["/hr-center", "/doi-cv"];

  useEffect(() => {
    // Check for token in cookies
    const token = Cookies.get("token");
    const isPath = listPath.some((pathName) => path.startsWith(pathName));
    if (!token && isPath) {
      // Redirect to login page if no token is found
      router.push("/dang-nhap");
    }
  }, [path]);
};

export default useAuth;
