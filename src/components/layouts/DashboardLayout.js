import React, { useContext, useEffect } from "react";
import { MiscContext } from "../../context/MiscContext";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import InnerSidebar from "../Innersidebar";

const DashboardLayout = ({ title, children, sidebar }) => {
	const {
		state: { showSidebar },
		setSidebar,
	} = useContext(MiscContext);

	useEffect(() => {
		hidePanel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const hidePanel = () => {
		if (window.screen.width < 1024) {
			setSidebar(false);
		} else setSidebar(true);
	};

	return (
		<div className="font-outfit bg-bgLeft bg-contain bg-left bg-no-repeat">
			<div className="bg-bgRight bg-contain bg-right bg-no-repeat">
			{showSidebar && (sidebar === "inner" ? <InnerSidebar /> : <Sidebar />)}
			<Navbar />
			<main className="lg:mx-[90px] lg:px-4 px-4 bg-white">
				<h1 className="text-[18px] md:text-[24px]">{title}</h1>
				<div className="py-3" onClick={hidePanel}>
					{children}
				</div>
			</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
