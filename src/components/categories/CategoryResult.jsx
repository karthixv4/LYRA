import React from 'react'
import Header from '../header/Header';
import { useParams } from 'react-router-dom';
import { getRecipesByCuisine } from '../../slices/RecipeSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { purple } from '@mui/material/colors';
const CategoryResult = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  var recipes = useSelector((state) => state.recipes.recipes);

  useEffect(()=>{
    dispatch(getRecipesByCuisine(id))
  },[id])
  function truncateText(text, limit) {
    if (!text || !limit) return '';
    if (text.length <= limit) return text;
  
    const truncatedText = text.split(' ').slice(0, limit).join(' ');
    return truncatedText + '...';
  }
  return (
    <>
    <Header />
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {recipes.map((recipe)=>(
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm" key={recipe.id}>
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
        </div>
       ))}
      </div>
    </div>
    </>
  )
}

export default CategoryResult