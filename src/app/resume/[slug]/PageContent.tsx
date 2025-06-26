/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DownloadResumePDF from "@/components/ResumePDFDocument/DownloadPDF";
import ResumePDFPreview from "@/components/ResumePDFDocument/Preview";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";

const PageContent = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState<any>(null);
  useEffect(() => {
    const fetchResume = async () => {
      const res = await fetch(`/api/resume?id=${id}`);
      const data = await res.json();
      setResumeData(data);
      setLoading(false);
    };

    fetchResume();
  }, [id]);

  if (loading)
    return (
      <section className="flex flex-col items-center justify-center h-full">
        <Spinner />
      </section>
    );

  if (!resumeData) return <p className="p-4 text-red-500">Resume not found.</p>;
  return (
    <section className="flex flex-col gap-2.5">
      <div className="w-full flex items-end justify-end">
        <DownloadResumePDF resumeData={resumeData} />
      </div>

      <ResumePDFPreview resumeData={resumeData} />
    </section>
  );
};

export default PageContent;
