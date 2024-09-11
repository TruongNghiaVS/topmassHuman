import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Cookies from "js-cookie";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Check for token in cookies
    const token = Cookies.get("token");

    if (!token) {
      // Redirect to login page if no token is found
      router.push("/dang-nhap");
    }
  }, [router]);
};

export default useAuth;
