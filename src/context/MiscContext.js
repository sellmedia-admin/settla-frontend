import createDataContext from "./createDataContext";

let INITIAL_STATE = {
	showSidebar: true,
};

const MiscReducer = (state, action) => {
	switch (action.type) {
		case "SET_SIDEBAR":
			return {
				...state,
				showSidebar: action.payload,
			};
		default:
			return state;
	}
};

const setSidebar = (dispatch) => async (value) => {
	try {
		dispatch({ type: "SET_SIDEBAR", payload: value });
	} catch (error) {
		dispatch({
			type: "REJECTED",
			payload: error.message,
		});
	}
};

const DataContext = createDataContext("MISC", MiscReducer, { setSidebar }, INITIAL_STATE);

export const { Provider: MiscProvider, Context: MiscContext } = DataContext;
