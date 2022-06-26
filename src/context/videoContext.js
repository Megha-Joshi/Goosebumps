import toast from 'react-hot-toast';
import { createContext, useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addVideoToHistoryHandler, clearHistoryHandler, getCategories, getVideos, removeVideoFromHistoryHandler, addItemToLikedVideosHandler, removeItemFromLikedVideosHandler, addItemToWatchLaterVideosHandler, removeItemFromWatchLaterVideosHandler, addNewPlaylistHandler, removePlaylistHandler, addVideoToPlaylistHandler, removeVideoFromPlaylistHandler } from "../services/videosAPI";

const VideoContext = createContext();

const initialState = {
    videos: [], 
    categories: [],
    likedVideos: [],
    watchLater: [],
    history: [],
    playlists: [],
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

            case "ADD_PLAYLIST":
                return{
                    ...videoState,
                    playlists: action.payload,
                }
            
            case "DELETE_PLAYLIST":
                return{
                    ...videoState,
                    playlists: action.payload,
                }

            case "ADD_VIDEO_TO_PLAYLIST":
                const newPlaylist = videoState.playlists.reduce((acc,curr)=>{
                    return action.payload._id === curr._id ? [...acc, action.payload] : [...acc,curr]
                },[])
    
            return {
                ...videoState,
                playlists: newPlaylist
            };
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
                toast.success("Added to liked videos");
            }catch(error){
                toast.error("Cannot add to liked videos");
                console.log(error);
            }
        }else{
            toast.error("Login First!");
            navigate("/login");
        }
    }

    const removeItemFromLikedVideos = async(_id, token) =>{
        try{
            const response = await removeItemFromLikedVideosHandler(_id, token);
            videoDispatch({type: "REMOVE_LIKES", payload: response.likes})
            toast.success("Removed from liked videos")
        }catch(error){
            toast.error("Cannot remove from liked videos");
            console.log(error);
        }
    }

    const addItemToWatchLaterVideos = async (token,video) => {
        if(token){
            try{
                console.log("hello");
                const response = await addItemToWatchLaterVideosHandler(token,video);
                videoDispatch({type: "SET_WATCH_LATER",payload: response.watchlater});
                toast.success("Added to watch later");
            }catch(error){
                toast.error("Cannot add to watch later");
                console.log(error);
            }
        }else{
            toast.error("Login First!");
            navigate("/login");
        }
    }

    const removeItemFromWatchLaterVideos = async (_id, token) => {
        try{
            const response = await removeItemFromWatchLaterVideosHandler(_id, token);
            videoDispatch({type: "REMOVE_WATCH_LATER", payload: response.watchlater})
            toast.success("Removed from watch later");
        }catch(error){
            toast.error("Cannot remove from watch later");
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
            toast.error("Login First!");
            navigate("/login");
        }
    }

    const removeVideoFromHistory = async(_id, token) =>{
        try{
            const response = await removeVideoFromHistoryHandler(_id, token);
            videoDispatch({type: "REMOVE_FROM_HISTORY", payload: response.history})
            toast.success("Removed from history");
        }catch(error){
            toast.error("Cannot remove from history");
            console.log(error);
        }
    }

    const clearHistory = async (token) =>{
        try{
            const response = await clearHistoryHandler(token);
            videoDispatch({type: "CLEAR_ALL_HISTORY", payload: response.history})
            toast.success("All Clear");
        }catch(error){
            toast.error("Cannot clear history");
            console.log(error)
        }
    }

    const addNewPlaylist = async (token, playlistName) =>{
        if(token){
            try{
                const response = await addNewPlaylistHandler(token, playlistName);
                videoDispatch({type: "ADD_PLAYLIST", payload: response.playlists})
                toast.success("New Playlist Created");
            }catch(error){
                toast.error("Cannot create new Playlist");
                console.log(error)
            }
        }else{
            toast.error("Login First!");
            navigate("/login");
        }
    }
    
    const removePlaylist = async(token, playlistID) =>{
        try{
            const response = await removePlaylistHandler(token, playlistID);
            videoDispatch({type: "DELETE_PLAYLIST", payload: response.playlists})
            toast.success("Playlist removed");
        }catch(error){
            toast.error("Cannot remove playlist");
            console.log(error);
        }
    }

    const addVideoToPlaylist = async (token, currvideo, playlistID) =>{
        if(token){
            try{
                const response = await addVideoToPlaylistHandler(token, currvideo, playlistID);
                videoDispatch({type: "ADD_VIDEO_TO_PLAYLIST", payload: response.playlist})
                toast.success("Video added to playlist");
            }catch(error){
                toast.error("Cannot add video to playlist");
                console.log(error)
            }
        }else{
            toast.error("Login First!");
            navigate("/login");
        }
    }

    const removeVideoFromPlaylist = async(token ,videoID, playlistID) =>{
        try{
            const response = await removeVideoFromPlaylistHandler(token, videoID, playlistID);
            videoDispatch({type: "ADD_VIDEO_TO_PLAYLIST", payload: response.playlist})
            toast.success("Video removed from playlist");
        }catch(error){
            toast.error("Cannot remove video from playlist");
            console.log(error);
        }
    }

    return <VideoContext.Provider value={{videoState, videoDispatch, addItemToLikedVideos, removeItemFromLikedVideos, addItemToWatchLaterVideos, removeItemFromWatchLaterVideos,addVideoToHistory, removeVideoFromHistory, clearHistory, addNewPlaylist, removePlaylist, addVideoToPlaylist, removeVideoFromPlaylist}}>{children}</VideoContext.Provider>
}

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };