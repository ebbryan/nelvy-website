/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { calculateAge } from "@/lib/calculateAge";
import { Button } from "@/components/ui/button";
import { Ellipsis, Eye, Pencil, Save } from "lucide-react";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoginComponent from "@/components/Login";
import { useRouter } from "@bprogress/next";

const PageContent = () => {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<any>("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      const res = await fetch("/api/resume");
      const data = await res.json();
      setResumeData(data);
      setLoading(false);
    };
    const isLoggedIn = localStorage.getItem("resume_edit_mode") === "true";
    setEditMode(isLoggedIn);

    fetchResume();
  }, []);

  const handleEditClick = (section: string, value: any) => {
    setEditing(section);
    setEditedValue(value);
  };

  const handleSaveClick = async (section: string) => {
    const updatedData = { ...resumeData, [section]: editedValue };
    setResumeData(updatedData);
    setEditing(null);

    return await fetch("/api/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  };

  const onSaveChanges = () => {
    localStorage.setItem("resume_edit_mode", "false");
    toast.success("Resume is up to date.");
    return window.location.reload();
  };

  if (loading)
    return (
      <section className="flex flex-col items-center justify-center h-full">
        <Spinner />
      </section>
    );

  if (!resumeData) return <p className="p-4 text-red-500">Resume not found.</p>;

  const birthDate = resumeData.personalInformation.find(
    (item: any) => item.label === "Birth Date"
  )?.value;

  const dynamicAge = birthDate ? calculateAge(birthDate) : "N/A";

  const personalInfo = [
    { label: "Age", value: `${dynamicAge}` },
    ...resumeData.personalInformation.filter(
      (item: any) => item.label !== "Age"
    ),
  ];

  const onPreview = (id: string) => {
    if (!id) return;
    return router.push(`/resume/${id}`);
  };
  return (
    <section className="h-full flex flex-col items-center gap-2">
      <div className="w-full items-end lg:items-start justify-end lg:justify-start flex">
        {editMode ? (
          <Button variant="default" onClick={onSaveChanges}>
            Save Changes
          </Button>
        ) : (
          <Popover>
            <PopoverTrigger
              className={`hover:bg-[#0E0C01] hover:text-white px-6 py-2 transition-all rounded-sm shadow-md`}
            >
              <Ellipsis />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-auto gap-1.5">
              <LoginComponent title="Update Resume" />
              <Button
                className="w-full md:w-auto"
                onClick={() => onPreview(resumeData._id)}
              >
                <Eye className="mr-2" />
                Preview Resume
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="w-full flex flex-col-reverse items-center md:flex-row gap-4">
        <Card className="w-full hidden md:block h-full">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Career Objective</CardTitle>
            {editMode &&
              (editing === "careerObjective" ? (
                <Button
                  size="sm"
                  onClick={() => handleSaveClick("careerObjective")}
                >
                  <Save className="w-4 h-4 mr-1" /> Save
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleEditClick(
                      "careerObjective",
                      resumeData.careerObjective
                    )
                  }
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
              ))}
          </CardHeader>
          <CardContent className="mt-5">
            {editing === "careerObjective" ? (
              <textarea
                className="w-full p-2 border rounded"
                rows={5}
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
            ) : (
              <p>{resumeData.careerObjective}</p>
            )}
          </CardContent>
        </Card>

        <div className="w-1/3 md:w-2/12 flex flex-col items-center justify-center">
          <Image
            src="/nelvy.jpg"
            alt="Image"
            className="rounded-md object-cover"
            width={400}
            height={400}
          />
        </div>
      </div>

      <div className="w-full h-full overflow-auto space-y-6">
        <Card className="w-full block md:hidden">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Career Objective</CardTitle>
            {editMode &&
              (editing === "careerObjective" ? (
                <Button
                  size="sm"
                  onClick={() => handleSaveClick("careerObjective")}
                >
                  <Save className="w-4 h-4 mr-1" /> Save
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleEditClick(
                      "careerObjective",
                      resumeData.careerObjective
                    )
                  }
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
              ))}
          </CardHeader>
          <CardContent className="mt-5">
            {editing === "careerObjective" ? (
              <textarea
                className="w-full p-2 border rounded"
                rows={5}
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
            ) : (
              <p>{resumeData.careerObjective}</p>
            )}
          </CardContent>
        </Card>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <Card className="w-full">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
              {editMode &&
                (editing === "personalInformation" ? (
                  <Button
                    size="sm"
                    onClick={() => handleSaveClick("personalInformation")}
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleEditClick(
                        "personalInformation",
                        resumeData.personalInformation
                      )
                    }
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                ))}
            </CardHeader>
            <CardContent className="space-y-2">
              {editing === "personalInformation" ? (
                <textarea
                  className="w-full p-2 border rounded"
                  rows={10}
                  value={JSON.stringify(editedValue, null, 2)}
                  onChange={(e) => setEditedValue(JSON.parse(e.target.value))}
                />
              ) : (
                personalInfo.map((item: any, i: number) => (
                  <div key={i}>
                    <strong>{item.label}:</strong> {item.value}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Personal Skills</CardTitle>
              {editMode &&
                (editing === "personalSkills" ? (
                  <Button
                    size="sm"
                    onClick={() => handleSaveClick("personalSkills")}
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleEditClick(
                        "personalSkills",
                        resumeData.personalSkills
                      )
                    }
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                ))}
            </CardHeader>
            <CardContent className="list-disc ml-4 space-y-1">
              {editing === "personalSkills" ? (
                <textarea
                  className="w-full p-2 border rounded"
                  rows={5}
                  value={editedValue.join("\n")}
                  onChange={(e) => setEditedValue(e.target.value.split("\n"))}
                />
              ) : (
                resumeData.personalSkills.map((skill: string, i: number) => (
                  <li key={i}>{skill}</li>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          <Card className="w-full">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Educational Attainment</CardTitle>
              {editMode &&
                (editing === "educationalAttainment" ? (
                  <Button
                    size="sm"
                    onClick={() => handleSaveClick("educationalAttainment")}
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleEditClick(
                        "educationalAttainment",
                        resumeData.educationalAttainment
                      )
                    }
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                ))}
            </CardHeader>
            <CardContent className="space-y-2">
              {editing === "educationalAttainment" ? (
                <textarea
                  className="w-full p-2 border rounded"
                  rows={10}
                  value={JSON.stringify(editedValue, null, 2)}
                  onChange={(e) => setEditedValue(JSON.parse(e.target.value))}
                />
              ) : (
                resumeData.educationalAttainment.map((edu: any, i: number) => (
                  <div key={i}>
                    <div className="font-semibold">
                      {edu.degree || edu.level}
                    </div>
                    <div>
                      {edu.school} ({edu.years})
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {edu.location}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Work Experience</CardTitle>
              {editMode &&
                (editing === "workExperience" ? (
                  <Button
                    size="sm"
                    onClick={() => handleSaveClick("workExperience")}
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleEditClick(
                        "workExperience",
                        resumeData.workExperience
                      )
                    }
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                ))}
            </CardHeader>
            <CardContent className="space-y-2">
              {editing === "workExperience" ? (
                <textarea
                  className="w-full p-2 border rounded"
                  rows={10}
                  value={JSON.stringify(editedValue, null, 2)}
                  onChange={(e) => setEditedValue(JSON.parse(e.target.value))}
                />
              ) : (
                resumeData.workExperience.map((job: any, i: number) => (
                  <div key={i}>
                    <div className="font-semibold">{job.position}</div>
                    <div>{job.company}</div>
                    <div className="text-sm">{job.location}</div>
                    <div className="text-sm italic">{job.duration}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          <Card className="w-full">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Job Description</CardTitle>
              {editMode &&
                (editing === "jobDescription" ? (
                  <Button
                    size="sm"
                    onClick={() => handleSaveClick("jobDescription")}
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleEditClick(
                        "jobDescription",
                        resumeData.jobDescription
                      )
                    }
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                ))}
            </CardHeader>
            <CardContent className="list-disc ml-4 space-y-1">
              {editing === "jobDescription" ? (
                <textarea
                  className="w-full p-2 border rounded"
                  rows={5}
                  value={editedValue.join("\n")}
                  onChange={(e) => setEditedValue(e.target.value.split("\n"))}
                />
              ) : (
                resumeData.jobDescription.map((task: string, i: number) => (
                  <li key={i}>{task}</li>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Character References</CardTitle>
              {editMode &&
                (editing === "characterReferences" ? (
                  <Button
                    size="sm"
                    onClick={() => handleSaveClick("characterReferences")}
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleEditClick(
                        "characterReferences",
                        resumeData.characterReferences
                      )
                    }
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                ))}
            </CardHeader>
            <CardContent className="space-y-3">
              {editing === "characterReferences" ? (
                <textarea
                  className="w-full p-2 border rounded"
                  rows={10}
                  value={JSON.stringify(editedValue, null, 2)}
                  onChange={(e) => setEditedValue(JSON.parse(e.target.value))}
                />
              ) : (
                resumeData.characterReferences.map((ref: any, i: number) => (
                  <div key={i}>
                    <div className="font-semibold">{ref.name}</div>
                    <div>
                      {ref.position} at {ref.company}
                    </div>
                    {ref.contactNumbers.map((num: string, j: number) => (
                      <div className="text-sm" key={j}>
                        {num}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

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
    </section>
  );
};

export default PageContent;
