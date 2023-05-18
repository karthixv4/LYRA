import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useUserAuth } from '../components/auth/UserAuthContext';
import axios from 'axios';
const initialState={
recipe:{
  name:'',
  description:'',
  cookingSteps:'',
  cuisine:{"id":"644d9cfc0f2a3b3e7a8420e2"},
  ingredient:[{ name: '', quantity: '' }],
  mealType:'',
  dietRestriction:'',
  image:""
},
recipes:[],
error:false,
status:'',
selectedRecipe:[],
file:null,
liked:false,
userName:''
}
//Service Calls will be made here
//1. To save the Recipe
export const saveRecipe = createAsyncThunk(
    'recipe/saveRecipe',
    async ({recipe,file}) => {
      const formData = new FormData();
    formData.append('recipe', JSON.stringify(recipe));
    formData.append('file', file);
    const response = await axios.post(
      'http://localhost:3200/Recipe/saveRecipe',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
      return response.data
    }
  );

  //2. To get all the Recipe
  export const getAllRecipes = createAsyncThunk(
    'recipe/getAllRecipes',
    async () => {
      const response = await fetch('http://localhost:3200/Recipe/getAll');
      const data = await response.json();
      return data;
    }
  );

  //3. To get specific recipe
  export const getRecipeById = createAsyncThunk(
    'recipe/getRecipeById',
    async (recipeId) => {
      const response = await fetch(`http://localhost:3200/Recipe/getById?Id=${recipeId}`);
      const data = await response.json();
      return data;
    }
  );

  //4. To delete specific Recipe
  export const deleteRecipeById = createAsyncThunk(
    'recipe/deleteRecipeById',
    async (recipeId) => {
      await fetch(`http://localhost:3200/Recipe/delete?Id=${recipeId}`, { method: 'DELETE' });
      return recipeId;
    }
  );


const recipeSlice = createSlice({
    name:'category Slice',
    initialState,
    reducers:{
      updateName(state, action) {
      state.recipe.name = action.payload
      },
      updateDescription(state, action) {
        state.recipe.description = action.payload
      },
      updateCookingSteps(state, action) {
        state.recipe.cookingSteps = action.payload
      },
      updateIngredient(state, action) {
        state.recipe.ingredient=action.payload
 
      },
      updateFile(state,action){
        state.file = action.payload
      },
      updateDietRestriction(state,action){
        state.recipe.dietRestriction = action.payload
      },
      setUserName(state,action){
        state.userName = action.payload
      }
      
    },
    extraReducers: (builder) => {
        builder
          .addCase(saveRecipe.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(saveRecipe.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.recipe = action.payload;
          })
          .addCase(saveRecipe.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(getAllRecipes.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(getAllRecipes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.recipes = action.payload;
          })
          .addCase(getAllRecipes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(getRecipeById.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(getRecipeById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.liked = action.payload?.likes?.includes(state.userName);
            state.selectedRecipe = action.payload;
          })
          .addCase(getRecipeById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(deleteRecipeById.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(deleteRecipeById.fulfilled, (state, action) => {
            state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
          })
          .addCase(deleteRecipeById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      },
})

export const {updateName,updateDescription,updateIngredient,updateFile,updateCookingSteps,updateDietRestriction,setUserName} = recipeSlice.actions
export default recipeSlice.reducer;