"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { Upload, Plus, Trash2, FileText, Video } from "lucide-react";
import LectureFrom from "@/components/Lecture/LectureFrom";
import AddModuleFrom from "@/components/Module/AddModuleFrom";

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
        <AddModuleFrom errors={errors} register={register} />

        <LectureFrom
          fields={fields}
          addLecture={addLecture}
          register={register}
          removeLecture={removeLecture}
          errors={errors}
        />

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
