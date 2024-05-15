import usa from "../../../assets/svg/usa.svg";
import uk from "../../../assets/svg/uk.svg";
import euro from "../../../assets/svg/euro.svg";
import naira from "../../../assets/svg/nigeria.svg";

import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import TextInput from "../../inputs/TextInput";
import { imgs } from "../../../helpers/constants";
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
					<div className="flex items-center">
						<img alt="cover" src={imgs.add3} size={24} />
						<h5 className="text-xl font-medium text-grey-title ml-2">Fund Account</h5>
					</div>
					<p className="mb-6 text-sm leading-7 text-grey-title">Fund account in naira</p>
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
					<div className="w-full my-4 space-between gap-x-4">
						<PrimaryBtn placeholder="Continue" style={{ width: "100%", backgroundColor: "#0091FF", color: "#ffffff", height: "50px" }} type="submit" />
						<SecondaryBtn placeholder="Cancel" style={{ width: "100%", marginTop: 10, border: "none" }} onClick={() => toggleModal()} type="button" />
					</div>
				</form>
			)}
		</Formik>
	);
}
