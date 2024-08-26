import { news } from "@/mockup-data/data";
import { TitleCustom } from "@/component/custom-title";
import { Services } from "./service";

export default function NewCategory() {
  return (
    <div className="bg-[#f0f0f0] pb-10 max-1280:px-2">
      <div className="mx-auto container">
        <TitleCustom title="Bí quyết tìm việc" className="py-8 text-3xl" />
        <div className="grid grid-cols-4 gap-6">
          {news.map((item, index) => {
            return (
              <div key={index.toString() + item.title} className="col-span-1">
                <Services item={item} slug="bi-quyet-tim-viec" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const revalidate = 100;
