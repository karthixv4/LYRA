import React,{useState} from 'react'
import { useUserAuth } from './auth/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const { signUp } = useUserAuth();
    const TrySignup= async(e)=>{
        e.preventDefault();
        setError("")
        try{
          await signUp(email,password)
          navigate("/home")
        }catch(error){
          setError(error.message)
          navigate("/signin")
        }
    }

  return (
    <div>
     <section>
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div
            class="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
            <div class="absolute inset-0">
              <img
                class="h-full w-full object-cover object-top"
                src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2lnbnVwfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                alt="" />
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div class="relative">
              <div class="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                <h3 class="text-4xl font-bold text-white">
                  Now you dont have to rely on your designer to create a new page
                </h3>
                <ul class="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <li class="flex items-center space-x-3">
                    <div
                      class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                      <svg
                        class="h-3.5 w-3.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-lg font-medium text-white">
                      Commercial License
                    </span>
                  </li>
                  <li class="flex items-center space-x-3">
                    <div
                      class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                      <svg
                        class="h-3.5 w-3.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-lg font-medium text-white">
                      Unlimited Exports
                    </span>
                  </li>
                  <li class="flex items-center space-x-3">
                    <div
                      class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                      <svg
                        class="h-3.5 w-3.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-lg font-medium text-white">
                      120+ Coded Blocks
                    </span>
                  </li>
                  <li class="flex items-center space-x-3">
                    <div
                      class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                      <svg
                        class="h-3.5 w-3.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-lg font-medium text-white">
                      Design Files Included
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2
                class="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                Sign Up
              </h2>
              <p class="mt-2 text-base text-gray-600 dark:text-gray-300">
                Already have an account?
               
                <Link  class="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700" to="/signin">Sign In</Link>
              </p>
              <form onSubmit={TrySignup} method="POST" class="mt-8">
                <div class="space-y-5">
                  <div>
                    <label
                      for="name"
                      class="text-base font-medium text-gray-900 dark:text-gray-200">
                      Full Name
                    </label>
                    <div class="mt-2.5">
                      <input
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        placeholder="Enter You Full Name"
                        id="name" />
                    </div>
                  </div>
                  <div>
                    <label
                      for="email"
                      
                      class="text-base font-medium text-gray-900 dark:text-gray-200">
                      Email address
                    </label>
                    <div class="mt-2.5">
                      <input
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                        id="email" />
                    </div>
                  </div>
                  <div>
                    <label
                      for="password"
                      class="text-base font-medium text-gray-900 dark:text-gray-200">
                      Password
                    </label>
                    <div class="mt-2.5">
                      <input
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        id="password" />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      class="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                      Get started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="ml-2 h-4 w-4">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
              {/* <!-- <div class="mt-3 space-y-3">
                <button
                  type="button"
                  class="relative inline-flex w-full items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none dark:text-gray-400">
                  <div class="absolute inset-y-0 left-0 p-4">
                    <svg
                      class="h-6 w-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </div>
                  Sign up with Google
                </button>
                <button
                  type="button"
                  class="relative inline-flex w-full items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none dark:text-gray-400">
                  <div class="absolute inset-y-0 left-0 p-4">
                    <svg
                      class="h-6 w-6 text-[#2563EB]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                    </svg>
                  </div>
                  Sign up with Facebook
                </button>
                <p>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    Read our
                    <span class="capitalize text-indigo-600">privacy policy</span>
                    and
                    <span class="capitalize text-indigo-600">terms of service</span>
                    to learn more
                  </span>
                </p>
              </div> --> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup
