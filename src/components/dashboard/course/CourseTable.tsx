/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Search, Eye, Edit, Trash2, ChevronDown } from "lucide-react";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import Loading from "@/helpers/Loading";
import { ICourse } from "@/types/course";
import DashboardSearchBar from "@/components/textInput/DashboardSearchBar";
import DashboardTextSelector from "@/components/textInput/DashboardTextSelector";
import TableHead from "@/components/table/TableHead";
import CourseTableBody from "@/components/table/CourseTableBody";

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

            <DashboardSearchBar
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
            />

            <DashboardTextSelector
              pageSize={pageSize}
              setPageSize={setPageSize}
              limit={data?.meta?.limit}
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <TableHead tableHeadings={["Course", "Price", "Modules", "Action"]} />

          <CourseTableBody coursesData={coursesData} />
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
