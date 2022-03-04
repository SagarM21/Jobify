import React, { useContext, useEffect, useReducer } from "react";
import {
	CLEAR_ALERT,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_ERROR,
	CREATE_JOB_SUCCESS,
	DISPLAY_ALERT,
	GET_JOB_BEGIN,
	GET_JOB_SUCCESS,
	HANDLE_CHANGE,
	LOGIN_USER_BEGIN,
	LOGIN_USER_ERROR,
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	REGISTER_USER_BEGIN,
	REGISTER_USER_ERROR,
	REGISTER_USER_SUCCESS,
	TOGGLE_SIDEBAR,
	UPDATE_USER_BEGIN,
	UPDATE_USER_ERROR,
	UPDATE_USER_SUCCESS,
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
	isEditing: false,
	editJobId: "",
	position: "",
	company: "",
	//jobLocation
	jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
	jobType: "full-time",
	statusOptions: ["pending", "interview", "declined"],
	status: "pending",
	jobs: [],
	totalJobs: 0,
	page: 1,
	numOfPages: 1,
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
			config.headers.common["Authorization"] = `Bearer ${state.token}`;
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
			//console.log(error.response);
			if (error.response.status === 401) {
				logoutUser();
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
		dispatch({ type: UPDATE_USER_BEGIN });
		try {
			const { data } = await authFetch.patch("/auth/updateUser", currentUser);
			const { user, location, token } = data;
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, location, token },
			});
			addUserToLocalStorage({ user, location, token });
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				});
			}
		}
		clearAlert();
	};

	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN });
		try {
			const { position, company, jobLocation, jobType, status } = state;
			await authFetch.post("/jobs", {
				company,
				position,
				jobLocation,
				jobType,
				status,
			});
			dispatch({ type: CREATE_JOB_SUCCESS });
			dispatch({ type: CLEAR_VALUES });
		} catch (error) {
			if (error.response.status === 401) return;
			dispatch({
				type: CREATE_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const getJobs = async () => {
		let url = "/jobs";
		dispatch({ type: GET_JOB_BEGIN });
		try {
			const { data } = await authFetch(url);
			const { jobs, totalJobs, numOfPages } = data;
			dispatch({
				type: GET_JOB_SUCCESS,
				payload: { jobs, totalJobs, numOfPages },
			});
		} catch (error) {
			console.log(error.response);
			logoutUser();
		}
		clearAlert();
	};

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};

	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES });
	};

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};

	const setEditJob = (id) => {
		console.log(`set edit job: ${id}`);
	};

	const deleteJob = (id) => {
		console.log(`delete : ${id}`);
	};

	useEffect(() => {
		getJobs();
	}, []);

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				registerUser,
				loginUser,
				updateUser,
				toggleSidebar,
				handleChange,
				clearValues,
				logoutUser,
				getJobs,
				createJob,
				setEditJob,
				deleteJob
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
