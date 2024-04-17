import React from "react";

const MaterialInput = ({ label, type = "text", placeholder, container, name, value, onChange, ...rest }) => {
	return (
		<div className={`${container}`}>
			<p className="my-2 text-xs tracking-wider font-small text-grey-lightGray">{label}</p>
			<input
				placeholder={placeholder ? placeholder : `Enter ${label}`}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className={`w-full h-8 border-b border-gray-400 transition duration-500 ease-in
          text-xs outline-none focus:border-primary
          ${type === "password" ? "tracking-widest" : "tracking-wide"}`}
				{...rest}
			/>
		</div>
	);
};

export default MaterialInput;
