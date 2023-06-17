import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCuisines } from '../../slices/CuisineSlice';
import { Link } from 'react-router-dom';
import Loader from '../Animations/Loader';
const Categories = () => {
    const dispatch = useDispatch();
    var cuisines = useSelector((state) => state.cuisines.cuisines)
    var loading = useSelector((state)=>state.cuisines.loading)
    useEffect(() => {
        dispatch(getAllCuisines())
      }, []);
  return (
    <>
    <Loader showLoader={loading} />
       <div
  class="max-w-6xl px-4 mx-auto py-4 md:py-6 dark:bg-gray-900 dark:text-gray-300">
  <div
    class="md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16">
    <div class="-mt-1.5 mb-5 xl:mb-6 text-center pb-2 lg:pb-3 xl:pb-4 3xl:pb-7">
      <h2
        class="text-brand-dark text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-manrope 3xl:text-[25px] 3xl:leading-9">
        What food you love to order
      </h2>
      <p
        class="text-brand-muted text-sm leading-7 lg:text-15px xl:text-base pb-0.5 mt-1.5 lg:mt-2.5 xl:mt-3">
        Here order your favorite foods from different categories
      </p>
    </div>
    <div
      class="grid grid-cols-2 gap-4 md:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {cuisines.map((cuisine)=>(
    
      <a class="group block w-full text-center shrink-0 mb-12" key={cuisine.id}>
        <Link to={`/category/${cuisine.id}`}>
        <div
          class="flex max-w-[178px] max-h-[178px] mb-3.5 xl:mb-4 mx-auto rounded-full overflow-hidden bg-slate-200">
          <div
            class="flex shrink-0 transition-all duration-700 w-full h-full transform scale-50 group-hover:scale-100 -translate-x-full group-hover:translate-x-0">
            <img
              alt="Image"
              src={cuisine.imageUrl}
              width="178"
              height="178"
              decoding="async"
              data-nimg="1"
              class="object-cover rounded-full aspect-square text-transparent"
              loading="lazy" />
          </div>
          <div
            class="flex shrink-0 transition-all duration-700 w-full h-full transform scale-100 group-hover:scale-50 -translate-x-full group-hover:translate-x-0">
            <img
              alt="Image"
              src={cuisine.imageUrl}
              width="178"
              height="178"
              decoding="async"
              data-nimg="1"
              class="object-cover rounded-full aspect-square text-transparent"
              loading="lazy" />
          </div>
        </div>
        <h3
          class="capitalize text-brand-dark text-sm sm:text-15px lg:text-base truncate">
          {cuisine.name}
        </h3>
        </Link>
      </a>  
   
    ))}
    </div>
  </div>
</div>

    </>
  )
}
const navigation = [
    { name: 'Categories', href: '/categories' },
    { name: 'All Blogs', href: '/home' },
    { name: 'Write one!', href: '/addRecipe' },
  
  ]
export default Categories
