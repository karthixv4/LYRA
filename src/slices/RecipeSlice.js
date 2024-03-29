import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useUserAuth } from '../components/auth/UserAuthContext';
import axios from 'axios';
const initialState={
loading: false,
recipe:{
  name:'',
  description:'',
  cookingSteps:'',
  cuisine:{},
  ingredient:[{ name: '', quantity: '' }],
  mealType:'',
  dietRestriction:'',
  image:""
},
recipes:[],
error:false,
status:'',
selectedRecipe:{},
file:null,
liked:false,
likeCount:0,
userName:'',
comment:'',
selectedCuisine:'CHOOSE ME',
topRecipes:[],
stats:{
totalRecipes:0
}
}
//Service Calls will be made here
//1. To save the Recipe
export const saveRecipe = createAsyncThunk(
    'recipe/saveRecipe',
    async ({recipe,file}) => {
      const formData = new FormData();
    formData.append('recipe', JSON.stringify(recipe));
    formData.append('file', file);
    console.log("FORMDATA",JSON.stringify(recipe))
    const response = await axios.post(
      'https://luna-foodblogging-backend.onrender.com/Recipe/saveRecipe',
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
      const response = await fetch('https://luna-foodblogging-backend.onrender.com/Recipe/getAll');
      const data = await response.json();
      return data;
    }
  );

  //3. To get specific recipe
  export const getRecipeById = createAsyncThunk(
    'recipe/getRecipeById',
    async (recipeId) => {
      const response = await fetch(`https://luna-foodblogging-backend.onrender.com/Recipe/getById?Id=${recipeId}`);
      const data = await response.json();
      return data;
    }
  );

  //4. To delete specific Recipe
  export const deleteRecipeById = createAsyncThunk(
    'recipe/deleteRecipeById',
    async (recipeId) => {
      await fetch(`https://luna-foodblogging-backend.onrender.com/Recipe/delete?Id=${recipeId}`, { method: 'DELETE' });
      return recipeId;
    }
  );

  //5. add like to the recipe
  export const addLikeToRecipe = createAsyncThunk('recipe/AddLike', async (details) => {
    try {
      const response = await axios.put(`https://luna-foodblogging-backend.onrender.com/Recipe/addLike?id=${details.id}`,details.user);
      console.log("responseadd: ",response.data)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  });

  //6. remove like to the recipe
  export const removeLikeToRecipe = createAsyncThunk('recipe/removeLike', async (details) => {
    try {
      const response = await axios.put(`https://luna-foodblogging-backend.onrender.com/Recipe/removeLike?id=${details.id}`,details.user);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  });

   //7. add comment to the recipe
   export const addCommentToTheRecipe = createAsyncThunk('recipe/addComment', async (details) => {
    try {
      const response = await axios.post(`https://luna-foodblogging-backend.onrender.com/Comments/addComment`,details);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  });

  //8. Get Recipes by Cuisine Type
  export const getRecipesByCuisine = createAsyncThunk('recipe/getByCuisine', async (id) => {
    try {
      const response = await axios.get(`https://luna-foodblogging-backend.onrender.com/Recipe/getByCuisine?id=${id}`,);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  });

   //9. To get the top 3 recipe based on likes
   export const getTopRecipes = createAsyncThunk(
    'recipe/getTopRecipes',
    async () => {
      const response = await fetch('https://luna-foodblogging-backend.onrender.com/Recipe/getTopRecipes');
      const data = await response.json();
      return data;
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
      },
      setComment(state,action){
        state.comment = action.payload
      },
      setCuisine(state,action){
        function findCuisine(name, array) {
          const foundObject = array.find((obj) => obj.name === name);
          return foundObject || null;
        }
        const {id,cuisines} = action.payload;
        state.recipe.cuisine = findCuisine(id,cuisines)
      }
      
    },
    extraReducers: (builder) => {
        builder
          .addCase(saveRecipe.pending, (state) => {
            state.error = null;
            state.loading = true;
          })
          .addCase(saveRecipe.fulfilled, (state, action) => {
            state.loading = false;
            state.recipe = action.payload;
          })
          .addCase(saveRecipe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getAllRecipes.pending, (state) => {
            state.loading = true;
            state.status = 'loading';
            state.error = null;
          })
          .addCase(getAllRecipes.fulfilled, (state, action) => {
            state.loading = false;
            state.recipes = action.payload;
            state.stats.totalRecipes = action.payload.length
          })
          .addCase(getAllRecipes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getRecipeById.pending, (state) => {
            state.selectedRecipe = {}
            state.loading = true;
            state.error = null;
          })
          .addCase(getRecipeById.fulfilled, (state, action) => {
            const checkLiked = (nameToCheck,users) => {
              return users.some(user => user.email === nameToCheck);
            };
            state.loading = false;
            action.payload?.likes ? state.liked = checkLiked(state.userName,action.payload?.likes) : state.liked = false
            action.payload?.likes ? state.likeCount = action.payload?.likes.length : state.likeCount = 0
            
            state.selectedRecipe = action.payload;
          })
          .addCase(getRecipeById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(deleteRecipeById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteRecipeById.fulfilled, (state, action) => {
            state.loading = false;
            state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
          })
          .addCase(deleteRecipeById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(addLikeToRecipe.pending, (state) => {
            state.loading = true;
            state.liked = true
            state.likeCount += 1
            state.error = null;
          })
          .addCase(addLikeToRecipe.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedRecipe = action.payload;
          })
          .addCase(addLikeToRecipe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(removeLikeToRecipe.pending, (state) => {
            state.loading = true;
            state.likeCount -= 1
            state.liked = false
            state.error = null;
          })
          .addCase(removeLikeToRecipe.fulfilled, (state, action) => {
            state.loading = false;
            state.liked=false;
            state.selectedRecipe = action.payload;
          })
          .addCase(removeLikeToRecipe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(addCommentToTheRecipe.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addCommentToTheRecipe.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedRecipe = action.payload
            state.error = null;
          })
          .addCase(addCommentToTheRecipe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getRecipesByCuisine.pending, (state) => {
            state.recipes = []
            state.loading = true;
            state.error = null;
          })
          .addCase(getRecipesByCuisine.fulfilled, (state, action) => {
            state.loading = false;
            state.recipes = action.payload
            state.error = null;
          })
          .addCase(getRecipesByCuisine.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getTopRecipes.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getTopRecipes.fulfilled, (state, action) => {
            state.loading = false;
            state.topRecipes = action.payload;
          })
          .addCase(getTopRecipes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });

      },
})

export const {updateName,setCuisine,updateDescription,updateIngredient,updateFile,updateCookingSteps,updateDietRestriction,setUserName,setComment} = recipeSlice.actions
export default recipeSlice.reducer;