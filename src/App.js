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
function App() {
  return (
    <UserContextProvider>
    <Routes>
    <Route path="/categories" element={<Categories></Categories>}></Route>
    <Route path="/addRecipe" element={<AddRecipe></AddRecipe>}/>
    <Route path="/home" element={<SecureRoute><Home/></SecureRoute>}/>
    <Route path="/signin" element={<SignIn></SignIn>}></Route>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/recipe/:id" element={<Recipe></Recipe>}></Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
