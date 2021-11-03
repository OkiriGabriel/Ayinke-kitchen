import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import storage from "../../helpers/storage";

import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import OverView from "./OverView";
import FoodItem from "./FoodItem";
import Placeholder from "../../layouts/partials/Placeholder";

import FoodModal from "./FoodModal";
import AlertModal from "../../layouts/partials/AlertModal";

import FoodContext from "../../../context/food/foodContext";
import FoodItemContext from "../../../context/foodItem/foodItemContext";
import UserContext from "../../../context/user/userContext";
import LocationContext from "../../../context/location/locationContext";
import AddressContext from "../../../context/address/addressContext";

import scroller from "../../helpers/scroller";

const Home = (props) => {
	const foodContext = useContext(FoodContext);
	const foodItemContext = useContext(FoodItemContext);
	const userContext = useContext(UserContext);
	const locationContext = useContext(LocationContext);
	const addressContext = useContext(AddressContext);

	const [show, setShow] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [showStat, setShowStat] = useState(false);
	const [sLoading, setSLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [empty, setEmpty] = useState(false);
	const eL = [1, 2];
	const [msgModal, setMessage] = useState({
		title: "",
		message: "",
		buttonText: "",
		type: "",
	});

	const [foodItemList, setFoodItemList] = useState([]);

	useEffect(async () => {
		fetchDefaults();
		displayEmpty();

		await doScroll();
	}, []);

	const fetchDefaults = async () => {
		if (storage.checkToken()) {
			userContext.getUser();
		}

		if (storage.checkUserID()) {
			await locationContext.getLocations();
			await addressContext.getRestAddresses(storage.getUserID());
			await foodContext.getAllFood(9999);
			await foodItemContext.getRestFoodItems(storage.getUserID());
		}
	};

	const doScroll = () => {
		if (foodItemContext.loading === false) {
			scroller.initScroll("foodl");
		}
	};

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
	const toggleSearch = (e) => {
		if (e) {
			e.preventDefault();
		}
		setShowForm(!showForm);
	};

	const toggleSearchClose = (e) => {
		if (e) {
			e.preventDefault();
		}
		setFoodItemList([]);
		setShowForm(!showForm);
	};

	const toggleAlert = (e) => {
		if (e) {
			e.preventDefault();
		}
		setShowAlert(!showAlert);
	};

	const updateFoodStatus = async (foodId, status) => {
		setSLoading(true);

		await Axios.put(
			`${process.env.REACT_APP_API_URL}/food-items/restaurant/${foodId}`,
			{ status: status },
			storage.getConfigWithBearer()
		)
			.then((resp) => {
				if (resp.data.error === false) {
					setMessage({
						...msgModal,
						type: "success",
						title: "Successful!",
						message: "Food item status changed successfuly",
						buttonText: "close",
					});
					toggleAlert();

					// get all food items again to update the page
					foodItemContext.getRestFoodItems(storage.getUserID());

					setSLoading(false);
				}
			})
			.catch((err) => {
				setMessage({
					...msgModal,
					type: "error",
					title: "Error!",
					message: "Cannot change food item.",
					buttonText: "close",
				});
				toggleAlert();
				setSLoading(false);
			});
	};

	const getFood = (id) => {
		const data = {
			name: "food",
			type: "type",
		};

		let i = 0;
		if (foodContext.allFood.length > 0) {
			const food = foodContext.allFood.find((f) => f._id === id);

			if (!food) {
				console.log("food not found", i);
			} else {
				data.name = food.name;
				data.type = food.type;
			}
		}

		return data;
	};

	const formatList = (data) => {
		const list = data.map((item) => {
			item.foodName = getFood(item.food).type + " " + getFood(item.food).name;
			return item;
		});

		return list;
	};

	const search = (e) => {
		let currentList = [];
		let newList = [];

		if (e.target.value !== "") {
			currentList = formatList(foodItemContext.restFoodItems);

			newList = currentList.filter((i) => {
				const c = i.foodName.toLowerCase();
				const f = e.target.value.toLowerCase();

				if (c.includes(f) !== null) {
					return c.includes(f);
				}
			});
		} else {
			newList = formatList(foodItemContext.restFoodItems);
		}

		setFoodItemList(newList);
	};

	return (
		<>
			<TopBar userLoading={userContext.loading} user={userContext.user} />

			{/* <OverView foodItems={foodItemContext.restFoodItems} addresses={addressContext.restAddresses} /> */}

			<div id="food-items" className="food-items dash mrgt2">
				<div className="container">
					{showForm && (
						<>
							<form
								className="mrgb1 form-search"
								onSubmit={(e) => e.preventDefault()}
							>
								<Link
									onClick={(e) => toggleSearchClose(e)}
									className="search-close"
								>
									<span className={`fe fe-x text-muted`}></span>
								</Link>
								<input
									type="text"
									onChange={(e) => search(e)}
									className="form-control search-txt"
									placeholder="search"
								/>
							</form>
						</>
					)}

					<div className="d-flex align-items-center mrgb2">
						<h3 className="title fs-18 mrgb0">Food Items</h3>
						<div className="pdl1">
							{!showForm && foodItemContext.restFoodItems.length > 0 && (
								<Link onClick={(e) => toggleSearch(e)} className="search-btn">
									<span className={`fe fe-search text-muted`}></span>
								</Link>
							)}
						</div>
						<div className="ml-auto ui-group-button">
							<Link onClick={(e) => toggleAdd(e)} className="add-btn">
								<span className="fe fe-plus"></span>
							</Link>
						</div>

						{/* <Link onClick={(e) => toggleAdd(e)} className="font-weight-bold fs-13 brand-orange ml-auto mt-1"><span className="fe fe-plus"></span> &nbsp; Add New</Link> */}
					</div>

					{!foodItemContext.loading &&
						foodItemContext.restFoodItems.length <= 0 && (
							<>
								{empty ? (
									<>
										<div className="load--bx food-empty">
											<img
												src="../../../images/assets/empty@cup.svg"
												className="empty mrgt5"
												alt="empty cup"
											/>
											<div className="ui-text-center pdr4 pdl4 mrgt1">
												<p className="onsilver">You don't have food items</p>
												<Link
													onClick={(e) => toggleAdd(e)}
													className="btn onwhite bg-brand-orange fs-16 mb-3"
												>
													Add Food Item
												</Link>
											</div>
										</div>
									</>
								) : (
									eL.map(() => (
										<>
											<div className="food">
												<div>
													<p className="title onmineshaft">
														<Placeholder width="180px" />
													</p>
													<p className="mrgb0 text-muted">
														<Placeholder width="140px" />
													</p>
												</div>

												<div className="ml-auto ui-text-right">
													<p className="title fs-15 onmineshaft">
														<Placeholder width="35px" />
													</p>
													<p className={`mrgb0 onaliz`}>
														<p className="title fs-15 onmineshaft">
															<Placeholder width="55px" />
														</p>
													</p>
												</div>
											</div>

											<div className="ui-line fd bg-silverlight" />
										</>
									))
								)}
							</>
						)}

					{foodItemContext.loading && foodItemContext.restFoodItems.length > 0 && (
						<>
							{eL.map(() => (
								<>
									<div className="food">
										<div>
											<p className="title onmineshaft">
												<Placeholder width="180px" />
											</p>
											<p className="mrgb0 text-muted">
												<Placeholder width="140px" />
											</p>
										</div>

										<div className="ml-auto ui-text-right">
											<p className="title fs-15 onmineshaft">
												<Placeholder width="35px" />
											</p>
											<p className={`mrgb0 onaliz`}>
												<p className="title fs-15 onmineshaft">
													<Placeholder width="55px" />
												</p>
											</p>
										</div>
									</div>

									<div className="ui-line fd bg-silverlight" />
								</>
							))}
						</>
					)}
					<div id="foodl" className="list-box foodl">
						{!foodItemContext.loading &&
							foodItemContext.restFoodItems.length > 0 && (
								<>
									{foodItemList.length <= 0 &&
										foodItemContext.restFoodItems.map((fd, i) => (
											<>
												{!foodContext.loading && !locationContext.loading && (
													<FoodItem
														statusLoading={sLoading}
														updateStatus={updateFoodStatus}
														foodItem={fd}
														allFood={foodContext.allFood}
														addresses={addressContext.restAddresses}
														locations={locationContext.locations}
													/>
												)}
											</>
										))}

									{foodItemList.length > 0 &&
										foodItemList.map((fd, i) => (
											<>
												{!foodContext.loading && !locationContext.loading && (
													<FoodItem
														statusLoading={sLoading}
														updateStatus={updateFoodStatus}
														foodItem={fd}
														allFood={foodContext.allFood}
														addresses={addressContext.restAddresses}
														locations={locationContext.locations}
													/>
												)}
											</>
										))}
								</>
							)}
					</div>
				</div>
			</div>

			<BottomBar from="home" />

			<FoodModal isShow={show} closeModal={toggleAdd} />
			<AlertModal
				isShow={showAlert}
				closeModal={toggleAlert}
				type={msgModal.type}
				data={msgModal}
			/>
		</>
	);
};

export default Home;
