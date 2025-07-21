import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { config } from "../../config/env.js";
import { setUser } from "../auth/authSlice";
import { setUsers } from "../chat/chatSlice.js";

// Define the apiSlice
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.serverUrl}/api/users`, // server base URL
    credentials: "include", // Include cookies if your backend uses them
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/", // GET /api/users
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched users:", data);
          dispatch(setUsers(data.users));
        } catch (err) {
          console.error("Failed to fetch users:", err);
        }
      },
    }),
    uploadProfilePic: builder.mutation({
      query: (formData) => ({
        url: "/profile-pic", // POST /api/auth/profile-pic
        method: "POST",
        body: formData,
      }),
      transformErrorResponse: (response) => {
        return (
          response.data?.message ||
          "Internal Server Error, Please try again later!"
        );
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Update user data with new profile picture
          dispatch(setUser(data.user));
        } catch (err) {
          console.error("Upload failed:", err);
        }
      },
    }),
  }),
});

export const { useUploadProfilePicMutation } = userApi;
