import React from 'react'
import { useParams } from 'react-router-dom';
import { getRecipesByCuisine } from '../../slices/RecipeSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { purple } from '@mui/material/colors';
import Loader from '../Animations/Loader';
import {motion} from 'framer-motion';

const catResults = {
  visible:{
    scale: 1.1
  }
}

const CategoryResult = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const loading = useSelector((state)=>state.recipes.loading)
  useEffect(()=>{
    dispatch(getRecipesByCuisine(id))
  },[])
  function truncateText(text, limit) {
    if (!text || !limit) return '';
    if (text.length <= limit) return text;
  
    const truncatedText = text.split(' ').slice(0, limit).join(' ');
    return truncatedText + '...';
  }

  const ifNoRecipes =()=>{
    return (
      <main>
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
                <div className="max-w-lg mx-auto space-y-3 text-center">
                    <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                        No Recipes in this Cuisine
                    </h3>
                    <p className="text-gray-600">
                        You can add one!
                    </p>
                    {/* <a href="javascript:void(0)" className="text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1">
                        Go back
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                        </svg>
                    </a> */}
                </div>
            </div>
        </main>
    )
  }
  return (
    <>
    <Loader showLoader={loading} />
    {recipes.length === 0 ? ifNoRecipes() : 
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20" id="catResults" >
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        { recipes.map((recipe)=>(
        <motion.div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm" key={recipe.id}
        variants={catResults}
        whileHover="visible"
        >
          <img
            src={recipe.image}
            className="object-cover w-full h-64"
            alt=""
          />
          <div className="p-5 border border-t-0">
          <Link to={`/recipe/${recipe.id}`}>
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
            
              <span
                className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                aria-label="Category"
                title="traveling"
              >
                {recipe.cuisine?.name}
              </span>
              
              <span className="text-gray-600">&nbsp; By: {recipe.userDetails?.name}</span>
            </p>
            <span
              
              aria-label="Category"
              title="Visit the East"
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              {recipe?.name}
            </span>
            <p className="mb-2 text-gray-700">
               {truncateText(recipe?.description, 30)}
            </p>
            <span 
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              View this!
            </span>
            <br />
            <FavoriteIcon sx={{ fontSize: 30,color:purple[500] }} /> <span>{recipe?.likes?.length}</span>
            &nbsp;&nbsp;&nbsp;
            <RateReviewRoundedIcon sx={{ fontSize: 30 }} /><span>{recipe?.comments?.length}</span>
            </Link>
          </div>
        </motion.div>
       ))}
      </div>
    </div>
    }
    </>
  )
}

export default CategoryResult