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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getConversionRates, initializeLocalTransfer, initializeTransfer } from "../../../server";
import SelectInput from "../../inputs/SelectInput";

const sources = [
	{ key: "USD", label: "US Dollars", icon: usa },
	{ key: "GBP", label: "British Pounds", icon: uk },
	{ key: "Pound", label: "British Pounds", icon: uk },
	{ key: "EUR", label: "Euro Bonds", icon: euro },
	{ key: "NGN", label: "Nigerian Naira", icon: naira },
];
const currency = [
	{ key: "", label: "Select Currency" },
	{ key: "NGN", label: "Nigerian Naira" },
	{ key: "USD", label: "US Dollars" },
	// { key: "GBP", label: "British Pounds" },
];

const returnDestinationCurrency = (sourceCurrency) =>
	!sourceCurrency || sourceCurrency === "NGN" ? currency : currency?.filter((curr) => curr?.key !== "NGN");

export default function StepOne({ toggleModal, updateStep, reset, beneficiary, enabled = true }) {
	const { setAmount, setCurrencies, currencies } = useSendContext();

	const closeModal = () => {
		updateStep(1);
		reset();
		toggleModal();
	};

	const { data } = useQuery({
		queryKey: ["rates"],
		queryFn: getConversionRates,
		suspense: true,
		enabled,
	});

	const { mutateAsync: initializeForeign, isLoading: initializeForeignLoading } = useMutation(initializeTransfer);
	const { mutateAsync: initializeLocal, isLoading: initializeLocalLoading } = useMutation(initializeLocalTransfer);

	const validationSchema = Yup.object().shape({
		sourceCurrency: Yup.string().required("Please provide a source currency"),
		destinationCurrency: Yup.string()
			.required("Please provide a destination currency")
			.when("sourceCurrency", {
				is: (val) => val !== "NGN",
				then: (schema) => schema.notOneOf(["NGN"], "Cannot transfer from foreign currency to NGN"),
				otherwise: (schema) => schema,
			}),
		source: Yup.number()
			.required("Please provide a source currency")
			.when("sourceCurrency", {
				is: (val) => val !== "NGN",
				then: (schema) => schema.min(10, "Minimum amount is 10"),
				otherwise: (schema) => schema.min(100, "Minimum amount is NGN 100"),
			}),
	});
	const initialValues = {
		source: 0,
		destination: 0,
		sourceCurrency: "",
		destinationCurrency: currencies.destination ?? "",
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
			validateOnBlur
			validateOnChange
			initialTouched={{ sourceCurrency: true, destinationCurrency: true }}
			onSubmit={async ({ source, destination, sourceCurrency, destinationCurrency }) => {
				if (sourceCurrency === "NGN") {
					await initializeLocal({ amount: source });
				} else {
					await initializeForeign({ amount: source });
				}
				setAmount((prevState) => ({ ...prevState, source, destination }));
				setCurrencies((prevState) => ({ ...prevState, source: sourceCurrency, destination: destinationCurrency }));
				updateStep(2);
			}}
		>
			{({ handleSubmit, handleChange, values, setFieldValue, handleBlur }) => {
				const conversionRate = conversionRates[values.sourceCurrency.concat("-", values.destinationCurrency)];

				return (
					<form className="px-2 bg-white flex flex-col gap-[5px]" onSubmit={handleSubmit}>
						<h5 className="text-xl font-medium text-grey-title">Send Money</h5>
						<p className="mb-6 text-sm leading-7 text-grey-title">Send money in a few easy steps</p>
						<div className="grid min-[425px]:grid-cols-2 gap-2">
							<div>
								<SelectInput
									label="Source Currency"
									placeholder="Select Currency"
									data={currency}
									name="sourceCurrency"
									value={values.sourceCurrency}
									onChange={(event) => {
										handleChange(event);

										setFieldValue("source", 0);
										setFieldValue("destination", 0);
									}}
									onBlur={handleBlur}
								/>
								<ErrorMessage name="sourceCurrency" component="div" className="text-red-500 text-[0.75rem]" />
							</div>
							<div>
								<SelectInput
									label="Destination Currency"
									placeholder="Select Currency"
									data={returnDestinationCurrency(values?.sourceCurrency)}
									name="destinationCurrency"
									value={values.destinationCurrency}
									onChange={(event) => {
										handleChange(event);
										setFieldValue("source", 0);
										setFieldValue("destination", 0);
									}}
									onBlur={handleBlur}
									disabled={!!beneficiary}
								/>
								<ErrorMessage name="destinationCurrency" component="div" className="text-red-500 text-[0.75rem]" />
							</div>
						</div>
						<TextInput
							label="Source amount"
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
							<PrimaryBtn
								placeholder="Continue"
								style={{ width: "50%", height: "2.5rem" }}
								type="submit"
								loading={initializeForeignLoading || initializeLocalLoading}
								disabled={initializeForeignLoading || initializeLocalLoading}
							/>
						</div>
					</form>
				);
			}}
		</Formik>
	);
}
