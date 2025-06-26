/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Divider } from "./Divider";

interface ResumeData {
  basics: any;
  careerObjective: string;
  personalInformation: { label: string; value: string }[];
  personalSkills: string[];
  educationalAttainment: any[];
  workExperience: any[];
  jobDescription: string[];
  characterReferences: any[];
  certification: string;
  signature: string;
}

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica" },
  section: { marginBottom: 20 },
  heading: { fontSize: 12, fontWeight: "bold", marginBottom: 4 },
  line: { borderBottom: "1px solid #000", marginVertical: 5 },
  bold: { fontWeight: "bold" },
});

const ResumePDFDocument = ({ data }: { data: ResumeData }) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View
          style={[
            styles.section,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <View>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              {data.basics.name}
            </Text>
            <Text
              style={{
                textAlign: "left",
                fontSize: 10,
                lineHeight: 1.5,
                marginTop: 5,
              }}
            >
              {data.basics.address}
            </Text>
            <Text
              style={{
                textAlign: "left",
                fontSize: 10,
                lineHeight: 1.5,
              }}
            >
              Contact: {data.basics.contactNumbers.join(" / ")}
            </Text>
            <Text
              style={{
                textAlign: "left",
                fontSize: 10,
                lineHeight: 1.5,
              }}
            >
              Email: {data.basics.email}
            </Text>
          </View>
          <Image
            style={{
              width: 100,
              height: 100,
              marginLeft: 10,
              borderWidth: 1,
              borderColor: "#000",
              borderStyle: "solid",
            }}
            src="/nelvy.jpg"
          />
        </View>

        {/* Career Objective */}
        <View style={[styles.section, { marginTop: -10 }]}>
          <Text style={styles.heading}>CAREER OBJECTIVES</Text>
          <Divider />
          <Text style={{ textAlign: "justify", fontSize: 10, lineHeight: 1.5 }}>
            {data.careerObjective}
          </Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.heading}>PERSONAL INFORMATION</Text>
          <Divider />
          {data.personalInformation.map((item, i) => (
            <Text
              key={i}
              style={{ textAlign: "left", fontSize: 10, lineHeight: 1.5 }}
            >
              {item.label}: {item.value}
            </Text>
          ))}
        </View>

        {/* Personal Skills */}
        <View style={styles.section}>
          <Text style={styles.heading}>PERSONAL SKILLS</Text>
          <Divider />
          {data.personalSkills.map((skill, i) => (
            <Text
              style={{ textAlign: "left", fontSize: 10, lineHeight: 1.5 }}
              key={i}
            >
              • {skill}
            </Text>
          ))}
        </View>

        {/* Educational Attainment */}
        <View style={styles.section}>
          <Text style={styles.heading}>EDUCATIONAL ATTAINMENT</Text>
          <Divider />
          {data.educationalAttainment.map((edu, i) => (
            <View key={i} style={{ lineHeight: 1 }}>
              <Text style={styles.bold}>
                {edu.degree || edu.level} ({edu.years})
              </Text>
              <Text>{edu.school}</Text>
              <Text>{edu.location}</Text>
            </View>
          ))}
        </View>
      </Page>
      <Page size="LETTER" style={styles.page}>
        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.heading}>WORK EXPERIENCE</Text>
          <Divider />
          {data.workExperience.map((exp, i) => (
            <View key={i} style={{ lineHeight: 1 }}>
              <Text style={styles.bold}>{exp.company}</Text>
              <Text style={{ lineHeight: 0.7 }}>
                {exp.position} – {exp.duration}
              </Text>
              <Text>{exp.location}</Text>
            </View>
          ))}
        </View>

        {/* Job Description */}
        <View style={styles.section}>
          <Text style={styles.heading}>JOB DESCRIPTION</Text>
          <Divider />
          {data.jobDescription.map((task, i) => (
            <Text
              key={i}
              style={{ textAlign: "left", fontSize: 10, lineHeight: 1.5 }}
            >
              • {task}
            </Text>
          ))}
        </View>

        {/* References */}
        <View style={styles.section}>
          <Text style={styles.heading}>CHARACTER REFERENCES</Text>
          <Divider />
          {data.characterReferences.map((ref, i) => (
            <View key={i} style={{ lineHeight: 1 }}>
              <Text style={styles.bold}>{ref.name}</Text>
              <Text style={{ lineHeight: 0.7 }}>{ref.position}</Text>
              <Text style={{ lineHeight: 0.7 }}>{ref.company}</Text>
              <Text>Contact: {ref.contactNumbers.join(" / ")}</Text>
            </View>
          ))}
        </View>

        {/* Certification */}
        <View style={styles.section}>
          <Text>{data.certification}</Text>
          <Text style={{ marginTop: 30, fontWeight: "bold" }}>
            {data.signature}
          </Text>
          <Text>Applicant</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFDocument;
