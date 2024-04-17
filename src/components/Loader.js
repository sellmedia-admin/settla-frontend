import React from "react";
import logo from "../assets/png/logo.png";

const Loader = ({ full }) => {
	return (
		<div className={`flex items-center justify-center w-full animate-pulse ${full && "min-h-screen"}`}>
			<img alt="" src={logo} className="w-[150px] aspect-square" />
		</div>
	);
};

export default Loader;
