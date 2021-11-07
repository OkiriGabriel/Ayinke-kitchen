import instance from "./";
const resourceUrl = "/order";
// annoying wrapper to avoid annoying data key

export const postOrder = async (data) => {
	try {
		return (await instance.post(resourceUrl, data)).data;
	} catch (error) {
		console.log("post now error", error);
	}
};

export const payNow = async (orderId) => {
	try {
		const response = await instance.get(`/paynow`, {
			params: {
				order_id: orderId,
			},
		});
		console.log("the response", response);
		return response.data;
	} catch (error) {
		console.log("th paynow error", error);
	}
};
