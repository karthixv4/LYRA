import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTopRecipes } from '../../slices/RecipeSlice';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';

const topRecipeVariants = {
  visible:{
    scale: 1.1
  }
}

const TopRecipe = () => {
    var recipes = useSelector((state) => state.recipes.topRecipes)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopRecipes())
      }, []);
  return (
    <section className="p-4 lg:p-8 dark:bg-gray-800 dark:text-gray-100">
	<div className="container mx-auto space-y-12">
    {recipes.map((recipe, index) => (
  <motion.div
  id="TopRecipe"
    className={`flex flex-col overflow-hidden rounded-md shadow-sm ${
      index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
    }`}
    key={index}

    variants={topRecipeVariants}
    whileHover="visible"
  >
  
    <img src={recipe.image} alt="" className="h-80 dark:bg-gray-500 aspect-video" />
    <Link to={`/recipe/${recipe.id}`}>
    <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900">
      <h3 className="text-3xl font-bold">{recipe.name}</h3>
      <p className="my-6 dark:text-gray-400">{recipe.description}</p>
      <button type="button" className="self-start">Let's Cook!</button>
     
    </div>
    </Link>
   
  </motion.div>
))}
		
	</div>
</section>
  )
}

export default TopRecipe