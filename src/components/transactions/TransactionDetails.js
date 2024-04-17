import TransactionsModal from "./Modal";
import updown from "../../assets/svg/updown.svg";

export default function TransactionDetails({ status, toggleModal }) {
	return (
		<TransactionsModal status={status} closeModal={toggleModal}>
			<div className="px-2 bg-white">
				<div className="flex items-center gap-4">
					<img alt="updown" src={updown} />
					<div>
						<h5 className="text-lg font-semibold text-grey-title">Transaction name</h5>
						<p className="text-xs leading-7 text-grey-title">12th july 2021</p>
					</div>
				</div>
				<div className="my-5 -m-10 border-t border-gray-100" />
				<div className="flex justify-between w-full flex-start mb-7">
					<div className="text-left">
						<span className="block mb-1 text-sm font-light text-gray-700">Transaction type</span>
						<span className="block text-xs text-green-700">Credit</span>
					</div>
				</div>
				<div className="flex justify-between w-full flex-start mb-7">
					<div className="text-left">
						<span className="block mb-2 text-sm font-light text-gray-400">Amount</span>
						<span className="block text-sm text-gray-700">₦50,000</span>
					</div>
					<div className="text-right">
						<span className="block mb-2 text-sm font-light text-gray-400">Reference</span>
						<span className="block text-sm text-gray-700">XDDP5266723283356</span>
					</div>
				</div>
				<div className="flex justify-between w-full flex-start mb-7">
					<div className="text-left">
						<span className="block mb-2 text-sm font-light text-gray-400">Status</span>
						<span className="block px-4 py-1 text-sm text-green-700 bg-green-100 rounded-lg">Successful</span>
					</div>
					<div className="text-right">
						<span className="block mb-2 text-sm font-light text-gray-400">New balance</span>
						<span className="block text-sm text-gray-700">₦500,000,000</span>
					</div>
				</div>
			</div>
		</TransactionsModal>
	);
}
