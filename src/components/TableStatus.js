import React from "react";

export default function TableStatus({ status }) {
	let color = "text-gray-500";
	let background = "bg-gray-600";
	switch (status.toString().toLowerCase()) {
		case "success":
			color = "text-green-600";
			background = "bg-green-500";
			break;
		case "pending":
			color = "text-yellow-400";
			background = "bg-yellow-300";
			break;
		case "failed":
			color = "text-red-600";
			background = "bg-red-500";
			break;
		default:
			color = "text-gray-600";
			background = "bg-gray-500";
	}
	return (
		<div className={`flex items-center space-x-2 justify-start text-gray-500`}>
			<span className={`w-2 h-2 rounded-full ${background}`} />
			<span className={`text-sm capitalize ${color}`}>{status}</span>
		</div>
	);
}
