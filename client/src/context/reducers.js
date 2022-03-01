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
		case TOGGLE_SIDEBAR:
			return { ...state, showSidebar: !state.showSidebar };
		default:
			return state;
	}
};

export default reducer;
