"use client";

export default function HrCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#E8EDF2] w-full min-h-screen bg-white">{children}</div>
  );
}
