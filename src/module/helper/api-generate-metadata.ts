import { GET_METADATA } from "@/utils/api-url";
import { axiosInstanceNotToken } from "@/utils/axios";

export const getMetadataToScreen = async (keyScreen: string) => {
  const res = await axiosInstanceNotToken.get(GET_METADATA, {
    params: { keyScreen },
  });

  return res.data;
};
