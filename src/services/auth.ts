import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/configs/config";
import { invalidatesTags } from "@/constants/invalidates-tags";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: [invalidatesTags.AUTH],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint === "getMe") {
        const token = localStorage.getItem("auth-token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginTma: builder.mutation({
      query: ({
        initData,
        timezone,
      }: {
        initData: string;
        timezone?: string;
      }) => ({
        url: "auth/login-tma",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { initData, timezone },
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "auth/me",
      }),
      providesTags: [invalidatesTags.AUTH]
    }),
  }),
});

export const { useLoginTmaMutation, useGetMeQuery } = authApi;
