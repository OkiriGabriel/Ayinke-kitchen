import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../../services/admin/order";
import MoreDetails from "../../layouts/partials/MoreDetails";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [currentOrder, setCurrentOrder] = useState();

	useEffect(() => {
		(async () => {
			try {
				const responseOrders = await getOrders();
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
			<section>
				<main className="dash-inner">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-12">
								<div className="mrgt3 mrgb2">
									<div
										className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light"
										style={{
											backgroundImage:
												'url("../../../images/assets/fooditem.png")',
										}}
									>
										<h1 className="fs-30 brand-green font-helveticabold mrgb0">
											{orders.length}
										</h1>
										<p className="mrgb0 brand-green fs-13 font-helveticamedium">
											Order(s)
										</p>
									</div>
								</div>
							</div>

							{/* <div className="col-lg-6 col-md-6 col-sm-12">   

                                <div className="mrgt3 mrgb2">

                                    <div className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light" style={{backgroundImage: 'url("../../../images/assets/fooditem.png")'}}>
                                        <h1 className="fs-30 brand-green font-helveticabold mrgb0">0</h1>
                                        <p className="mrgb0 brand-green fs-13 font-helveticamedium">0 Transactions </p>
                                    </div>

                                </div>

                            </div> */}
						</div>

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
													<th className="font-helveticabold onblack">
														Address
													</th>
													<th className="font-helveticabold onblack">
														Delivery Status
													</th>
													<th className="font-helveticabold onblack">Action</th>
												</tr>
											</thead>

											<tbody>
												{orders.map((order, index) => (
													<tr key={order.id}>
														<td className="font-helveticamedium">
															{index + 1}
														</td>
														<td className="font-helveticamedium">
															{order.name}
														</td>
														<td className="font-helveticamedium">
															{order.phone}
														</td>
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
					</div>
				</main>
				<MoreDetails
					order={currentOrder}
					isShow={show}
					updateOrderStatus={updateOrderStatus}
					closeModal={closeModal}
				/>
			</section>
		</>
	);
};

export default Orders;
