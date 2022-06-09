import { useState } from "react";
import ReactPlayer from "react-player";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import { useParams } from "react-router-dom";
import "../../root.css"
import "../Homepage/homepage.css";
import "../Stream/stream.css";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";

const Stream = () => {
const [sidebar, setSideBar] = useState(true);
const [modal, setModal] = useState(false);
const {videoState, addItemToLikedVideos, removeItemFromLikedVideos, addItemToWatchLaterVideos, removeItemFromWatchLaterVideos} = useVideo();
const { videos } = videoState;
const { videoID} = useParams();
const { token } =useAuth();

const likeHandler = (token, video) => {
    videoState.likedVideos.some((item) => item._id === video._id) ?
    removeItemFromLikedVideos(video._id, token) :
    addItemToLikedVideos(token,video)
    }

const watchLaterHandler = ( token, video) => {
    videoState.watchLater.some((item) => item._id === video._id) ?
    removeItemFromWatchLaterVideos(video._id, token) : addItemToWatchLaterVideos(token,video)
    }

const currVideo = videos.find((video) => video._id === videoID)
console.log("current video",currVideo);
console.log(videoID);
return (
<div className="App">
    <Navbar sidebar={sidebar} setSideBar={setSideBar} />
    <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <section className="right-cont">
            <div className="card-cont">
                <div className="video-cont">
                    <section>
                        <ReactPlayer 
                            url={`https://www.youtube.com/watch?v=${videoID}`} width="56.25rem" height="27.5rem"
                            controls={true}>    
                            </ReactPlayer>
                    </section>
                    <section className="video-content">
                        <div className="video-head">
                        <h3 className="video-title"><i>{currVideo.title}</i></h3>
                        <div className="video-icons">
                        <span className="card-icon" onClick={() => likeHandler(token, currVideo)}><i className={videoState.likedVideos.some((item)=> item._id
                                    === currVideo._id) ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
                                    ></i></span>
                        <span className="card-icon" onClick={() => watchLaterHandler(token, currVideo)}><i className={videoState.watchLater.some((item)=> item._id ===
                                    currVideo._id)? "fas fa-clock" : "far fa-clock" }></i></span>
                        <span className="card-icon"><i class="fad fa-list"></i></span>
                        </div>
                        </div>
                        <p className="card-subhead video-creator">By {currVideo.creator}</p>
                        <div className="video-footer">
                        <p className="video-txt">{currVideo.views}</p>
                        <p className="video-txt">{currVideo.date}</p>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </main>
</div>
);
}

export { Stream };