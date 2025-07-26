import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { config } from "../../config/env.js";

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
    }),
    sendMessage: builder.mutation({
      query: ({ userId, msg }) => ({
        url: `/${userId}`, // POST /api/messages/:userId
        method: "POST",
        body: msg, // This can be FormData or JSON based on the message type
      }),
      transformErrorResponse: (response) => {
        return response.data?.message || "Failed to send message!";
      },
      // Optimistic Update
      async onQueryStarted({ userId, msg }, { dispatch, queryFulfilled, getState }) {
        const tempId = `temp_${Date.now()}`;
        const state = getState();
        const senderId = state.auth.user._id;

        const tempMsg = {
          _id: tempId,
          senderId: senderId,
          receiverId: userId,
          createdAt: new Date().toISOString(),
          text: "",
          image: null, // The real URL isn't available yet
          localImageUrl: null, // This will hold our temporary blob URL
        };

        if (msg instanceof FormData) {
          tempMsg.text = msg.get("text") || "";
          const imageFile = msg.get("image");
          if (imageFile) {
            tempMsg.localImageUrl = URL.createObjectURL(imageFile);
          }
        } else {
          tempMsg.text = msg.text;
        }

        const patchResult = dispatch(
          chatApi.util.updateQueryData("getMessages", userId, (draft) => {
            draft.push(tempMsg);
          })
        );

        try {
          const { data } = await queryFulfilled;
          const finalMessage = data.newMessage;

          dispatch(
            chatApi.util.updateQueryData("getMessages", userId, (draft) => {
              const index = draft.findIndex((m) => m._id === tempId);
              if (index !== -1) {
                // Replace the temp message with the final one from the server,
                // but carry over the localImageUrl for a seamless transition.
                draft[index] = { ...finalMessage, localImageUrl: tempMsg.localImageUrl };
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi;
