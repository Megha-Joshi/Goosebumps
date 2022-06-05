import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginAPI, signupAPI} from "../services/authAPI.js";
import "../pages/Login-Signup/login.jsx";
import "../pages/Login-Signup/signup.jsx";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const x = JSON.parse(localStorage.getItem("user"))
    const [ token, setToken ] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(x);

    const loginHandler = async ( user ) =>{
        console.log("entered login")
        try{
            const response = await loginAPI(user)
            if (response.status === 200){
                localStorage.setItem("token", response.data.encodedToken);
                localStorage.setItem("user", JSON.stringify(response.data.foundUser));
                setToken(response.data.encodedToken);
                setUser(response.data.foundUser);
                console.log("in login handler")
                navigate("/homepage")
            }
        }
        catch(err){
            console.log(err)
        }

    }

    const signupHandler = async (user) => {
        console.log("entered signup")
        try {
            const response = await signupAPI(user)
            if (response.status === 201) {
                localStorage.setItem("token", response.data.encodedToken);
                localStorage.setItem("user", JSON.stringify(response.data.createdUser));
                setToken(response.data.encodedToken);
                setUser(response.data.createdUser)
                navigate("/homepage")
   
            }
        } catch (err) {
            console.log(err)
        }
    }

    // const signupHandler = async(user) => {
    //     try{
    //         const response = await signupAPI(user);
    //         if(response.status === 201){
    //             localStorage.setItem("token", response.data.encodedToken);
    //             localStorage.setItem("user", JSON.stringify(response.data.createdUser));
    //             setToken(response.data.encodedToken);
    //             setUser(response.data.createdUser);

    //             navigate("/homepage")
    //         }
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    const logoutHandler = () =>{
        navigate("/");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    return(<AuthContext.Provider value={{token, user, loginHandler, signupHandler, logoutHandler}}>{children}</AuthContext.Provider>)
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };



