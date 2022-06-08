import { createContext, useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { addVideoToHistoryHandler, clearHistoryHandler, getCategories, getVideos, removeVideoFromHistoryHandler } from "../services/videosAPI";

const VideoContext = createContext();

const initialState = {
    videos: [], 
    categories: [],
    history: [],
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

    const addVideoToHistory = async (token,video) =>{
        try{
            const response = await addVideoToHistoryHandler(token,video);
            videoDispatch({type: "SET_HISTORY", payload: response.history})
        }catch(error){
            console.log(error)
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

    return <VideoContext.Provider value={{videoState, videoDispatch, addVideoToHistory, removeVideoFromHistory, clearHistory}}>{children}</VideoContext.Provider>
}


const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };