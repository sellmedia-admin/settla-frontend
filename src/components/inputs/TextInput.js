import React, { useState } from "react";
import ButtonPlain from "../buttons/PlainBtn";
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const TextInput = ({
	label,
	type = "text",
	placeholder,
	withIcon = false,
	icon,
	withLink = false,
	onChange,
	value,
	name,
	inputID,
	disabled,
	...rest
}) => {
	const navigate = useNavigate();
	let inputType = type;

	const [showXters, setShowXters] = useState(false);
	return (
		<div className="w-full">
			<div className={`flex justify-between`}>
				<p className="my-2 text-xs font-medium tracking-wider capitalize text-black">{label}</p>
				{withLink && <ButtonPlain label={withLink} style={{ color: "#B4BAC3" }} onClick={() => navigate("/forgot-password")} />}
			</div>
			<div className="relative flex items-center">
				{withIcon && (
					<div className="absolute w-6 h-6 inset-2 left-3 flex items-center mt-1">
						<img alt="" src={icon} className="rounded-full" />
					</div>
				)}
				<input
					placeholder={placeholder ? placeholder : `${label}`}
					className={`w-full h-12 border border-bg-blue-100 rounded-8 text-sm 
            ${inputType === "password" ? "tracking-widest" : "tracking-wide"}
            ${withIcon ? "pl-10" : ""}
            px-4 outline-none focus:ring-1 focus:ring-primary border-[#a9abae]`}
					type={inputType === "password" ? (showXters ? "text" : "password") : inputType}
					onChange={onChange}
					value={value}
					name={name}
					id={inputID}
					disabled={disabled}
					// style={{ backgroundColor: "rgba(224, 231, 255, 0.2)" }}
					{...rest}
				/>
				{inputType === "password" && (
					<span className="absolute right-3 top-4" onClick={() => setShowXters(!showXters)}>
						{showXters ? <RiEyeFill size={16} color="#B4BAC3" /> : <RiEyeOffFill size={16} color="#B4BAC3" />}
					</span>
				)}
			</div>
		</div>
	);
};

export default TextInput;
