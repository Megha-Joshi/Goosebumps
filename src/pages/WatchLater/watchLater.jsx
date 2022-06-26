import { useState } from "react";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import "../../root.css"
import "../Homepage/homepage.css";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";

const WatchLater = () => {
const [sidebar, setSideBar] = useState(true);
const [modal, setModal] = useState(false);
const { videoState, removeItemFromWatchLaterVideos, addItemToLikedVideos, removeItemFromLikedVideos } = useVideo();
const { watchLater } = videoState;
const { token } = useAuth();

const likeHandler = (token, video) => {
    videoState.likedVideos.some((item) => item._id === video._id) ?
    removeItemFromLikedVideos(video._id, token) :
    addItemToLikedVideos(token,video)
    }
return (
<div className="App">
    <Navbar sidebar={sidebar} setSideBar={setSideBar} />
    <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <section className="right-cont">
            <div className="chips-cont">
                <h2 className="page-head">Watch Later Page</h2>
            </div>
            <div className="card-cont">

                {watchLater.length === 0 && <h2 className="no-video">No video to show</h2>}
                {watchLater.map((watchLaterVideo) => (
                    <article className="card">
                    <img src={watchLaterVideo.thumbnail} className="card-img" />
                        <h3 className="card-title">{watchLaterVideo.title}</h3>
                    <p className="card-subhead"><i>{watchLaterVideo.creator}</i></p>
                    <div className="card-footer">
                        <p className="card-content">{watchLaterVideo.views}</p>
                        <p className="card-content">{watchLaterVideo.date}</p>
                        <li className="modal-list"><span className="card-icon"><i
                                    class="fad fa-list"></i></span>
                        </li>
                         <li className="modal-list" onClick={()=> likeHandler(token,watchLaterVideo)}><span
                                className="card-icon"><i className={videoState.likedVideos.some((item)=> item._id
                                    === watchLaterVideo._id) ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
                                    ></i></span>
                        </li>
                        <li className="modal-list" onClick={() => removeItemFromWatchLaterVideos(watchLaterVideo._id, token)}><span className="card-icon"><i class="fas fa-clock"></i></span></li>
                    </div>
                </article>
                ))}
            </div>
        </section>
    </main>
</div>
);
}

export { WatchLater };