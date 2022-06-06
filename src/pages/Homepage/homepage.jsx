import { useState } from "react";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import "../../root.css"
import "../Homepage/homepage.css";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";

const Homepage = () => {
const [sidebar, setSideBar] = useState(true);
const [modal, setModal] = useState(false);
const { videoState, addItemToLikedVideos, removeItemFromLikedVideos } = useVideo();
const { videos, categories } = videoState;
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
                {categories.map((category) => (
                <div className="chips-item">{category.categoryName}</div>
                ))}
            </div>
            <div className="card-cont">

                {videos.map((video) => (

                <article className="card">
                    <img src={video.thumbnail} className="card-img" />
                    <div className="card-head">
                        <h3 className="card-title">{video.title}</h3>
                        {modal ?
                        (<button className="card-icon" onClick={()=> setModal(false)}><i
                                class="fad fa-door-open"></i></button>)
                        :
                        (<button className="card-icon" onClick={()=> setModal(true)}><i
                                class="fad fa-door-closed"></i></button>)
                        }
                    </div>
                    {modal?
                    <ul className="modal-cont">
                        <li className="modal-list"><span className="card-icon"><i
                                    class="fad fa-list"></i></span>Playlist
                        </li>
                        <li className="modal-list" onClick={()=> likeHandler(token,video)}><span
                                className="card-icon"><i
                                    class="fad fa-thumbs-up"></i></span>{videoState.likedVideos.some((item) => item._id
                            === video._id)? "Remove Liked Video" : "Like Video"}</li>
                        <li className="modal-list"><span className="card-icon"><i class="fad fa-clock"></i></span>Watch
                            Later</li>
                    </ul>
                    :
                    null
                    }
                    <p className="card-content">{video.creator}</p>
                    <div className="card-footer">
                        <p className="card-content">{video.views}</p>
                        <p className="card-content">{video.date}</p>
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