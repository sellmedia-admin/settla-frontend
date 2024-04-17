import usa from "../../../assets/svg/usa.svg";
import uk from "../../../assets/svg/uk.svg";
import euro from "../../../assets/svg/euro.svg";
import naira from "../../../assets/svg/nigeria.svg";

import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import TextInput from "../../inputs/TextInput";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { useFundContext } from ".";
import { useQuery } from "@tanstack/react-query";
import { getConversionRates } from "../../../server";

const sources = [
	{ key: "usd", label: "US Dollars", icon: usa, conv: 502 },
	{ key: "pounds", label: "British Pounds", icon: uk, conv: 600 },
	{ key: "euro", label: "Euro bonds", icon: euro, conv: 580 },
	{ key: "naira", label: "Nigerian Naira", icon: naira, conv: 580 },
];

const dollarSource = sources[0];
const nairaSource = sources[3];

export default function StepOne({ toggleModal, updateStep }) {
	const { setAmount } = useFundContext();

	const initialValues = {
		naira: 0,
		dollar: 0,
	};
	const validationSchema = Yup.object().shape({
		naira: Yup.number(),
	});

	const { data } = useQuery({
		queryKey: ["rates"],
		queryFn: getConversionRates,
		suspense: true,
	});

	const dollarToNaira = data?.data?.data["NGN-USD"];

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				setAmount(values.naira);
				updateStep(2);
			}}
		>
			{({ values, handleChange, handleSubmit, setFieldValue }) => (
				<form className="px-2 bg-white" onSubmit={handleSubmit}>
					<h5 className="text-xl font-medium text-grey-title">Fund Account</h5>
					<p className="mb-6 text-sm leading-7 text-grey-title">Fund your account in a few easy steps</p>
					<TextInput
						label="Enter amount in Dollars"
						placeholder="Enter amount in Dollars"
						icon={dollarSource?.icon}
						withIcon
						value={values.dollar}
						onChange={(event) => {
							const value = event.target.valueAsNumber;

							setFieldValue("naira", value * dollarToNaira);
							handleChange(event);
						}}
						name="dollar"
						type="number"
						required
					/>
					<TextInput
						label="Enter amount in Naira"
						placeholder="Enter amount in Naira"
						icon={nairaSource?.icon}
						withIcon
						value={values.naira}
						onChange={(event) => {
							const value = event.target.valueAsNumber;

							setFieldValue("dollar", value / dollarToNaira);
							handleChange(event);
						}}
						name="naira"
						type="number"
						required
					/>
					<ErrorMessage name="naira" component="div" className="text-red-500 text-[0.75rem]" />
					<div className="flex items-center w-full my-8 space-between gap-x-4">
						<SecondaryBtn placeholder="Cancel" style={{ width: "50%" }} onClick={() => toggleModal()} type="button" />
						<PrimaryBtn placeholder="Continue" style={{ width: "50%", height: "2.5rem" }} type="submit" />
					</div>
				</form>
			)}
		</Formik>
	);
}
