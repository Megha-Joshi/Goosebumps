import axios from "axios";

const loginAPI = (user) => {
    return axios.post("/api/auth/login", user);
}

const signupAPI = (user) =>{
    return axios.post("/api/auth/signup", user);
}

export { loginAPI, signupAPI };