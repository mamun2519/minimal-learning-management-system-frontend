// Need to use the React-specific entry point to import createApi
import { URL } from "@/constants/url";
import { axiosBaseQuery } from "@/helper/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({}),
  tagTypes: [
    "user",
    "donor",
    "appointment",
    "payment",
    "prescription",
    "profile",
    "donorRequest",
    "donorReview",
    "doctorService",
    "googleMeet",
    "Doctor",
    "BloodDonor",
    "User",
    "Admin",
    "serviceReview",
    "notification",
    "cart",
    "serviceOffer",
    "withdraw",
    "activity",
  ],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
