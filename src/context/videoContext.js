import { createContext, useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { addItemToLikedVideosHandler, getCategories, getVideos } from "../services/videosAPI";

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
        }
    }

const [ videoState, videoDispatch ] = useReducer(videoReducerFun, initialState);

    useEffect(() =>{
        const fetchAllVideos = async () =>{
            try{
                const response = await getVideos();
                console.log("resp from video", response);
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
                const response = await getCategories(videos);
                console.log("resp from category", response);
            videoDispatch({type: "SET_CATEGORIES", payload: response.categories});
            }catch(error){
                console.log(error);
            }
        }
        fetchAllCategories();
    },[]);

    const addItemToLikedVideos = async (video) =>{
        try{
            const response = await addItemToLikedVideosHandler(video);
            videoDispatch({type: "SET_LIKED_VIDEOS", payload: response.likes})
        }catch(error){
            console.log(error)
        }
    }

    return <VideoContext.Provider value={{videoState, videoDispatch, addItemToLikedVideos}}>{children}</VideoContext.Provider>
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };