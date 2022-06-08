import { useState } from "react";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import "../../root.css"
import "../Homepage/homepage.css";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";

const History = () => {
const [sidebar, setSideBar] = useState(true);
const [modal, setModal] = useState(false);
const { videoState, removeVideoFromHistory, clearHistory } = useVideo();
const { history } = videoState;
const { token } = useAuth();
return (
<div className="App">
    <Navbar sidebar={sidebar} setSideBar={setSideBar} />
    <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <section className="right-cont">
            <div className="chips-cont">
                <h2 className="page-head">History Page</h2>
            </div>
            <button className="card-icon" onClick={() => clearHistory(token)}>CLEAR ALL</button>
            <div className="card-cont">

                {history.map((historyVideo) => (
                    <article className="card">
                    <img src={historyVideo.thumbnail} className="card-img" />
                    <div className="card-head">
                        <h3 className="card-title">{historyVideo.title}</h3>
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
                        <li className="modal-list" onClick={() => removeVideoFromHistory(historyVideo._id, token)}><span className="card-icon"><i
                                    class="fad fa-trash-alt"></i></span>Remove From History</li>
                        <li className="modal-list"><span className="card-icon"><i class="fad fa-clock"></i></span>Watch
                            Later</li>
                    </ul>
                    :
                    null
                    }
                    <p className="card-content">{historyVideo.creator}</p>
                    <div className="card-footer">
                        <p className="card-content">{historyVideo.views}</p>
                        <p className="card-content">{historyVideo.date}</p>
                        {/* <span onClick={() => removeVideoFromHistory(historyVideo._id, token)}><i class="fad fa-trash-alt"></i></span> */}
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