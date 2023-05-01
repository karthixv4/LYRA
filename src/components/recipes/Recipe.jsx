import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../slices/RecipeSlice';
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    XMarkIcon,
    ChevronDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
  } from '@heroicons/react/24/outline'
const Recipe = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getRecipeById(id));
    },[id])
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    var recipe = useSelector((state) => state.recipes.selectedRecipe);
  return (
    <div>
        <header className="bg-white">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline dark:text-white">
                <span className="-mt-0.5"><a href="/home">Lyra</a></span>
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src=""
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{recipe.name}</h1>
       
        <p class="leading-relaxed mb-4">{recipe.description}</p>
        <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Ingredients</span>
          {recipe.ingredient && recipe.ingredient.map((ingredient, index) => (
            <>
          <span class="ml-auto text-gray-900" key={index}>{ingredient.name}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
          <span class="ml-auto text-gray-900">{ingredient.quantity}</span>
          </>
          ))}
        </div>
        <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Cooking steps</span> &nbsp;&nbsp;&nbsp;
          <span class="ml-auto text-gray-900">{recipe.cookingSteps}</span>
        </div>
        <div class="flex border-t border-b mb-6 border-gray-200 py-2">
          <span class="text-gray-500">Diet-Restriction</span>
          <span class="ml-auto text-gray-500">{recipe.dietRestriction}</span>
        </div>
        <div class="flex">
          <span class="title-font font-medium text-2xl text-gray-900">{recipe.cuisine?.name}</span>
         <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
      <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-84 object-cover object-center rounded" src={recipe.image}/>
    </div>
  </div>
</section>
    </div>
  )
}
const navigation = [
    { name: 'Categories', href: '/categories' },
    { name: 'All Blogs', href: '/home' },
    { name: 'Write one!', href: '/addRecipe' },
  
  ]
  
export default Recipe
