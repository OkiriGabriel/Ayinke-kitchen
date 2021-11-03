import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import colors from "../../helpers/colors";

import UserContext from "../../../context/user/userContext";

import storage from "../../helpers/storage";

import OrderModal from "../../pages/order/OrderModal";

const BottomBar = ({ count, pricing, items, restId, check, from }) => {
	const userContext = useContext(UserContext);
	console.log("lohaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", from);
	console.log("from bottom bar");
	const history = useHistory();
	const [show, setShow] = useState(false);
	const location = useLocation();
	const [plate, setPlate] = useState({
		items: [],
		total: 0,
		restaurant: "",
	});

	const toggleModal = () => {
		setShow(!show);
	};

	useEffect(async () => {
		console.log("frommmmmm", window.loaation.href);
	}, []);

	// const proceed = async (e) => {
	//    if(e) e.preventDefault();

	//    if(items.length > 0){

	//         if(!checkLocation(items)){
	//             check();
	//         }else{

	//             // await userContext.setPlateData({ items: items, restaurant: restId });
	//             setPlate({ ...plate, items: items, total: total, restaurant: restId });

	//             storage.setPlate([ { items: items, restaurant: restId, totalPrice: total } ]);

	//             history.push('/order/plates')

	//         }

	//    }
	// }

	return (
		<>
			<footer>
				<div id="bottom-bar" className="bottom-bar food">
					<div>I AM BOTTOM BAR</div>
					<div className="bar-food">
						<Link className="pdr1 mrl">
							<span
								className="fe fe-chevron-left fs-15"
								style={{
									color: colors.neutral.grey,
									position: "relative",
									top: "5px",
								}}
							></span>
						</Link>
						<img src="../../../images/icons/dfood2.svg" alt="food icon" />
						<sup className="fd-sup">{count}</sup>
					</div>

					<div className="bar-food">
						<p className="mrgb0">
							<span className="title font-metrolight fs-14 pdr">Total:</span>
							<span className="title font-metrobold fs-15">
								&#x20A6;{pricing.toFixed(2)}
							</span>
						</p>
					</div>

					<div className="ml-auto">
						<div className="bar-food">
							<Link
								onClick={toggleModal}
								className={`bar-fdbtn font-metromedium fs-14 onwhite  `}
								style={{ backgroundColor: colors.primary.green }}
							>
								Proceed
							</Link>
						</div>
					</div>
				</div>
			</footer>

			<OrderModal isShow={show} closeModal={toggleModal} />
		</>
	);
};

export default BottomBar;
