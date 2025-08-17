import React, { useState } from "react";
import AddModuleFrom from "./AddModuleFrom";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Upload } from "lucide-react";
import { useUpdateModuleMutation } from "@/redux/api/moduleApi";
interface ModuleFormData {
  moduleTitle: string;
}
const EditModule = ({ id }: { id: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draggedLecture, setDraggedLecture] = useState<number | null>(null);
  const [updateModule, { isLoading: isUpdating }] = useUpdateModuleMutation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModuleFormData>({
    defaultValues: {
      moduleTitle: "",
    },
  });

  const onSubmit = async (data: ModuleFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const modulePayload = {
        title: data.moduleTitle,
      };
      // formData.append("module", JSON.stringify(modulePayload));
      const result = await updateModule({ id, ...modulePayload }).unwrap();
      // If you have files to upload, append them to
      // Here you would send formData to your backend
      console.log("[v0] Module data prepared for submission:", formData);
      // const result = await axios.post(`${URL}module/insert`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      if (result.data.success) {
        Swal.fire({
          title: "Success",
          text: "Module Update successfully!",
          icon: "success",
        });
        reset();
      }
    } catch (error) {
      console.error("[v0] Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Update Module
        </h1>
        <p className="text-muted-foreground">
          Create a new module with lectures and resources
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Module Title Section */}
        <AddModuleFrom errors={errors} register={register} />

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
                Update Module
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModule;
