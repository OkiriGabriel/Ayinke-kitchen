import axios from "axios";
import AuthStorage from "../utils/storage/auth";
const instance = axios.create({
	baseURL: "https://api.ayinkemaykitchen.com/api/",
});

export const config = {
	headers: { Authorization: `Bearer ${AuthStorage.getToken()}` },
};

export default instance;
