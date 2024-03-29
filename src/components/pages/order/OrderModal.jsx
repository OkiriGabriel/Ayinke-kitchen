import React, { useEffect, useContext, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Alert from "../../layouts/partials/Alert";
import colors from "../../helpers/colors";
import { getLocations } from "../../../services/user/location";
import { payNow, postOrder } from "../../../services/user/order";

const PayModal = ({ isShow, closeModal, mealStorage }) => {
	const [step, setStep] = useState(0);
	const [modalTitle, setModalTitle] = useState("");

	const [showAdd, setShowAdd] = useState(false);

	const [loading, setLoading] = useState(false);
	const [iconShow, setIcon] = useState(false);
	const [locations, setLocations] = useState([]);
	// console.log("locations", locations);

	const multiple = 100;
	const dollarRate = 410;

	useEffect(() => {
		setModalTitle("Order now");
	});
	useEffect(() => {
		(async () => {
			try {
				const response = await getLocations();
				// console.log("order modal");
				// console.log(locations);
				setLocations(response.locations);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	useEffect(() => {
		setPayData({ ...payData, location_id: locations[0]?.id });
	}, [locations]);

	const close = (e) => {
		e.preventDefault();
		closeModal();
	};

	const [payData, setPayData] = useState({
		email: "",
		name: "",
		phone: "",
		address: "",
		instruction: "",
		location_id: "",
	});
	const toggleAdd = (e) => {
		if (e) e.preventDefault();
		setShowAdd(!showAdd);
	};

	const [amt, setAmt] = useState(0);
	const [paid, setPaid] = useState(false);
	const [aData, setAData] = useState({
		type: "",
		message: "",
		show: false,
	});

	const [msgData, setMsgData] = useState({
		title: "",
		message: "",
		buttonText: "",
		type: "success",
	});

	const postOrderAndPayNow = async (e) => {
		e.preventDefault();

		if (
			!payData.name &&
			!payData.email &&
			!payData.phone &&
			!payData.instruction &&
			// !payData.location &&
			!payData.address
		) {
			console.log("paydata", payData);
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `All fields are required.`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else if (!payData.name) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `Please enter your name`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else if (!payData.email) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `Your email is needed.`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else if (!payData.phone) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `Please enter your phone number`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else if (!payData.location_id) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `Choose a location`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else if (!payData.address) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `Enter your address`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else if (!payData.instruction) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: `Enter instruction`,
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else {
			setLoading(true);
			const order = {
				...payData,
				meals: mealStorage,
			};
			console.log("the full order", order);
			const orderResponse = await postOrder(order);
			const payNowResponse = await payNow(orderResponse.order_id);
			console.log("paynow response", payNowResponse);

			if (!payNowResponse) {
				setLoading(false);
				setAData({
					...aData,
					show: true,
					type: "danger",
					message: `We cannot proccess your request now, please try again.`,
				});
				setTimeout(() => {
					setAData({ ...aData, show: false });
				}, 2000);
				// payButton.click();
				return;
			}
			setPayData({
				email: "",
				name: "",
				phone: "",
				address: "",
				instruction: "",
				location_id: locations[0]?.id,
			});
			localStorage.removeItem("meals");
			setLoading(false);
			closeModal();
			window.location.href = payNowResponse.url;
		}
	};

	// const saveEmail = async () => {
	// 	const regData = {
	// 		email: payData.email,
	// 		phoneNumber: payData.phone,
	// 		password: "#commanD555/" + payData.email,
	// 		phoneCode: "+234",
	// 	};

	// 	try {
	// 		await Axios.post(`${process.env.REACT_APP_ORDER_UR}/order`, {
	// 			...regData,
	// 		})
	// 			.then((resp) => {
	// 				if (resp.data.error === false) {
	// 					setPaid(true);
	// 				}
	// 			})
	// 			.catch((err) => {
	// 				setAData({
	// 					...aData,
	// 					show: true,
	// 					type: "danger",
	// 					message: `${err.response.data.message}`,
	// 				});
	// 				setTimeout(() => {
	// 					setAData({ ...aData, show: false });
	// 				}, 2000);
	// 			});
	// 	} catch (err) {
	// 		setAData({
	// 			...aData,
	// 			show: true,
	// 			type: "danger",
	// 			message: `${err.response.data.message}`,
	// 		});
	// 		setTimeout(() => {
	// 			setAData({ ...aData, show: false });
	// 		}, 2000);
	// 	}
	// };

	// const onPaySuccess = () => {
	// 	setPaid(true);
	// 	saveEmail();
	// };
	// const onPayClose = () => {
	// 	setAData({
	// 		...aData,
	// 		show: true,
	// 		type: "danger",
	// 		message: `We understand that you may not want to support. Thank you so much 😊`,
	// 	});
	// 	setTimeout(() => {
	// 		setAData({ ...aData, show: false });
	// 	}, 4000);
	// };

	const closeX = () => {
		setStep(0);
		setLoading(false);
		closeModal();
	};

	return (
		<>
			<Modal
				show={isShow}
				onHide={closeX}
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
								<h2 className=" font-helveticabold fs-16">Checkout</h2>
								<div className="ml-auto">
									<button
										className="fe-order"
										onClick={closeModal}
										style={{ position: "relative", top: "-3px" }}
									>
										<span className="fe fe-x on-cord-o fs-13"></span>
									</button>
								</div>
							</div>

							<div className="modal-content-area">
								{/*             
        <form className="foorm">
                    <h2 className="brandcox-firefly font-helveticamedium mb-3 fs-13">QTY of meal </h2>
                        <div onClick={(e) => { dec(e) }} className="value-button" id="decrease" >-</div>
                        <input type="number" id="number" value={count} defaultValue={0} />
                        <div onClick={(e) => { inc(e) }} className="value-button" id="increase" >+</div>
                    </form> */}

								<form
									className="gnr-for mrgt1"
									onSubmit={(e) => e.preventDefault()}
								>
									<p className="brandcox-firefly font-helveticamedium fs-13 mb-2  ">
										please confirm your order and checkout
									</p>

									<Alert
										show={aData.show}
										type={aData.type}
										message={aData.message}
									/>

									<div className="row">
										<div className="col-md-6 col-6 inline">
											<div className="form-group">
												<label
													className="font-metromedium fs-13 mb"
													style={{ color: colors.primary.green }}
												>
													Full name
												</label>
												<input
													type="text"
													defaultValue={(e) => {
														setPayData({
															...payData,
															name: e.target.value,
														});
													}}
													onChange={(e) => {
														setPayData({
															...payData,
															name: e.target.value,
														});
													}}
													className="form-control font-metrolight fs-13"
													placeholder="E.g. Wale"
												/>
											</div>
										</div>

										{/*  */}

										<div className="col-md-6 col-6 inline">
											<div className="form-group">
												<label
													className="font-metromedium fs-13 mb"
													style={{ color: colors.primary.green }}
												>
													Email
												</label>
												<input
													type="text"
													defaultValue={(e) => {
														setPayData({ ...payData, email: e.target.value });
													}}
													onChange={(e) => {
														setPayData({ ...payData, email: e.target.value });
													}}
													className="form-control font-metrolight fs-13"
													placeholder="yourmail@you.com"
												/>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6 col-6 inline">
											<div className="form-group">
												<label
													className="font-metromedium fs-13 mb"
													style={{ color: colors.primary.green }}
												>
													Phone
												</label>
												<input
													defaultValue={(e) => {
														setPayData({ ...payData, phone: e.target.value });
													}}
													onChange={(e) => {
														setPayData({ ...payData, phone: e.target.value });
													}}
													type="text"
													className="form-control font-metrolight fs-13"
													placeholder="080xxx"
												/>
											</div>
										</div>

										<div className="col-md-6 col-6 inline">
											<div className="form-group">
												<label
													className="font-metromedium fs-13 mb"
													style={{ color: colors.primary.green }}
												>
													Location
												</label>
												<select
													className="form-control"
													defaultValue={(e) => {
														setPayData({
															...payData,
															location_id: e.target.value,
														});
													}}
													onChange={(e) => {
														setPayData({
															...payData,
															location_id: e.target.value,
														});
													}}
												>
													{locations.length ? (
														locations.map((location) => (
															<option key={location.id} value={location.id}>
																{location.name}
															</option>
														))
													) : (
														<option value="loading">loading...</option>
													)}
													{/* <option value="iwo">Iwo road</option>
													<option value="challenge">Challenge</option>
													<option value="bodija">Bodija</option>
													<option value="saki">Saki</option>
													<option value="gate">Lautech gate</option> */}
												</select>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12 col-12 inline">
											<div className="form-group">
												<div className="d-flex align-items-center mb">
													<label
														className="font-metromedium fs-13"
														style={{ color: colors.primary.green }}
													>
														Address
													</label>
												</div>
												<input
													defaultValue={(e) => {
														setPayData({ ...payData, address: e.target.value });
													}}
													onChange={(e) => {
														setPayData({ ...payData, address: e.target.value });
													}}
													type="text"
													className="form-control font-metrolight fs-13"
													placeholder="your address"
												/>
											</div>
										</div>
									</div>

									<div className="form-group">
										<label
											className="font-metromedium fs-13 mb"
											style={{ color: colors.primary.green }}
										>
											Instruction
										</label>
										<textarea
											defaultValue={(e) => {
												setPayData({ ...payData, instruction: e.target.value });
											}}
											onChange={(e) => {
												setPayData({ ...payData, instruction: e.target.value });
											}}
											type="text"
											className="form-control font-metrolight fs-13"
											placeholder="Type here"
										></textarea>
									</div>

									<div className="form-group">
										<button
											class="btn paynow-btn font-helveticamedium "
											type="button"
											onClick={postOrderAndPayNow}
										>
											{loading ? (
												<img
													src="../../../images/assets/spinner-white.svg"
													alt="spinner"
													width="30px"
												/>
											) : (
												"Pay Now"
											)}
										</button>
										{/* <PaystackButton
											id="pay-button"
											email={payData.email}
											amount={payData.amount}
											name={payData.name}
											phone={payData.phone}
											publicKey={process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}
											text={"Pay Now"}
											onSuccess={onPaySuccess}
											onClose={onPayClose}
											className="paystack-button"
										/> */}
									</div>
								</form>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default PayModal;
