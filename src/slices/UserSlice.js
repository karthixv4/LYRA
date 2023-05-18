import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  loading: false,
  selectedUser: [],
  error: ''
};

export const createUser = createAsyncThunk('user/createUser', async (user) => {
  try {
    const response = await axios.post('http://localhost:3200/User/addUser', user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default userSlice.reducer;
