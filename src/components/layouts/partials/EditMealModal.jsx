import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Alert from "./Alert";
import DropDown from "./DropDown";
import colors from "../../helpers/colors";
import { updateMeal } from "../../../services/admin/meal";

const EditMealModal = ({
	isShow,
	closeModal,
	remove,
	mealId,
	handleMealUpdate,
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
	const [foodData, setFoodData] = useState({
		name: "",
		price: "",
		photo: "",
		available: "",
	});

	const getAvailable = () => {
		const c = [
			{
				value: 1,
				label: "Available",
				left: "",
				image: "",
			},
			{
				value: 0,
				label: "Not Available",
				left: "",
				image: "",
			},
		];
		return c;
	};

	const selectAvailable = (val) => {
		setFoodData({ ...foodData, available: val.value });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		setLoading(true);

		console.log("food data", foodData);
		console.log("mealId", mealId);

		try {
			const formData = new FormData();
			Object.keys(foodData).forEach((key) => {
				if (foodData[key]) {
					formData.append(key, foodData[key]);
				}
			});
			for (let value of formData.values()) {
				console.log("iterator value", value);
			}
			const mealResponse = await updateMeal(mealId, formData);

			if (mealResponse.status === "success") {
				console.log("meal res here", mealResponse);

				setFoodData({ name: "", price: 0, photo: "", available: "" });

				handleMealUpdate(mealResponse.meal);

				setAData({
					...aData,
					show: true,
					type: "success",
					message: `${mealResponse.message}`,
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
					message: `${mealResponse.message}`,
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
								<h2 className="font-metropolisregular fs-16">Edit Meal</h2>
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
																	setFoodData({
																		...foodData,
																		name: e.target.value,
																	});
																}}
																onChange={(e) => {
																	setFoodData({
																		...foodData,
																		name: e.target.value,
																	});
																}}
																type="text"
																placeholder="Rice and chicken"
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
															Price
														</label>
														<input
															defaultValue={(e) => {
																setFoodData({
																	...foodData,
																	price: e.target.value,
																});
															}}
															onChange={(e) => {
																setFoodData({
																	...foodData,
																	price: e.target.value,
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
														Availability
													</label>
													<DropDown
														options={getAvailable}
														className="fd-drop"
														selected={selectAvailable}
														placeholder={`Select`}
														search={false}
													/>
												</div>

												<div className="form-group mb-3">
													<div className="align-items-center">
														<div className="">
															<label
																className="font-metromedium mb-2"
																style={{ color: colors.primary.green }}
															>
																Upload photo
															</label>
															<input
																defaultValue={(e) => {
																	setFoodData({
																		...foodData,
																		photo: e.target.value,
																	});
																}}
																onChange={(e) => {
																	setFoodData({
																		...foodData,
																		photo: e.target.files[0],
																	});
																}}
																type="file"
																className="form-control"
															/>
														</div>
													</div>
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

export default EditMealModal;
