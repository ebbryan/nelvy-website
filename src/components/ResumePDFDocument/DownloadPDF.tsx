/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DownloadResumePDF.tsx
"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDFDocument from ".";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export default function DownloadResumePDF({ resumeData }: { resumeData: any }) {
  return (
    <PDFDownloadLink
      document={<ResumePDFDocument data={resumeData} />}
      fileName="Nelvy_Holares_Resume.pdf"
    >
      {({ loading }) => (
        <Button variant="default">
          <Download className="mr-2" />
          {loading ? "Preparing..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
