import React, { useContext, Fragment, useState, useEffect } from "react";
// import Avatar from "boring-avatars";
import { FaChevronDown } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { FcMenu } from "react-icons/fc";
import { MiscContext } from "../context/MiscContext";

import settings from "../assets/svg/settings.svg";
import information from "../assets/svg/information.svg";
import signout from "../assets/svg/signout.svg";
import profileInactive from "../assets/svg/profile-inactive.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../server";
import moment from "moment";
import NotificationsMdal from "./NotificationsMdal";
import dashboard_active from "../assets/svg/dashboard-active.svg";
import dashboard_inactive from "../assets/svg/dashboard-inactive.svg";
import teams_active from "../assets/svg/teams-active.svg";
import teams_inactive from "../assets/svg/teams-inactive.svg";
import transactions_active from "../assets/svg/transactions-active.svg";
import transactions_inactive from "../assets/svg/transactions-inactive.svg";
import { imgs } from "../helpers/constants";

const Navbar = () => {
	const {
		state: { showSidebar },
		setSidebar,
	} = useContext(MiscContext);
	const { logout, user } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();

	const handleSidebar = () => {
		setSidebar(!showSidebar);
	};

	const { data } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => getNotifications({ limit: 5, page: 1 }),
	});

	const notificationsArray = data?.data?.data;

	// navigation 
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
		<div className="flex justify-between items-center font-outfit px-4 py-4 bg-[#EBFFED] lg:justify-between lg:px-12">
			<div className="lg:hidden" onClick={handleSidebar}>
				<FcMenu className="block w-6 h-6 dark:text-gray-300 hover:text-primary" aria-hidden="true" />
			</div>
			<div className="cursor-pointer" onClick={() => navigate("/dashboard/")}>
				<img src={imgs.logo} alt='logo' className="logo" />
			</div>
			<div className="hidden md:block lg:block">
				<div className="flex items-center space-x-4">
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
			</div>
			<div className="flex items-center space-x-6">
				<Menu as="div" className="relative inline-block text-left">
					<Menu.Button>
						<img alt="bell" src={imgs.notification} width={22} className="mt-2" />
					</Menu.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 z-50 py-2 mt-2 bg-white rounded-md shadow-lg w-72 focus:outline-none">
							{!!notificationsArray?.length ? (
								notificationsArray?.map((notification, index) => <Notification notification={notification} key={index} />)
							) : (
								<Menu.Item>
									<span className="flex items-center gap-2 p-3 text-sm hover:bg-gray-100">
										<span className="text-sm text-gray-800">No notifications yet</span>
									</span>
								</Menu.Item>
							)}
						</Menu.Items>
					</Transition>
				</Menu>
				<div className="flex items-center space-x-2">
					{/* <div className="hidden cursor-pointer sm:inline-block">
						<Avatar size={32} name="Amelia Earhart" variant="beam" colors={["#00BCB0", "#5630FF"]} />
					</div> */}
					<Menu as="div" className="relative inline-block text-left">
						<Menu.Button>
							<div className="flex items-center space-x-1 cursor-pointer">
								<p className="text-lg">{user?.profile?.firstName ? `${user?.profile?.firstName}` : ""}</p>
								<FaChevronDown size={14} />
							</div>
						</Menu.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white rounded-md shadow-lg focus:outline-none">
								<Menu.Item>
									<span
										onClick={() => navigate("/dashboard/profile")}
										className="flex items-center gap-3 px-3 py-4 text-sm cursor-pointer hover:bg-gray-100"
									>
										<img alt="" src={profileInactive} />
										<span className="text-sm font-medium text-gray-500">Profile settings</span>
									</span>
								</Menu.Item>
								<Menu.Item>
									<span
										onClick={() => navigate("/dashboard/account")}
										className="flex items-center gap-3 px-3 py-4 text-sm cursor-pointer hover:bg-gray-100"
									>
										<img alt="" src={settings} className="w-6 h-6" />
										<span className="text-sm font-medium text-gray-500">Account settings</span>
									</span>
								</Menu.Item>
								<Menu.Item>
									<span
										onClick={() => navigate("/dashboard/teams")}
										className="flex items-center gap-3 px-3 py-4 text-sm cursor-pointer hover:bg-gray-100"
									>
										<img alt="" src={settings} className="w-6 h-6" />
										<span className="text-sm font-medium text-gray-500">Teams settings</span>
									</span>
								</Menu.Item>
								<Menu.Item>
									<Link
										to="mailto:support@usesettla.com"
										className="flex items-center gap-3 px-3 py-4 text-sm cursor-pointer hover:bg-gray-100"
									>
										<img alt="" src={information} className="w-6 h-6" />
										<span className="text-sm font-medium text-gray-500">Help center</span>
									</Link>
								</Menu.Item>
								<Menu.Item>
									<span onClick={logout} className="flex items-center gap-3 px-3 py-4 text-sm cursor-pointer hover:bg-gray-100">
										<img alt="" src={signout} className="w-6 h-6" />
										<span className="text-sm font-medium text-gray-500">Sign out</span>
									</span>
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
		</div>
	);
};

const Notification = ({ notification }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Menu.Item>
				<span onClick={() => setIsOpen(true)} className="flex items-center justify-between gap-2 p-3 text-sm hover:bg-gray-100">
					<span className="text-sm text-gray-800">{notification.header}</span>
					<span className="text-sm text-gray-400">{moment(notification.created_at).fromNow()}</span>
				</span>
			</Menu.Item>
			<NotificationsMdal status={isOpen} closeModal={() => setIsOpen(false)} header={notification.header} body={notification.content} />
		</>
	);
};

export default Navbar;
