import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { TbWallet } from "react-icons/tb";
import Beneficiary from "../../components/Beneficiary";
import CurrencyCard from "../../components/cards/CurrencyCard";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import SendMoney from "../../components/transactions/sendmoney";
import FundAccount from "../../components/transactions/fundaccount";
import FundWallet from "../../components/transactions/fundwallet";
import AddBeneficiary from "../../components/transactions/beneficiary/AddBeneficiary";
import TransactionDetails from "../../components/transactions/TransactionDetails";
import Beneficiaries from "./Beneficiaries";
import Teams from "./Teams";

import add from "../../assets/svg/add.svg";
import Account from "./Account";
import Profile from "./Profile";
import Transactions, { transactionColumns } from "./Transactions";
import { useAuthContext } from "../../context/AuthContext";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getBeneficiaries, getTransactions, getWalletBalance } from "../../server";
import { useNavigate } from "react-router-dom";
import CustomDataTable from "../../components/CustomDataTable";

const Dashboard = ({ query }) => {
	const { user: loggedInUser, team } = useAuthContext();
	const navigate = useNavigate();

	const [sendMoneyStatus, setSendStatus] = useState(false);
	const [fundAccountStatus, setFundStatus] = useState(false);
	const [fundWalletStatus, setFundWalletStatus] = useState(false);
	const [addBeneficiaryStatus, setAddBeneficiary] = useState(false);
	const [transactionDetailsStatus, setTransactionDetails] = useState(false);

	const toggleSendMoney = () => setSendStatus(!sendMoneyStatus);
	const toggleFundAccount = () => setFundStatus(!fundAccountStatus);
	const toggleFundWallet = () => setFundWalletStatus(!fundWalletStatus);
	const addBeneficiary = () => setAddBeneficiary(!addBeneficiaryStatus);
	const toggleTransactionDetails = () => setTransactionDetails(!transactionDetailsStatus);

	const userWallets = useQueries({
		queries: ["NGN", "USD", "GBP"].map((currency) => {
			return {
				queryKey: ["wallet", currency],
				queryFn: () => getWalletBalance({ type: currency }),
			};
		}),
	});

	const { data: beneficiaries, refetch: refetchBeneficiaries } = useQuery({
		queryKey: ["beneficiaries"],
		queryFn: () => getBeneficiaries(),
		suspense: true,
		enabled: team?.role !== "team",
		refetchOnWindowFocus: false,
	});

	const nairaWallet = userWallets?.at(0)?.data?.data?.at(0);
	const dollarWallet = userWallets?.at(1)?.data?.data?.at(0);
	const poundWallet = userWallets?.at(2)?.data?.data?.at(0);
	const arrangedWallet = [nairaWallet, dollarWallet, poundWallet];

	return (
		<>
			<DashboardLayout title="Dashboard">
				<h3 className="text-gray-800">Hi {loggedInUser?.profile?.firstName}!</h3>
				<div className="grid gap-4 my-8 sm:grid-cols-2 lg:grid-cols-3">
					{arrangedWallet?.map((currency, index) => (
						<CurrencyCard currency={currency?.currency} amount={currency?.wallet_value} key={index} />
					))}
				</div>
				<div className="mt-12 xl:grid xl:grid-cols-3">
					<div className="my-8">
						<div className="mb-8">
							<h1 className="text-xs uppercase">actions</h1>
						</div>
						<div className="flex flex-wrap gap-4 flex-column item-center">
							<button
								onClick={toggleFundAccount}
								className="flex items-center gap-1 px-2 py-4 border rounded-lg cursor-pointer bg-primary border-primary"
							>
								<img alt="cover" src={add} size={24} />
								<span className="text-white text-[0.9rem]">Fund Account</span>
							</button>
							<button
								onClick={toggleSendMoney}
								className="flex items-center gap-1 px-2 py-4 bg-white border rounded-lg cursor-pointer border-primary"
							>
								<RiSendPlaneFill className="text-primary" size={20} />
								<span className="text-[0.9rem]">Send Money</span>
							</button>
							<button
								onClick={toggleFundWallet}
								className="flex items-center gap-1 px-2 py-4 bg-white border rounded-lg cursor-pointer border-primary"
							>
								<TbWallet className="text-primary" size={20} />
								<span className="text-[0.9rem]">Fund Wallet</span>
							</button>
						</div>
					</div>
					{/*  */}
					<div className="col-span-2 my-8">
						<div className="flex justify-between mb-8">
							<h1 className="text-xs uppercase">Beneficiaries</h1>
							<button className="text-xs text-secondary" onClick={() => navigate(`/dashboard/beneficiaries`)}>
								View All
							</button>
						</div>
						<div className="flex flex-wrap gap-4 flex-column item-center">
							<button onClick={addBeneficiary} className="flex items-center h-16 gap-2 px-4 rounded-lg cursor-pointer bg-primary">
								<img alt="cover" src={add} size={24} />
								<span className="text-white text-[0.9rem]">Add New</span>
							</button>
							{beneficiaries?.data?.beneficiary?.map((beneficiary, index) => (
								<Beneficiary person={beneficiary} refetch={refetchBeneficiaries} key={index} />
							))}
						</div>
					</div>
				</div>
				<RecentTransactions />
			</DashboardLayout>
			<SendMoney status={sendMoneyStatus} toggleModal={toggleSendMoney} />
			<FundAccount status={fundAccountStatus} toggleModal={toggleFundAccount} />
			<FundWallet status={fundWalletStatus} toggleModal={toggleFundWallet} />
			<AddBeneficiary status={addBeneficiaryStatus} toggleModal={addBeneficiary} refetch={refetchBeneficiaries} />
			<TransactionDetails status={transactionDetailsStatus} toggleModal={toggleTransactionDetails} />
		</>
	);
};

const RecentTransactions = () => {
	const { data: transactions } = useQuery({
		queryKey: ["transactions"],
		queryFn: () => getTransactions({ limit: 5 }),
		suspense: true,
		refetchOnWindowFocus: false,
	});

	if (!transactions?.data?.length) return null;

	return (
		<div className="mt-12 lg:grid 2xl:grid-cols-2">
			<div className="my-8">
				<div className="flex mb-8">
					<h1 className="text-xs uppercase">Recent Transactions</h1>
				</div>
				<CustomDataTable
					data={transactions?.data}
					columns={transactionColumns}
					pagination={false}
					onChangePage={() => null}
					onChangeRowsPerPage={() => null}
				/>
			</div>
		</div>
	);
};

export { Account, Profile, Transactions, Beneficiaries, Teams };
export default Dashboard;
