import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Alert from "./Alert";
import DropDown from "./DropDown";
import colors from "../../helpers/colors";
import { updateLocation } from "../../../services/admin/location";

const EditLocationModal = ({
	isShow,
	closeModal,
	remove,
	locationId,
	handleLocationUpdate,
}) => {
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(0);
	// const [showBy, setShowBy] = useState(false);
	const [msgData, setMsgData] = useState({
		type: "",
		message: "",
		title: "",
	});

	const [aData, setAData] = useState({
		type: "",
		message: "",
		show: false,
	});
	const [locationData, setLocationData] = useState({
		name: "",
		delivery_price: "",
		active: "",
	});

	const getActive = () => {
		const c = [
			{
				value: 1,
				label: "Active",
				left: "",
				image: "",
			},
			{
				value: 0,
				label: "Not Active",
				left: "",
				image: "",
			},
		];
		return c;
	};

	const selectActive = (val) => {
		// console.log("selec actv called", val);
		setLocationData({ ...locationData, active: val.value });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		// console.log("loc data", locationData);
		setLoading(true);
		const locationObj = {};
		Object.keys(locationData).forEach((key) => {
			if (String(locationData[key]).length) {
				locationObj[key] = locationData[key];
			}
		});

		// console.log("location data", locationObj);
		// console.log("LocationId", locationId);

		try {
			const locationResponse = await updateLocation(locationId, locationObj);

			if (locationResponse.status === "success") {
				console.log("location res here", locationResponse);

				setLocationData({ name: "", delivery_price: 0, active: "" });

				handleLocationUpdate(locationResponse.location);

				setAData({
					...aData,
					show: true,
					type: "success",
					message: `${locationResponse.message}`,
				});

				setTimeout(() => {
					setAData({ ...aData, show: false });
				}, 2000);
				closeModal();
			} else {
				setAData({
					...aData,
					show: true,
					type: "danger",
					message: `${locationResponse.message}`,
				});
			}

			setLoading(false);
		} catch (err) {
			console.log("the error", err);
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: err.message,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
			setLoading(false);
		}
	};

	const fireDelete = async (e) => {
		if (e) e.preventDefault();
		const result = await remove();

		if (result === true) {
			setStep(1);
		}
	};

	const close = (e) => {
		if (e) e.preventDefault();
	};

	const Message = () => {
		return (
			<>
				<h3
					className={`fs-15 font-weight-medium font-metropolisregular ${
						msgData.type === "success" ? "onapple" : "onaliz"
					}`}
				>
					{msgData.message}
				</h3>

				<p className="fs-14 onmineshaft mrgb0">{msgData.message}</p>

				<div className="mrgt2">
					<Link
						onClick={(e) => close(e)}
						className="btn bg-silver btn-block fs-14 onmineshaft fon-metropolisregular"
					>
						OK
					</Link>
				</div>
			</>
		);
	};

	return (
		<>
			<Modal
				show={isShow}
				onHide={closeModal}
				size="sm"
				fade={false}
				keyboard={false}
				aria-labelledby="small-modal"
				centered
				className="custom-modal rem-modal"
			>
				<Modal.Body>
					<div className="modal-box">
						<div className="modal-sidebar"></div>

						<div className="modal-content-box">
							<div className="modal-header-box">
								<h2 className="font-metropolisregular fs-16">Edit Location</h2>
								<div className="ml-auto">
									<button
										onClick={closeModal}
										className="dot-close fe-order"
										style={{ position: "relative", top: "-3px" }}
									>
										<span className="fe fe-x on-cord-o fs-13"></span>
									</button>
								</div>
							</div>

							<div className="row">
								<div className="col-12 mx-auto">
									<div className="mrgt2 bg-white">
										{step === 0 && (
											<form className="gnr-form" onSubmit={handleUpdate}>
												<Alert
													show={aData.show}
													type={aData.type}
													message={aData.message}
												/>

												<div className="form-group mb-3">
													<div className="align-items-center">
														<div className="">
															<label
																className="font-metromedium mb-2"
																style={{ color: colors.primary.green }}
															>
																Name
															</label>
															<input
																defaultValue={(e) => {
																	setLocationData({
																		...locationData,
																		name: e.target.value,
																	});
																}}
																onChange={(e) => {
																	setLocationData({
																		...locationData,
																		name: e.target.value,
																	});
																}}
																type="text"
																placeholder="Berger"
																className="form-control"
															/>
														</div>
													</div>
												</div>

												{/* <div className="row">
										<div className="col-md-6"> */}
												<div className="form-group mb-3">
													<div className="">
														<label
															className="font-metromedium mb-2"
															style={{ color: colors.primary.green }}
														>
															Delivery price
														</label>
														<input
															defaultValue={(e) => {
																setLocationData({
																	...locationData,
																	delivery_price: e.target.value,
																});
															}}
															onChange={(e) => {
																setLocationData({
																	...locationData,
																	delivery_price: e.target.value,
																});
															}}
															type="number"
															placeholder="0.00"
															className="form-control"
														/>
													</div>
												</div>

												<div className="form-group mb-3">
													<label
														className="font-metromedium mb-2"
														style={{ color: colors.primary.green }}
													>
														Status
													</label>
													<DropDown
														options={getActive}
														className="fd-drop"
														selected={selectActive}
														placeholder={`Select`}
														search={false}
													/>
												</div>

												<div className="mrgb1 ui-text-center mrgt3">
													<button
														type="submit"
														className="btn bg-primary btn-block onwhite fs-16 mb-3"
														style={{ backgroundColor: colors.primary.green }}
													>
														{loading ? (
															<img
																src="../../../images/assets/spinner-white.svg"
																alt="spinner"
																width="30px"
															/>
														) : (
															"Update"
														)}
													</button>
												</div>
											</form>
										)}

										{step === 1 && <Message />}
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default EditLocationModal;
