import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../root.css";
import "../Navbar/navbar.css";
import { Sidebar } from "../Sidebar/sidebar";

const Navbar = () => {
const [sidebar, setSideBar] = useState(false);
return(
<div>
  <nav className="nav-cont">
    <h3>SHADOW</h3>
    <div className="right-nav">
      {sidebar === true ?
      (<button className="nav-btn bars-hide" onClick={()=> setSideBar(false)}><i
          class="fas fa-ghost fa-2x"></i></button>)
      :
      (<button className="nav-btn bars-hide" onClick={()=> setSideBar(true)}><i
          class="fas fa-skull-crossbones fa-2x"></i></button>)
      }
      <NavLink to="/login">
        <button className="nav-btn"><i class="fas fa-sign-in-alt fa-2x"></i></button>
      </NavLink>
    </div>
  </nav>
  {sidebar &&
  <div className="sidebar-cont">
    <Sidebar />
  </div>
  }
</div>
)
}

export { Navbar };