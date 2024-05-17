import PrimaryBtn from "../../buttons/PrimaryBtn";

import copy from "../../../assets/svg/copy.svg";
import { useFundContext } from ".";
import { copyContent, renderCurrency } from "../../../helpers/functions";
import { useQuery } from "@tanstack/react-query";
import { getVirtualAccount } from "../../../server";
import { useAuthContext } from "../../../context/AuthContext";

export default function StepTwo({ toggleModal }) {
	const { amount } = useFundContext();
	const { user } = useAuthContext();
	const accountDetails = user?.paymentAccountDetails?.at(0);

	const { data } = useQuery({
		queryKey: ["virtual-account"],
		queryFn: () => getVirtualAccount(accountDetails?.virtual_account_no),
		suspense: true,
	});

	const accountNumber = data?.data?.info?.data?.account_number;
	const accountName = data?.data?.info?.data?.account_name;
	const bankName = data?.data?.info?.data?.bank_name;

	return (
		<div className="px-2 bg-white">
			<h5 className="text-xl font-medium text-grey-title">Fund Wallet</h5>
			<p className="mb-6 text-sm leading-7 text-grey-title">Please send the exact amount to the account number below</p>
			<h3 className="my-3 text-2xl font-extrabold text-center text-darkGray">{renderCurrency(amount)}</h3>
			<div className="relative p-4 border border-gray-200 rounded">
				<button className="absolute right-3 top-3" onClick={async () => copyContent(accountNumber)}>
					<img alt="" src={copy} size={24} />
				</button>
				<p className="mb-1 text-base font-medium text-center text-darkGray">{accountNumber}</p>
				<p className="mb-1 text-base font-medium text-center text-darkGray">{bankName}</p>
				<p className="mb-1 text-base font-medium text-center text-darkGray">{accountName}</p>
			</div>
			<div className="flex items-center w-full my-8 space-between gap-x-4">
				<PrimaryBtn placeholder="I have made payment" style={{ height: "50px" }} onClick={() => toggleModal()} />
			</div>
		</div>
	);
}
