import { useAuthContext } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { MiscProvider } from "../../context/MiscContext";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../server";

const AuthLayout = () => {
	const { token, setUser } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) navigate("/login");
	}, [navigate, token]);

	useQuery({
		queryKey: ["user"],
		queryFn: getUser,
		suspense: true,
		onSuccess: ({ data }) => {
			const user = data?.at(0);
			setUser(user);
			if (!user?.docs_kyc?.upload_link) {
				return navigate(`/verification/upload`);
			}
			if (!(user?.paymentAccountDetails?.length >= 1)) {
				return navigate(`/verification/info`);
			}
		},
	});

	return (
		<MiscProvider>
			<Outlet />
		</MiscProvider>
	);
};

export default AuthLayout;
