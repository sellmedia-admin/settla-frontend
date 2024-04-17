import React from "react";

const Selector = ({ icon, title, body, isActive, setActive }) => {
	return (
		<div
			className={`w-full flex flex-col space-y-4 border ${
				isActive ? "border-primary" : "border-gray-200"
			} rounded p-4 cursor-pointer`}
			onClick={setActive}
		>
			<div>{icon}</div>

			<h4>{title}</h4>

			<span className="text-gray-400">{body}</span>
		</div>
	);
};

export default Selector;
