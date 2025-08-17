/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/helpers/Loading";
import React, { useState } from "react";

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
  return <div></div>;
};

export default DashboardLectureView;
