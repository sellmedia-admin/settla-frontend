import { useMutation } from "@tanstack/react-query";
import { useSendContext } from ".";
import { renderCurrency, renderSuccessMessage } from "../../../helpers/functions";
import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import { swapCurrencies } from "../../../server";
import CURRENCIES from "../../../helpers/currencies";
import { flags } from "../../../helpers/constants";
import { useAuthContext } from "../../../context/AuthContext";

export default function StepTwo({ toggleModal, updateStep, reset }) {
	const { user: loggedInUser } = useAuthContext();
	const { amount, currencies } = useSendContext();

	const closeModal = () => {
		updateStep(1);
		reset();
		toggleModal();
	};

	const { mutate, isLoading } = useMutation(swapCurrencies, {
		onSuccess: ({ message }) =>
			renderSuccessMessage(message).then(() => {
				closeModal();
			}),
	});

	const sourceCurrency = CURRENCIES?.find((currency) => currency.AlphabeticCode === currencies?.source)?.NumericCode;
	const destinationCurrency = CURRENCIES?.find((currency) => currency.AlphabeticCode === currencies?.destination)?.NumericCode;

	const wallets = loggedInUser?.wallet;

	const sourceWallet = wallets.find((wallet) => wallet?.currency === currencies.source);
	const destinationWallet = wallets.find((wallet) => wallet?.currency === currencies.destination);

	return (
		<div className="px-2 bg-white">
			<h5 className="text-xl font-medium text-grey-title">Fund Wallet Summary</h5>
			<div className="my-5 -m-10 border-t border-gray-100" />
			<div className="flex justify-between w-full mb-2 flex-start">
				<div className="text-left">
					<span className="block text-sm font-semibold text-gray-500">Source Wallet</span>
					<span className="block text-sm text-gray-800">{flags[currencies?.source?.toUpperCase()]?.label}</span>
				</div>
				<div className="text-right">
					<span className="block text-sm font-semibold text-gray-500">Destination Wallet</span>
					<span className="block text-sm text-gray-800">{flags[currencies?.destination?.toUpperCase()]?.label}</span>
				</div>
			</div>
			<div className="flex justify-between w-full mb-2 flex-start">
				<div className="text-left">
					<span className="block text-sm font-semibold text-gray-500">You are charged</span>
					<span className="block text-sm text-gray-800">{renderCurrency(amount.source, sourceCurrency)}</span>
				</div>
				<div className="text-right">
					<span className="block text-sm font-semibold text-gray-500">Recipient recieves</span>
					<span className="block text-sm text-gray-800">{renderCurrency(amount.destination, destinationCurrency)}</span>
				</div>
			</div>
			<div className="flex items-center w-full my-8 space-between gap-x-4">
				<SecondaryBtn placeholder="Cancel" style={{ width: "50%" }} onClick={() => closeModal()} />
				<PrimaryBtn
					placeholder="Continue"
					style={{ width: "50%", height: "2.5rem" }}
					disabled={isLoading}
					loading={isLoading}
					onClick={() =>
						mutate({
							amount: amount.source,
							sender: sourceWallet?.id,
							recipent: destinationWallet?.id,
						})
					}
				/>
			</div>
		</div>
	);
}
