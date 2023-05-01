import React, { useState,useEffect } from 'react'
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../slices/RecipeSlice';
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { useUserAuth } from '../auth/UserAuthContext';
const Home = () => {
  const {user,logout} = useUserAuth();
  console.log("USER",user)
    const dispatch = useDispatch();
    var recipes = useSelector((state) => state.recipes.recipes)
    useEffect(() => {
        dispatch(getAllRecipes())
      }, []);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const doLogout = async () =>{
      try{
        await logout()
      }catch(e){
        console.log(e.message)
      }
    }
  return (
    <div>
      <div className="bg-white">
      <header className="bg-white">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline dark:text-white">
                <span className="-mt-0.5">Lyra</span>
                <a onClick={doLogout}>Logout</a>
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
            <a href="/Signin" className="text-sm font-semibold leading-6 text-gray-900">
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Head */}
        <div className="flex flex-col items-center justify-center space-y-8 py-20">
          <p className="text-center text-base font-semibold leading-normal text-purple-700">
            Lyra
          </p>
          <p className="text-center text-5xl font-semibold leading-10 text-gray-900">
          Delicious Delights
          </p>
          <p className="text-center text-xl leading-loose text-gray-600">
           A Food Bloggin Adventure
          </p>
          <div className="ace-x-2 flex w-80 items-center space-x-2 overflow-hidden rounded-lg border border-gray-300  bg-white px-3.5 shadow">
            <MagnifyingGlassIcon className="h-5 w-5 rounded-lg" />
            <input
              type="text"
              className="flex-1 bg-white  py-3 text-base leading-normal text-gray-500 outline-none focus:outline-none focus:ring-0 "
              placeholder="Search"
            />
          </div>
        </div>
        {/* filters */}
        <div className="flex flex-col justify-between  space-y-4 md:flex-row ">
          
        </div>
        <div className="grid gap-4 gap-y-8 py-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div key={recipe.name} className="flex flex-col justify-between space-y-2">
              <div className="space-y-2">
              <Link to={`/recipe/${recipe.id}`} > <img src={recipe.image} className="aspect-video w-full rounded-md" alt="" /></Link> 
                <p className="w-full text-sm font-semibold leading-tight text-purple-700">
                  {recipe.cuisine.name}
                </p>
                <div>
                  <p className="flex-1 text-2xl font-semibold text-gray-900">{recipe.name}</p>
                </div>
                <p className="w-full text-base leading-normal text-gray-600">{recipe.description}</p>
              </div>
              {/* <div className="flex  space-x-3 ">
                <img className="h-full w-10 rounded-lg" src={post.avatar} alt={post.author} />
                <div>
                  <p className="text-sm font-semibold leading-tight text-gray-900">{post.author}</p>
                  <p className="text-sm leading-tight text-gray-600">{post.date}</p>
                </div>
              </div> */}
              {/*  */}
            </div>
          ))}
        </div>
        <hr className="my-6" />
        {/* pagination */}
        <div className="flex w-full justify-center">
          <div className="mx-auto flex">
            <a
              href="#"
              className="mx-1 flex cursor-not-allowed items-center rounded-md border border-gray-400 px-4 py-2 text-gray-500 dark:border-gray-800 dark:text-gray-400"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </a>
            <div className="hidden md:flex ">
              {['1', '2', '3', '...', '9', '10'].map((page) => (
                <a
                  key={page}
                  href="#"
                  className="mx-1 flex items-center rounded-md border border-gray-400 px-4 py-2 text-gray-500 hover:scale-105 dark:border-gray-800 dark:text-gray-400"
                >
                  {page}
                </a>
              ))}
            </div>
            <div className="mx-10 flex flex-1 items-center text-sm leading-tight text-gray-700 md:hidden">
              Page 1 of 10
            </div>

            <a
              href="#"
              className="mx-1 flex items-center rounded-md border border-gray-400 px-4 py-2 text-gray-500 hover:scale-105 dark:border-gray-800 dark:text-gray-400"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        {/* footer */}
        <footer className="container mx-auto py-10 px-10 md:px-0">
          <div className="flex flex-col md:flex-row md:items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4F46E5"
                className="h-10 w-10"
              >
                <path
                  fillRule="evenodd"
                  d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                  clipRule="evenodd"
                />
                <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
              </svg>
            </div>
            <div className="mt-4 grow md:mt-0 md:ml-12">
              <p className="text-base font-semibold text-gray-500 dark:text-gray-300">
                © 2023 Lyra
              </p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-100">Company</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 dark:text-gray-400">
                <li>About us</li>
                <li>Blogging History</li>
                <li>Our Team</li>
                <li>Our Vision</li>
                <li>Food-A-Thon</li>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-100">
                Our Stores
              </p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 dark:text-gray-400">
                <li>Washington</li>
                <li>New Hampshire</li>
                <li>Maine</li>
                <li>Texas</li>
                <li>Indiana</li>
              </ul>
            </div>
            
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-100">Legal</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 dark:text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Disclaimer</li>
                <li>Media Policy</li>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-100">
                Social Links
              </p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 dark:text-gray-400">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Linkedin</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </footer>
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


export default Home
