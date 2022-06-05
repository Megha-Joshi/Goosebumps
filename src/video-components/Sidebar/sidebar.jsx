import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "../../root.css";
import "../Sidebar/sidebar.css";

const Sidebar = () => {
  const {logoutHandler} = useAuth();
return (
<aside className="side-cont">
  <ul>
    <NavLink to="/homepage" className="text-link">
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-compass"></i></span>Explore</li>
    </NavLink>
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-list"></i></span>Playlist</li>
    <NavLink to="/like" className="text-link">
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-thumbs-up"></i></span>Liked Videos</li>
    </NavLink>
    <NavLink to="/watchlater" className="text-link">
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-clock"></i></span>Watch Later</li>
    </NavLink>
    <NavLink to="/history" className="text-link">
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-history"></i></span>History</li>
    </NavLink>
    <NavLink to="/" className="text-link">
    <li className="nav-list" onClick={logoutHandler}><span className="nav-icon"><i class="fas fa-sign-out-alt"></i></span>Logout</li>
    </NavLink>
  </ul>
</aside>
);
}

export { Sidebar };