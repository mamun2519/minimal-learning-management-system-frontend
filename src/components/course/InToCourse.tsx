/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Courses from "@/components/course/Courses";
import SearchBar from "@/components/ui/Searchbar";
import Loading from "@/helpers/Loading";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { ICourse } from "@/types/course";
import { Pagination } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function InToCourse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const sampleCourses = [
    {
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      instructorImage:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230629123647/Best-C-Programming-Courses-For-Beginners.png",
      rating: 4.8,
      reviewCount: 12543,
      price: 89,
      originalPrice: 199,
      description:
        "Learn modern web development from scratch. Build real projects with HTML, CSS, JavaScript, React, and Node.js.",
      category: "Web Development",
    },
    {
      title: "UI/UX Design Masterclass",
      instructor: "Michael Chen",
      instructorImage:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230629123647/Best-C-Programming-Courses-For-Beginners.png",
      rating: 4.9,
      reviewCount: 8721,
      price: 79,
      originalPrice: 149,
      description:
        "Master the art of user interface and user experience design. Create stunning, user-friendly designs.",
      category: "Design",
    },
    {
      title: "Data Science with Python",
      instructor: "Dr. Emily Rodriguez",
      instructorImage:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230629123647/Best-C-Programming-Courses-For-Beginners.png",
      rating: 4.7,
      reviewCount: 15632,
      price: 99,
      originalPrice: 179,
      description:
        "Comprehensive data science course covering Python, pandas, machine learning, and data visualization.",
      category: "Data Science",
    },
    {
      title: "Digital Marketing Strategy",
      instructor: "James Wilson",
      instructorImage:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230629123647/Best-C-Programming-Courses-For-Beginners.png",
      rating: 4.6,
      reviewCount: 9876,
      price: 69,
      originalPrice: 129,
      description:
        "Learn effective digital marketing strategies including SEO, social media, and content marketing.",
      category: "Marketing",
    },
    {
      title: "React Native Mobile Development",
      instructor: "Alex Thompson",
      instructorImage:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230629123647/Best-C-Programming-Courses-For-Beginners.png",
      rating: 4.5,
      reviewCount: 6543,
      price: 95,
      originalPrice: 169,
      description:
        "Build cross-platform mobile apps with React Native. Learn iOS and Android development.",
      category: "Mobile Development",
    },
    {
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Lisa Park",
      instructorImage:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230629123647/Best-C-Programming-Courses-For-Beginners.png",
      rating: 4.8,
      reviewCount: 11234,
      price: 109,
      originalPrice: 199,
      description:
        "Introduction to machine learning algorithms, neural networks, and AI applications.",
      category: "AI & ML",
    },
    {
      title: "Cloud Computing with AWS",
      instructor: "Robert Kim",
      instructorImage:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230629123647/Best-C-Programming-Courses-For-Beginners.png",
      rating: 4.7,
      reviewCount: 8765,
      price: 89,
      originalPrice: 159,
      description:
        "Master Amazon Web Services and cloud architecture. Deploy scalable applications.",
      category: "Cloud Computing",
    },
    {
      title: "Cybersecurity Essentials",
      instructor: "Maria Garcia",
      instructorImage:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230629123647/Best-C-Programming-Courses-For-Beginners.png",
      rating: 4.6,
      reviewCount: 7890,
      price: 79,
      originalPrice: 139,
      description:
        "Learn cybersecurity fundamentals, ethical hacking, and network security principles.",
      category: "Security",
    },
    {
      title: "Blockchain Development",
      instructor: "David Lee",
      instructorImage:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230629123647/Best-C-Programming-Courses-For-Beginners.png",
      rating: 4.4,
      reviewCount: 5432,
      price: 119,
      originalPrice: 219,
      description:
        "Build decentralized applications with Ethereum, Solidity, and Web3 technologies.",
      category: "Blockchain",
    },
  ];

  const query: Record<string, any> = {};
  if (searchQuery) {
    query["searchTerm"] = searchQuery;
  }
  query["page"] = currentPage;
  query["limit"] = coursesPerPage;
  const { data, isLoading } = useGetCoursesQuery(query);

  // if(isLoading) {{
  //  return  <Loading />
  // }
  const totalPage = data?.meta?.totalPages || 1;
  const coursesData = data?.data || [];
  console.log(coursesData);
  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    setCurrentPage(1);
  };

  const handlePageChange = (event: any, page: any) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Featured Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our most popular courses taught by industry experts. Start
            learning today and advance your career.
          </p>

          <SearchBar
            value={searchQuery || ""}
            onChange={handleSearchChange}
            placeholder="Search courses, instructors, or categories..."
          />
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {coursesData?.map((course: ICourse) => (
            <Courses key={course._id} {...course} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPage}
            onChange={handlePageChange}
            page={data?.meta?.page || 1}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </main>
    </div>
  );
}
