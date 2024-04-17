import { createContext, useContext, useEffect, useState } from "react";
import TransactionsModal from "../Modal";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const SendContext = createContext({
	amount: {},
	setAmount: () => {},
	description: "",
	setDescription: () => {},
	destinationInfo: {},
	setDestinationInfo: () => {},
	currencies: {},
	setCurrencies: () => {},
	save: false,
	setSave: () => {},
});

export const useSendContext = () => useContext(SendContext);

export default function SendMoney({ status, toggleModal, beneficiary }) {
	const [step, setStep] = useState(1);
	const [save, setSave] = useState(false);
	const [currencies, setCurrencies] = useState({ source: "", destination: "" });
	const [amount, setAmount] = useState({ source: 0, destination: 0 });
	const [destinationInfo, setDestinationInfo] = useState({});
	const [description, setDescription] = useState("");

	const updateStep = (step) => {
		if (typeof Number(step) === "number") {
			setStep(step);
		}
	};
	const reset = () => {
		setAmount({ source: 0, destination: 0 });
		setDescription("");
		setDestinationInfo({});
		setCurrencies((prevState) => ({ ...prevState, source: "", destination: "" }));
		setSave(false);
	};
	const closeModal = () => {
		toggleModal();
		reset();
		updateStep(1);
	};

	useEffect(() => {
		if (beneficiary) {
			setDestinationInfo(
				beneficiary?.currency === "NGN"
					? {
							name: beneficiary?.name,
							destinationAccount: beneficiary?.account_number,
							bankCode: beneficiary?.bank_code,
							destinationBank: beneficiary?.bank_name,
					  }
					: {
							name: beneficiary?.name,
							account: beneficiary?.account_number,
							routing: beneficiary?.routing_no,
							bank: beneficiary?.bank_name,
					  }
			);
			setCurrencies({ source: "", destination: beneficiary?.currency });
		}
	}, [beneficiary]);

	return (
		<TransactionsModal status={status} closeModal={closeModal}>
			<SendContext.Provider
				value={{
					amount,
					setAmount,
					destinationInfo,
					setDestinationInfo,
					description,
					setDescription,
					currencies,
					setCurrencies,
					save,
					setSave,
				}}
			>
				{step === 1 && <StepOne {...{ toggleModal, updateStep, reset, beneficiary }} />}
				{step === 2 && <StepTwo {...{ toggleModal, updateStep, reset }} />}
				{step === 3 && <StepThree {...{ toggleModal, updateStep, reset, beneficiary }} />}
			</SendContext.Provider>
		</TransactionsModal>
	);
}
