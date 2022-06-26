import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "../../root.css";
import "../Sidebar/sidebar.css";

const Sidebar = () => {
  const {logoutHandler} = useAuth();

  const currentActiveColor = ({isActive}) => ({
    textDecoration: isActive ? "underline" : "none"
})
return (
<aside className="side-cont">
  <ul>
    <NavLink style={currentActiveColor} to="/homepage" className="text-link">
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-compass"></i></span>Explore</li>
    </NavLink>
    <NavLink style={currentActiveColor} to="/playlists" className="text-link">
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-list"></i></span>Playlist</li>
    </NavLink>
    <NavLink style={currentActiveColor} to="/like" className="text-link">
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-thumbs-up"></i></span>Liked Videos</li>
    </NavLink>
    <NavLink style={currentActiveColor} to="/watchlater" className="text-link">
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-clock"></i></span>Watch Later</li>
    </NavLink>
    <NavLink style={currentActiveColor} to="/history" className="text-link">
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-history"></i></span>History</li>
    </NavLink>
    <NavLink style={currentActiveColor} to="/" className="text-link">
    <li className="nav-list" onClick={logoutHandler}><span className="nav-icon"><i class="fas fa-sign-out-alt"></i></span>Logout</li>
    </NavLink>
  </ul>
</aside>
);
}

export { Sidebar };