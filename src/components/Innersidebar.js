import { useState, useEffect } from "react";
import { FcExport } from "react-icons/fc";

import backtwotone from "../assets/svg/backtwotone.svg";
import accountActive from "../assets/svg/account-active.svg";
import accountInactive from "../assets/svg/account-inactive.svg";
import profileActive from "../assets/svg/profile-active.svg";
import profileInactive from "../assets/svg/profile-inactive.svg";
import teamsActive from "../assets/svg/teams-active.svg";
import teamsInactive from "../assets/svg/teams-inactive.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { imgs } from "../helpers/constants";

const InnerSidebar = () => {
	const { logout } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();

	const [active, setActive] = useState("profile");

	useEffect(() => {
		location.pathname.includes("/profile") && setActive("profile");
		location.pathname.includes("/account") && setActive("account");
		location.pathname.includes("/teams") && setActive("teams");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<aside className="fixed z-[5] flex flex-col w-[200px] h-screen bg-white border border-gray-100 py-14">
			<div className="cursor-pointer text-center pl-4" onClick={() => navigate("/dashboard/")}>
				<img src={imgs.logo} alt='logo' className="logo" />
			</div>
			<div className="mt-16 space-y-8">
				<div className="flex items-start">
					<div
						onClick={() => navigate("/dashboard")}
						className={`bg-primary flex space-x-2 items-center cursor-pointer p-1.5 rounded-md ml-10`}
					>
						<img alt="" src={backtwotone} />
						<span className="text-white ">Back</span>
					</div>
				</div>
				<h4 className={`text-grey-dark text-lg font-medium ml-10`}>Settings</h4>

				<div className="relative flex items-center" onClick={() => navigate("/dashboard/profile")}>
					<div className={`flex space-x-4 items-center cursor-pointer ml-10`}>
						<img alt="" src={active === "profile" ? profileActive : profileInactive} />
						<span className={active === "profile" ? "text-primary" : "text-gray-500"}>Profile</span>
					</div>
					{active === "profile" && <span className="w-1.5 absolute -left-0 h-10 bg-primary rounded" />}
				</div>

				<div className="relative flex items-center" onClick={() => navigate("/dashboard/account")}>
					<div className={`flex space-x-4 items-center cursor-pointer ml-10`}>
						<img alt="" src={active === "account" ? accountActive : accountInactive} />
						<span className={active === "account" ? "text-primary" : "text-gray-500"}>Account</span>
					</div>
					{active === "account" && <span className="w-1.5 absolute -left-0 h-10 bg-primary rounded" />}
				</div>

				<div className="relative flex items-center" onClick={() => navigate("/dashboard/teams")}>
					<div className={`flex space-x-4 items-center cursor-pointer ml-10`}>
						<img alt="" src={active === "teams" ? teamsActive : teamsInactive} />
						<span className={active === "teams" ? "text-primary" : "text-gray-500"}>Teams</span>
					</div>
					{active === "teams" && <span className="w-1.5 absolute -left-0 h-10 bg-primary rounded" />}
				</div>

				<div className="relative flex items-center" onClick={logout}>
					<div className={`flex space-x-4 items-center cursor-pointer ml-10`}>
						<FcExport size={20} className="text-red-500" />
						<span className="text-gray-500">Sign out</span>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default InnerSidebar;
