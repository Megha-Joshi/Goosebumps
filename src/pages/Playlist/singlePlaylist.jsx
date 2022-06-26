import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import { Link, useParams } from "react-router-dom";
import "../../root.css"
import "../Homepage/homepage.css";
import { useState } from "react";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";

const SinglePlaylist = () => {

const [sidebar, setSideBar] = useState(true);
const { playlistID } = useParams();
const { videoState, addVideoToHistory, removeVideoFromPlaylist, removeItemFromLikedVideos, addItemToLikedVideos, addItemToWatchLaterVideos, removeItemFromWatchLaterVideos } = useVideo();
const { playlists } = videoState;
const { token } = useAuth();

const currPlaylist = playlists.filter((playlist) => playlist._id === playlistID)[0];

const likeHandler = (token, video) => {
    videoState.likedVideos.some((item) => item._id === video._id) ?
    removeItemFromLikedVideos(video._id, token) :
    addItemToLikedVideos(token,video)
    }

const watchLaterHandler = ( token, video) => {
    videoState.watchLater.some((item) => item._id === video._id) ?
    removeItemFromWatchLaterVideos(video._id, token) : addItemToWatchLaterVideos(token,video)
}


return (
<div className="App">
    <Navbar sidebar={sidebar} setSideBar={setSideBar} />
    <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <section className="right-cont">
            <div className="chips-cont">
                <h2 className="page-head">Playlist</h2>
            </div>
            <div className="card-cont">

                {currPlaylist.videos.length > 0 && currPlaylist.videos.map((video) =>
                <article className="card" key={video._id}>
                    <Link to={`/homepage/${video._id}`}> <img src={video.thumbnail} alt="" className="card-img"
                        onClick={()=>addVideoToHistory(token, video)}/>
                    </Link>
                    <h3 className="card-title" onClick={()=> addVideoToHistory(token, video)}>{video.title}</h3>
                    <p className="card-subhead"><i>By {video.creator}</i></p>
                    <div className="card-footer">
                        <p className="card-content">{video.views}</p>
                        <p className="card-content">{video.date}</p>

                        <li className="modal-list" onClick={()=> likeHandler(token,video)}><span
                                className="card-icon"><i className={videoState.likedVideos.some((item)=> item._id
                                    === video._id) ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
                                    ></i></span>
                        </li>
                        <li className="modal-list" onClick={()=> watchLaterHandler(token,video)}><span
                                className="card-icon"><i className={videoState.watchLater.some((item)=> item._id ===
                                    video._id)? "fas fa-clock" : "far fa-clock" }></i></span>
                        </li>

                        <li className="modal-list" onClick={()=> removeVideoFromPlaylist(token, video._id, playlistID)}><i className="fad fa-trash-alt card-icon"></i>
                        </li>
                    </div>
                </article>
                )}
            </div>
        </section>
    </main>
</div>
);
}

export { SinglePlaylist };