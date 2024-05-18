import { useEffect, useState } from "react";
import { FcExport } from "react-icons/fc";

import dashboard_active from "../assets/svg/dashboard-active.svg";
import dashboard_inactive from "../assets/svg/dashboard-inactive.svg";
import teams_active from "../assets/svg/teams-active.svg";
import teams_inactive from "../assets/svg/teams-inactive.svg";
import transactions_active from "../assets/svg/transactions-active.svg";
import transactions_inactive from "../assets/svg/transactions-inactive.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { imgs } from "../helpers/constants";

const Sidebar = () => {
	const { logout } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();

	const [isDashboard, setIsDashboard] = useState("");
	const [isTransaction, setIsTransaction] = useState("");
	const [isBeneficiary, setIsBeneficiary] = useState("");

	useEffect(() => {
		setIsDashboard(location.pathname === "/dashboard" || location.pathname === "/dashboard/");
		setIsTransaction(location.pathname.includes("/transactions") ? true : false);
		setIsBeneficiary(location.pathname.includes("/beneficiaries") ? true : false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<aside className="fixed z-[5] flex flex-col items-center w-[200px] h-screen bg-white border border-gray-100 py-14">
			<div className="cursor-pointer" onClick={() => navigate("/dashboard/")}>
				<img src={imgs.logo} alt='logo' />
			</div>
			<div className="mt-16 space-y-8">
				<div onClick={() => navigate("/dashboard/")} className="flex items-center space-x-4 cursor-pointer">
					<img alt="" src={isDashboard ? dashboard_active : dashboard_inactive} size={20} />
					<span className={`${isDashboard ? "text-primary" : "text-gray-500"}`}>Dashboard</span>
				</div>
				<div onClick={() => navigate("/dashboard/transactions")} className="flex items-center space-x-4 cursor-pointer">
					<img alt="" src={isTransaction ? transactions_active : transactions_inactive} size={20} />
					<span className={`${isTransaction ? "text-primary" : "text-gray-500"}`}>Transactions</span>
				</div>
				<div onClick={() => navigate("/dashboard/beneficiaries")} className="flex items-center space-x-4 cursor-pointer">
					<img alt="" src={isBeneficiary ? teams_active : teams_inactive} size={20} />
					<span className={`${isBeneficiary ? "text-primary" : "text-gray-500"}`}>Beneficiaries</span>
				</div>
			</div>
			<div onClick={logout} className="flex items-center mt-auto space-x-4 cursor-pointer">
				<FcExport size={20} className="text-red-500" />
				<span className={`text-gray-500`}>Sign out</span>
			</div>
		</aside>
	);
};

export default Sidebar;
