import React from "react";
import { CgSpinner } from "react-icons/cg";

const PrimaryBtn = ({ type, placeholder, children, disabled, onClick, width, style, loading, className }) => {
	return (
		<button
			type={type}
			onClick={() => {
				if (!disabled && onClick && !loading) onClick();
			}}
			className={`rounded-8 h-[50px] flex items-center justify-center 
			${disabled ? "bg-gray-400" : "bg-primaryBtn"}
			${width ? width : "w-full"}
			${className}
			text-black`}
			style={style}
		>
			{loading && <CgSpinner className="w-5 h-5 mr-2 animate-spin" />}
			{placeholder || children}
		</button>
	);
};

export default PrimaryBtn;
