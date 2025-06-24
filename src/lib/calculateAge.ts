// lib/calculateAge.ts
import dayjs from "dayjs";

export const calculateAge = (birthDate: string): number => {
  const birthDateObj = dayjs(birthDate);
  const today = dayjs();
  const age = today.diff(birthDateObj, "year");
  return age;
};
