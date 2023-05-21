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
import WelcomeAnimation from "./components/Animations/WelcomeAnimation";
function App() {
  return (
    <UserContextProvider>
    <Routes>
    <Route path="/categories" element={<SecureRoute><Categories/></SecureRoute>}></Route>
    <Route path="/addRecipe" element={<SecureRoute><AddRecipe/></SecureRoute>}/>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/signin" element={<SignIn/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/recipe/:id" element={<Recipe/>}></Route>
    <Route path='/header' element={<Header/>}></Route>
    <Route path='/anim' element={<WelcomeAnimation/>}></Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
