/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Search, Eye, Edit, Trash2, ChevronDown } from "lucide-react";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import Loading from "@/helpers/Loading";
import { ICourse } from "@/types/course";

const CourseTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const query: Record<string, any> = {};
  if (searchQuery) {
    query["searchTerm"] = searchQuery;
  }
  query["page"] = currentPage;
  query["limit"] = pageSize;
  const { data, isLoading } = useGetCoursesQuery(query);

  if (isLoading) return <Loading />;

  const totalPage = data?.meta?.totalPages || 1;
  const coursesData = data?.data || [];

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    setCurrentPage(1);
  };

  const handlePageChange = (event: any, page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header with Search and Limit */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-card-foreground">
            Course Management
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
              />
            </div>
            {/* Limit Selector */}
            <div className="relative">
              <select
                value={data.meta?.limit || pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={5}>Show 5</option>
                <option value={10}>Show 10</option>
                <option value={20}>Show 20</option>
                <option value={50}>Show 50</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white border-b border-border">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                Course
              </th>
              <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                Price
              </th>
              <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                Modules
              </th>
              <th className="text-left py-3 px-6 font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {coursesData?.map((course: ICourse) => (
              <tr
                key={course?._id}
                className="border-b border-border hover:bg-muted/30"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.file.url || "/placeholder.svg"}
                      alt={course.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-card-foreground">
                        {course.title}
                      </h3>
                      {/* <p className="text-sm text-muted-foreground">
                        by {course.instructor}
                      </p> */}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-card-foreground">
                      ${course.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      100
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90">
                    <Eye className="h-4 w-4" />
                    View Modules
                  </button>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="divide-y divide-border">
          {coursesData.map((course: ICourse, index) => (
            <div key={index} className="p-4">
              <div className="flex items-start gap-4">
                <img
                  src={course.file.url || "/placeholder.svg"}
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-card-foreground mb-1">
                    {course.title}
                  </h3>
                  {/* <p className="text-sm text-muted-foreground mb-2">
                    by {course.instructor}
                  </p> */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-card-foreground">
                      ${course.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {/* ${course.originalPrice} */}
                      $100
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm">
                      <Eye className="h-4 w-4" />
                      Modules
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
