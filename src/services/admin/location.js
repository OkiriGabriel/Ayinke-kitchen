import instance, { config } from "..";
const resourseUrl = "/admin/locations";

export const getLocations = async () => {
	try {
		const response = await instance.get(resourseUrl, config);
		return response.data;
	} catch (error) {
		console.log("admin location err", error);
		throw error;
	}
};

export const addLocation = async (data) => {
	try {
		const response = await instance.post(resourseUrl, data, config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateLocation = async (id, data) => {
	try {
		const response = await instance.post(`${resourseUrl}/${id}`, data, config);
		// console.log("update location response", response.data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteLocation = async (id) => {
	try {
		const response = await instance.delete(
			`${resourseUrl}?location=${id}`,
			config
		);
		return response.data;
	} catch (error) {
		console.log("admin del location err", error);
		throw error;
	}
};
