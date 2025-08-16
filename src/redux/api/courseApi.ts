/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (arg: Record<string, any>) => ({
        method: "GET",
        url: "courses",
        params: arg,
      }),

      providesTags: ["course"],
    }),
    getCourseById: builder.query({
      query: (id: string) => ({
        method: "GET",
        url: `courses/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "course", id }],
    }),
    createCourse: builder.mutation({
      query: (newCourse) => ({
        url: "courses",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["course"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...updatedCourse }) => ({
        url: `courses/${id}`,
        method: "PUT",
        body: updatedCourse,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "course", id }],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "course", id }],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
