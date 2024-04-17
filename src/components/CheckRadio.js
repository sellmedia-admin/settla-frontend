import React from "react";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";

const CheckRadio = ({ onChange, isActive, label }) => {
	return (
		<div className={`flex top-0 space-x-2 cursor-pointer`} onClick={onChange}>
			{isActive ? <RiCheckboxCircleFill size="24px" /> : <RiCheckboxBlankCircleLine size="24px" />}
			<p className={`${!isActive && "text-grey-lightGray"}  text-base`}>{label}</p>
		</div>
	);
};

export default CheckRadio;
