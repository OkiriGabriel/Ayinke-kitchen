import instance from ".";
const resourceUrl = "/admin";

// annoying wrapper to avoid annoying data key
export const login = async (loginObj) => {
	try {
		console.log("lg", loginObj);
		const response = await instance.post(resourceUrl, loginObj);
		console.log("res", response);
		return response.data[0];
	} catch (error) {
		console.log("th paynow error", error);
		throw error;
	}
};
