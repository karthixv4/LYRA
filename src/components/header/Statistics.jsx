import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllRecipes } from '../../slices/RecipeSlice';
import { useEffect } from 'react';
const Statistics = () => {
  var stats = useSelector((state) => state.recipes.stats)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllRecipes())
      }, []);
      console.log("stats",stats)
     
  return (
    <section className="py-14">
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-start justify-between lg:flex md:px-8">
        <div className="sm:hidden lg:block lg:max-w-xl">
            <img src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="rounded-lg" alt="" />
        </div>
        <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block">
            <div className="max-w-2xl">
                <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                    We do our best to make customers always happy
                </h3>
                <p className="mt-3 max-w-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis sollicitudin quam ut tincidunt.
                </p>
            </div>
            <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                <ul className="inline-grid gap-y-8 gap-x-14 grid-cols-2">
                   
                            <li  className="">
                                <h4 className="text-4xl text-indigo-600 font-semibold">{stats.totalRecipes} +</h4>
                                <p className="mt-3 font-medium">Recipes</p>
                            </li>
                            <li  className="">
                                <h4 className="text-4xl text-indigo-600 font-semibold">HII</h4>
                                <p className="mt-3 font-medium">HELLO</p>
                            </li>
                            <li  className="">
                                <h4 className="text-4xl text-indigo-600 font-semibold">HII</h4>
                                <p className="mt-3 font-medium">HELLO</p>
                            </li>
                            <li  className="">
                                <h4 className="text-4xl text-indigo-600 font-semibold">HII</h4>
                                <p className="mt-3 font-medium">HELLO</p>
                            </li>
                      
                </ul>
            </div>
        </div>
    </div>
</section>
  )
}

export default Statistics