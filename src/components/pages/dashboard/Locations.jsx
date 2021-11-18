import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertModal from "../../layouts/partials/AlertModal";
import DelModal from "../../layouts/partials/DelModal";
import EditLocationModal from "../../layouts/partials/EditLocationModal";
import { getLocations, deleteLocation } from "../../../services/admin/location";

import DashTopBar from "./DashTopBar";

const Locations = () => {
	const [locations, setLocations] = useState([]);
	const [showD, setShowD] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [currentLocationId, setCurrentLocationId] = useState("");
	const [showM, setShowM] = useState(false);
	const [msgModal, setMessage] = useState({
		title: "",
		message: "",
		buttonText: "",
		type: "",
	});
	useEffect(() => {
		(async () => {
			try {
				const responseLocations = await getLocations();
				setLocations(responseLocations);
			} catch (error) {
				console.log("some error", error);
				throw error;
			}
		})();
	}, []);

	const openDeleteModal = (id) => {
		setCurrentLocationId(id);
		setShowD(true);
	};

	const closeDeleteModal = () => {
		setCurrentLocationId("");
		setShowD(false);
	};

	const openEditLocation = (id) => {
		setCurrentLocationId(id);
		setShowM(true);
	};

	const closeEditLocation = () => {
		setCurrentLocationId("");
		setShowM(false);
	};

	const handleLocationUpdate = (updatedLocation) => {
		const updatedLocations = locations.map((location) =>
			Number(location.id) === Number(updatedLocation.id)
				? updatedLocation
				: location
		);
		setLocations(updatedLocations);
	};

	const handleLocationDelete = async () => {
		try {
			const response = await deleteLocation(currentLocationId);
			if (response.status) {
				const restLocations = locations.filter(
					(location) => Number(location.id) !== Number(currentLocationId)
				);
				setLocations(restLocations);
			}
			closeDeleteModal();
		} catch (error) {
			closeDeleteModal();
		}
	};

	const toggleAlert = (e) => {
		if (e) {
			e.preventDefault();
		}
		setShowAlert(!showAlert);
	};

	const barLinks = () => {
		return (
			<>
				<div className="ui-group-button">
					<Link
						to="/admin/dashboard/add-location"
						className="btn btn-sm btn-primary onwhite fs-15"
					>
						Add Location
					</Link>
				</div>
			</>
		);
	};

	return (
		<>
			<DashTopBar linkComps={barLinks} />

			<section>
				<main className="dash-inner">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-12">
								<div className="mrgb2">
									<div
										className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light"
										style={{
											backgroundImage:
												'url("../../../images/assets/fooditem.png")',
										}}
									>
										<h1 className="fs-30 brand-green font-helveticabold mrgb0">
											{locations.length}
										</h1>
										<p className="mrgb0 brand-green fs-13 font-helvetica">
											Location(s)
										</p>
									</div>
								</div>
							</div>

							{/* <div className="col-lg-6 col-md-6 col-sm-12">   

                                <div className="mrgb2">

                                    <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
                                        <h1 className="fs-30 brand-green font-helveticabold mrgb0">0</h1>
                                        <p className="mrgb0 brand-green fs-13 font-helvetica">Count(s) </p>
                                    </div>

                                </div>

                            </div> */}
						</div>

						<div className="row">
							<div className="col-md-12">
								<div className="overview-box">
									<h2 className="font-helveticamedium mb-2">Locations</h2>

									<div className="ui-dashboard-card frnd-list">
										<table className="table custom-table">
											<thead>
												<tr className="font-helvetica  py-8 ">
													<th>S/N</th>
													<th>Address</th>
													<th>Delivery Price</th>
													<th>Status</th>
													<th>Actions</th>
												</tr>
											</thead>

											<tbody>
												{locations.map((location, index) => (
													<tr>
														<td className="font-helvetica">{index + 1}</td>
														<td className="font-helvetica">{location.name}</td>
														<td className="font-helvetica">
															{parseFloat(location.delivery_price)}
														</td>
														<td className="font-helvetica">
															{Number(location.active)
																? "Active"
																: "Not Active"}
														</td>
														<td>
															<div className="ui-group-button">
																<button
																	className="text-primary"
																	onClick={() => openEditLocation(location.id)}
																>
																	<span className="fe fe-edit fs-16"></span>
																</button>
																<button
																	className="text-danger"
																	onClick={() => openDeleteModal(location.id)}
																>
																	<span className="fe fe-trash-2 fs-16"></span>
																</button>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</section>
			<AlertModal
				isShow={showAlert}
				closeModal={toggleAlert}
				type={msgModal.type}
				data={msgModal}
			/>
			<DelModal
				isShow={showD}
				handleDelete={handleLocationDelete}
				closeModal={closeDeleteModal}
			/>
			<EditLocationModal
				locationId={currentLocationId}
				isShow={showM}
				closeModal={closeEditLocation}
				handleLocationUpdate={handleLocationUpdate}
			/>
		</>
	);
};

export default Locations;
