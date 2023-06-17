import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState,Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../slices/RecipeSlice';
import {setUserName} from '../../slices/RecipeSlice';
import { useUserAuth } from '../auth/UserAuthContext';
import { addLikeToRecipe,removeLikeToRecipe,addCommentToTheRecipe } from '../../slices/RecipeSlice';
import { setComment } from '../../slices/RecipeSlice';
import Loader from "../Animations/Loader";
import { motion, useCycle} from 'framer-motion';

const svgVariants = {
  liked:{
    pathLength: [0,1],
    transition:{
      duration: 1,
      delay:0.5,
      ease: 'easeInOut'
    }
  },
  unliked:{
    pathLength: [1,0],
    transition:{
      duration: 1,
      delay:0.5,
      ease: 'easeInOut'
    }
  }
}

const Recipe = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {user} = useUserAuth();
    useEffect(()=>{
      dispatch(setUserName(user.email))
      dispatch(getRecipeById(id));
    },[])
    var recipe = useSelector((state) => state.recipes.selectedRecipe);
    var liked =  useSelector((state) => state.recipes.liked);
    var likeCount =  useSelector((state) => state.recipes.likeCount);
    var comment =  useSelector((state) => state.recipes.comment);
    var loading = useSelector((state)=>state.recipes.loading);

    const [animLiked, cycleAnimLiked] = useCycle("liked","unLiked");
    const handleLike =()=>{
      if(liked){
        cycleAnimLiked(0)
        const details = {
          id: id,
          user: {
          name: user.displayName,
          email:user.email
          }
        }
        dispatch(removeLikeToRecipe(details))
      }else{
        cycleAnimLiked(1)
      const details = {
        id: id,
        user: {
        name: user.displayName,
        email:user.email
        }
      }
      dispatch(addLikeToRecipe(details))
      }   
    }
    let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const postComment=(e)=>{
    e.preventDefault();
    const details = {
      user:{
        name: user.displayName,
        email: user.email
      },
      recipeId: recipe.id,
      comment: comment
    }
    dispatch(addCommentToTheRecipe(details))
    dispatch(setComment(''))
  }
  const handlingLike=()=>{
    console.log("IM LIKING")
  }
    return (
      <>
      <Loader showLoader={loading} />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-5 row-gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
        <p className="text-base font-semibold leading-7 text-indigo-600">{recipe.cuisine?.name}</p>
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            {recipe.name}
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
            {recipe.description}
            </p>
          </div>
              <div className="inset-0 flex items-center">
                <button
                  type="button"
                  onClick={openModal}
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                >
                  Write a Review!
                </button>
              </div>
              <br />
          <p className="mb-4 text-sm font-bold tracking-widest uppercase">
           Ingredients
          </p>
          <div className="grid space-y-3 sm:gap-2 sm:grid-cols-2 sm:space-y-0">
            <ul className="space-y-3">
            {recipe.ingredient && recipe.ingredient.map((ingredient, index) => (
              <li className="flex" key={index}>
                <span className="mr-1">
                  <svg
                    className="w-5 h-5 mt-px text-deep-purple-accent-400"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </span>
                {ingredient.name} : {ingredient.quantity}
              </li>
              ))}
            </ul>
           
            {liked ? 
        <>
        <div className="likeSaveGroup">
        <svg onClick={() => handleLike()} className="likeButton" fill='#ff6c6c' stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" >
        <motion.path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          variants= {svgVariants}
          animate={animLiked}
        ></motion.path>
         </svg>
         <span>{likeCount}</span>
        <svg className="likeButton" fill="red" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
         <motion.path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
         variants= {svgVariants}
         animate={animLiked}
         ></motion.path>
        </svg>
        </div>
        </>
        :
        <>
        <div className="likeSaveGroup">
        <svg onClick={() => handleLike()} className="likeButton" fill='none' stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" >
        <motion.path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          variants= {svgVariants}
          initial="hidden"
          animate="visible"
        ></motion.path>
        </svg>
        <span>{likeCount}</span>
        <svg className="likeButton" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
         <motion.path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
         variants= {svgVariants}
         initial="hidden"
         animate="visible"
         ></motion.path>
        </svg>
        </div>
        </>
      }
          </div>
        </div>
        <div>
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src={recipe.image}
            alt=""
          />
        </div>
      </div>
      <>
 


    </>
    </div>

    <div className="max-w-3xl mx-auto text-center">
			<h2 className="text-3xl font-extrabold sm:text-4xl">Cooking Steps</h2>
			<p className="mt-4 text-lg dark:text-gray-400">{recipe.cookingSteps}</p>
		</div>
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
  <div className="max-w-2xl mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion</h2>
    </div>
    <form className="mb-6" onSubmit={postComment}>
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">Your comment</label>
        <textarea id="comment" rows="6" className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write a comment..." value={comment} onChange={(e)=>dispatch(setComment(e.target.value))} required></textarea>
      </div>
      <button
  type="submit"
  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-600"
  style={{ visibility: 'visible' }}
>
  Post comment
</button>

    </form>
    {recipe?.comments &&  
    <>
    {recipe.comments.map((comment)=>(
    <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />
            {comment.user.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time>
          </p>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">
      {comment.comment}
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
          <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          Reply
        </button>
      </div>
    </article>
          ))}
          </>
}
  </div>
</section>
    </>
    )
}
  
export default Recipe
