import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { config } from "../../config/env.js";
import { setMessages } from "./chatSlice.js";

// Define the chatApi
export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.serverUrl}/api/messages`, // server base URL
    credentials: "include", // include cookies if your backend sets httpOnly cookies
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (userId) => `/${userId}`, // GET /api/messages/:userId
      transformResponse: (response) => response.messages,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched messages:", data);
          dispatch(setMessages(data));
        } catch (err) {
          console.error("Failed to fetch messages:", err);
        }
      },
    }),
    sendMessage: builder.mutation({
      query: ({ userId, message }) => ({
        url: `/${userId}`, // POST /api/messages/:userId
        method: "POST",
        body: { message },
      }),
      transformErrorResponse: (response) => {
        return response.data?.message || "Failed to send message!";
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi;
