/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ModuleTableBodyProps {
  moduleData: any[]; // Replace 'any' with the actual type of your module data
}
const ModuleTableBody = ({ moduleData }: ModuleTableBodyProps) => {
  return (
    <tbody>
      {moduleData?.map((module) => (
        <tr
          key={module?._id}
          className="border-b border-border hover:bg-muted/30"
        >
          <td className="py-4 px-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-card-foreground">
                {module.title}
              </span>
            </div>
          </td>
          <td className="py-4 px-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-card-foreground">
                {module?.courseId?.title}
              </span>
            </div>
          </td>

          <td className="py-4 px-6">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <Link
                href={`/dashboard/all-module/edit/${module._id}`}
                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg pointer"
              >
                <Edit className="h-4 w-4" />
              </Link>
              <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg">
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ModuleTableBody;
