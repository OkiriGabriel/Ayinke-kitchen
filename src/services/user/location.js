import instance from "../";
const resourseUrl = "/locations";

// annoying wrapper to avoid annoying data key
export const getLocations = async () => (await instance.get(resourseUrl)).data;
