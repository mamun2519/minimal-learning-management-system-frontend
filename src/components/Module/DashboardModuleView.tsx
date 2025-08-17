"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/helpers/Loading";
import React, { useState } from "react";
import DashboardSearchBar from "../textInput/DashboardSearchBar";
import Link from "next/link";
import TableHead from "../table/TableHead";
import { Edit, Trash2 } from "lucide-react";
import { Pagination } from "@mui/material";
import { useGetAllModuleQuery } from "@/redux/api/moduleApi";

import ModuleTableBody from "../table/ModuleTableBody";

const DashboardModuleView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const query: Record<string, any> = {};
  if (searchQuery) {
    query["searchTerm"] = searchQuery;
  }

  query["page"] = currentPage;
  query["limit"] = pageSize;
  const { data: moduleData, isLoading } = useGetAllModuleQuery(query);

  if (isLoading) return <Loading />;

  const totalPage = moduleData?.meta?.totalPages || 1;

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
            Module Management
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}

            <DashboardSearchBar
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              placeholder="Search by module title"
            />

            {/* <DashboardTextSelector
              pageSize={pageSize}
              setPageSize={setPageSize}
              limit={data?.meta?.limit}
            /> */}
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <TableHead
            tableHeadings={["module Title", "Course Title", "Action"]}
          />

          <ModuleTableBody moduleData={moduleData?.data} />
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="divide-y divide-border">
          {moduleData?.data.map((module: any) => (
            <div key={module._id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-card-foreground mb-1">
                    {module.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-card-foreground">
                      {module.courseId?.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/all-module/edit/${module._id}`}
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
          page={moduleData?.meta?.page || 1}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default DashboardModuleView;
