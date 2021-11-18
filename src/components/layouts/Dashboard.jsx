import React, { Component } from "react";

import Header from "../pages/dashboard/TopBar";
import SideMenu from "../layouts/partials/SideMenu";
import storage, { loggedIn } from "../../utils/storage/auth";
import { Redirect, useHistory } from "react-router-dom";
import AuthStorage from "../../utils/storage/auth";
import { logout } from "../../services/admin/auth";

const Dashboard = (DashboardComponent, flat) => {
	// console.log("ranner 1");
	const history = useHistory();

	const handleLogout = async () => {
		console.log("log out runs");
		const response = await logout();

		console.log("the lg res", response);
		// if (response.status === "success") {
		AuthStorage.removeToken();
		window.location.href = "/admin/";
		// }
	};
	return class DashboardLayout extends Component {
		constructor(props) {
			super();
		}

		render() {
			// console.log("ranner 2", loggedIn, storage.getToken());
			return loggedIn() ? (
				<>
					<Header handleLogout={handleLogout} />
					<div
						className={`${
							flat && flat === true ? "" : "container-fluid main-cont"
						}`}
					>
						<SideMenu handleLogout={handleLogout} />

						<main
							role="main"
							className="col-md-9 ml-sm-auto col-lg-10 px-md-4 dash-body"
						>
							<DashboardComponent {...this.props} />
						</main>
					</div>
				</>
			) : (
				<Redirect to="/admin" />
			);
		}
	};
};

export default Dashboard;
