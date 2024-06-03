import React from "react";

const MaterialInput = ({ label, type = "text", placeholder, container, name, value, onChange, ...rest }) => {
	return (
		<div className={`${container} w-full`}>
			<p className="my-1 text-[14px] tracking-wider font-small text-black">{label}</p>
			<input
				placeholder={placeholder ? placeholder : `Enter ${label}`}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className={`w-full h-12 px-3 border border-[#DEDEDE] rounded-[5px] transition duration-500 ease-in
          		text-xs outline-none focus:border-primary
          		${type === "password" ? "tracking-widest" : "tracking-wide"}`}
				{...rest}
			/>
		</div>
	);
};

export default MaterialInput;
