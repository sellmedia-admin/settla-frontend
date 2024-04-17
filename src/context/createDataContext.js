import React, { useEffect, useReducer } from "react";
import { getFromStorage, setToStorage } from "../helpers/functions";

const createDataContext = (name, reducer, actions, defaultValue) => {
	const Context = React.createContext();
	const excludes = ["MISC"];

	let STORED_VALUE = null;
	if (!excludes.includes(name)) STORED_VALUE = getFromStorage(name);

	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, STORED_VALUE || defaultValue);

		const boundActions = {};
		for (let key in actions) {
			boundActions[key] = actions[key](dispatch);
		}

		useEffect(() => {
			if (!excludes.includes(name)) setToStorage(name, state);
		}, [state]);

		return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
	};

	return { Context, Provider };
};

export default createDataContext;
