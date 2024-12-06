import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  requests: [],
};

const recentRequestSlice = createSlice({
  name: "recentRequest",
  initialState,
  reducers: {
    addRecentRequest: (state, action) => {
      state.requests.push(action.payload);
      state.count += 1;
    },

    clearRecentNotifications: (state) => {
      state.count = 0;
    },
  },
});

export const { addRecentRequest, clearRecentNotifications } =
  recentRequestSlice.actions;
export default recentRequestSlice.reducer;
