import React, { Fragment } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TableStatus from "../../components/TableStatus";
import CustomDataTable from "../../components/CustomDataTable";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../server";
import { useSearchParams } from "react-router-dom";
import { renderCurrency } from "../../helpers/functions";
import SelectInput from "../../components/inputs/SelectInput";
import { Menu, Transition } from "@headlessui/react";
import FilterByDate from "../../components/FilterByDate";

export const transactionColumns = [
	{
		name: "Date",
		selector: (row) => row.created_at,
		compact: true,
		grow: 1.5,
	},
	{
		name: "Type",
		selector: (row) => row.type,
		style: { textTransform: "capitalize" },
		compact: true,
	},
	{
		name: "Currency",
		selector: (row) => row?.currency,
		compact: true,
	},
	{
		name: "Amount",
		selector: (row) => `${renderCurrency(row.amount, row.source_currency)}`,
		compact: true,
	},
	{
		name: "Transaction Ref",
		selector: (row) => row.transRef,
		compact: true,
		grow: 2,
	},
	{
		name: "Narration",
		selector: (row) => row.narration,
		compact: true,
		grow: 2,
	},
	{
		name: "Status",
		cell: (row) => (
			<div className="flex gap-4">
				<TableStatus status={row.status} />
			</div>
		),
		compact: true,
		width: "90px",
	},
];
const currencies = [{ label: "Currency", key: "" }].concat(
	["NGN", "USD", "GBP"].map((code) => ({
		label: code,
		key: code,
	}))
);

const Transactions = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") ?? 1;
	const per_page = searchParams.get("per_page") ?? 20;
	const start_date = searchParams.get("startDate");
	const end_date = searchParams.get("endDate");
	const selectedCurrency = searchParams.get("type") ?? "";

	const clear = () => setSearchParams({});

	const { 
		data: transactions
	} = useQuery({
		queryKey: ["transactions", page, per_page, start_date, end_date, selectedCurrency],
		queryFn: () => getTransactions({ page, limit: per_page, start_date, end_date, ...(!!selectedCurrency && { type: selectedCurrency }) }),
		suspense: true,
	});
	console.log(transactions);

	// if (!transactions?.data?.length) return null;

	return (
		<DashboardLayout title="Transactions">
			<div className="flex items-end gap-4 mb-4">
				<Menu as="div" className="relative inline-block text-left">
					<Menu.Button className="border border-[#a9abae] h-12 rounded-md px-4 bg-[rgba(224, 231, 255, 0.2)]">Date Filter</Menu.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute left-0 z-50 px-2 py-2 mt-2 bg-white rounded-md shadow-lg focus:outline-none">
							<FilterByDate />
						</Menu.Items>
					</Transition>
				</Menu>
				<SelectInput
					data={currencies}
					name="currencies"
					value={selectedCurrency}
					onChange={(event) => {
						searchParams.set("type", event.target.value);
						setSearchParams(searchParams);
					}}
					className="min-w-[110px] !bg-transparent"
				/>
				<button className="px-4 py-2 m-0 text-white rounded-md btn-form-primary h-12 bg-primary" onClick={clear}>
					Clear Filters
				</button>
			</div>
			<div className="overflow-x-scroll">
				<CustomDataTable data={transactions?.data?.transaction} columns={transactionColumns} />
			</div>
		</DashboardLayout>
	);
};

export default Transactions;