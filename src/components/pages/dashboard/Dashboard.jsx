import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import OverView from "./OverView";

import PieChart from "./components/TwoPieChart";
import LineChart from "./components/ProjLineChart";

import MoreDetails from "../../layouts/partials/MoreDetails";
import { getTodayOrders } from "../../../services/admin/order";

const Dashboard = () => {
	// const toggleModal = (e) => {
	// 	if (e) e.preventDefault();
	// 	setShow(!show);
	// };
	const [orders, setOrders] = useState([]);
	const [currentOrder, setCurrentOrder] = useState();

	useEffect(() => {
		(async () => {
			try {
				const responseOrders = await getTodayOrders();
				setOrders(responseOrders);
			} catch (error) {
				console.log("some error orders", error);
				throw error;
			}
		})();
	}, []);

	const [show, setShow] = useState(false);
	const openModal = (order) => {
		setCurrentOrder(order);
		setShow(true);
	};

	const closeModal = () => {
		setCurrentOrder(null);
		setShow(false);
	};
	const updateOrderStatus = (orderId) => {
		const updatedOrders = orders.map((order) =>
			Number(order.id) === Number(orderId)
				? {
						...order,
						delivery_status:
							order.delivery_status === "pending" ? "served" : "pending",
				  }
				: order
		);

		setOrders(updatedOrders);
	};

	return (
		<>
			<main className="dash-inner mrgb3 mrgt2">
				<section className="ord-ovw mrgb1">
					<div className="">
						<div className="row">
							<div className="col-md-4 col-lg-4 col-sm-12">
								<div className="ui-dashboard-card">
									<div
										className="ui-card-body ui-full-bg-norm"
										style={{
											backgroundImage:
												'url("../../../images/assets/blob-one.svg")',
										}}
									>
										<div className="d-flex">
											<div>
												<h3 className="brand-orange fs-18 mrgb0 font-weight-bold">
													Your Orders
												</h3>

												<p className="onmineshaft fs-14  mt-2 mb-2">
													Track your orders.
												</p>
											</div>

											<Link
												to="/admin/dashboard/orders"
												className="ui-upcase brand-orange fs-11 ml-auto font-weight-bold"
											>
												View Orders
												<span
													className="fe fe-chevron-right fs-14 pdl"
													style={{ position: "relative", top: "2px" }}
												></span>
											</Link>
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-4 col-lg-4 col-sm-12">
								<div className="ui-dashboard-card">
									<div
										className="ui-card-body ui-full-bg-norm"
										style={{
											backgroundImage:
												'url("../../../images/assets/blob-one.svg")',
										}}
									>
										<div className="d-flex">
											<div>
												<h3 className="brand-orange fs-18 mrgb0 font-weight-bold">
													Meals
												</h3>

												<p className="onmineshaft fs-14  mt-2 mb-2">
													Track your meals.
												</p>
											</div>

											<Link
												to="/admin/dashboard/food-items"
												className="ui-upcase brand-orange fs-11 ml-auto font-weight-bold"
											>
												View Meals
												<span
													className="fe fe-chevron-right fs-14 pdl"
													style={{ position: "relative", top: "2px" }}
												></span>
											</Link>
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-4 col-lg-4 col-sm-12">
								<div className="ui-dashboard-card">
									<div
										className="ui-card-body ui-full-bg-norm"
										style={{
											backgroundImage:
												'url("../../../images/assets/blob-one.svg")',
										}}
									>
										<div className="d-flex">
											<div>
												<h3 className="brand-orange fs-18 mrgb0 font-weight-bold">
													Locations
												</h3>

												<p className="onmineshaft fs-14  mt-2 mb-2">
													Track your locations.
												</p>
											</div>

											<Link
												to="/admin/dashboard/locations"
												className="ui-upcase brand-orange fs-11 ml-auto font-weight-bold"
											>
												View Locations
												<span
													className="fe fe-chevron-right fs-14 pdl"
													style={{ position: "relative", top: "2px" }}
												></span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className="ui-separate-xsmall"></div>

				<div className="ui-separate-xsmall"></div>

				<section className="mng-bx ui-rounded-small">
					<div className="container">
						<h3 className="onmineshaft fs-14 mrgb1 mt-1">Your details</h3>

						<div className="row">
							<div className="col-lg-4 col-md-4 col-sm-12">
								<Link
									to="/admin/dashboard/food-items/add"
									className="block-link"
								>
									<div className="mng-item">
										<div
											className="avatar ui-full-bg-norm"
											style={{
												backgroundImage:
													'url("../../../images/assets/blobsq-one.svg")',
											}}
										></div>
										<span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">
											Add Meals
										</span>
										<span
											className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange"
											style={{ position: "relative", top: "0px" }}
										></span>
									</div>
								</Link>
							</div>

							<div className="col-lg-4 col-md-4 col-sm-12">
								<Link to="/admin/dashboard/add-location" className="block-link">
									<div className="mng-item">
										<div
											className="avatar ui-full-bg-norm"
											style={{
												backgroundImage:
													'url("../../../images/assets/blobsq-two.svg")',
											}}
										></div>
										<span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">
											Add Locations
										</span>
										<span
											className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange"
											style={{ position: "relative", top: "0px" }}
										></span>
									</div>
								</Link>
							</div>

							{/* <div className="col-lg-4 col-md-4 col-sm-12">
								<Link className="block-link">
									<div className="mng-item">
										<div
											className="avatar ui-full-bg-norm"
											style={{
												backgroundImage:
													'url("../../../images/assets/blobsq-three.svg")',
											}}
										></div>
										<span className="ui-upcase brand-orange fs-11 font-weight-bold pdl2">
											Add Admins
										</span>
										<span
											className="fe fe-chevron-right fs-14 pdl ml-auto brand-orange"
											style={{ position: "relative", top: "0px" }}
										></span>
									</div>
								</Link>
							</div> */}
						</div>
					</div>
				</section>

				<div className="ui-separate-small"></div>

				{/* <div className="row">
					<div className="col-md-4">
						<div className="overview-box">
							<div className="ui-dashboard-card">
								<PieChart />
							</div>
						</div>
					</div>

					<div className="col-md-8">
						<div className="overview-box">
							<div className="ui-dashboard-card p-5">
								<LineChart />
							</div>
						</div>
					</div>
				</div> */}

				<div className="ui-separate-small"></div>

				<div className="row">
					<div className="col-md-12 mrgb2">
						<div className="overview-box">
							<h2 className="font-helveticamedium fs-20  onblack mb-2">
								Orders
							</h2>

							<div className="ui-dashboard-card">
								<table className="table custom-table">
									<thead>
										<tr className="font-helvetica">
											<th className="font-helveticabold onblack">SN</th>
											<th className="font-helveticabold onblack">Name</th>
											<th className="font-helveticabold onblack">
												Phone Number
											</th>
											<th className="font-helveticabold onblack">Address</th>
											<th className="font-helveticabold onblack">
												Delivery Status
											</th>
											<th className="font-helveticabold onblack">Action</th>
										</tr>
									</thead>

									<tbody>
										{orders.map((order, index) => (
											<tr key={order.id}>
												<td className="font-helveticamedium">{index + 1}</td>
												<td className="font-helveticamedium">{order.name}</td>
												<td className="font-helveticamedium">{order.phone}</td>
												<td className="font-helveticamedium">
													{order.address}
												</td>
												<td className="pl-6">
													{order.delivery_status === "pending" ? (
														<span className="fe fe-clock text-warning"></span>
													) : (
														<span className="fe fe-check-circle text-success"></span>
													)}
												</td>
												<td className="ui-text-center">
													<button onClick={() => openModal(order)}>
														<span
															style={{ color: "purple" }}
															className="fe fe-align-center"
														></span>
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<MoreDetails
					order={currentOrder}
					isShow={show}
					updateOrderStatus={updateOrderStatus}
					closeModal={closeModal}
				/>
			</main>
		</>
	);
};

export default Dashboard;
