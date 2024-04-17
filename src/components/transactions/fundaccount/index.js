import { Suspense, createContext, useContext, useState } from "react";
import TransactionsModal from "../Modal";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Loader from "../../Loader";

const FundContext = createContext({
	amount: {},
	setAmount: () => {},
});

export const useFundContext = () => useContext(FundContext);

export default function FundAccount({ status, toggleModal }) {
	const [step, setStep] = useState(1);
	const [amount, setAmount] = useState(0);

	const updateStep = (step) => {
		if (typeof Number(step) === "number") {
			setStep(step);
		}
	};
	const reset = () => {
		setAmount(0);
	};
	const closeModal = () => {
		toggleModal();
		reset();
		updateStep(1);
	};

	return (
		<TransactionsModal status={status} closeModal={closeModal}>
			<FundContext.Provider value={{ amount, setAmount }}>
				<Suspense fallback={<Loader />}>
					{step === 1 && <StepOne {...{ toggleModal: closeModal, updateStep }} />}
					{step === 2 && <StepTwo {...{ toggleModal: closeModal, updateStep }} />}
				</Suspense>
			</FundContext.Provider>
		</TransactionsModal>
	);
}
