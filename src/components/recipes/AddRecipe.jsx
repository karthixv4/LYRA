import React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect,useState,Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../slices/RecipeSlice';
import { getAllCuisines } from '../../slices/CuisineSlice';
import { updateName,updateIngredient,setCuisine,updateDescription,saveRecipe,updateFile,updateCookingSteps,updateDietRestriction } from '../../slices/RecipeSlice';
import { useUserAuth } from '../auth/UserAuthContext';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const AddRecipe = () => {

    const dispatch = useDispatch();
    var recipe = useSelector((state) => state.recipes.recipe);
    var cuisines = useSelector((state) => state.cuisines.cuisines);
    var file = useSelector((state) => state.recipes.recipe);
    var selectedCuisine = useSelector((state) => state.recipes.selectedCuisine);
    const {user} = useUserAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        dispatch(getAllRecipes())
        dispatch(getAllCuisines())
      }, []);

      const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        recipe = { ...recipe,
                ingredient: ingredients,
                userDetails: {
                  name: user.displayName,
                  email: user.email
                }
          }
        console.log("Recipe Details: ",recipe)
          const newRecipe={
            recipe:recipe,
            file:selectedFile
          }
        dispatch(saveRecipe(newRecipe))
      };
    
      const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    
      function handleInputChange(index, event) {
        const values = [...ingredients];
        values[index][event.target.name] = event.target.value;
        setIngredients(values);
      }
    
      function handleAddFields() {
        const values = [...ingredients];
        values.push({ name: "", quantity: "" });
        setIngredients(values);
      }
    
      function handleRemoveFields(index) {
        const values = [...ingredients];
        values.splice(index, 1);
        setIngredients(values);
      }

      const handleCuisineChange =(id)=>{
        const cuisine = {
          id: id,
          cuisines: cuisines
        }
       dispatch(setCuisine(cuisine))
      }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Recipe</h1>
            </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-grey-600">Title</label>
                  <input type="text" id="name" name="name" placeholder="Name your recipe..." value={recipe.name || ''} 
                          onChange={(e=>dispatch(updateName(e.target.value)))}  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          value={recipe.cuisine.name || ''}
          onChange={(e)=>handleCuisineChange(e.target.value)}
        >
           {cuisines.map((cuisine,index)=>(
          <MenuItem key={index} value={cuisine.name}>{cuisine.name}</MenuItem>
         
          ))}
        </Select>
      </FormControl>
 
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="image" class="leading-7 text-sm text-gray-600">Image</label>
                  <input type="file" onChange={handleFileSelect} id="image" name="image" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="dietRestriction" class="leading-7 text-sm text-grey-600">Diet Restriction</label>
                  <input type="text" onChange={(e)=>dispatch(updateDietRestriction(e.target.value))} id="dietRestriction" name="dietRestriction" placeholder="Whom shouldn't take it..." class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              {ingredients.map((ingredient, index) => (
              <div class="p-2 w-1/4" key={index}>
                <div class="relative">
                  <label for="ingredients" class="leading-7 text-sm text-grey-600">Ingredients</label>
                  <input type="text" id={`ingredient-name-${index}`}
                            value={ingredient.name}
                            onChange={(event) => handleInputChange(index, event)} name="name" placeholder="Name your Ingredient" class="h-12 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                    <input type="text"  id={`ingredient-quantity-${index}`}
                            value={ingredient.quantity}
                            onChange={(event) => handleInputChange(index, event)}  name="quantity" placeholder="Quantity" class="h-12 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                 {index > 0 && (
                            <button type="button" onClick={() => handleRemoveFields(index)}>
                             -
                            </button>
                                 )}
                             {index === ingredients.length - 1 && (
                             <button type="button" onClick={handleAddFields}>
                                +
                               </button>
                                  )}
                </div>
              </div>
                 ))}
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="description" class="leading-7 text-sm text-gray-600">Description</label>
                  <textarea id="description" onChange={(e)=>dispatch(updateDescription(e.target.value))} name="description" placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..." class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="procedure" class="leading-7 text-sm text-gray-600">Cooking Steps</label>
                  <textarea id="procedure" name="procedure" placeholder="write down the steps" onChange={(e)=>dispatch(updateCookingSteps(e.target.value))} class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit" >Save</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </form>
    </>
  )
}

export default AddRecipe
