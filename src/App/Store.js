import { configureStore } from "@reduxjs/toolkit";
import RecipeSlice from "../slices/RecipeSlice";
import CuisineSlice from "../slices/CuisineSlice";

const store = configureStore({
    reducer: {
    recipes: RecipeSlice,
    cuisines: CuisineSlice
    },
  });
  
  export default store;