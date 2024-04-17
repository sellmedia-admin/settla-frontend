import React, { useContext, Fragment, useState } from "react";
import Avatar from "boring-avatars";
import { FaChevronDown } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { FcMenu } from "react-icons/fc";
import { MiscContext } from "../context/MiscContext";

import settings from "../assets/svg/settings.svg";
import information from "../assets/svg/information.svg";
import signout from "../assets/svg/signout.svg";
import notifications from "../assets/svg/notifications.svg";
import profileInactive from "../assets/svg/profile-inactive.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../server";
import moment from "moment";
import NotificationsMdal from "./NotificationsMdal";

const Navbar = () => {
	const {
		state: { showSidebar },
		setSidebar,
	} = useContext(MiscContext);
	const { logout, user } = useAuthContext();
	const navigate = useNavigate();

	const handleSidebar = () => {
		setSidebar(!showSidebar);
	};

	const { data } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => getNotifications({ limit: 5, page: 1 }),
	});

	const notificationsArray = data?.data?.data;

	return (
		<div className="flex justify-between px-4 pt-8 bg-white lg:justify-end lg:px-12">
			<div>
				<div className="lg:hidden" onClick={handleSidebar}>
					<FcMenu className="block w-6 h-6 dark:text-gray-300 hover:text-primary" aria-hidden="true" />
				</div>
			</div>
			<div className="flex items-center space-x-6">
				<Menu as="div" className="relative inline-block text-left">
					<Menu.Button>
						<img alt="" src={notifications} width={22} />
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
					<div className="hidden cursor-pointer sm:inline-block">
						<Avatar size={32} name="Amelia Earhart" variant="beam" colors={["#00BCB0", "#5630FF"]} />
					</div>
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
									<Link
										to="mailto:support@mondu.io"
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
