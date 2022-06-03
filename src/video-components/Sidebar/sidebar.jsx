import "../../root.css";
import "../Sidebar/sidebar.css"

const Sidebar = () => {
return (
<aside className="side-cont">
  <ul>
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-compass"></i></span>Explore</li>
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-list"></i></span>Playlist</li>
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-thumbs-up"></i></span>Liked Videos</li>
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-clock"></i></span>Watch Later</li>
    <li className="nav-list"><span className="nav-icon"><i class="fas fa-history"></i></span>History</li>
  </ul>
</aside>
);
}

export { Sidebar };