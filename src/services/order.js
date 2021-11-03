import instance from "./";
const resourseUrl = "/order";
// annoying wrapper to avoid annoying data key

export const postOrder = async (data) =>
	(await instance.post(resourseUrl, data)).data;

export const payNow = async (orderId) =>
	(await instance.get("/paynow", { order_id: orderId })).data;
