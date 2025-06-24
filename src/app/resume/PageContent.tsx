"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";

import { defaultTheme } from "@/lib/theme";
import { resumeData } from "./resumeData";
import { calculateAge } from "@/lib/calculateAge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const PageContent = () => {
  const pathname = usePathname();
  const birthDate = "February 21, 1997";
  const dynamicAge = calculateAge(birthDate);

  const personalInfo = [
    { label: "Age", value: `${dynamicAge} yrs. old` },
    ...resumeData.personalInformation.filter((item) => item.label !== "Age"),
  ];

  return (
    <section className="h-full flex flex-col items-center gap-2">
      <div className="p-5 w-full items-end justify-end flex md:hidden sm:flex">
        <h1
          className={`text-2xl font-black text-[${defaultTheme.color.primary}]`}
        >
          {pathname === "/resume" && "My Resume"}
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Career Objective</CardTitle>
          </CardHeader>
          <CardContent>{resumeData.careerObjective}</CardContent>
        </Card>
        <div className="w-2/12 flex flex-col items-center justify-center">
          <Image
            src="/nelvy.jpg"
            alt="Image"
            className="rounded-md object-cover"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="w-full h-full overflow-auto  space-y-6">
        {/* Career Objective */}

        {/* <div className="w-full flex flex-col md:flex-row gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Career Objective</CardTitle>
            </CardHeader>
            <CardContent>{resumeData.careerObjective}</CardContent>
          </Card>
          <Card className="w-full">
            <Image
              src="/nelvy.jpg"
              alt="Image"
              className="rounded-md object-cover"
              width={200}
              height={200}
            />
          </Card>
        </div> */}
        <div className="w-full flex flex-col md:flex-row gap-4">
          {/* Personal Information */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {personalInfo.map((item, i) => (
                <div key={i}>
                  <strong>{item.label}:</strong> {item.value}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Personal Skills */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Personal Skills</CardTitle>
            </CardHeader>
            <CardContent className="list-disc ml-4 space-y-1">
              {resumeData.personalSkills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          {/* Educational Attainment */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Educational Attainment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {resumeData.educationalAttainment.map((edu, i) => (
                <div key={i}>
                  <div className="font-semibold">{edu.degree || edu.level}</div>
                  <div>
                    {edu.school} ({edu.years})
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {edu.location}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {resumeData.workExperience.map((job, i) => (
                <div key={i}>
                  <div className="font-semibold">{job.position}</div>
                  <div>{job.company}</div>
                  <div className="text-sm">{job.location}</div>
                  <div className="text-sm italic">{job.duration}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          {/* Job Description */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="list-disc ml-4 space-y-1">
              {resumeData.jobDescription.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </CardContent>
          </Card>

          {/* Character References */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Character References</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resumeData.characterReferences.map((ref, i) => (
                <div key={i}>
                  <div className="font-semibold">{ref.name}</div>
                  <div>
                    {ref.position} at {ref.company}
                  </div>
                  {ref.contactNumbers.map((num, j) => (
                    <div className="text-sm" key={j}>
                      {num}
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Certification */}
        <Card>
          <CardHeader>
            <CardTitle>Certification</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{resumeData.certification}</p>
            <p className="mt-4 font-bold">{resumeData.signature}</p>
          </CardContent>
        </Card>
      </div>
      <div className="p-5 w-full items-end justify-end flex">
        <Button className="w-full md:w-auto">
          <Download className="mr-2" />
          Download Resume
        </Button>
      </div>
    </section>
  );
};

export default PageContent;
