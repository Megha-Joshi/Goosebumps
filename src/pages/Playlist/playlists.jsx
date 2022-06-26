import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import { Link } from "react-router-dom";
import "../../root.css"
import "../Homepage/homepage.css";
import "../Playlist/playlists.css"
import { useState } from "react";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";

const Playlist = () => {

const [sidebar, setSideBar] = useState(true);
const { videoState, removePlaylist } = useVideo();
const { playlists } = videoState;
const { token } = useAuth();

const playlistThumbnail = (playlist) => {
return playlist.videos.length > 0 &&
`https://i3.ytimg.com/vi/${playlist.videos[0]._id}/maxresdefault.jpg`;
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

                {playlists.length === 0 && <h2 className="no-video">No playlist to show</h2>}
                {playlists.length > 0 &&
                playlists.map((playlist)=> (

                <article className="card relative" key={playlist._id}>
                    <Link to={`/playlists/${playlist._id}`}> <img src={playlistThumbnail(playlist)} className="card-img"
                        alt="Video Thumbnail" />
                    </Link>
                    <div className="video-count">
                        <p className="count">{playlist.videos.length}</p>
                    </div>
                    <div className="card-footer">
                        <p className="card-title">{playlist.title}</p>
                        <span className="trash-icon" onClick={()=> removePlaylist(token, playlist._id)}><i
                                className="fad fa-trash-alt card-icon"></i></span>
                    </div>
                </article>

                )
                )
                }
            </div>
        </section>
    </main>
</div>
);
}

export { Playlist };