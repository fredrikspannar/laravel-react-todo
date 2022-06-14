import React from "react";
import {NavLink} from "react-router-dom";
import {RiFileList3Fill} from "react-icons/ri";

const NavBar = () => (
    <div className="container-fluid navbar-bg-dark">
      <div className="container">
        <div className="row">
            <div className="col-md-8">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">            
				  <NavLink to="/" className="nav-brand"><RiFileList3Fill /> Laravel - react - todo</NavLink>
				</nav>
			</div>
		</div>
	  </div>
	</div>
);

export default NavBar;