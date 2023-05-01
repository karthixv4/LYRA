import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    cuisine:[],
    cuisines:[],
    error:false,
    status:''
}

//Service calls to be made here
//1. To save a Cuisine
export const saveCuisine = createAsyncThunk(
    'cuisines/saveCuisine',
    async (cuisineData) => {
      const formData = new FormData();
      formData.append('cuisine', JSON.stringify(cuisineData.cuisine));
      formData.append('file', cuisineData.file);
  
      const response = await axios.post(
        'http://localhost:3100/Cuisine/saveCuisine',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      return response.data;
    }
  );
//2. to fetch all cuisines
export const getAllCuisines = createAsyncThunk('cuisine/getAllCuisines', async () => {
  try {
    const response = await axios.get('http://localhost:3100/Cuisine/getAll');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
//3. to get a specific cuisine
export const getCuisineById = createAsyncThunk('cuisine/getCuisineById', async (id) => {
    try {
      const response = await axios.get(`http://localhost:3100/Cuisine/getById?id=${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  });


const cuisineSlice = createSlice({
    name:'cuisine Slice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(saveCuisine.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(saveCuisine.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.cuisines.push(action.payload);
          })
          .addCase(saveCuisine.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(getAllCuisines.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getAllCuisines.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.cuisines = action.payload;
          })
          .addCase(getAllCuisines.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(getCuisineById.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getCuisineById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.cuisine = action.payload;
          })
          .addCase(getCuisineById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
    
    }
     
})

export default cuisineSlice.reducer;