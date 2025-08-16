"use client";
import Courses from "@/components/course/Courses";
import SearchBar from "@/components/ui/Searchbar";
import { Pagination } from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function InToCourse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const sampleCourses = [
    {
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      instructorImage: "/placeholder.svg?height=200&width=400",
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
      instructorImage: "/placeholder.svg?height=200&width=400",
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
      instructorImage: "/placeholder.svg?height=200&width=400",
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
      instructorImage: "/placeholder.svg?height=200&width=400",
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
      instructorImage: "/placeholder.svg?height=200&width=400",
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
      instructorImage: "/placeholder.svg?height=200&width=400",
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
      instructorImage: "/placeholder.svg?height=200&width=400",
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
      instructorImage: "/placeholder.svg?height=200&width=400",
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
      instructorImage: "/placeholder.svg?height=200&width=400",
      rating: 4.4,
      reviewCount: 5432,
      price: 119,
      originalPrice: 219,
      description:
        "Build decentralized applications with Ethereum, Solidity, and Web3 technologies.",
      category: "Blockchain",
    },
  ];

  const filteredCourses = useMemo(() => {
    return sampleCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
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
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search courses, instructors, or categories..."
          />
        </div>

        {/* Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-muted-foreground text-center">
              Found {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedCourses.map((course, index) => (
            <Courses key={index} {...course} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
