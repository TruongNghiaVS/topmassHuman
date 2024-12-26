import { Metadata } from "next";
import { getMetadataToScreen } from "@/module/helper/api-generate-metadata";
import UpdateJobOvervivew from "@/module/hr-center/job/update-job";
import HistoryWorkingOverivew from "@/module/hr-center/history-working/history-working-overview";

export async function generateMetadata(): Promise<Metadata> {
  // Fetch dữ liệu từ server hoặc API (nếu cần thiết)

  const data = await getMetadataToScreen("homePage");

  return {
    title: data?.metaTitle || "Default Title",
    description: data?.metaDes || "Default Description",
    keywords: [data?.metaKeyWord],
    authors: [{ name: data?.metaAuthor }],
    openGraph: {
      title: data?.metaTitle,
      description: data?.metaDes,
      images: data?.metaImage ? [{ url: data?.metaImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: data?.metaTitle,
      description: data?.metaDes,
      images: data?.coverFullLink
        ? [{ url: data?.metaImage, alt: data?.metaTitle }]
        : undefined,
    },
  };
}

export default function HistoryWorking() {
  return <HistoryWorkingOverivew />;
}
