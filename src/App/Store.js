import { configureStore } from "@reduxjs/toolkit";
import RecipeSlice from "../slices/RecipeSlice";
import CuisineSlice from "../slices/CuisineSlice";
import UserSlice from "../slices/UserSlice";

const store = configureStore({
    reducer: {
    recipes: RecipeSlice,
    cuisines: CuisineSlice,
    users: UserSlice
    },
  });
  
  export default store;