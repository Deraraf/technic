import { REQUESTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const requestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequests: builder.query({
      query: () => `${REQUESTS_URL}`,

      providesTags: ["Request"],
    }),
    createRequest: builder.mutation({
      query: (data) => ({
        url: `${REQUESTS_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Request"],
    }),

    updateRequest: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${REQUESTS_URL}/${id}`,
        method: "PUT",
        formData,
      }),
      invalidatesTags: ["Request"],
    }),

    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `${REQUESTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Request"],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = requestApiSlice;
