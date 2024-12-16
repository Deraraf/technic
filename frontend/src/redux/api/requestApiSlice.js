import { REQUESTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const requestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequests: builder.query({
      query: () => `${REQUESTS_URL}`,

      providesTags: ["Requests"],
    }),
    createRequest: builder.mutation({
      query: (data) => ({
        url: `${REQUESTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Requests", "Equipment"],
    }),

    updateRequest: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${REQUESTS_URL}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Requests"],
    }),

    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `${REQUESTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Requests"],
    }),
    getRecentRequests: builder.query({
      query: () => `${REQUESTS_URL}/recent-requests`,
      providesTags: ["Requests"],
    }),

    getLimitOfRequests: builder.query({
      query: () => `${REQUESTS_URL}/get-limit-of-requests`,
      providesTags: ["Requests"],
    }),
    markRequestsSeen: builder.mutation({
      query: (id) => ({
        url: `${REQUESTS_URL}/${id}/mark-seen`,
        method: "PUT",
      }),
      invalidatesTags: ["Requests"],
    }),
    getEquipment: builder.query({
      query: ({ typeOfRequest }) => ({
        url: `${REQUESTS_URL}/equipment/${typeOfRequest}`,
        method: "GET",
      }),
      providesTags: ["Requests"],
    }),

    countTotalRequests: builder.query({
      query: () => "count-requests",
      providesTags: ["Requests"],
    }),
    countPendingRequests: builder.query({
      query: () => "count-pending-requests",
      providesTags: ["Requests"],
    }),
    countCompletedRequests: builder.query({
      query: () => "count-completed-requests",
      providesTags: ["Requests"],
    }),
    countEquipment: builder.query({
      query: () => "count-equipment",
      providesTags: ["Equipment"],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
  useGetRecentRequestsQuery,
  useGetLimitOfRequestsQuery,
  useMarkRequestsSeenMutation,
  useGetEquipmentQuery,
  useCountTotalRequestsQuery,
  useCountPendingRequestsQuery,
  useCountCompletedRequestsQuery,
  useCountEquipmentQuery,
} = requestApiSlice;
