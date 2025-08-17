import { baseApi } from "./baseApi";

export const enrolledCourseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    enrolledCourse: build.mutation({
      query: (loginData) => ({
        url: "enrolled-course",
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["user", "enrolledCourse"],
    }),
    myCourses: build.mutation({
      query: (RegData) => ({
        url: "auth/register",
        method: "POST",
        data: RegData,
      }),
      invalidatesTags: ["user", "admin", "enrolledCourse"],
    }),
  }),
});

export const { useEnrolledCourseMutation, useMyCoursesMutation } =
  enrolledCourseApi;
