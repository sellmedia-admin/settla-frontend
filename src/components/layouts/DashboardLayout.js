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
		<>
			{showSidebar && (sidebar === "inner" ? <InnerSidebar /> : <Sidebar />)}
			<Navbar />
			<main className="lg:ml-[200px] lg:px-4 px-4 bg-white">
				{title}
				<div className="py-8" onClick={hidePanel}>
					{children}
				</div>
			</main>
		</>
	);
};

export default DashboardLayout;
