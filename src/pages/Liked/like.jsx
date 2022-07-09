import { useState } from "react";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import "../../root.css"
import "../Homepage/homepage.css";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";

const Like = () => {
const { videoState, removeItemFromLikedVideos, addItemToWatchLaterVideos, removeItemFromWatchLaterVideos } = useVideo();
const { likedVideos } = videoState;
const { token } = useAuth();

const watchLaterHandler = ( token, video) => {
videoState.watchLater.some((item) => item._id === video._id) ?
removeItemFromWatchLaterVideos(video._id, token) : addItemToWatchLaterVideos(token,video)
}
return (
<div className="App">
    <Navbar />
    <main className="main-cont">
        <div className="side-cont-hide">
            <Sidebar />
        </div>
        <section className="right-cont">
            <div className="chips-cont">
                <h2 className="page-head">Liked Videos</h2>
            </div>
            <div className="card-cont">

                {likedVideos.length === 0 && <h2 className="no-video">No video to show</h2>}
                {likedVideos.map((likedVideo) => (
                <article className="card">
                    <img src={likedVideo.thumbnail} className="card-img" />
                    <h3 className="card-title">{likedVideo.title}</h3>
                    <p className="card-subhead"><i>{likedVideo.creator}</i></p>
                    <div className="card-footer">
                        <p className="card-content">{likedVideo.views}</p>
                        <p className="card-content">{likedVideo.date}</p>
                        <li className="modal-list" onClick={()=> removeItemFromLikedVideos(likedVideo._id, token)}><span
                                className="card-icon"><i class="fas fa-thumbs-up"></i></span>
                        </li>
                        <li className="modal-list" onClick={()=> watchLaterHandler(token,likedVideo)}><span
                                className="card-icon"><i className={videoState.watchLater.some((item)=> item._id ===
                                    likedVideo._id)? "fas fa-clock" : "far fa-clock" }></i></span>
                        </li>
                    </div>
                </article>
                ))}
            </div>
        </section>
    </main>
</div>
);
}

export { Like };