import { useState } from "react";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import "../../root.css"
import "../Homepage/homepage.css";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";

const History = () => {
const { videoState, removeVideoFromHistory, clearHistory, addItemToLikedVideos, removeItemFromLikedVideos } =
useVideo();
const { history } = videoState;
const { token } = useAuth();

const likeHandler = (token, video) => {
videoState.likedVideos.some((item) => item._id === video._id) ?
removeItemFromLikedVideos(video._id, token) :
addItemToLikedVideos(token,video)
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
                <h2 className="page-head">History Page</h2>
            </div>
            <button className="card-icon" onClick={()=> clearHistory(token)}>CLEAR ALL</button>
            <div className="card-cont">

                {history.length === 0 && <h2 className="no-video">No video to show</h2>}
                {history.map((historyVideo) => (
                <article className="card">
                    <img src={historyVideo.thumbnail} className="card-img" />
                    <h3 className="card-title">{historyVideo.title}</h3>
                    <p className="card-subhead">{historyVideo.creator}</p>
                    <div className="card-footer">
                        <p className="card-content">{historyVideo.views}</p>
                        <p className="card-content">{historyVideo.date}</p>
                        <li className="modal-list" onClick={()=> likeHandler(token, historyVideo)}><span
                                className="card-icon"><i className={videoState.likedVideos.some((item)=> item._id
                                    === historyVideo._id) ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
                                    ></i></span>
                        </li>
                        <li className="modal-list" onClick={()=> removeVideoFromHistory(historyVideo._id, token)}><span
                                className="card-icon"><i class="fad fa-trash-alt"></i></span>
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

export { History };