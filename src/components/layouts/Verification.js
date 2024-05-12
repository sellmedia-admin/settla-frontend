import React from "react";
import { Link } from "react-router-dom";
import { imgs } from "../../helpers/constants";

const Verification = ({ children }) => {
	return <>
	<div className="lg:h-screen">
		<div className="py-3 px-4 bg-[#EBFFED] h-[64px] lg:mb-16 mb-4">
			<div className="max-w-default mx-auto flex justify-center items-center">
				<Link to="/"><img alt="logo" src={imgs.logo} /></Link>
			</div>
		</div>
		<div className="mx-auto max-w-xl lg:mt-10 md:mt-0 bg-white p-4">{children}</div>
		<footer className="text-center text-[#969696] p-4 lg:mt-10">Settla a product of BOSS Global</footer>
	</div>
	</>
};

export default Verification;
