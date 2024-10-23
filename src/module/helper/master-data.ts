import {
  GET_ALL_CAMPAIGN,
  GET_CURRENT_USER,
  GET_EXPERIENCE,
  GET_PROVINCE,
  GET_RANK_CANDIDATE,
} from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import useSWR from "swr";

export const Provinces = () => {
  const { data, error, mutate, isLoading } = useSWR(GET_PROVINCE, fetcher);
  const provinces = data
    ? data?.data.map((item: any) => {
        return {
          value: item.code,
          label: item.name,
        };
      })
    : [];
  const listProvinces = [
    {
      label: "Tất cả",
      value: "0",
    },
    ...provinces,
  ];
  return {
    error,
    isLoading,
    provinces,
    listProvinces,
    mutate,
  };
};

export const District = () => {
  const { data, error, mutate, isLoading } = useSWR(GET_PROVINCE, fetcher);
  const provinces = data
    ? data?.data.map((item: any) => {
        return {
          value: item.code,
          label: item.name,
        };
      })
    : [];
  const listProvinces = [
    {
      label: "Tất cả",
      value: "0",
    },
    ...provinces,
  ];
  return {
    error,
    isLoading,
    provinces,
    listProvinces,
    mutate,
  };
};

export const Campaign = () => {
  const { data: campaingData, error, mutate, isLoading } = useSWR(
    `${GET_ALL_CAMPAIGN}?status=-1`,
    fetcher
  );
  const campaign = campaingData
    ? campaingData?.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      })
    : [];
  const listCampaign = [
    {
      label: "Tất cả",
      value: -1,
    },
    ...campaign,
  ];
  return {
    error,
    isLoading,
    campaign,
    listCampaign,
    mutate,
  };
};

export const ProfileUser = () => {
  const { data: currentUser, error, mutate } = useSWR(
    GET_CURRENT_USER,
    fetcher
  );

  return {
    currentUser,
  };
};

export const Experiences = () => {
  const { data, error, mutate, isLoading } = useSWR(GET_EXPERIENCE, fetcher);

  const experiences = data
    ? data?.map((item: any) => {
        return {
          value: item.id.toString(),
          label: item.text,
        };
      })
    : [];
  const listExperiences = [
    {
      label: "Tất cả",
      value: "-1",
    },
    ...experiences,
  ];
  return {
    error,
    isLoading,
    experiences,
    listExperiences,
    mutate,
  };
};

export const Rank = () => {
  const { data, error, mutate, isLoading } = useSWR(
    GET_RANK_CANDIDATE,
    fetcher
  );

  const ranks = data
    ? data?.map((item: any) => {
        return {
          value: item.id.toString(),
          label: item.text,
        };
      })
    : [];
  const listRanks = [
    {
      label: "Tất cả",
      value: "-1",
    },
    ...ranks,
  ];
  return {
    error,
    isLoading,
    ranks,
    listRanks,
    mutate,
  };
};
