import { ChevronDown } from "lucide-react";
import React from "react";

interface DashboardSelectorProps {
  data: { value: string | number; label: string }[];
  setSelect: (value: string | number) => void;
}
const DashboardSelector = ({ data, setSelect }: DashboardSelectorProps) => {
  return (
    <div className="relative">
      <select
        //   value={limit || pageSize}
        onChange={(e) => setSelect(e.target.value)}
        className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <option value="" disabled>
          {" "}
          filter by course
        </option>
        {data?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
};

export default DashboardSelector;
