import instance, { config } from "..";
const resourceUrl = "/admin/orders";

export const getOrders = async () => {
	try {
		const response = await instance.get(resourceUrl, config);
		// console.log("the orders", response);
		return response.data.orders;
	} catch (error) {
		throw error;
	}
};

export const getTodayOrders = async () => {
	console.log("here is the config", config);
	try {
		const response = await instance.get(`${resourceUrl}/today`, config);
		return response.data.orders;
	} catch (error) {
		throw error;
	}
};
// https://api.ayinkemaykitchen.com/api/admin/orders/toggle/168
export const changeOrderStatus = async (orderId) => {
	try {
		const response = await instance.post(
			`${resourceUrl}/toggle/${orderId}`,
			{},
			config
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
