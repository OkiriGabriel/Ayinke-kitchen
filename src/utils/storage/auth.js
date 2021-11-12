class AuthStorage {
	static getToken() {
		return localStorage.getItem("ayk-toke");
	}
	static setToken(token) {
		localStorage.setItem("ayk-toke", token);
	}

	static removeToken() {
		localStorage.removeItem("ayk-toke");
	}
}
export const loggedIn = () => !!AuthStorage.getToken();
export default AuthStorage;
