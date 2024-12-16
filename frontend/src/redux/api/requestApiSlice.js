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
        body: data,
      }),
      invalidatesTags: ["Request"],
    }),

    updateRequest: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${REQUESTS_URL}/${id}`,
        method: "PUT",
        body: formData,
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
    getRecentRequests: builder.query({
      query: () => `${REQUESTS_URL}/recent-requests`,
      providesTags: ["Request"],
    }),

    getLimitOfRequests: builder.query({
      query: () => `${REQUESTS_URL}/get-limit-of-requests`,
      providesTags: ["Request"],
    }),
    markRequestsSeen: builder.mutation({
      query: (id) => ({
        url: `${REQUESTS_URL}/${id}/mark-seen`,
        method: "PUT",
      }),
      invalidatesTags: ["Request"],
    }),
    getEquipment: builder.query({
      query: ({ typeOfRequest }) => ({
        url: `${REQUESTS_URL}/equipment/${typeOfRequest}`,
        method: "GET",
      }),
      providesTags: ["Request"],
    }),

    countTotalRequests: builder.query({
      query: () => "count-requests",
    }),
    countPendingRequests: builder.query({
      query: () => "count-pending-requests",
    }),
    countCompletedRequests: builder.query({
      query: () => "count-completed-requests",
    }),
    countEquipment: builder.query({
      query: () => "count-equipment",
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
