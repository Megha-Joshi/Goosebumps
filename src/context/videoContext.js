import { createContext, useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { getCategories, getVideos, removeItemFromLikedVideosHandler } from "../services/videosAPI";
import { addItemToLikedVideosHandler } from "../services/videosAPI";

const VideoContext = createContext();

const initialState = {
    videos: [], 
    categories: [],
    likedVideos: [],
}

const VideoProvider = ({children}) => {
    const videoReducerFun = (videoState, action) => {
        switch(action.type){
            case "SET_VIDEOS":
                return{
                    ...videoState, 
                    videos: action.payload,
                }
            
            case "SET_CATEGORIES":
                return{
                    ...videoState,
                    categories: action.payload,
                }

            case "SET_LIKED_VIDEOS":
                return{
                    ...videoState,
                    likedVideos: action.payload,
                }

            case "REMOVE_LIKES":
                return{
                    ...videoState,
                    likedVideos: action.payload,
                }
        }
    }

const [ videoState, videoDispatch ] = useReducer(videoReducerFun, initialState);

    useEffect(() =>{
        const fetchAllVideos = async () =>{
            try{
                const response = await getVideos();
            videoDispatch({type: "SET_VIDEOS", payload: response.videos});
            }catch(error){
                console.log(error);
            }
        }
        fetchAllVideos();
    },[]);

    useEffect(() =>{
        const fetchAllCategories = async () =>{
            try{
                const response = await getCategories();
            videoDispatch({type: "SET_CATEGORIES", payload: response.categories});
            }catch(error){
                console.log(error);
            }
        }
        fetchAllCategories();
    },[]);

    const addItemToLikedVideos = async (token,video) =>{
        try{
            const response = await addItemToLikedVideosHandler(token,video);
            videoDispatch({type: "SET_LIKED_VIDEOS", payload: response.likes})
        }catch(error){
            console.log(error)
        }
    }

    const removeItemFromLikedVideos = async(_id, token) =>{
        try{
            const response = await removeItemFromLikedVideosHandler(_id, token);
            videoDispatch({type: "REMOVE_LIKES", payload: response.likes})
        }catch(error){
            console.log(error);
        }
    }

    return <VideoContext.Provider value={{videoState, videoDispatch , addItemToLikedVideos, removeItemFromLikedVideos }}>{children}</VideoContext.Provider>
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };