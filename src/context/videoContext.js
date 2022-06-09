import { createContext, useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addVideoToHistoryHandler, clearHistoryHandler, getCategories, getVideos, removeVideoFromHistoryHandler, addItemToLikedVideosHandler, removeItemFromLikedVideosHandler, addItemToWatchLaterVideosHandler, removeItemFromWatchLaterVideosHandler } from "../services/videosAPI";

const VideoContext = createContext();

const initialState = {
    videos: [], 
    categories: [],
    likedVideos: [],
    watchLater: [],
    history: [],
}

const VideoProvider = ({children}) => {
    const navigate = useNavigate();
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

            case "SET_HISTORY":
                return{
                        ...videoState,
                        history: action.payload,
                }

            case "REMOVE_FROM_HISTORY":
                return{
                    ...videoState,
                    history: action.payload,
                }

            case "CLEAR_ALL_HISTORY":
                return{
                    ...videoState,
                    history: action.payload,
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
        if(token){
            try{
                console.log("entered like page");
                const response = await addItemToLikedVideosHandler(token,video);
                videoDispatch({type: "SET_LIKED_VIDEOS", payload: response.likes})
            }catch(error){
                console.log(error);
            }
        }else{
            navigate("/login");
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

    const addItemToWatchLaterVideos = async (token,video) => {
        if(token){
            try{
                console.log("hello");
                const response = await addItemToWatchLaterVideosHandler(token,video);
                videoDispatch({type: "SET_WATCH_LATER",payload: response.watchlater});
            }catch(error){
                console.log(error);
            }
        }else{
            navigate("/login");
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

    const addVideoToHistory = async (token,video) =>{
        if(token){
            try{
                const response = await addVideoToHistoryHandler(token,video);
                videoDispatch({type: "SET_HISTORY", payload: response.history})
            }catch(error){
                console.log(error)
            }
        }else{
            navigate("/login");
        }
    }

    const removeVideoFromHistory = async(_id, token) =>{
        try{
            const response = await removeVideoFromHistoryHandler(_id, token);
            videoDispatch({type: "REMOVE_FROM_HISTORY", payload: response.history})
        }catch(error){
            console.log(error);
        }
    }

    const clearHistory = async (token) =>{
        try{
            const response = await clearHistoryHandler(token);
            videoDispatch({type: "CLEAR_ALL_HISTORY", payload: response.history})
        }catch(error){
            console.log(error)
        }
    }

    return <VideoContext.Provider value={{videoState, videoDispatch, addItemToLikedVideos, removeItemFromLikedVideos, addItemToWatchLaterVideos, removeItemFromWatchLaterVideos,addVideoToHistory, removeVideoFromHistory, clearHistory}}>{children}</VideoContext.Provider>
}


const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };