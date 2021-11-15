import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";

const MoreDetails = ({
	isShow,
	closeModal,
	actionType,
	remove,
	deleteType,
}) => {
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(0);
	const [msgData, setMsgData] = useState({
		type: "",
		message: "",
		title: "",
	});

	useEffect(() => {}, []);

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

							<div className="modal-content-area">
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
												Adedeji ibrahim
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
												080 090 xxxxx
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
												you@example.com
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
												No 9, ipaja street, off iyanaoru Lagos state
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
												NGN 2000
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
												10/10/2021
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
											<p className="font-helveticamedium  fs-17 onblack mt-3">
												Sat: 1 Yam + egg ,
											</p>
											<p className="font-helveticamedium  fs-17 onblack ">
												Sat: 2 Rice + chicken
											</p>
										</div>
									</div>

									<div className="d-flex mt-5">
										<Link className=" ml-auto btn btn-lgr btn-block onwhite bg-dbrown fs-16 mb-3">
											Export
										</Link>
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
