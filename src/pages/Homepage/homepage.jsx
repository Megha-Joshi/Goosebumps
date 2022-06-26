import { useState } from "react";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import "../../root.css"
import "../Homepage/homepage.css";
import "../Login-Signup/auth.css";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";
import { useFilter } from "../../context/filterContext";
import { NavLink } from "react-router-dom";
import Modal from 'react-modal';

const Homepage = () => {
const [sidebar, setSideBar] = useState(true);
const { videoState, addVideoToHistory, addItemToLikedVideos, removeItemFromLikedVideos, addItemToWatchLaterVideos,
removeItemFromWatchLaterVideos, addNewPlaylist, addVideoToPlaylist, removeVideoFromPlaylist } = useVideo();
const { videos, categories } = videoState;
const { token } = useAuth();
const { filterState, filterDispatch, filteredVideos } = useFilter();
const [ modal, setModal] = useState(false);
const [playlistName, setPlaylistName ] = useState("");
const [currVideoState, setCurrVideoState ] = useState("");

const likeHandler = (token, video) => {
videoState.likedVideos.some((item) => item._id === video._id) ?
removeItemFromLikedVideos(video._id, token) :
addItemToLikedVideos(token,video)
}

const watchLaterHandler = ( token, video) => {
videoState.watchLater.some((item) => item._id === video._id) ?
removeItemFromWatchLaterVideos(video._id, token) : addItemToWatchLaterVideos(token,video)
}

const playListHandler = ( token, video ) => {
    if(token){
        setModal(true);
        var currVideo = videoState.videos.find((item) => item._id === video._id); 
        setCurrVideoState(currVideo);
    }
}

const isVideoExistInPlaylist = (playlist) => playlist.videos.some((video) => video._id === currVideoState._id);

const checkVideoInPlaylistHandler = (currVideoState, playlist) => {
    isVideoExistInPlaylist(playlist) ? removeVideoFromPlaylist(token, currVideoState._id, playlist._id) : addVideoToPlaylist(token, currVideoState, playlist._id);
   }

const  makeNewPlaylistHandler = (playlistName) => {
    playlistName && addNewPlaylist(token, playlistName);
    setPlaylistName("");
  }

const customStyle = {
    overlay: {
      top: "6rem",
      backgroundColor: "rgba(52, 58, 64, 0.8)",
    },
    content: {
      width: "18rem",
      height: "20rem",
      margin: "5rem auto",
      backgroundColor: "var(--accent-color)",
    },
  };

return (
<div className="App">
    <Navbar sidebar={sidebar} setSideBar={setSideBar} />
    <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <section className="right-cont">

            <div className="chips-cont">
                {categories.map((category) => (
                <div className="chips-item" onClick={()=> filterDispatch({type: "CATEGORY", payload: category.categoryName})}>{category.categoryName}</div>
                ))}
                <div className="chips-item" onClick={()=> filterDispatch ({type: "CLEAR_FILTER", payload: {...filterState.allVideos}})}>CLEAR ALL</div>
            </div>
            <div className="card-cont">
                {filteredVideos(videos, filterState).map((video) => (
                <article className="card">
                    <NavLink to={`/homepage/${video._id}`}> <img src={video.thumbnail} className="card-img"
                        onClick={()=> addVideoToHistory(token, video)}/>
                    </NavLink>
                    <h3 className="card-title" onClick={()=> addVideoToHistory(token, video)}>{video.title}</h3>
                    <p className="card-subhead"><i>By {video.creator}</i></p>
                    <div className="card-footer">
                        <p className="card-content">{video.views}</p>
                        <p className="card-content">{video.date}</p>
                        <li className="modal-list" onClick={() => playListHandler(token, video)}><span className="card-icon"><i
                                    class="fad fa-list"></i></span>
                        </li>
                        <li className="modal-list" onClick={()=> likeHandler(token,video)}><span
                                className="card-icon"><i className={videoState.likedVideos.some((item)=> item._id
                                    === video._id) ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
                                    ></i></span>
                        </li>
                        <li className="modal-list" onClick={()=> watchLaterHandler(token,video)}><span
                                className="card-icon"><i className={videoState.watchLater.some((item)=> item._id ===
                                    video._id)? "fas fa-clock" : "far fa-clock" }></i></span>
                        </li>
                    </div>
                </article>
                ))}
            </div>
        </section>

        {
            modal && (
                <Modal isOpen={ modal } style={ customStyle }>
                    <header className="modal-header">
                        <h3 className="card-title">Create New Playlist</h3>
                        <i class="fas fa-times card-icon" onClick={() => setModal(false)}></i>
                    </header>
                    <section>
                        {
                            videoState.playlists.length > 0 && 
                            videoState.playlists.map((playlist) => {
                                return(
                                    <div key={playlist._id}>
                                        <input type = "checkbox" checked={isVideoExistInPlaylist(playlist)} 
                                        onChange={() => checkVideoInPlaylistHandler(currVideoState, playlist)}/>
                                        <span className="card-content">{playlist.title}</span>
                                    </div>
                                );
                            })
                        }
                    </section>
                    <main className="modal-subhead">
                        <label className="card-subhead">Name</label>
                        <input type="text" value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}/>
                    </main>
                    <button className= "login-btn center-btn" onClick={() => makeNewPlaylistHandler(playlistName)}>Create</button>
                </Modal>
            )
        }
    </main>
</div>
);
}

export { Homepage };