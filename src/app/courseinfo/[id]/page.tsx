import CourseDetails from "@/components/course/CourseDetails";
import React from "react";

interface CourseDetailsPageProps {
  params: { id: string };
}

const CourseDetailsPage = async ({ params }: CourseDetailsPageProps) => {
  const { id } = params;

  return (
    <div>
      <CourseDetails id={id} />
    </div>
  );
};

export default CourseDetailsPage;
