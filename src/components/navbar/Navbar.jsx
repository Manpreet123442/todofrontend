import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };


    return (
        <nav className="nav">
            <div className="nav-strip"></div>
            <div className="nav-link-div">
                    <ul>
                        <NavLink style={{textDecoration : "none", color : "black"}} to = "/dashboard"><li>Dashboard</li></NavLink>
                        <NavLink style={{textDecoration : "none", color : "black"}} to= "/tasklist"><li>Task list</li></NavLink>
                    </ul>
                    <div className="logout-div">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
        </nav>
    )
}

export default Navbar;