import React, { useContext, useReducer } from "react";
import {
	CLEAR_ALERT,
	DISPLAY_ALERT,
	LOGIN_USER_BEGIN,
	LOGIN_USER_ERROR,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	REGISTER_USER_BEGIN,
	REGISTER_USER_ERROR,
	REGISTER_USER_SUCCESS,
	TOGGLE_SIDEBAR,
} from "./actions";
import axios from "axios";
import reducer from "./reducers";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userLocation || "",
	jobLocation: userLocation || "",
	showSidebar: false,
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// setting axios globally
	// 1st method->	axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
	const authFetch = axios.create({
		baseURL: "/api/v1",
	});

	//request
	authFetch.interceptors.request.use(
		(config) => {
			//config.headers.common["Authorization"] = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	//response
	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			console.log(error.response);
			if (error.response.status === 401) {
				console.log("AUTH ERROR");
			}
			return Promise.reject(error);
		}
	);

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3000);
	};

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		localStorage.setItem("location", location);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("location");
	};

	const registerUser = async (currentUser) => {
		dispatch({ type: REGISTER_USER_BEGIN });
		try {
			const response = await axios.post("/api/v1/auth/register", currentUser);
			//console.log(response);
			const { user, token, location } = response.data;
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: { user, token, location },
			});
			addUserToLocalStorage({ user, token, location });
		} catch (error) {
			//console.log(error.response);
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const loginUser = async (currentUser) => {
		dispatch({ type: LOGIN_USER_BEGIN });
		try {
			const { data } = await axios.post("/api/v1/auth/login", currentUser);
			const { user, token, location } = data;

			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: { user, token, location },
			});
			addUserToLocalStorage({ user, token, location });
		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	const updateUser = async (currentUser) => {
		try {
			const { data } = await authFetch.patch("/auth/updateUser", currentUser);
			console.log(data);
		} catch (error) {
			//console.log(error.response);
		}
	};

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				registerUser,
				loginUser,
				updateUser,
				toggleSidebar,
				logoutUser,
			}}
		>
			{children}{" "}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
