import axios from "axios";
import { useAuth } from "../context/authContext";

const getVideos = async () => {
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

const getLikedVideosHandler = async () =>{
    const { token } = useAuth();
    try{
        const response = await axios({
            method: "GET",
            url: "/api/user/likes",
            headers: {
                authorization : token
            },
        });

        if(response.status === 200)
            return response.data;
    }catch(error) {
        console.error(error.response);
    }
}

const addItemToLikedVideosHandler = async (token,video) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/api/user/likes",
            data: {video},
            headers: {
                authorization : token
            },
        });

        if(response.status === 200 || response.status === 201)
            return response.data;
    }catch(error){
        console.error(error.response);
    }
}

export { getVideos, getCategories, getLikedVideosHandler, addItemToLikedVideosHandler };