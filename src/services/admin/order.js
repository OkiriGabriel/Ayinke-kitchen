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
