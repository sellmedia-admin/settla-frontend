import React from "react";

const SelectInput = ({ label, placeholder, data, onChange, name, value, className, ...rest }) => {
	return (
		<div>
			<p className="my-2 text-xs font-medium tracking-wider uppercase text-grey-lightGray">{label}</p>
			<select
				placeholder={placeholder ? placeholder : `Enter ${label}`}
				className={`appearance-none w-full h-12 border rounded-8 text-sm px-4 outline-none focus:ring-1 focus:ring-primary bg-chevronDown bg-right-95 bg-no-repeat border-[#a9abae] ${className}`}
				style={{ backgroundColor: "rgba(224, 231, 255, 0.2)" }}
				onChange={onChange}
				name={name}
				value={value}
				{...rest}
			>
				{data?.map((item, id) => (
					<option key={id} value={item.key}>
						{item.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
