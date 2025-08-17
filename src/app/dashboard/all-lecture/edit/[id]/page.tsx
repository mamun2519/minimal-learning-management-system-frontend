import EditLectureForm from "@/components/Lecture/EditLecture";
import React from "react";
interface EditLecturePageProps {
  params: Promise<{ id: string }>;
}
const EditLecturePage = async ({ params }: EditLecturePageProps) => {
  const { id } = await params;
  return (
    <div>
      <EditLectureForm id={id} />
    </div>
  );
};

export default EditLecturePage;
