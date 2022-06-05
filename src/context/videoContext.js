import { createContext, useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { getCategories, getVideos } from "../services/videosAPI";

const VideoContext = createContext();

const initialState = {
    videos: [], 
    categories: [],
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

    return <VideoContext.Provider value={{videoState, videoDispatch}}>{children}</VideoContext.Provider>
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };