import React, { useState } from "react";
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

import { imgs } from "../../helpers/constants";
import Account from "./Account";
import Profile from "./Profile";
import Transactions, { transactionColumns } from "./Transactions";
import { useAuthContext } from "../../context/AuthContext";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getBeneficiaries, getTransactions, getWalletBalance } from "../../server";
// import { useNavigate } from "react-router-dom";
import CustomDataTable from "../../components/CustomDataTable";
import numeral from "numeral";

const Dashboard = ({ query, amount }) => {
	const { user: team } = useAuthContext();
	// const navigate = useNavigate();

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

	// show account balance 
	const wallet_value = amount;

	return (
		<>
			<DashboardLayout title="Account Overview">
				<div className="grid gap-4 my-3 sm:grid-cols-2 lg:grid-cols-2">
					<div className="col-span-1 mb-4 lg:border-r md:border-r border-[#EBEBEB] lg:pr-4">
						<small className="text-[12px]">Total balance</small>
						<h3 className="text-gray-800 text-[20px] md:text-[25px]">{numeral(wallet_value).format("0,0.00")} NGN</h3>
						{/* <h3 className="text-gray-800">Hi {loggedInUser?.profile?.firstName}!</h3> */}
						<div className="grid gap-4 my-5 sm:grid-cols-2 lg:grid-cols-2">
							{arrangedWallet?.map((currency, index) => (
								<CurrencyCard currency={currency?.currency} amount={currency?.wallet_value} key={index} />
							))}
						</div>
						<div className="">
							<h1 className="text-lg">Quick Actions</h1>
							<div className="flex flex-wrap gap-4 item-center">
								<button
									onClick={toggleSendMoney}
									className="flex items-center h-[44px] gap-1 pl-2 pr-4 py-4 bg-[#BEFFC4] border rounded-lg cursor-pointer border-[#BEFFC4]"
								>
									<img alt="cover" src={imgs.payout} size={24} />
									<span className="text-[0.75rem] ml-2">Make Payout</span>
								</button>
								<button
									onClick={toggleFundAccount}
									className="flex items-center h-[44px] gap-1 pl-2 pr-4 py-4 border rounded-lg cursor-pointer bg-[#DAEFFF] border-[#DAEFFF]"
								>
									<img alt="cover" src={imgs.add3} size={24} />
									<span className="text-[#0091FF] text-[0.75rem] ml-2">Fund Account</span>
								</button>
								
								<button
									onClick={toggleFundWallet}
									className="flex items-center h-[44px] gap-1 pl-2 pr-4 py-4 bg-[#DAEFFF] border rounded-lg cursor-pointer border-[#DAEFFF]"
								>
									<img alt="cover" src={imgs.add3} size={24} />
									<span className="text-[0.75rem] ml-2 text-[#0091FF]">Fund Wallet</span>
								</button>
							</div>
						</div>

						<div>
							<h3 className="text-lg mt-8">Recent Transactions</h3>
							<p className="text-[12px] text-[#979797] mt-0 mb-5">Today, May 8</p>
							<div className="flex justify-between items-center text-[12px] border-b border-[#EBEBEB] pb-4 mb-4">
								<div className="flex">
									<img src={imgs.payout} alt="icon" className="w-[21px]" />
									<div className="ml-2">
										<span>Payout to </span><span className="font-semibold">Jonathan Doe </span><span className="text-[#0091FF]">Success</span>
									</div>
								</div>
								<span>-2,000 USD</span>
							</div>
							<div className="flex justify-between items-center text-[12px] border-b border-[#EBEBEB] pb-4 mb-4">
								<div className="flex">
									<img src={imgs.receive} alt="icon" className="w-[21px]" />
									<div className="ml-2">
										<span>Received from </span><span className="font-semibold">John Doe </span><span className="text-[#0091FF]">Receive</span>
									</div>
								</div>
								<span>+1,000 USD</span>
							</div>
							<div className="flex justify-between items-center text-[12px] border-b border-[#EBEBEB] pb-4 mb-4">
								<div className="flex">
									<img src={imgs.fund} alt="icon" className="w-[21px]" />
									<div className="ml-2">
										<span>Fund Account </span><span className="text-[#0091FF]">Success</span>
									</div>
								</div>
								<span>+1,500 USD</span>
							</div>
						</div>
					</div>
					<div className="col-span-1 mb-4">
						<div className="flex justify-between mb-3">
							<h1 className="text-xs uppercase">Beneficiaries</h1>
							<div onClick={addBeneficiary} className="flex items-center cursor-pointer">
								<img alt="cover" src={imgs.add2} size={24} />
								<span className="text-black text-[12px] ml-1">Add Beneficiary</span>
							</div>
							{/* <button className="text-xs text-secondary" onClick={() => navigate(`/dashboard/beneficiaries`)}>
								View All
							</button> */}
						</div>
						<div className="flex flex-wrap gap-4 item-center max-w-[465px]">
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
					<h1 className="text-xs">Recent Transactions</h1>
				</div>
				<CustomDataTable
					data={transactions?.data?.transaction}
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
