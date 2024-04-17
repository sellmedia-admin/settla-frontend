import { createContext, useContext, useEffect, useState } from "react";
import { getFromStorage, setToStorage } from "../helpers/functions";

const AuthContext = createContext({
	user: {},
	setUser: () => {},
	team: {},
	setTeam: () => {},
	token: "",
	setToken: () => {},
	is_authenticated: false,
	setIs_authenticated: () => {},
	error: "",
	setError: () => {},
	loading: "",
	setLoading: () => {},
	logout: () => {},
});

const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(getFromStorage("auth")?.user ?? null);
	const [team, setTeam] = useState(getFromStorage("auth")?.team ?? null);
	const [token, setToken] = useState(getFromStorage("auth")?.token ?? null);
	const [is_authenticated, setIs_authenticated] = useState(getFromStorage("auth")?.is_authenticated ?? false);
	const [error, setError] = useState(getFromStorage("auth")?.error ?? null);
	const [loading, setLoading] = useState(getFromStorage("auth")?.loading ?? false);

	useEffect(() => {
		setToStorage("auth", { user, token, is_authenticated, error, loading, team });
	}, [user, token, is_authenticated, error, loading, team]);

	const logout = () => {
		setUser(null);
		setToken(null);
		setTeam(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				token,
				setToken,
				is_authenticated,
				setIs_authenticated,
				error,
				setError,
				loading,
				setLoading,
				logout,
				team,
				setTeam,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContextProvider, useAuthContext };
