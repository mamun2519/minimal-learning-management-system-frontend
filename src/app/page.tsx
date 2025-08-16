import InToCourse from "@/components/course/InToCourse";
import { URL } from "@/constants/url";
// import "tw-animate-css";

async function Home() {
  const data = await fetch(`${URL}/course`, {
    // next: { revalidate: 60 },
  });
  const result = await data.json();
  const courses = result?.data?.data;
  const coursesMetaData = result?.data.meta;
  console.log(courses);
  return (
    <div>
      <InToCourse courses={courses} coursesMetaData={coursesMetaData} />
    </div>
  );
}

export default Home;
