import React from "react";
import numeral from "numeral";
import { flags } from "../../helpers/constants";
import { ReloadIcon } from "../../assets/svg";
import { useQueryClient } from "@tanstack/react-query";

const CurrencyCard = ({ currency, amount, onClick = null, selected }) => {
	const queryClient = useQueryClient();

	const condition = currency === "GBP" || currency === "Pound";
	const wallet_value = amount;

	const refetchWalletBalance = async () =>
		await queryClient.refetchQueries({
			queryKey: ["wallet", currency],
			type: "active",
			exact: true,
		});

	return (
		<div
			className={`p-2 ${selected ? "border-primary border-2" : "border border-[#a9abae]"} rounded-lg  ${onClick && "cursor-pointer"}`}
			onClick={condition ? null : onClick}
		>
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center space-x-2">
					{flags[currency?.toUpperCase()]?.icon}
					<span>{flags[currency?.toUpperCase()]?.label}</span>
				</div>
				<div className="p-1 px-2 text-sm text-gray-800 bg-green-50 rounded-xl">
					{condition ? "Coming Soon" : <>{currency?.toUpperCase()}</>}
				</div>
			</div>
			<div className="flex items-end justify-between">
				<h3 className="leading-none xl:text-2xl">
					{flags[currency?.toUpperCase()]?.symbol}
					{numeral(wallet_value).format("0,0.00")}
				</h3>
				<button
					className="flex items-center gap-1 px-2 py-2 text-white rounded-lg cursor-pointer bg-primary"
					onClick={refetchWalletBalance}
					title="Refetch Balance"
				>
					<ReloadIcon className="w-[0.85rem] h-[0.85rem] stroke-1" />
				</button>
			</div>
		</div>
	);
};

export default CurrencyCard;
