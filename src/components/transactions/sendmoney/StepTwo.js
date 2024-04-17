import { ErrorMessage, Formik, useFormikContext } from "formik";
import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import TextInput from "../../inputs/TextInput";
import * as Yup from "yup";
import { useSendContext } from ".";
import SelectInput from "../../inputs/SelectInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { listBanks, verifyBankAccount } from "../../../server";

export default function StepTwo({ toggleModal, updateStep, reset }) {
	const { currencies } = useSendContext();

	return currencies?.destination === "NGN" ? (
		<LocalTransfer {...{ toggleModal, updateStep, reset }} />
	) : (
		<InternationalTransfer {...{ toggleModal, updateStep, reset }} />
	);
}

const InternationalTransfer = ({ toggleModal, updateStep, reset }) => {
	const { setDestinationInfo, setDescription, setSave, save, destinationInfo, description } = useSendContext();

	// const closeModal = () => {
	// 	updateStep(1);
	// 	reset();
	// 	toggleModal();
	// };

	const initialValues = {
		account: destinationInfo?.account ?? "",
		routing: destinationInfo?.routing ?? "",
		bank: destinationInfo?.bank ?? "",
		description: description ?? "",
		name: destinationInfo?.name ?? "",
		houseAddress: destinationInfo?.houseAddress ?? "",
		rawBankAddress:
			destinationInfo?.bankAddress?.line1?.concat(", ", destinationInfo?.bankAddress?.city, ", ", destinationInfo?.bankAddress?.state) ?? "",
		country: destinationInfo?.bankAddress?.country ?? "",
		postal_code: destinationInfo?.bankAddress?.postal_code ?? "",
	};
	const validationSchema = Yup.object().shape({
		account: Yup.string().required("Please provide recipient's account number"),
		routing: Yup.string().required("Please provide recipient's routing number"),
		name: Yup.string().required("Please provide recipient's name"),
		bank: Yup.string().required("Please provide recipient's bank"),
		description: Yup.string().notRequired(),
		houseAddress: Yup.string().required("Please provide your beneficiary adress"),
		rawBankAddress: Yup.string()
			.required("Please provide recipient's bank address")
			.test("is-complete", "Please provide your address, city and state seperated by commas", (value) => value.split(",").length >= 3),
		country: Yup.string().required("Please provide your bank country"),
		postal_code: Yup.string().required("Please provide your bank postal code"),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={({ description, country, postal_code, rawBankAddress, ...values }) => {
				const address = rawBankAddress.split(",");
				let lastTwo = address.slice(-2);
				const rest = address.slice(0, -2);
				const bankAddress = {
					line1: rest.join(",").trim(),
					city: lastTwo[0].trim(),
					state: lastTwo[1].trim(),
					country,
					postal_code,
				};
				setDestinationInfo((prevState) => ({ ...prevState, bankAddress, ...values }));
				setDescription(description);
				updateStep(3);
			}}
		>
			{({ values, handleChange, handleSubmit, initialValues }) => (
				<form className="px-2 bg-white" onSubmit={handleSubmit}>
					<h5 className="text-xl font-medium text-grey-title">Send Money</h5>
					<p className="text-sm leading-7 text-grey-title">Fill in recipient details</p>
					<div className="flex items-center my-2 space-x-4">
						<input
							name="save_beneficiary"
							id="save_beneficiary"
							className="accent-primary"
							type="checkbox"
							value={save}
							onChange={(event) => setSave(event.target.checked)}
						/>
						<label htmlFor="save_beneficiary" className="my-2 text-[0.85rem] font-medium tracking-wider uppercase">
							Save beneficiary
						</label>
					</div>

					<TextInput label="Recipient Name" value={values.name} name="name" onChange={handleChange} disabled={!!initialValues?.name} />
					<ErrorMessage name="name" component="div" className="text-red-500 text-[0.75rem]" />

					<TextInput
						label="Account Number"
						value={values.account}
						name="account"
						onChange={handleChange}
						disabled={!!initialValues?.account}
					/>
					<ErrorMessage name="account" component="div" className="text-red-500 text-[0.75rem]" />

					<TextInput
						label="Account Routing"
						name="routing"
						value={values.routing}
						onChange={handleChange}
						disabled={!!initialValues?.routing}
					/>
					<ErrorMessage name="routing" component="div" className="text-red-500 text-[0.75rem]" />

					<TextInput label="Account Bank" name="bank" value={values.bank} onChange={handleChange} disabled={!!initialValues?.bank} />
					<ErrorMessage name="bank" component="div" className="text-red-500 text-[0.75rem]" />

					<TextInput label="Beneficiary Address" name="houseAddress" value={values.houseAddress} onChange={handleChange} />
					<ErrorMessage name="houseAddress" component="div" className="text-red-500 text-[0.75rem]" />

					<TextInput
						label="Bank Address (Street, City, State)"
						name="rawBankAddress"
						value={values.rawBankAddress}
						onChange={handleChange}
					/>
					<ErrorMessage name="rawBankAddress" component="div" className="text-red-500 text-[0.75rem]" />

					<div className="grid grid-cols-2 gap-4">
						<div>
							<TextInput label="Bank Postal Code" name="postal_code" value={values.postal_code} onChange={handleChange} />
							<ErrorMessage name="postal_code" component="div" className="text-red-500 text-[0.75rem]" />
						</div>
						<div>
							<TextInput label="Bank Country" name="country" value={values.country} onChange={handleChange} />
							<ErrorMessage name="country" component="div" className="text-red-500 text-[0.75rem]" />
						</div>
					</div>

					<TextInput label="Description/Narration" name="description" value={values.description} onChange={handleChange} />
					<ErrorMessage name="description" component="div" className="text-red-500 text-[0.75rem]" />

					<div className="flex items-center w-full my-8 space-between gap-x-4">
						<SecondaryBtn placeholder="Back" style={{ width: "50%" }} onClick={() => updateStep(1)} type="button" />
						<PrimaryBtn placeholder="Continue" style={{ width: "50%", height: "2.5rem" }} type="submit" />
					</div>
				</form>
			)}
		</Formik>
	);
};

const LocalTransfer = ({ toggleModal, updateStep, reset }) => {
	const { setDestinationInfo, setDescription, setSave, save, destinationInfo, description } = useSendContext();

	const { data } = useQuery({
		queryKey: ["banks"],
		queryFn: listBanks,
	});
	const banks = data?.data?.info?.data?.map((bank) => ({ key: bank.code.concat("-", bank.name), label: bank.name }));

	// const closeModal = () => {
	// 	updateStep(1);
	// 	reset();
	// 	toggleModal();
	// };

	const initialValues = {
		destinationAccount: destinationInfo?.destinationAccount ?? "",
		destinationBank: destinationInfo?.destinationBank ?? "",
		bankCode: destinationInfo?.bankCode ?? "",
		desc: description ?? "",
		name: destinationInfo?.name ?? "",
	};
	const validationSchema = Yup.object().shape({
		destinationAccount: Yup.string().required("Please provide recipient's account number"),
		bankCode: Yup.string().required("Please provide recipient's bank"),
		destinationBank: Yup.string().required("Please provide recipient's bank"),
		desc: Yup.string().notRequired(),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={({ desc, ...values }) => {
				setDestinationInfo((prevState) => ({ ...prevState, ...values }));
				setDescription(desc);
				updateStep(3);
			}}
		>
			{({ values, handleChange, handleSubmit, setFieldValue, initialValues }) => (
				<form className="px-2 bg-white" onSubmit={handleSubmit}>
					<h5 className="text-xl font-medium text-grey-title">Send Money</h5>
					<p className="mb-6 text-sm leading-7 text-grey-title">Fill in recipient details</p>
					<div className="flex items-center my-2 space-x-4">
						<input
							name="save_beneficiary"
							id="save_beneficiary"
							className="accent-primary"
							type="checkbox"
							value={save}
							onChange={(event) => setSave(event.target.checked)}
						/>
						<label htmlFor="save_beneficiary" className="my-2 text-[0.85rem] font-medium tracking-wider uppercase">
							Save beneficiary
						</label>
					</div>

					<TextInput
						label="Account Number"
						value={values.destinationAccount}
						name="destinationAccount"
						onChange={handleChange}
						disabled={!!initialValues?.destinationAccount}
					/>
					<ErrorMessage name="destinationAccount" component="div" className="text-red-500 text-[0.75rem]" />

					<SelectInput
						label="Bank"
						placeholder="Select bank"
						data={banks}
						value={values.bankCode.concat("-", values.destinationBank)}
						disabled={!!initialValues?.bankCode}
						onChange={(event) => {
							const [code, name] = event.target.value.split("-");
							setFieldValue("bankCode", code);
							setFieldValue("destinationBank", name);
						}}
					/>
					<ErrorMessage name="bankCode" component="div" className="text-red-500" />
					<ErrorMessage name="destinationBank" component="div" className="text-red-500" />

					<VerifyAccount />

					<TextInput label="Description/Narration" name="desc" value={values.desc} onChange={handleChange} />
					<ErrorMessage name="desc" component="div" className="text-red-500 text-[0.75rem]" />

					<div className="flex items-center w-full my-8 space-between gap-x-4">
						<SecondaryBtn placeholder="Back" style={{ width: "50%" }} onClick={() => updateStep(1)} type="button" />
						<PrimaryBtn placeholder="Continue" style={{ width: "50%", height: "2.5rem" }} type="submit" />
					</div>
				</form>
			)}
		</Formik>
	);
};

const VerifyAccount = () => {
	const { values, setFieldValue } = useFormikContext();

	const { mutate } = useMutation(verifyBankAccount, {
		onSuccess: ({ data }) => {
			setFieldValue("name", data?.info?.data?.account_name);
		},
		onError: () => setFieldValue("name", ""),
	});

	useEffect(() => {
		if (!!values.destinationAccount && values.destinationAccount.length === 10 && !!values.bankCode) {
			mutate({ accountNumber: values.destinationAccount, bankCode: values.bankCode });
		} else {
			setFieldValue("name", "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.destinationAccount, values.bankCode]);

	return <TextInput label="Verify details" disabled={true} value={values.name} name="name" />;
};
