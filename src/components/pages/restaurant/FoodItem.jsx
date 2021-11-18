import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import colors from "../../helpers/colors";
import QModal from "../order/QuantityModal";
// import MealStorage from "../../utils/storage";

const FoodItem = ({ imgSrc, addToCart, mealStorage, meal }) => {
	const [closeIcon, setClose] = useState("plus");
	const [sel, setSel] = useState(false);
	const [count, setCount] = useState(1);
	const [show, setShow] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

	const toggleAdd = (e) => {
		if (e) e.preventDefault();
		setShowAdd(!showAdd);
	};
	// console.log("the src", imgSrc);
	// const inc = (e) => {
	// 	if (e) e.preventDefault();
	// 	setCount(count + 1);
	// 	getCount(e, "add", price);
	// };

	// const dec = (e) => {
	// 	if (e) e.preventDefault();

	// 	if (count < 2) {
	// 		setCount(1);
	// 	} else {
	// 		setCount(count - 1);
	// 		getCount(e, "sub", price);
	// 	}
	// };

	// useEffect(() => {

	// }, [mealStorage]);

	// const select = (e) => {
	// 	console.log("work");

	// 	if (e) e.preventDefault();

	// 	if (sel === false) {
	// 		setClose("x");
	// 		get(e, "add", count, price, food);
	// 	} else {
	// 		setClose("plus");
	// 		get(e, "sub", count, price, food);
	// 		setCount(1);
	// 	}

	// 	setSel(!sel);
	// };

	const toggleModal = () => {
		setShow(!show);
	};

	return (
		<>
			<div className="col-md-4 col-6 mrgt2">
				<div className="ui-text-center pdt">
					<img
						class="img-icon mx-auto ui-rounded-small "
						src={imgSrc}
						alt="icon"
					/>
				</div>
				<div id={`food-box`} className={`food-box ${sel ? "selected" : ""}`}>
					<p className="font-helveticabold food-lits fs-15 mrgb0">
						{meal.name}
					</p>

					<div className="ui-text-center food-lits">
						<span className="font-helveticamedium fs-14 mrgb0 pdr">
							&#x20A6;{parseInt(meal.price).toLocaleString()}
						</span>
						<span
							className="font-helveticamedium fs-13 mrgb0"
							style={{ color: "#8799a5" }}
						>
							/plate
						</span>
					</div>

					<button
						onClick={() => addToCart(meal)}
						disabled={Boolean(
							mealStorage.find(
								(mealObj) => Number(mealObj.id) === Number(meal.id)
							)
						)}
						className="btn btn-shape bg-btn-secondary mt-2"
					>
						Add to cart
					</button>
				</div>
			</div>
			{/* <QModal isShow={show} closeModal={toggleModal} getCount={getCount()} /> */}
		</>
	);
};

export default FoodItem;
