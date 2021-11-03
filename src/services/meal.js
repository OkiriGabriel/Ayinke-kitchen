import instance from "./";
const resourseUrl = "/meals";
// annoying wrapper to avoid annoying data key
export const getMeals = async () => (await instance.get(resourseUrl)).data;
// const searchUser = async (data) =>
// 	(await instance.post("/phone/search", data, config)).data;
