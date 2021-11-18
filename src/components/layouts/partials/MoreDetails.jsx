import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { changeOrderStatus } from "../../../services/admin/order";

const MoreDetails = ({ isShow, closeModal, order, updateOrderStatus }) => {
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(0);
	const [msgData, setMsgData] = useState({
		type: "",
		message: "",
		title: "",
	});

	const handleOrderStatusChange = async () => {
		const orderId = order.id;
		try {
			setLoading(true);
			const data = await changeOrderStatus(orderId);
			if (data.status === "success") {
				updateOrderStatus(orderId);
				setLoading(false);
				closeModal();
			}
			// future alerts for failuer and or catch
		} catch (error) {
			setLoading(false);
			throw error;
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
								<h2 className="font-helveticabold onblack fs-16">
									Order Details
								</h2>
								<div className="ui-bg-sliver"></div>
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

							<div
								style={{ wordWrap: "break-word" }}
								className="modal-content-area"
							>
								<div className="">
									{/* <img src="../../../images/assets/avatar.svg" alt="Child" /> */}

									<div className="row">
										<div className="col-md-6">
											<p className="  fs-17 onblack onblack font-helveticamedium mt-3">
												Name
											</p>
										</div>
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack  mt-3">
												{order?.name}
											</p>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												Phone Number
											</p>
										</div>
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												{order?.phone}
											</p>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												Email address
											</p>
										</div>
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												{order?.email}
											</p>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												Address
											</p>
										</div>
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												{order?.address}
											</p>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<p className="font-helveticamedium fs-17 onblack mt-3">
												Amount paid
											</p>
										</div>
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												NGN {parseFloat(order?.amount)}
											</p>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												Date
											</p>
										</div>
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												{/* {moment(order?.created_at, "DD MM YYYY hh:mm:ss")} */}
												{moment(order?.created_at).fromNow()}
											</p>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												Paid
											</p>
										</div>
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												{Number(order?.is_paid) ? "Yes" : "No"}
											</p>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												Instruction
											</p>
										</div>
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												{order?.instruction}
											</p>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												Orders
											</p>
										</div>
										<div className="col-md-6">
											{order?.items.map((item) => (
												<p className="font-helveticamedium  fs-17 onblack mt-3">
													<b className="text-primary">{item.pivot.quantity}</b>:{" "}
													{item.name}
												</p>
											))}
										</div>
									</div>

									<div className="mt-5">
										{order?.delivery_status === "pending" ? (
											<button
												onClick={handleOrderStatusChange}
												className="btn btn-lgr btn-block onwhite bg-dbrown fs-16 mb-3"
											>
												{loading ? (
													<img
														src="../../../images/assets/spinner-white.svg"
														alt="spinner"
														width="30px"
													/>
												) : (
													"Delivered"
												)}
											</button>
										) : (
											<button
												onClick={handleOrderStatusChange}
												className="btn btn-lgr btn-block onwhite bg-warning fs-16 mb-3"
											>
												{loading ? (
													<img
														src="../../../images/assets/spinner-white.svg"
														alt="spinner"
														width="30px"
													/>
												) : (
													"Pend"
												)}
											</button>
										)}
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

export default MoreDetails;
