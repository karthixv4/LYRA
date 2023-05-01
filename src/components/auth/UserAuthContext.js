import { createContext, useEffect, useState,useContext } from "react"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
const userAuthContext = createContext();

export function UserContextProvider({children}){
const [user,setUser] = useState("");
    function signUp(email,password) {
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function signin(email,password) {
        return signInWithEmailAndPassword(auth,email,password)
    }
    function logout(){
        return signOut(auth);
    }
    function googleSignIn(){
        const googleAuthProvider = new GoogleAuthProvider();
        console.log("here too")
        return signInWithPopup(auth,googleAuthProvider)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        })
        return ()=>{
            unsubscribe();
        }
    },[])
return <userAuthContext.Provider value={{user,signUp,signin,logout,googleSignIn}}>{children}</userAuthContext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthContext)
}