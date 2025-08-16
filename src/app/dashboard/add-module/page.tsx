"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { Upload, Plus, Trash2, FileText, Video } from "lucide-react";

interface LectureData {
  title: string;
  videoUrl: string;
  pdfNotes: FileList | null;
}

interface ModuleFormData {
  moduleTitle: string;
  lectures: LectureData[];
}

export default function ModuleUploadPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draggedLecture, setDraggedLecture] = useState<number | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModuleFormData>({
    defaultValues: {
      moduleTitle: "",
      lectures: [{ title: "", videoUrl: "", pdfNotes: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lectures",
  });

  const onSubmit = async (data: ModuleFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("moduleTitle", data.moduleTitle);
      data.lectures.forEach((lecture, index) => {
        formData.append(`lectures[${index}][title]`, lecture.title);
        formData.append(`lectures[${index}][videoUrl]`, lecture.videoUrl);

        if (lecture.pdfNotes) {
          Array.from(lecture.pdfNotes).forEach((file, fileIndex) => {
            formData.append(`lectures[${index}][pdfNotes][${fileIndex}]`, file);
          });
        }
      });

      // Here you would send formData to your backend
      console.log("[v0] Module data prepared for submission:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Module uploaded successfully!");
      reset();
    } catch (error) {
      console.error("[v0] Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addLecture = () => {
    append({ title: "", videoUrl: "", pdfNotes: null });
  };

  const removeLecture = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Upload Module
        </h1>
        <p className="text-muted-foreground">
          Create a new module with lectures and resources
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Module Title Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Module Information
          </h2>

          <div>
            <label
              htmlFor="moduleTitle"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Module Title *
            </label>
            <input
              id="moduleTitle"
              type="text"
              {...register("moduleTitle", {
                required: "Module title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title must be less than 100 characters",
                },
              })}
              className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="Enter module title"
            />
            {errors.moduleTitle && (
              <p className="mt-1 text-sm text-destructive">
                {errors.moduleTitle.message}
              </p>
            )}
          </div>
        </div>

        {/* Lectures Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-card-foreground flex items-center gap-2">
              <Video className="h-5 w-5" />
              Lectures ({fields.length})
            </h2>
            <button
              type="button"
              onClick={addLecture}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Lecture
            </button>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-border rounded-lg p-4 bg-background/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">
                    Lecture {index + 1}
                  </h3>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLecture(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Lecture Title */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Lecture Title *
                    </label>
                    <input
                      type="text"
                      {...register(`lectures.${index}.title`, {
                        required: "Lecture title is required",
                        minLength: {
                          value: 3,
                          message: "Title must be at least 3 characters",
                        },
                      })}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="Enter lecture title"
                    />
                    {errors.lectures?.[index]?.title && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.lectures[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  {/* Video URL */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Video URL *
                    </label>
                    <input
                      type="url"
                      {...register(`lectures.${index}.videoUrl`, {
                        required: "Video URL is required",
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: "Please enter a valid URL",
                        },
                      })}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="https://example.com/video.mp4"
                    />
                    {errors.lectures?.[index]?.videoUrl && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.lectures[index]?.videoUrl?.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* PDF Notes Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    PDF Notes (Multiple files allowed)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      {...register(`lectures.${index}.pdfNotes`)}
                      className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload multiple PDF files for lecture notes and resources
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Module
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
