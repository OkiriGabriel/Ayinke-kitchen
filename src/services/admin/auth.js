import instance, { config } from "..";
const resourceUrl = "/admin";

export const login = async (loginObj) => {
	try {
		const response = await instance.post(resourceUrl, loginObj);
		console.log("res", response);
		return response.data;
	} catch (error) {
		console.log("th paynow error", error);
		throw error;
	}
};

export const logout = async () => {
	try {
		const response = await instance.post(`${resourceUrl}/logout`, {}, config);
		return response.data;
	} catch (error) {
		console.log("th paynow error", error);
		throw error;
	}
};
