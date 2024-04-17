import React from "react";

const SecondaryBtn = ({ placeholder, children, onClick, disabled, color, style, type }) => {
	return (
		<button
			onClick={() => {
				if (!disabled) onClick();
			}}
			className={`h-10 px-3 border rounded-md font-medium ${color ? color : "text-grey-graySuit"}`}
			style={style}
			type={type}
		>
			{placeholder || children}
		</button>
	);
};

export default SecondaryBtn;
