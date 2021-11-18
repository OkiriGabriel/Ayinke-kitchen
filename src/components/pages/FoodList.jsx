import NavBar from "../layouts/partials/NavBar";
import OrderModal from "./order/OrderModal";
import React, { useEffect, useContext, useState, Fragment } from "react";
import FoodItem from "../pages/restaurant/FoodItem";
import QModal from "./order/QuantityModal";
import { getMeals } from "../../services/user/meal";
import { Spinner } from "react-bootstrap";
import MealStorage from "../../utils/storage/meal";

const FoodList = () => {
	const [show, setShow] = useState(false);
	const [pricing, setPrincing] = useState(0);
	const [name, setName] = useState("");
	const [meals, setMeals] = useState([]);
	const [searchedMeals, setSearchedMeals] = useState([]);
	const mealsToDisplay = searchedMeals.length ? searchedMeals : meals;
	const [close, setClose] = useState(true);
	const toggleClose = () => setClose(!close);
	const smallDevices = () => window.matchMedia("(max-width: 768px)");
	const handleClose = () => {
		// const matchMedia = window.matchMedia("(max-width: 768px)");
		if (smallDevices().matches) {
			setClose(true);
		} else {
			setClose(false);
		}
	};
	const [mealStorage, setMealStorage] = useState([]);

	const incrementInCart = (meal) => {
		const storageMeals = MealStorage.addMeal(meal);
		setMealStorage(storageMeals);
	};

	const decrementInCart = (id) => {
		const storageMeals = MealStorage.decrementMeal(id);
		setMealStorage(storageMeals);
	};

	const removeFromCart = (id) => {
		const storageMeals = MealStorage.removeMeal(id);
		setMealStorage(storageMeals);
	};

	useEffect(() => {
		(async () => {
			try {
				setMealStorage(MealStorage.getMeals());
				const response = await getMeals();
				setMeals(response.meals);
			} catch (error) {
				console.log("some error", error);
				console.error(error);
			}
		})();
	}, []);

	const toggleModal = () => {
		handleClose(true);
		setShow(!show);
	};

	const handleSearch = (e) => {
		const regularExp = new RegExp(`${e.target.value}`, "ig");
		const filteredMeals = meals.filter((meal) => regularExp.test(meal.name));
		setSearchedMeals(filteredMeals);
	};

	// const getSelected = (e, t, count, price, n) => {
	// 	if (e) e.preventDefault();

	// 	if (t === "add") {
	// 		setPrincing(pricing + parseInt(price));

	// 		if (name !== "") {
	// 			setName(name + " + " + n);
	// 		} else {
	// 			setName(name + n);
	// 		}
	// 	}

	// 	if (t === "sub") {
	// 		setPrincing(parseInt(pricing - count * price));
	// 		setName("");
	// 	}
	// };

	// const getCount = (e, type, p) => {
	// 	if (e) e.preventDefault();

	// 	if (type === "add") {
	// 		setPrincing(pricing + parseInt(p));
	// 	}

	// 	if (type === "sub") {
	// 		setPrincing(pricing - parseInt(p));
	// 	}
	// };
	// console.log("state meals", mealStorage);
	return (
		<>
			<NavBar
				toggleClose={toggleClose}
				mealStorage={mealStorage}
				position={true}
			/>

			<section
				className="hero homee-hero ui-full-bg-norm"
				style={{
					backgroundImage: 'url("../../images/assets/bg@back-two.jpg")',
				}}
			>
				<div className="container-fluid flex-heightt food">
					<div className="ui-wrapper-mini">
						<div className="">
							<div className="row">
								<div
									data-aos={"fade-right"}
									className="col-lg-6  col-lg-10 mx-auto"
								>
									{/* query: {query} */}
									<div className="form-group">
										<input
											type="text"
											placeholder="search for food you like..."
											className="search"
											// value={query}
											onChange={handleSearch}
										/>
										{/* <button
									
											className="btn btn-shape bg-btn-primary font-helveticamedium fs-17"
											type="button"
										>
											Search
										</button> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div id="pubfood" className="food-items mrgt2  container">
				{/* <Alert show={aData.show} type={aData.type} message={aData.message} /> */}

				<div className="row">
					<div className="col-lg-8 col-md-12">
						<div className="row food-disp pub">
							<>
								{mealsToDisplay.length ? (
									mealsToDisplay.map((meal) => (
										<FoodItem
											mealStorage={mealStorage}
											meal={meal}
											addToCart={incrementInCart}
											key={meal.id}
											imgSrc={meal.image || "../../images/assets/food-1.jpeg"}
											// get={getSelected}
											// getCount={getCount}
										/>
									))
								) : (
									<div className="spinner-holder">
										<img
											src="../../images/assets/spinner.svg"
											alt="spinner"
											width="100px"
										/>
									</div>
								)}
							</>
						</div>
					</div>

					<div
						style={{
							display: close && smallDevices().matches ? "none" : "block",
						}}
						className="col-lg-4 col-md-12 cart"
					>
						<div className="counter">
							<button
								onClick={handleClose}
								className="close counter-close"
							></button>
							<h2 className="brandcox-firefly text-center onwhite font-helveticamedium mrgb2 fs-20">
								Cart
							</h2>

							<div className="row">
								{/* <div className="col-md-6">
                                  <form className="foorm">
                                <div onClick={(e) => { dec(e) }} className="value-button" id="decrease" >-</div>
                                <input type="number" id="number" value={count} defaultValue={1} />
                                <div onClick={(e) => { inc(e) }} className="value-button" id="increase" >+</div>
                                   </form>
                                 </div> */}

								<div className="col-md-12">
									<div className="bar-food ml-auto">
										{/* <h2 className="title font-helveticabold onwhite  fs-13 pdr food-lit">
											Meal: {name}
										</h2> */}
										{/* d-flex justify-content-around */}

										{mealStorage.map((meal) => (
											<div className="row counter-engine-wrapper mb-3 d-flex align-items-center">
												<div className="col-4">
													<div className="row counter-engine">
														<button
															onClick={() => decrementInCart(meal.id)}
															className="btn col-4"
														>
															-
														</button>
														<span className="col-4 display btn">
															{meal.quantity}
														</span>
														<button
															onClick={() => incrementInCart(meal)}
															className="btn col-4"
														>
															+
														</button>
													</div>
												</div>
												<div className="col-4 text-center">{meal.name}</div>
												<div className="col-4 text-right">
													<div className="row">
														<span className="col-8">
															{(
																parseInt(meal.price) * Number(meal.quantity)
															).toLocaleString()}
														</span>
														<span
															onClick={() => removeFromCart(meal.id)}
															className="col-4 fe fe-trash-2 text-danger"
														></span>
													</div>
												</div>
											</div>
										))}

										<p className="mt-5 float-right">
											<span className="title font-helveticabold onwhite  fs-13 pdr food-lit">
												Total &#x20A6;:
											</span>
											<span className="title font-helveticabold onwhite fs-15 food-lit">
												{mealStorage
													.reduce((curr, acc) => {
														return (
															curr + Number(acc.price) * Number(acc.quantity)
														);
													}, 0)
													.toLocaleString()}
											</span>
										</p>
									</div>
								</div>
							</div>

							<button
								onClick={toggleModal}
								disabled={!Boolean(mealStorage.length)}
								className="btn btn-lg btn-block bg-oran mrgt1 onwhite"
							>
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>

			<OrderModal
				mealStorage={mealStorage}
				isShow={show}
				closeModal={toggleModal}
			/>
		</>
	);
};

export default FoodList;
