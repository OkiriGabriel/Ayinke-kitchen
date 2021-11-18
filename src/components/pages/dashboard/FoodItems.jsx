import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Placeholder from "../../layouts/partials/Placeholder";

import DashTopBar from "./DashTopBar";
import AlertModal from "../../layouts/partials/AlertModal";
import DelModal from "../../layouts/partials/DelModal";
import EditMealModal from "../../layouts/partials/EditMealModal";

import FoodContext from "../../../context/food/foodContext";
import FoodItemContext from "../../../context/foodItem/foodItemContext";
import UserContext from "../../../context/user/userContext";
import LocationContext from "../../../context/location/locationContext";
import AddressContext from "../../../context/address/addressContext";
import Dropdown from "../../layouts/partials/DropDown";
import { deleteMeal, getMeals } from "../../../services/admin/meal";

const FoodItems = (props) => {
	// const foodContext = useContext(FoodContext);
	// const foodItemContext = useContext(FoodItemContext);
	// const userContext = useContext(UserContext);
	// const locationContext = useContext(LocationContext);
	// const addressContext = useContext(AddressContext);

	const searchRef = useRef(null);
	const [meals, setMeals] = useState([]);
	const [show, setShow] = useState(false);
	const [showStat, setShowStat] = useState(false);
	const [sLoading, setSLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [showD, setShowD] = useState(false);
	const [showM, setShowM] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [currentMealId, setCurrentMealId] = useState("");
	// const [filter, setFilter] = useState({
	// 	filter: false,
	// 	value: "",
	// });
	// const eL = [1, 2];
	const [msgModal, setMessage] = useState({
		title: "",
		message: "",
		buttonText: "",
		type: "",
	});

	// const [foodItemList, setFoodItemList] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const responseMeals = await getMeals();
				setMeals(responseMeals);
			} catch (error) {
				console.log("some error", error);
				throw error;
			}
		})();
	}, []);

	const displayEmpty = () => {
		setTimeout(() => {
			setEmpty(true);
		}, 4000);
	};

	const logout = (e) => {
		e.preventDefault();

		localStorage.clear();
		props.history.push("/login");
	};

	const toggleAdd = (e) => {
		if (e) {
			e.preventDefault();
		}
		setShow(!show);
	};

	const toggleAlert = (e) => {
		if (e) {
			e.preventDefault();
		}
		setShowAlert(!showAlert);
	};

	const openDeleteModal = (id) => {
		setCurrentMealId(id);
		setShowD(true);
	};

	const closeDeleteModal = () => {
		setCurrentMealId("");
		setShowD(false);
	};

	const openEditMeal = (id) => {
		setCurrentMealId(id);
		setShowM(true);
	};

	const closeEditMeal = () => {
		setCurrentMealId("");
		setShowM(false);
	};

	const handleMealUpdate = (updatedMeal) => {
		const updatedMeals = meals.map((meal) =>
			Number(meal.id) === Number(updatedMeal.id) ? updatedMeal : meal
		);
		setMeals(updatedMeals);
	};

	const handleMealDelete = async () => {
		try {
			const response = await deleteMeal(currentMealId);
			if (response.status) {
				const restMeals = meals.filter(
					(meal) => Number(meal.id) !== Number(currentMealId)
				);
				setMeals(restMeals);
			}
			closeDeleteModal();
		} catch (error) {
			closeDeleteModal();
		}
	};

	const barLinks = () => {
		return (
			<>
				<div className="ui-group-button">
					<Link
						to="/admin/dashboard/food-items/add"
						className="btn btn-sm btn-primary onwhite fs-15"
					>
						Add Food
					</Link>
				</div>
			</>
		);
	};

	return (
		<>
			<DashTopBar linkComps={barLinks} />

			<section>
				<main className="dash-inner">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-12">
								<div className="mrgb2">
									<div
										className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light"
										style={{
											backgroundImage:
												'url("../../../images/assets/fooditem.png")',
										}}
									>
										<h1 className="fs-30 brand-green font-helveticabold mrgb0">
											{meals.length}
										</h1>
										<p className="mrgb0 brand-green fs-13 font-helvetica">
											{/* {!foodItemContext.loading ? foodItemContext.total : 0}{" "} */}
											food item(s)
										</p>
									</div>
								</div>
							</div>

							{/* <div className="col-lg-6 col-md-6 col-sm-12">
								<div className="mrgb2">
									<div
										className="ui-full-bg-norm fooditem-bx ui-text-center ui-box-shadow-dark-light"
										style={{
											backgroundImage:
												'url("../../../images/assets/fooditem.png")',
										}}
									>
										<h1 className="fs-30 brand-green font-helveticabold mrgb0">
											{foodItemContext.total}
										</h1>
										<p className="mrgb0 brand-green fs-13 font-helvetica">
											{!foodItemContext.loading ? foodItemContext.total : 0}{" "}
											Status{" "}
										</p>
									</div>
								</div>
							</div> */}
						</div>

						<div className="row">
							<div className="col-md-12">
								<div className="overview-box">
									<h2 className="font-helveticamedium fs-20 mb-4">
										Food Items
									</h2>

									<div className="ui-dashboard-card frnd-list">
										<table className="table custom-table">
											<thead>
												<tr className="font-helvetica">
													<th>S/N</th>
													<th>Name</th>
													<th>Price</th>
													<th>Status</th>
													<th>Actions</th>
												</tr>
											</thead>

											<tbody>
												{meals.map((meal, index) => (
													<tr>
														<td className="font-helvetica">{index + 1}</td>
														<td className="font-helvetica">{meal.name}</td>
														<td className="font-helvetica">
															{parseFloat(meal.price).toLocaleString()}
														</td>
														<td className="font-helvetica">
															{Number(meal.available)
																? "Available"
																: "Not Avaialable"}
														</td>
														<td>
															<div className="ui-group-button">
																<button
																	className="text-primary"
																	onClick={() => openEditMeal(meal.id)}
																>
																	<span className="fe fe-edit fs-16"></span>
																</button>
																<button
																	className="text-danger"
																	onClick={() => openDeleteModal(meal.id)}
																>
																	<span className="fe fe-trash-2 fs-16"></span>
																</button>
															</div>
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
			</section>

			<AlertModal
				isShow={showAlert}
				closeModal={toggleAlert}
				type={msgModal.type}
				data={msgModal}
			/>
			<DelModal
				isShow={showD}
				handleDelete={handleMealDelete}
				closeModal={closeDeleteModal}
			/>
			<EditMealModal
				mealId={currentMealId}
				isShow={showM}
				closeModal={closeEditMeal}
				handleMealUpdate={handleMealUpdate}
			/>
		</>
	);
};

export default FoodItems;
