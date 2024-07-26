import { Access } from "@/component/access";
import { Description } from "@/component/description";
import { HomeTop } from "@/component/home-top";
import { Partner } from "@/component/partner";

export default function Home() {
  return (
    <>
      <HomeTop />
      <Description />
      <Access />
      <Partner />
    </>
  );
}
