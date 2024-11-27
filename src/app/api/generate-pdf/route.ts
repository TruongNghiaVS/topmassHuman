import { NextResponse } from "next/server";
import path from "path";
import puppeteer from "puppeteer";
import { promises as fs } from "fs";
import { cookies } from "next/headers";
import axios from "axios";
import { HOST_API } from "@/config-global";
import {
  getCertificate,
  getContact,
  getEducation,
  getExperience,
  getProject,
  getReward,
  getSkill,
  getSoftSkill,
} from "./func-read-prop-file";
import { GET_PROFILE_SEARCH_CV } from "@/utils/api-url";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract specific query parameters
    const searchId = searchParams.get("searchId");
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const url = HOST_API + GET_PROFILE_SEARCH_CV;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      params: {
        searchId,
      },
    });

    const filePath = path.join(
      process.cwd(),
      "public",
      "files/cv-template.html"
    );

    let htmlContent = await fs.readFile(filePath, "utf8");
    if (!htmlContent) {
      return NextResponse.json(
        { error: "HTML string is required" },
        { status: 400 }
      );
    }

    const profileUser = res.data.data.profileCv;

    const certificate = await getCertificate(res.data.data.allCertify);
    const contact = await getContact(
      profileUser,
      res.data.data.hideEmail,
      res.data.data.hidePhone
    );
    const education = await getEducation(res.data.data.educations);
    const experience = await getExperience(res.data.data.experiences);
    const project = await getProject(res.data.data.allProjects);
    const reward = await getReward(res.data.data.allReward);
    const skill = await getSkill(res.data.data.allSkill);
    const softSkill = await getSoftSkill(res.data.data.allsoftSkill);

    htmlContent = htmlContent
      .replace(`{contact}`, contact)
      .replace("{education}", education)
      .replace("{soft_skill}", softSkill)
      .replace("{skill}", skill)
      .replace("{reward}", reward)
      .replace("{certificates}", certificate)
      .replace("{introduction}", profileUser.introduction)
      .replace("{name}", profileUser.fullName)
      .replace("{linkProFile}", profileUser.avatarLink)
      .replace("{position}", profileUser.position)
      .replace("{experiences}", experience)
      .replace("{project}", project);

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // // Set the content of the page to the HTML string
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    // // Close the browser
    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="document.pdf"',
      },
    });
  } catch (error) {
    console.error("Failed to generate PDF", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
