import { useState } from "react";
import ReactPlayer from "react-player";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import { useParams } from "react-router-dom";
import "../../root.css"
import "../Homepage/homepage.css";
import { useVideo } from "../../context/videoContext";

const Stream = () => {
const [sidebar, setSideBar] = useState(true);
const [modal, setModal] = useState(false);
const {videoState} = useVideo();
const { videos } = videoState;
const { videoID} = useParams();

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
                <div className="video-container">
                    <section>
                        <ReactPlayer 
                            url={`https://www.youtube.com/watch?v=${videoID}`}
                            controls={true}>    
                            </ReactPlayer>
                    </section>
                    <section className="video-content">
                        <h3>{currVideo.title}</h3>
                        <p className="card-content">{currVideo.creator}</p>
                        <p className="card-content">{currVideo.views}</p>
                        <p className="card-content">{currVideo.date}</p>
                    </section>
                </div>
            </div>
        </section>
    </main>
</div>
);
}

export { Stream };