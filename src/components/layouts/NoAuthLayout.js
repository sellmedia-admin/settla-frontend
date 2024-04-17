import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const NoAuthLayout = () => {
	const { token, user } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			if (!user?.docs_kyc?.upload_link) {
				navigate(`/verification/upload`);
			} else if (!(user?.paymentAccountDetails?.length >= 1)) {
				navigate(`/verification/info`);
			} else {
				navigate("/dashboard");
			}
		}
	}, [navigate, token, user]);

	return <Outlet />;
};

export default NoAuthLayout;
