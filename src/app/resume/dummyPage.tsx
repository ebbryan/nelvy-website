"use client";
import { useEffect, useState } from "react";

const DummyPage = () => {
  const [resume, setResume] = useState<any>(null);
  console.log("🚀 ~ DummyPage ~ resume:", resume);
  const [isEditing, setIsEditing] = useState(false);
  const [objective, setObjective] = useState("");

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setResume(data);
        setObjective(data?.careerObjective || "");
      });
  }, []);

  const handleSave = async () => {
    const updated = { ...resume, careerObjective: objective };
    setResume(updated);
    await fetch("/api/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setIsEditing(false);
  };

  if (!resume) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{resume.basics?.name}</h1>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Career Objective</h2>
        <button
          className="text-blue-500 underline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <>
          <textarea
            className="w-full p-2 border"
            rows={4}
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      ) : (
        <p>{resume.careerObjective}</p>
      )}
    </div>
  );
};

export default DummyPage;
