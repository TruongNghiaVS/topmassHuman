"use client";

export default function HrCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathValidated = ["/dang-ky", "/dang-nhap", "/quen-mat-khau"];
  return (
    <main>
      <div>menu</div>
      {children}
    </main>
  );
}
