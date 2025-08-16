import CourseTable from "@/components/dashboard/course/CourseTable";
import React from "react";

const AllCourse = () => {
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
  ];

  return (
    <div>
      <CourseTable />
    </div>
  );
};

export default AllCourse;
