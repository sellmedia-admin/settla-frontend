import React from "react";
import { CgSpinner } from "react-icons/cg";

const MiniBtn = ({ loading, placeholder, children, disabled, onClick, width, ...rest }) => {
	return (
		<button
			onClick={() => {
				if (!disabled) onClick();
			}}
			className={`rounded h-9 ${!!width ? width : "w-64"} flex items-center justify-center ${
				disabled ? "bg-gray-400" : "bg-primary shadow-primaryBtnShadow "
			}  text-white text-lg `}
			{...rest}
		>
			{loading && <CgSpinner className="w-5 h-5 mr-2 animate-spin" />}
			{placeholder || children}
		</button>
	);
};

export default MiniBtn;
