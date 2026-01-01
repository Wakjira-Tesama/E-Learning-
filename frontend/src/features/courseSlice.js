import { courseApi } from "@/api/courseApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
  lecture:null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addLecture:(state,action) => {
      state.lecture = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      courseApi.endpoints.getAllCourses.matchFulfilled,
      (state, action) => {
        state.courses = action.payload.courses;
      }
    );
  },
});

export const { addLecture} = courseSlice.actions;

export default courseSlice.reducer;
