import axios, { AxiosRequestConfig } from "axios";
import { HOST_API, HOST_API_UPLOAD_IMG } from "@/config-global";
import { getToken } from "./token";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use((response) => response.data);

axiosInstance.interceptors.request.use((config: any) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

export const axiosInstanceNotToken = axios.create({
  baseURL: HOST_API,
  headers: { "Content-Type": "application/json" },
});
axiosInstanceNotToken.interceptors.response.use((response) => response.data);

export const axiosInstanceImg = axios.create({
  baseURL: HOST_API_UPLOAD_IMG,
  headers: { "Content-Type": "multipart/form-data" },
});

axiosInstanceImg.interceptors.response.use((response) => response.data);

axiosInstanceImg.interceptors.request.use((config: any) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
