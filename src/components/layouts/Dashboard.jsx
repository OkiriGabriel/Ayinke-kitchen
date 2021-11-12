import React, { Component } from "react";

import Header from "../pages/dashboard/TopBar";
import SideMenu from "../layouts/partials/SideMenu";
import storage, { loggedIn } from "../../utils/storage/auth";
import { Redirect } from "react-router-dom";

const Dashboard = (DashboardComponent, flat) => {
	// console.log("ranner 1");
	return class DashboardLayout extends Component {
		constructor(props) {
			super();
		}

		render() {
			// console.log("ranner 2", loggedIn, storage.getToken());
			return loggedIn() ? (
				<>
					<Header />
					<div
						className={`${
							flat && flat === true ? "" : "container-fluid main-cont"
						}`}
					>
						<SideMenu />

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
