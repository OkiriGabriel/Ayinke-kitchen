import React, { useEffect, useContext, useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

import NavBar from "../../layouts/partials/NavBar";
import Alert from "../../layouts/partials/Alert";
import ButtonSpinner from "../../layouts/partials/ButtonSpinner";

import storage from "../../helpers/storage";
import { login } from "../../../services/admin";

const Login = (props) => {
	const history = useHistory();

	const [step, setStep] = useState(0);
	const [pass, setPass] = useState("password");
	const [loading, setLoading] = useState(false);
	const [loginData, setLogData] = useState({
		email: "",
		password: "",
	});

	const [aData, setAData] = useState({
		type: "",
		message: "",
		show: false,
	});

	useEffect(() => {
		if (storage.checkToken()) {
			history.push("/dashboard");
		}
	}, []);

	const showPass = (e) => {
		e.preventDefault();
		if (pass === "password") {
			setPass("text");
		} else {
			setPass("password");
		}
	};

	const submit = async (e) => {
		e.preventDefault();

		if (!loginData.email && !loginData.password) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: "All fields are required.",
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else if (!loginData.email) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: "Enter your email.",
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else if (!loginData.password) {
			setAData({
				...aData,
				show: true,
				type: "danger",
				message: "Enter your password.",
			});
			setTimeout(() => {
				setAData({ ...aData, show: false });
			}, 2000);
		} else {
			setLoading(true);
			console.log("logdata", loginData);

			try {
				const loginResponse = await login(loginData);
				if (loginResponse.success) {
					localStorage.setItem("ayk-toke", loginResponse.token);
					history.push("/admin/dashboard");
				} else {
					setAData({
						...aData,
						show: true,
						type: "danger",
						message: "Invalid Email and Password",
					});
					setTimeout(() => {
						setAData({ ...aData, show: false });
					}, 2000);
				}
				setLoading(false);

				// await Axios.post(`${process.env.REACT_APP_API_URL}/admin`, {
				// 	...loginData,
				// })
				// 	.then((resp) => {
				// 		if (resp.data.error === false) {
				// 			// //save info to local storage
				// 			// localStorage.setItem('token', resp.data.token);
				// 			// localStorage.setItem('userId', resp.data.data._id);
				// 			props.history.push("/admin");
				// 		}
				// 	})
				// 	.catch((err) => {
				// 		if (err.response.data.message === "Invalid credentials") {
				// 			setAData({
				// 				...aData,
				// 				show: true,
				// 				type: "danger",
				// 				message: "Invalid Email and Password",
				// 			});
				// 			setTimeout(() => {
				// 				setAData({ ...aData, show: false });
				// 			}, 2000);
				// 		}
				// 		setLoading(false);
				// 	});
			} catch (err) {
				// setAData({...aData, show: true, type: 'danger', message: `${err.response.data.message}`});
				console.log(err);
				setTimeout(() => {
					setAData({ ...aData, show: false });
				}, 2000);
				setLoading(false);
			}
		}
	};

	return (
		<>
			<NavBar />

			<section className="auth">
				<div className="container">
					<div className="row">
						<div className="col-md-4 mx-auto">
							<form onSubmit={(e) => submit(e)} className="gnr-form mrgt1 ">
								<div className="auth--bx">
									<div className="mrgb2">
										<h3 className="title fs-30 ui-text-center">
											Welcome Back!
										</h3>
										<p className="onsilver fs-14 ui-text-center mrgb1">
											Login to your account
										</p>
									</div>

									<Alert
										show={aData.show}
										type={aData.type}
										message={aData.message}
									/>

									<div className="form-group">
										<label>Email address</label>
										<input
											defaultValue={(e) => {
												setLogData({ ...loginData, email: e.target.value });
											}}
											onChange={(e) => {
												setLogData({ ...loginData, email: e.target.value });
											}}
											value={loginData.email}
											type="email"
											className="form-control"
											placeholder="you@restaurant.com"
										/>
									</div>

									<div className="form-group">
										<label>Password</label>

										<input
											defaultValue={(e) => {
												setLogData({ ...loginData, password: e.target.value });
											}}
											onChange={(e) => {
												setLogData({ ...loginData, password: e.target.value });
											}}
											value={loginData.password}
											type={pass}
											className="form-control fs-13"
											placeholder="Your password"
										/>
									</div>

									<div className="form-group">
										{loading && (
											<button className="btn btn-lg btn-block onwhite">
												<ButtonSpinner
													imageUrl={`../../../images/assets/spinner-white.svg`}
												/>
											</button>
										)}
										{!loading && (
											<button className="btn btn-lg btn-block bg-orange onwhite">
												LOGIN
											</button>
										)}
									</div>

									{/* <div className="mrgt2 mrgb1 ui-text-center">
                                    <p className="mb-1"><Link to="/forgot-password" className="onblack fs-14 ui-text-center mrgb1">Forgot password?</Link></p>
                                    <Link to="/contact" className="onblack fs-14 ui-text-center mrgb1">New? Create account</Link>
                                </div>                 */}
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
