import instance, { config } from "./";
const resourseUrl = "/meals";
// annoying wrapper to avoid annoying data key
export const getMeals = async () => (await instance.get(resourseUrl)).data;

export const getOrders = async () => {
	try {
		const response = await instance.get("/services", config);
		return response.data;
	} catch (error) {
		throw error;
	}
};
// const searchUser = async (data) =>
// 	(await instance.post("/phone/search", data, config)).data;
