import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("upload");
  const url = new URL(request.url);
  const protocol = url.protocol; // e.g., 'http:' or 'https:'
  const host = url.host;
  if (file && file instanceof File) {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);

    // Tạo đường dẫn lưu trữ hình ảnh
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    console.log(uploadDir);
    // Tạo tên file duy nhất
    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, buffer);

    // Trả về URL hình ảnh đã tải lên
    return NextResponse.json({
      url: `/uploads/${file.name}`,
    });
  }

  return NextResponse.json({ error: "File upload failed." }, { status: 400 });
}
