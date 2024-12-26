import { Metadata } from "next";
import { getMetadataToScreen } from "@/module/helper/api-generate-metadata";
import ProfileDetailCvOverview from "@/module/hr-center/search-cv/detail-infomation-cv-overview";

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

export default function ProfileDetailCv({
  params,
}: {
  params: { slug: string };
}) {
  return <ProfileDetailCvOverview slug={params.slug} />;
}
