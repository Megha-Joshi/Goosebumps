import { createContext, useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { addItemToWatchLaterVideosHandler, getCategories, getVideos, removeItemFromWatchLaterVideosHandler } from "../services/videosAPI";

const VideoContext = createContext();

const initialState = {
    videos: [], 
    categories: [],
    watchLater: [],
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

            case "SET_WATCH_LATER":
                return{
                    ...videoState,
                    watchLater: action.payload,
                }
            case "REMOVE_WATCH_LATER":
                return{
                    ...videoState,
                    watchLater: action.payload,
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
                const response = await getCategories();
                console.log("resp from category", response);
            videoDispatch({type: "SET_CATEGORIES", payload: response.categories});
            }catch(error){
                console.log(error);
            }
        }
        fetchAllCategories();
    },[]);

    const addItemToWatchLaterVideos = async (token,video) => {
        console.log("entered function", token,video);
        try{
            console.log("hello");
            const response = await addItemToWatchLaterVideosHandler(token,video);
            console.log("response", response.watchlater);
            videoDispatch({type: "SET_WATCH_LATER",payload: response.watchlater});
        }catch(error){
            console.log(error);
        }
    }

    const removeItemFromWatchLaterVideos = async (_id, token) => {
        try{
            const response = await removeItemFromWatchLaterVideosHandler(_id, token);
            videoDispatch({type: "REMOVE_WATCH_LATER", payload: response.watchlater})
        }catch(error){
            console.log(error);
        }
    }

    return <VideoContext.Provider value={{videoState, videoDispatch, addItemToWatchLaterVideos, removeItemFromWatchLaterVideos}}>{children}</VideoContext.Provider>
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };