import { useAuthContext } from "../context/AuthContext";

const Logout = () => {
	const { logout } = useAuthContext();

	return logout();
};

export default Logout;
