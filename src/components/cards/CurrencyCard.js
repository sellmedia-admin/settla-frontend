import React from "react";
import numeral from "numeral";
import { flags, imgs } from "../../helpers/constants";
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
			className={`p-3 bg-[#EEEEEE] h-[113px] ${selected ? "border-primary border-2" : "border border-[#EEEEEE]"} rounded-[10px]  ${onClick && "cursor-pointer"}`}
			onClick={condition ? null : onClick}
		>
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-2">
					<span>{flags[currency?.toUpperCase()]?.label}</span>
				</div>
				<div className="rounded-full object-cover h-[30px] w-[30px]">{flags[currency?.toUpperCase()]?.icon}</div>
			</div>
			<div className="flex items-end justify-between">
				<div className="flex items-end">
					<h3 className="leading-none xl:text-2xl">
						{flags[currency?.toUpperCase()]?.symbol}
						{numeral(wallet_value).format("0,0.00")}
					</h3>
					<div className="px-2 text-sm text-gray-800">
						{condition ? "Coming Soon" : <>{currency?.toUpperCase()}</>}
					</div>
				</div>
				<button
					className="flex items-center gap-1 px-1 py-1 rounded-lg cursor-pointer bg-white"
					onClick={refetchWalletBalance}
					title="Refetch Balance"
				>
					<img src={imgs.reload} alt="reload" />
				</button>
			</div>
		</div>
	);
};

export default CurrencyCard;