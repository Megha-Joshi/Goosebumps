import { useState } from "react";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import "../../root.css"
import "../Homepage/homepage.css";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";
import { useFilter } from "../../context/filterContext";
import { NavLink } from "react-router-dom";

const Homepage = () => {
const [sidebar, setSideBar] = useState(true);
const { videoState, addVideoToHistory, addItemToLikedVideos, removeItemFromLikedVideos, addItemToWatchLaterVideos,
removeItemFromWatchLaterVideos } = useVideo();
const { videos, categories } = videoState;
const { token } = useAuth();
const { filterState, filterDispatch, filteredVideos } = useFilter();

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
                        <li className="modal-list"><span className="card-icon"><i
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
    </main>
</div>
);
}

export { Homepage };