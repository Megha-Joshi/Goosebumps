import { useState } from "react";
import { Navbar } from "../../video-components/Navbar/navbar";
import { Sidebar } from "../../video-components/Sidebar/sidebar";
import "../../root.css"
import "../Homepage/homepage.css";

const Like = () => {
const [sidebar, setSideBar] = useState(true);
const [modal, setModal] = useState(false);
return (
<div className="App">
    <Navbar sidebar={sidebar} setSideBar={setSideBar} />
    <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <section className="right-cont">
            <div className="chips-cont">
                <h2 className="page-head">Liked Videos</h2>
            </div>
            <div className="card-cont">
                <article className="card">
                    <img src="home-abandon.jpg" className="card-img" />
                    <div className="card-head">
                        <h3 className="card-title">Title</h3>
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
                        <li className="modal-list"><span className="card-icon"><i
                                    class="fad fa-thumbs-up"></i></span>Liked
                            Videos</li>
                        <li className="modal-list"><span className="card-icon"><i class="fad fa-clock"></i></span>Watch
                            Later</li>
                    </ul>
                    :
                    null
                    }
                    <p className="card-content">By Megha Joshi</p>
                    <div className="card-footer">
                        <p className="card-content">3K views</p>
                        <p className="card-content">3 June, 2022</p>
                    </div>

                </article>
            </div>
        </section>
    </main>
</div>
);
}

export { Like };