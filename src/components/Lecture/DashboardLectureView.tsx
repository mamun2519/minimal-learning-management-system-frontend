/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/helpers/Loading";
import { useGetAllLectureQuery } from "@/redux/api/lectureApi";
import React, { useState } from "react";
import DashboardSearchBar from "../textInput/DashboardSearchBar";
import DashboardTextSelector from "../textInput/DashboardTextSelector";
import Link from "next/link";
import TableHead from "../table/TableHead";

const DashboardLectureView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const query: Record<string, any> = {};
  if (searchQuery) {
    query["searchTerm"] = searchQuery;
  }
  query["page"] = currentPage;
  query["limit"] = pageSize;
  const { data, isLoading } = useGetAllLectureQuery(query);

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
            Lecture Management
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
            <Link
              href="/dashboard/all-course/add-new-course"
              className="bg-primary/90 px-4  rounded-md text-white py-2"
            >
              Add New Course
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <TableHead
            tableHeadings={[
              "lecture Title",
              "course Title",
              "total module",
              "total lecture",
              "Action",
            ]}
          />

          <CourseTableBody coursesData={coursesData} />
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="divide-y divide-border">
          {coursesData.map((course: ICourse) => (
            <div key={course._id} className="p-4">
              <div className="flex items-start gap-4">
                <Image
                  width={64}
                  height={64}
                  src={course.file.url || "/placeholder.svg"}
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-card-foreground mb-1">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-card-foreground">
                      ${course.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      $100
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm">
                      Add Module
                    </button>
                    <Link
                      href={`/dashboard/all-course/update-course/${course._id}`}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
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

      {/* // Pagination */}
      <div className="flex justify-center py-8">
        <Pagination
          count={totalPage}
          onChange={handlePageChange}
          page={data?.meta?.page || 1}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default DashboardLectureView;
