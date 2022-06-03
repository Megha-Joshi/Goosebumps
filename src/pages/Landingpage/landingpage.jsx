import "../../root.css";
import "../Landingpage/landingpage.css";

const Landingpage = () => {
    return(
        <div className="App">
            <div className="body-cont">
                <img src="home-abandon.jpg" className="img-cont"/>
                <div className="home-content">
                <h1 className="home-txt">Welcome !!</h1>
                <button className="home-btn">Explore &gt;&gt;</button>
                </div>
            </div>
        </div>
    )
}

export { Landingpage };