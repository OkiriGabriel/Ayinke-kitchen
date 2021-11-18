import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

const Header = ({ handleLogout }) => {
	return (
		<>
			<nav className="navbar navbar-dark sticky-top bg-light pt-3 pb-3  flex-md-nowrap p-0 shadow">
				<a
					className="navbar-brand col-md-3  onblack font-helveticabold col-lg-2 mr-0"
					href="#"
				></a>
				<button
					className="navbar-toggler position-absolute d-md-none collapsed pt-3 pb-3 "
					type="button"
					data-toggle="collapse"
					data-target="#sidebarMenu"
					aria-controls="sidebarMenu"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<ul className="navbar-nav px-3">
					<li className="nav-item text-nowrap ui-hide-mobile-only">
						<button onClick={handleLogout} className="nav-link onblack">
							Sign out
						</button>
						{/* <a className="nav-link onblack" href="#">Sign out</a> */}
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Header;
