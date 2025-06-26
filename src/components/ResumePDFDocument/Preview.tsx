/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { PDFViewer } from "@react-pdf/renderer";
import ResumePDFDocument from ".";

export default function ResumePDFPreview({ resumeData }: { resumeData: any }) {
  return (
    <div className="w-full h-[90vh] border">
      <PDFViewer width="100%" height="100%" showToolbar={false}>
        <ResumePDFDocument data={resumeData} />
      </PDFViewer>
    </div>
  );
}
