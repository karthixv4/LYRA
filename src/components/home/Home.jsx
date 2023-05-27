import React from 'react'
import Header from '../header/Header';
import Footer from '../header/Footer';
import Statistics from '../header/Statistics';
import TopRecipe from '../header/TopRecipe';

const Home = () => {
 
  return (
    <>
    <div>
      <Header />
      <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
          src="https://assets.architecturaldigest.in/photos/600837f1e6e1f64740188ee5/16:9/w_2560%2Cc_limit/Italian-food_1-1366x768.jpg"
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Luna & Lyra
          </p>
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
          Flavors Unleashed: 
            <br className="hidden md:block" />
            <span className="inline-block text-deep-purple-accent-400">
            A Delicious Adventure for Food Lovers
            </span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
          Immerse yourself in a tantalizing world of flavors at Flavors Unleashed. From exquisite recipes to culinary secrets, we are your gateway to a realm of gastronomic delights.
          </p>
          <div className="flex items-center">
          <button className="flex items-center gap-2 px-6 py-3.5 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
           Explore!
          </button>
          &nbsp; &nbsp;
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              About us
            </a>
          </div>
        </div>
      </div>
    </div>
     </div>
     <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-screen-sm sm:text-center sm:mx-auto">
        <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
          Chase ball of string eat
        </h2>
        <p className="text-base text-gray-700 md:text-lg sm:px-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque rem aperiam, eaque ipsa quae.
        </p>
        <hr className="w-full my-8 border-gray-300" />
      </div>
    </div>
        <TopRecipe />
        <hr className="my-6" />
        <Statistics />
      </div>
    </div>
    <Footer />
    </>
  )
}


export default Home
