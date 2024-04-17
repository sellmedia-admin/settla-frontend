import usa from "../../../assets/svg/usa.svg";
import uk from "../../../assets/svg/uk.svg";
import euro from "../../../assets/svg/euro.svg";
import naira from "../../../assets/svg/nigeria.svg";

import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import TextInput from "../../inputs/TextInput";
import { useSendContext } from ".";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { getConversionRates } from "../../../server";
import { useAuthContext } from "../../../context/AuthContext";
import CurrencyCard from "../../cards/CurrencyCard";

const sources = [
	{ key: "USD", label: "US Dollars", icon: usa },
	{ key: "GBP", label: "British Pounds", icon: uk },
	{ key: "Pound", label: "British Pounds", icon: uk },
	{ key: "EUR", label: "Euro Bonds", icon: euro },
	{ key: "NGN", label: "Nigerian Naira", icon: naira },
];

export default function StepOne({ toggleModal, updateStep, reset }) {
	const { user: loggedInUser } = useAuthContext();
	const { setAmount, setCurrencies } = useSendContext();

	const wallets = loggedInUser?.wallet;

	const closeModal = () => {
		updateStep(1);
		reset();
		toggleModal();
	};

	const { data } = useQuery({
		queryKey: ["rates"],
		queryFn: getConversionRates,
		suspense: true,
	});

	const validationSchema = Yup.object().shape({
		sourceCurrency: Yup.string().required("Please provide a source currency"),
		destinationCurrency: Yup.string().required("Please provide a destination currency"),
		source: Yup.number().min(1, "Please provide a source value").required("Please provide a source currency"),
	});
	const initialValues = {
		source: 0,
		destination: 0,
		sourceCurrency: "NGN",
		destinationCurrency: "",
	};

	const conversionRates = {
		"NGN-USD": data?.data?.data["NGN-USD"],
		"USD-NGN": data?.data?.data["NGN-USD"],
		"NGN-NGN": 1,
		"USD-USD": 1,
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			validateOnMount
			initialTouched={{ sourceCurrency: true, destinationCurrency: true }}
			onSubmit={({ source, destination, sourceCurrency, destinationCurrency }) => {
				setAmount((prevState) => ({ ...prevState, source, destination }));
				setCurrencies((prevState) => ({ ...prevState, source: sourceCurrency, destination: destinationCurrency }));
				updateStep(2);
			}}
		>
			{({ handleSubmit, handleChange, values, setFieldValue }) => {
				const conversionRate = conversionRates[values.sourceCurrency.concat("-", values.destinationCurrency)];

				return (
					<form className="px-2 bg-white flex flex-col gap-[5px]" onSubmit={handleSubmit}>
						<h5 className="text-xl font-medium text-grey-title">Fund Wallet</h5>
						<p className="mb-6 text-sm leading-7 text-grey-title">Fund your wallet in a few easy steps</p>
						<div className="grid min-[425px]:grid-cols-2 gap-2">
							{wallets
								?.filter((currency) => currency?.currency !== "NGN")
								?.map((currency) => (
									<CurrencyCard
										currency={currency?.currency}
										amount={currency?.wallet_value}
										key={currency?.currency}
										onClick={() => {
											setFieldValue("source", 0);
											setFieldValue("destination", 0);
											setFieldValue("destinationCurrency", currency?.currency);
										}}
										selected={values.destinationCurrency === currency?.currency}
									/>
								))}
						</div>
						<TextInput
							label="Naira amount"
							icon={sources.find((currency) => currency.key === values.sourceCurrency)?.icon}
							withIcon
							value={values.source}
							onChange={(event) => {
								const value = event.target.valueAsNumber;

								setFieldValue("destination", value / conversionRate);
								handleChange(event);
							}}
							name="source"
							type="number"
							required
						/>
						<ErrorMessage name="source" component="div" className="text-red-500 text-[0.75rem]" />
						<TextInput
							label={
								<>
									Destination amount{" "}
									{!!values.destinationCurrency && !!values.sourceCurrency && (
										<span className="font-bold text-grey-dark">
											({values.destinationCurrency} 1 - {values.sourceCurrency} {conversionRate})
										</span>
									)}
								</>
							}
							icon={sources.find((currency) => currency.key === values.destinationCurrency)?.icon}
							withIcon
							value={values.destination}
							onChange={(event) => {
								const value = event.target.valueAsNumber;

								setFieldValue("source", value * conversionRate);
								handleChange(event);
							}}
							name="destination"
							type="number"
							required
						/>
						<div className="flex items-center w-full my-8 space-between gap-x-4">
							<SecondaryBtn placeholder="Cancel" style={{ width: "50%" }} onClick={() => closeModal()} type="button" />
							<PrimaryBtn placeholder="Continue" style={{ width: "50%", height: "2.5rem" }} type="submit" />
						</div>
					</form>
				);
			}}
		</Formik>
	);
}
