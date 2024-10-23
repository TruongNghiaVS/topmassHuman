"use client";
import { Access } from "@/component/access";
import { Description } from "@/component/description";
import { HomeTop } from "@/component/home-top";
import { Partner } from "@/component/partner";
import { GET_ALL_PARTNER } from "@/utils/api-url";
import { fetcher } from "@/utils/axios";
import useSWR from "swr";

export default function Home() {
  const { data: partners, error } = useSWR(GET_ALL_PARTNER, fetcher);

  return (
    <>
      <HomeTop />
      <Description />
      <Access />
      <Partner partners={partners} />
    </>
  );
}
