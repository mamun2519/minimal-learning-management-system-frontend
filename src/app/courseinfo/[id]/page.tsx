import CourseDetails from "@/components/course/CourseDetails";
import React from "react";

interface CourseDetailsPageProps {
  params: { id: string };
}

const CourseDetailsPage = ({ params }: CourseDetailsPageProps) => {
  return (
    <div>
      <CourseDetails id={params.id} />
    </div>
  );
};

export default CourseDetailsPage;
