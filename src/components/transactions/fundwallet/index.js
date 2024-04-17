import { createContext, useContext, useState } from "react";
import TransactionsModal from "../Modal";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const SendContext = createContext({
	amount: {},
	setAmount: () => {},
	description: "",
	setDescription: () => {},
	destinationInfo: 0,
	setDestinationInfo: () => {},
	currencies: 0,
	setCurrencies: () => {},
});

export const useSendContext = () => useContext(SendContext);

export default function FundWallet({ status, toggleModal }) {
	const [step, setStep] = useState(1);
	const [currencies, setCurrencies] = useState({ source: "", destination: "" });
	const [amount, setAmount] = useState({ source: 0, destination: 0 });
	const [description, setDescription] = useState("");

	const updateStep = (step) => {
		if (typeof Number(step) === "number") {
			setStep(step);
		}
	};
	const reset = () => {
		setAmount({ source: 0, destination: 0 });
		setCurrencies({ source: "", destination: "" });
		setDescription("");
	};
	const closeModal = () => {
		toggleModal();
		reset();
		updateStep(1);
	};

	return (
		<TransactionsModal status={status} closeModal={closeModal} width="max-w-[40rem]">
			<SendContext.Provider
				value={{
					amount,
					setAmount,
					description,
					setDescription,
					currencies,
					setCurrencies,
				}}
			>
				{step === 1 && <StepOne {...{ toggleModal, updateStep, reset }} />}
				{step === 2 && <StepTwo {...{ toggleModal, updateStep, reset }} />}
			</SendContext.Provider>
		</TransactionsModal>
	);
}
