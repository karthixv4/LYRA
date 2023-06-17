import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    cuisine:[],
    cuisines:[],
    error:false,
    status:'',
    loading: false,
    totalCuisines:0
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
        'https://luna-foodblogging-backend.onrender.com/Cuisine/saveCuisine',
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
    const response = await axios.get('https://luna-foodblogging-backend.onrender.com/Cuisine/getAll');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
//3. to get a specific cuisine
export const getCuisineById = createAsyncThunk('cuisine/getCuisineById', async (id) => {
    try {
      const response = await axios.get(`https://luna-foodblogging-backend.onrender.com/Cuisine/getById?id=${id}`);
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
            state.loading = true;
          })
          .addCase(saveCuisine.fulfilled, (state, action) => {
            state.loading = false;
            state.cuisines.push(action.payload);
          })
          .addCase(saveCuisine.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getAllCuisines.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllCuisines.fulfilled, (state, action) => {
            state.loading = false;
            state.cuisines = action.payload;
            state.totalCuisines = action.payload.length;
          })
          .addCase(getAllCuisines.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getCuisineById.pending, (state) => {
            state.loading = true;
          })
          .addCase(getCuisineById.fulfilled, (state, action) => {
            state.loading = false;
            state.cuisine = action.payload;
          })
          .addCase(getCuisineById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    
    }
     
})

export default cuisineSlice.reducer;