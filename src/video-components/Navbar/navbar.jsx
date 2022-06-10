import { NavLink } from "react-router-dom";
import "../../root.css";
import "../Navbar/navbar.css";

const Navbar = ({sidebar, setSideBar}) => {
return(
<nav className="nav-cont">
    <div className="left-nav">
        {sidebar ?
        (<button className="nav-btn" onClick={()=> setSideBar(false)}><i class="fas fa-ghost fa-2x"></i></button>)
        :
        (<button className="nav-btn" onClick={()=> setSideBar(true)}><i
                class="fas fa-skull-crossbones fa-2x"></i></button>)
        }
        <h3>SHADOW</h3>
    </div>
    <NavLink to="/login">
    <button className="nav-btn"><i class="fas fa-sign-in-alt fa-2x"></i></button>
    </NavLink>
</nav>
)
}

export { Navbar };