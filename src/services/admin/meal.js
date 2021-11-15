import instance, { config } from "..";
const resourseUrl = "/admin/meals";

export const getMeals = async () => {
	try {
		const response = await instance.get(resourseUrl, config);
		// console.log("meals res admin", response.data);
		return response.data;
	} catch (error) {
		console.log("admin meal err", error);
		throw error;
	}
};

export const addMeal = async (data) => {
	try {
		const formDataConfig = { ...config };
		formDataConfig.headers["Content-Type"] = "multipart/form-data";
		const response = await instance.post(resourseUrl, data, formDataConfig);
		// console.log("meal response", response.data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateMeal = async (id, data) => {
	try {
		const formDataConfig = { ...config };
		formDataConfig.headers["Content-Type"] = "multipart/form-data";
		const response = await instance.post(
			`${resourseUrl}/${id}`,
			data,
			formDataConfig
		);
		// console.log("update meal response", response.data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteMeal = async (id) => {
	try {
		const response = await instance.delete(`${resourseUrl}?meal=${id}`, config);
		// console.log("meals del res admin", response.data);
		return response.data;
	} catch (error) {
		console.log("admin del meal err", error);
		throw error;
	}
};
