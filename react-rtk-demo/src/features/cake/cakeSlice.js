import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  numOfCakes: 10,
};

// accept an object as an argument. createSlice will automatically generate action creators. In this case it will be called 'ordered' and 'restocked'.
// also returns the main reducer function
const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    // under the hood, createSlice use the immer library to update the state
    ordered: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
});

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;
