import React from "react";
import {NavLink} from "react-router-dom";
import {RiFileList3Fill} from "react-icons/ri";

const NavBar = () => (
    <div className="container-fluid navbar-bg-dark">
        <div className="row justify-content-center">
            <div className="col-md-8">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-start">            
				  <a className="navbar-brand" href="/"><RiFileList3Fill /> Laravel - react - todo</a>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <div className="collapse navbar-collapse" id="navbarSupportedContent">
				    <ul className="navbar-nav mr-auto">
				      <li className="nav-item">
				        <NavLink to="/" className="nav-link">Home</NavLink>
				      </li>
				      <li className="nav-item">
				        <a className="nav-link" href="#">Link</a>
				      </li>
				    </ul>
				   </div>
				</nav>
			</div>
		</div>
	</div>
);

export default NavBar;