import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
 

const initialState: any = {
 
  
};
 
export const appSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
 
  },
});

export default appSlice.reducer;
