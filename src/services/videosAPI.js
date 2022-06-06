import axios from "axios";
import { useAuth } from "../context/authContext";

const getVideos = async () => {
    const { token } = useAuth();
    try {
        const response = await axios({
            method: "GET",
            url: "/api/videos"
        });

        if (response.status === 200)
            return response.data;
    } catch (error) {
        console.error(error.response);
    }
}

const getCategories = async () =>{
    try {
        const response = await axios({
            method: "GET",
            url: "/api/categories"
        });
    
        if (response.status === 200) {
        console.log("category api response", response.data);
            return response.data;}
      } catch (error) {
        console.error(error.response);
      } 
}

const getWatchLaterVideosHandler = async () =>{
    try {
        const response = await axios ({
            method: "GET",
            url: "/api/user/watchlater",
            headers: {
                authorization : token
            }
        });

        if(response.status === 200)
            return response.data;
    }catch(error){
        console.error(error.response);
    }
}

const addItemToWatchLaterVideos = async() =>{
    try{
        const response = await axios ({
            method: "POST",
            url: 
        })
    }
}

export { getVideos, getCategories, getWatchLaterVideosHandler };