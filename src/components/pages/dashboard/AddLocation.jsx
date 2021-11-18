import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import DropDown from "../../layouts/partials/DropDown";
import LottiePlayer from "../../layouts/partials/LottiePlayer";

import DashTopBar from "./DashTopBar";

import Alert from "../../layouts/partials/Alert";
import lottieError from "../../_data/check-error.json";
import lottieSuccess from "../../_data/check-green.json";
import storage from "../../helpers/storage";
import colors from "../../helpers/colors";
import body from "../../helpers/body";

import dayjs from "dayjs";
import customParse from "dayjs/plugin/customParseFormat";
import { addLocation } from "../../../services/admin/location";
dayjs.extend(customParse);

const AddLocation = (props) => {
	const history = useHistory();

	const now = new Date();
	const [date, setDate] = useState(now);

	const [isChecked, setIsChecked] = useState(false);
	const [step, setStep] = useState(0);
	const [showBy, setShowBy] = useState(false);
	const [loading, setLoading] = useState(false);
	const [multiple, setMulti] = useState(false);

	const [locationData, setLocationData] = useState({
		name: "",
		delivery_price: "",
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

	const msgAction = async (e, action) => {
		if (e) e.preventDefault();

		if (action !== "success") {
			window.location.reload();
		}

		if (action === "success") {
			await body.dismissBackground("white");
			history.push("/dashboard/Location-items");
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
		if (!locationData.name && !locationData.delivery_price) {
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
		} else if (!locationData.name) {
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
		} else if (!locationData.delivery_price) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `Delivery price must be provided`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
			setLoading(false);
		} else {
			setLoading(true);

			console.log("Location data", locationData);

			try {
				const locationResponse = await addLocation(locationData);
				console.log("location res here", locationResponse);

				setLocationData({ name: "", delivery_price: 0 });

				setAData({
					...aData,
					show: true,
					type: "success",
					message: `Location added successfully!`,
				});
				setTimeout(() => {
					setAData({ ...aData, show: false });
				}, 2000);

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
			<DashTopBar pageTitle="Add Location" linkComps={barLinks} />

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
														setLocationData({
															...locationData,
															name: e.target.value,
														});
													}}
													value={locationData.name}
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
												value={locationData.delivery_price}
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

export default AddLocation;
