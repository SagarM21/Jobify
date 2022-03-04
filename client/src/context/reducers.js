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
	SET_EDIT_JOB,
	TOGGLE_SIDEBAR,
	UPDATE_USER_BEGIN,
	UPDATE_USER_ERROR,
	UPDATE_USER_SUCCESS,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
	switch (action.type) {
		case DISPLAY_ALERT:
			return {
				...state,
				showAlert: true,
				alertType: "danger",
				alertText: "Please provide all values!",
			};
		case CLEAR_ALERT:
			return { ...state, showAlert: false, alertType: "", alertText: "" };
		case REGISTER_USER_BEGIN:
			return { ...state, isLoading: true };
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				userLocation: action.payload.location,
				jobLocation: action.payload.location,
				isLoading: false,
				showAlert: true,
				alertType: "success",
				alertText: "User created! Redirecting...",
			};
		case REGISTER_USER_ERROR:
			return {
				...state,
				isLoading: false,
				showAlert: true,
				alertType: "danger",
				alertText: action.payload.msg,
			};
		case LOGIN_USER_BEGIN:
			return { ...state, isLoading: true };
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				userLocation: action.payload.location,
				jobLocation: action.payload.location,
				isLoading: false,
				showAlert: true,
				alertType: "success",
				alertText: "Login Successful! Redirecting...",
			};
		case LOGIN_USER_ERROR:
			return {
				...state,
				isLoading: false,
				showAlert: true,
				alertType: "danger",
				alertText: action.payload.msg,
			};
		case LOGOUT_USER:
			return {
				...initialState,
				user: null,
				token: null,
				userLocation: null,
				jobLocation: null,
			};
		case UPDATE_USER_BEGIN:
			return { ...state, isLoading: true };
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				token: action.payload.token,
				user: action.payload.user,
				userLocation: action.payload.location,
				jobLocation: action.payload.location,
				showAlert: true,
				alertType: "success",
				alertText: "User Profile Updated!",
			};
		case UPDATE_USER_ERROR:
			return {
				...state,
				isLoading: false,
				showAlert: true,
				alertType: "danger",
				alertText: action.payload.msg,
			};
		case HANDLE_CHANGE:
			return { ...state, [action.payload.name]: action.payload.value };

		case CREATE_JOB_BEGIN:
			return { ...state, isLoading: true };

		case CREATE_JOB_SUCCESS:
			return {
				...state,
				isLoading: false,
				showAlert: true,
				alertType: "success",
				alertText: "New Job Created!",
			};

		case CREATE_JOB_ERROR:
			return {
				...state,
				isLoading: false,
				showAlert: true,
				alertType: "danger",
				alertText: action.payload.msg,
			};

		case GET_JOB_BEGIN:
			return { ...state, isLoading: true, showAlert: false };

		case GET_JOB_SUCCESS:
			return {
				...state,
				isLoading: false,
				jobs: action.payload.jobs,
				totalJobs: action.payload.totalJobs,
				numOfPages: action.payload.numOfPages,
			};

		case SET_EDIT_JOB:
			const job = state.jobs.find((job) => job._id === action.payload.id);
			const { _id, position, company, jobLocation, jobType, status } = job;
			return {
				...state,
				isEditing: true,
				editJobId: _id,
				position,
				company,
				jobLocation,
				jobType,
				status,
			};

		case TOGGLE_SIDEBAR:
			return { ...state, showSidebar: !state.showSidebar };
		case CLEAR_VALUES:
			const initState = {
				isEditing: false,
				editJobId: "",
				position: "",
				company: "",
				jobLocation: state.userLocation,
				jobType: "full-time",
				status: "pending",
			};

			return {
				...state,
				...initState,
			};
		default:
			return state;
	}
};

export default reducer;
