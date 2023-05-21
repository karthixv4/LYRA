import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState,Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../slices/RecipeSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import Header from '../header/Header';
import {setUserName} from '../../slices/RecipeSlice';
import { useUserAuth } from '../auth/UserAuthContext';
import { addLikeToRecipe,removeLikeToRecipe,addCommentToTheRecipe } from '../../slices/RecipeSlice';
import { setComment } from '../../slices/RecipeSlice';
const Recipe = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {user} = useUserAuth();
    useEffect(()=>{
      dispatch(setUserName(user.email))
      dispatch(getRecipeById(id));
    },[])
    // useEffect(()=>{
    //     dispatch(setUserName(user.email))
    //     dispatch(getRecipeById(id));
    // },[id])
    var recipe = useSelector((state) => state.recipes.selectedRecipe);
    var liked =  useSelector((state) => state.recipes.liked);
    var likeCount =  useSelector((state) => state.recipes.likeCount);
    var comment =  useSelector((state) => state.recipes.comment);
    const handleLike =()=>{
      if(liked){
        const details = {
          id: id,
          user: {
          name: user.displayName,
          email:user.email
          }
        }
        console.log("details1:",details)
        dispatch(removeLikeToRecipe(details))
      }else{
      const details = {
        id: id,
        user: {
        name: user.displayName,
        email:user.email
        }
      }
      console.log("details:",details)
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
  }
    return (
      <>
      <Header />
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
            {/* <ul className="space-y-3">
              <li className="flex">
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
                Flipboard curmudgeon
              </li>
              <li className="flex">
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
                Storage shed
              </li>
              <li className="flex">
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
                Satoshi Nakamoto
              </li>
            </ul> */}
            {liked ? 
        <>
        <IconButton onClick={() => handleLike()}>
        <FavoriteIcon sx={{ fontSize: 40,color:red[500] }}  />
        <span>{likeCount}</span>
        </IconButton>
       
        </>
        :
        <>
        <IconButton onClick={() => handleLike()}>
         <FavoriteBorderIcon sx={{ fontSize: 40 }} color="disabled" />
         <span>{likeCount}</span>
        </IconButton>
        
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
      <div className="inset-0 flex items-center ">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Write a Review !
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   Post your Comments!
                  </Dialog.Title>
                  
                  <form onSubmit={postComment}>
                  <div className="mt-2">
					 <textarea id="comment" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-0 focus:ring-violet-400 dark:border-black-700 dark:text-gray-900" onChange={(e)=>dispatch(setComment(e.target.value))}></textarea>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Post!
                    </button> 
                  </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
    </div>
{recipe?.comments &&  
<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
<div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
  {recipe.comments.map((comment)=>(
      
        <div>
          <img
            className="object-cover w-24 h-24 rounded-full shadow"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
            alt="Person"
          />
          <div className="flex flex-col justify-center mt-2">
            <p className="text-lg font-bold">{comment.user.name}</p>
            <p className="mb-4 text-xs text-gray-800">{comment.user.email}</p>
            <p className="text-sm tracking-wide text-gray-800">
              {comment.comment}
            </p>
          </div>
        </div>
      
      ))}
      </div>
    </div>}
   
    </>
    )
}
  
export default Recipe
