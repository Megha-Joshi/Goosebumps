import "../../root.css";
import "../Landingpage/landingpage.css";
import { Link } from "react-router-dom";

const Landingpage = () => {
    return(
        <div className="App">
            <div className="body-cont">
                <img src="home-abandon.jpg" className="img-cont"/>
                <div className="home-content">
                <h1 className="home-txt">Welcome !!</h1>
                <Link to="/homepage">
                <button className="home-btn">Explore &gt;&gt;</button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export { Landingpage };