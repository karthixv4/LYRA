import { Routes,Route } from "react-router-dom";
import './App.css';
import Categories from "./components/categories/Categories";
import AddRecipe from "./components/recipes/AddRecipe";
import Home from "./components/home/Home"
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Recipe from "./components/recipes/Recipe";
import { UserContextProvider } from "./components/auth/UserAuthContext";
import SecureRoute from "./components/auth/SecureRoute";
import Header from "./components/header/Header";
import CategoryResult from "./components/categories/CategoryResult";
import AddingRecipe from "./components/recipes/AddingRecipe";
import AllRecipes from "./components/home/AllRecipes";
import Footer from "./components/header/Footer";
import PlayGround from "./components/Animations/PlayGround";
import {AnimatePresence} from 'framer-motion'
function App() {
  return (
    <UserContextProvider>
      <AnimatePresence>
      <Header /> 
    <Routes>
    <Route path="/categories" element={<SecureRoute><Categories/></SecureRoute>}></Route>
    <Route path="/category/:id" element={<CategoryResult/>}></Route>
    <Route path="/addRecipe" element={<AddingRecipe />}/>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/all" element={<AllRecipes/>}></Route>
    <Route path="/signin" element={<SignIn/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/recipe/:id" element={<Recipe/>}></Route>
    <Route path="/anim" element={<PlayGround/>}></Route>
    </Routes>
    <Footer />
    </AnimatePresence>
    </UserContextProvider>
  );
}

export default App;
