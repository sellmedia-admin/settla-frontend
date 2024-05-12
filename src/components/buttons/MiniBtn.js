import React from "react";
import { CgSpinner } from "react-icons/cg";

const MiniBtn = ({ loading, placeholder, children, disabled, onClick, width, ...rest }) => {
	return (
		<button
			onClick={() => {
				if (!disabled) onClick();
			}}
			className={`rounded-8 h-[50px] ${!!width ? width : "w-full"} flex items-center justify-center ${
				disabled ? "bg-gray-400" : "bg-primaryBtn"
			}  text-black`}
			{...rest}
		>
			{loading && <CgSpinner className="w-5 h-5 mr-2 animate-spin" />}
			{placeholder || children}
		</button>
	);
};

export default MiniBtn;
