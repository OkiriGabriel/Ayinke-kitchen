import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import DropDown from "../../layouts/partials/DropDown";
import LottiePlayer from "../../layouts/partials/LottiePlayer";

import DashTopBar from "./DashTopBar";

import FoodContext from "../../../context/food/foodContext";
import FoodItemContext from "../../../context/foodItem/foodItemContext";
import UserContext from "../../../context/user/userContext";
import LocationContext from "../../../context/location/locationContext";
import AddressContext from "../../../context/address/addressContext";

import Alert from "../../layouts/partials/Alert";
import lottieError from "../../_data/check-error.json";
import lottieSuccess from "../../_data/check-green.json";
import storage from "../../helpers/storage";
import colors from "../../helpers/colors";
import body from "../../helpers/body";

import dayjs from "dayjs";
import customParse from "dayjs/plugin/customParseFormat";
import { addMeal } from "../../../services/admin/meal";
dayjs.extend(customParse);

const AddFood = (props) => {
	const foodContext = useContext(FoodContext);
	const foodItemContext = useContext(FoodItemContext);
	const userContext = useContext(UserContext);
	const locationContext = useContext(LocationContext);
	const addressContext = useContext(AddressContext);

	const history = useHistory();

	const now = new Date();
	const [date, setDate] = useState(now);

	const [isChecked, setIsChecked] = useState(false);
	const [step, setStep] = useState(0);
	const [showBy, setShowBy] = useState(false);
	const [loading, setLoading] = useState(false);
	const [multiple, setMulti] = useState(false);

	const [foodData, setFoodData] = useState({
		// status: false,
		name: "",
		price: "",
		photo: "",
		// multiAdd: [],
	});

	const [msgData, setMsgData] = useState({
		title: "",
		message: "",
		buttonText: "",
		type: "success",
	});

	const [aData, setAData] = useState({
		type: "",
		message: "",
		show: false,
	});

	useEffect(() => {
		fetchDefaults();
	}, []);

	const fetchDefaults = async () => {
		if (storage.checkToken()) {
			userContext.getUser();
		}

		if (storage.checkUserID()) {
			locationContext.getLocations();
			addressContext.getRestAddresses(storage.getUserID());
			foodContext.getAllFood();
			foodItemContext.getRestFoodItems(storage.getUserID());
		}

		body.changeBackground("white");
	};

	const toggleMulti = (e) => {
		if (e) e.preventDefault();
		setMulti(!multiple);
	};

	const msgAction = async (e, action) => {
		if (e) e.preventDefault();

		if (action !== "success") {
			window.location.reload();
		}

		if (action === "success") {
			await body.dismissBackground("white");
			history.push("/dashboard/food-items");
		}
	};

	// message component
	const Message = ({ action }) => {
		return (
			<>
				<div className="ui-text-center mrgb2 mrgt5">
					<LottiePlayer
						lottieData={
							msgData.type === "success" ? lottieSuccess : lottieError
						}
						w="100px"
						h="100px"
						loop={true}
					/>
				</div>
				<div className="mrgb2 pdl3 pdr3">
					<h3
						className="title fs-20 ui-text-center font-metrobold"
						style={{ color: colors.primary.green }}
					>
						{msgData.title}
					</h3>
					<p
						className="fs-14 ui-text-center mrgb1 font-metromedium"
						style={{ color: colors.primary.green }}
					>
						{msgData.message}
					</p>
				</div>

				<div className="ui-text-center">
					<Link
						onClick={(e) => msgAction(e, msgData.type)}
						className="btn btn-lgr onwhite fs-16 mb-3 font-metrobold"
						style={{ backgroundColor: colors.primary.green, width: "200px" }}
					>
						{msgData.buttonText ? msgData.buttonText : "No Text"}
					</Link>
				</div>
			</>
		);
	};

	const submit = async (e) => {
		e.preventDefault();
		if (!foodData.name && !foodData.price && !foodData.photo) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `All fields are required.`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
			setLoading(false);
		} else if (!foodData.name) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `Name must be provided`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
			setLoading(false);
		} else if (!foodData.price) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `Price must be provided`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
			setLoading(false);
		} else if (!foodData.photo) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `You must choose a photo`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
			setLoading(false);
		} else {
			setLoading(true);

			console.log("food data", foodData);

			try {
				const formData = new FormData();
				Object.keys(foodData).forEach((key) => {
					formData.append(key, foodData[key]);
				});
				for (let value of formData.values()) {
					console.log("iterator value", value);
				}
				const mealResponse = await addMeal(formData);
				console.log("meal res here", mealResponse);

				setFoodData({ name: "", price: 0, photo: "" });

				setAData({
					...aData,
					show: true,
					type: "success",
					message: `Food item added successfully!`,
				});
				setTimeout(() => {
					setAData({ ...aData, show: false });
				}, 2000);

				setLoading(false);
				// 	if (resp.data.error === false) {
				// 		setMsgData({
				// 			...msgData,
				// 			type: "success",
				// 			title: "Successful!",
				// 			message: "You have successfully added another food item",
				// 			buttonText: "Close",
				// 		});
				// 		setStep(1);
				// 		console.log(msgData.type);
				// 		foodItemContext.getRestFoodItems(storage.getUserID());
				// 	}
				// })
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
		}
	};

	const goBack = (e) => {
		if (e) e.preventDefault();
		history.goBack();
	};

	const barLinks = () => {
		return (
			<>
				<div className="ui-group-button">
					<Link
						onClick={(e) => goBack(e)}
						className="btn btn-sm btn-primary onwhite fs-15"
					>
						Back
					</Link>
				</div>
			</>
		);
	};

	return (
		<>
			<DashTopBar pageTitle="Add Meal" linkComps={barLinks} />

			<section className="mrgb6">
				<div className="row">
					<div className="col-lg-5 mx-auto">
						<div className="mrgt2 bg-white">
							{step === 0 && (
								<form className="gnr-form" onSubmit={submit}>
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
														setFoodData({ ...foodData, name: e.target.value });
													}}
													value={foodData.name}
													onChange={(e) => {
														setFoodData({ ...foodData, name: e.target.value });
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
												value={foodData.price}
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
										{/* </div>
										</div> */}

										{/* <div className="col-md-6">
											<div className="form-group mb-3">
												<div className="">
													<label
														className="font-metromedium mb-2"
														style={{ color: colors.primary.green }}
													>
														Status
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
														placeholder="Available"
														className="form-control"
													/>
												</div>
											</div>
										</div> */}
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
														setFoodData({ ...foodData, photo: e.target.value });
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

									{/* 
                                <div className="form-group mb-3">
                                    <label className="font-metromedium fs-13 mb-2" style={{color: colors.primary.green}}>Food status</label>
                                    <DropDown options={getStatus} className="fd-drop" selected={selectStatus} placeholder={`Select`} search={false}  />
                                </div> */}

									<div className="mrgb1 ui-text-center mrgt3">
										{/* {loading ? (
											<Link
												onClick={(e) => submit(e)}
												className="btn btn-lgr btn-block onwhite fs-16 mb-3 disabled-show"
												style={{ backgroundColor: colors.primary.green }}
											>
												
											</Link>
										) : (
											<button
												type="submit"
												className="btn bg-primary btn-block onwhite fs-16 mb-3"
												style={{ backgroundColor: colors.primary.green }}
											>
                                                {lodaing ? "Submit" : (<img
													src="../../../images/assets/spinner-white.svg"
													alt="spinner"
													width="30px"
												/>)}
												
											</button>
										)} */}

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
												"Submit"
											)}
										</button>
									</div>
								</form>
							)}

							{step === 1 && <Message />}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AddFood;
