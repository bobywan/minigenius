import type { Metadata } from "next";
import { CourseGame } from "./CourseGame";

export const metadata: Metadata = {
  title: "Course",
  description: "Change de couloir, saute les obstacles et ramasse les pièces !",
};

export default function CoursePage() {
  return <CourseGame />;
}
