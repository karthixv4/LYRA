import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCuisines } from '../../slices/CuisineSlice';
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

const Categories = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const dispatch = useDispatch();
    var cuisines = useSelector((state) => state.cuisines.cuisines)
    useEffect(() => {
        dispatch(getAllCuisines())
      }, []);
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
    
      <a class="group block w-full text-center shrink-0 mb-12" href="#" key={cuisine.id}>
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
      </a>  
   
    ))}
    </div>
  </div>
</div>

    </div>
  )
}
const navigation = [
    { name: 'Categories', href: '/categories' },
    { name: 'All Blogs', href: '/home' },
    { name: 'Write one!', href: '/addRecipe' },
  
  ]
export default Categories
