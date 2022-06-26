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

const removeItemFromLikedVideosHandler = async (_id ,token) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/api/user/likes/${_id}`,
            headers:{
                authorization: token
            },
        });

        if(response.status === 200)
            return response.data;
    }catch(error){
        console.error(error.response);
    }
}

const getWatchLaterVideosHandler = async () =>{
    const { token } = useAuth();
    try{
        const response = await axios({
            method: "GET",
            url: "/api/user/watchlater",
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

const addItemToWatchLaterVideosHandler = async (token,video) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/api/user/watchlater",
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

const removeItemFromWatchLaterVideosHandler = async (_id, token) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/api/user/watchlater/${_id}`,
            headers: {
                authorization : token
            },
        });

        if(response.status === 200)
            return response.data;
    }catch(error){
        console.error(error.response);
    }
}

const getHistoryVideosHandler = async () =>{
    const { token } = useAuth();
    try{
        const response = await axios({
            method: "GET",
            url: "/api/user/history",
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

const addVideoToHistoryHandler = async (token,video) => {
    try{
        const response = await axios({
            method: "POST",
            url: "/api/user/history",
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

const removeVideoFromHistoryHandler = async (_id ,token) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/api/user/history/${_id}`,
            headers:{
                authorization: token
            },
        });

        if(response.status === 200)
            return response.data;
    }catch(error){
        console.error(error.response);
    }
}

const clearHistoryHandler = async (token) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: "/api/user/history/all",
            headers: {
                authorization : token
            },
        });

        if(response.status === 200)
            return response.data;
    }catch(error){
        console.error(error.response);
    }
}

const getAllPlaylistsHandler = async () =>{
    const { token } = useAuth();
    try{
        const response = await axios({
            method: "GET",
            url: "/api/user/playlists",
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

const addNewPlaylistHandler = async (token, playlistName) => {
    try{
        const response = await axios.post("/api/user/playlists", 
        {
          playlist: {
            title: playlistName,
            description: "",
          },
        },
        {
          headers : { authorization : token}
        } 
        )

        if(response.status === 200 || response.status === 201)
            return response.data;
    }catch(error){
        console.error(error.response);
    }
}

const removePlaylistHandler = async (token, playlistID) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/api/user/playlists/${playlistID}`,
            headers:{
                authorization: token
            },
        })

        if(response.status === 200 || response.status === 201)
            return response.data;
    }catch(error){
        console.error(error.response);
    }
}

// const getVideosFromPlaylistHandler = async () =>{
//     const { token } = useAuth();
//     try{
//         const response = await axios({
//             method: "GET",
//             url: "/api/user/playlists",
//             headers: {
//                 authorization : token
//             },
//         });

//         if(response.status === 200)
//             return response.data;
//     }catch(error) {
//         console.error(error.response);
//     }
// }

// const addVideoToPlaylistHandler = async (token, currVideo, playlistID) => {
//     try{
//         const response = await axios({
//             method: "POST",
//             url: `/api/user/playlists/${playlistID}`,
//             data: {currVideo},
//             headers: {
//                 authorization : token
//             },
//         });

//         if(response.status === 200 || response.status === 201)
//             return response.data;
//     }catch(error){
//         console.error(error.response);
//     }
// }

const addVideoToPlaylistHandler = async (token, video, playlistID ) =>{
    try {
        const response = await axios({
            method : "post",
            headers : { authorization : token },
            data : { video },
            url : `/api/user/playlists/${playlistID}`,
        })
        if(response.status === 200 || response.status === 201)
            return response.data
    }
    catch(error) {
        console.log(error.response)
    }
}

const removeVideoFromPlaylistHandler = async (token, videoID, playlistID) => {
    try{
        const response = await axios({
            method: "DELETE",
            url: `/api/user/playlists/${playlistID}/${videoID}`,
            headers:{
                authorization: token
            },
        });

        if(response.status === 200)
            return response.data;
    }catch(error){
        console.error(error.response);
    }
}



export { getVideos, getCategories, getLikedVideosHandler, addItemToLikedVideosHandler, removeItemFromLikedVideosHandler, getWatchLaterVideosHandler, addItemToWatchLaterVideosHandler, removeItemFromWatchLaterVideosHandler, getHistoryVideosHandler, addVideoToHistoryHandler, removeVideoFromHistoryHandler, clearHistoryHandler, getAllPlaylistsHandler, addNewPlaylistHandler, removePlaylistHandler, addVideoToPlaylistHandler, removeVideoFromPlaylistHandler };
