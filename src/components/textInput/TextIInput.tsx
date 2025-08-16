import { Type } from "lucide-react";
import React from "react";

const TextIInput = ({ register, level, title }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="title"
        className="flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <Type className="h-4 w-4" />
        Course Title
      </label>
      <input
        type="text"
        id="title"
        {...register("title", {
          required: "Course title is required",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters long",
          },
          maxLength: {
            value: 100,
            message: "Title must be less than 100 characters",
          },
        })}
        className={`w-full px-3 py-2 border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
          errors.title
            ? "border-destructive bg-destructive/5"
            : "border-input bg-background"
        }`}
        placeholder="Enter course title"
      />
      {errors.title && (
        <p className="text-sm text-destructive">{errors.title.message}</p>
      )}
    </div>
  );
};

export default TextIInput;
