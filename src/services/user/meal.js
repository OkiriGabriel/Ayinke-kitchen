import instance from "../";
const resourseUrl = "/meals";
// annoying wrapper to avoid annoying data key
export const getMeals = async () => (await instance.get(resourseUrl)).data;
