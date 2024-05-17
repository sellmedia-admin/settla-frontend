import React from "react";
import { imgs } from "../helpers/constants";

const Loader = ({ full }) => {
	return (
		<div className={`flex items-center justify-center w-full animate-pulse ${full && "min-h-screen"}`}>
			<img alt="" src={imgs.logo} className="w-[150px] aspect-square" />
		</div>
	);
};

export default Loader;
