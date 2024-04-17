import TransactionsModal from "../Modal";
import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import SelectInput from "../../inputs/SelectInput";
import TextInput from "../../inputs/TextInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { createBeneficiary, listBanks, verifyBankAccount } from "../../../server";
import { renderSuccessMessage } from "../../../helpers/functions";

export default function AddBeneficiary({ status, toggleModal, refetch }) {
	const [currency, setCurrency] = useState("");

	const currencies = [
		{ key: "", label: "Select Currency" },
		{ key: "NGN", label: "Nigerian Naira" },
		{ key: "USD", label: "US Dollars" },
		// { key: "GBP", label: "British Pounds" },
	];

	return (
		<TransactionsModal status={status} closeModal={toggleModal}>
			<h5 className="text-xl font-medium text-grey-title">Add Beneficiary</h5>
			<p className="mb-6 text-sm leading-7 text-grey-title">Fill in beneficiary details</p>
			<SelectInput
				label="Select Currency"
				placeholder="Select Currency"
				data={currencies}
				name="currency"
				value={currency}
				onChange={(event) => setCurrency(event.target.value)}
			/>
			{!currency ? null : currency === "NGN" ? (
				<LocalBeneficiary {...{ toggleModal, refetch, currency }} />
			) : (
				<InternationlBeneficiary {...{ toggleModal, refetch, currency }} />
			)}
		</TransactionsModal>
	);
}

const LocalBeneficiary = ({ toggleModal, refetch, currency }) => {
	const { data } = useQuery({
		queryKey: ["banks"],
		queryFn: listBanks,
	});

	const banks = data?.data?.info?.data?.map((bank) => ({ key: bank.code.concat("-", bank.name), label: bank.name }));

	const initialValues = {
		name: "",
		country: "Nigeria",
		account_number: "",
		bank_name: "",
		bank_code: "",
		currency: currency,
		alias: "",
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Beneficiary account name is required"),
		account_number: Yup.string().required("Beneficiary account number is required"),
		bank_name: Yup.string().required("Beneficiary account bank is required"),
		bank_code: Yup.string().required("Beneficiary account bank is required"),
		alias: Yup.string().notRequired(),
	});

	const { mutate, isLoading: mutateLoading } = useMutation(createBeneficiary, {
		onSuccess: ({ message }) =>
			renderSuccessMessage(message).then(() => {
				refetch();
				toggleModal();
			}),
	});
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => mutate(values)}>
			{({ values, handleChange, handleSubmit, setFieldValue, submitForm }) => (
				<form className="px-2 bg-white" onSubmit={handleSubmit}>
					<SelectInput
						label="Bank"
						placeholder="Select bank"
						data={banks}
						value={values.bank_code.concat("-", values.bank_name)}
						onChange={(event) => {
							const [code, name] = event.target.value.split("-");
							setFieldValue("bank_code", code);
							setFieldValue("bank_name", name);
						}}
					/>
					<ErrorMessage name="bank_code" component="div" className="text-red-500" />
					<ErrorMessage name="bank_name" component="div" className="text-red-500" />
					<TextInput
						label="Account number"
						placeholder="Enter account number"
						name="account_number"
						value={values.account_number}
						onChange={handleChange}
					/>
					<ErrorMessage name="account_number" component="div" className="text-red-500" />
					<TextInput
						type="email"
						placeholder="Enter beneficiary email address"
						label="Email address (Optional)"
						name="alias"
						value={values.alias}
						onChange={handleChange}
					/>
					<ErrorMessage name="alias" component="div" className="text-red-500" />
					<VerifyAccount />
					<ErrorMessage name="name" component="div" className="text-red-500" />
					<div className="flex items-center w-full my-8 space-between gap-x-4">
						<SecondaryBtn type="button" placeholder="Cancel" style={{ width: "50%" }} onClick={() => toggleModal()} />
						<PrimaryBtn
							type="button"
							placeholder="Save"
							style={{ width: "50%", height: "2.5rem" }}
							disabled={mutateLoading}
							loading={mutateLoading}
							onClick={() => submitForm()}
						/>
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
		if (!!values.account_number && values.account_number.length === 10 && !!values.bank_code) {
			mutate({ accountNumber: values.account_number, bankCode: values.bank_code });
		} else {
			setFieldValue("name", "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.account_number, values.bank_code]);

	return <TextInput label="Verify details" disabled={true} value={values.name} name="name" />;
};

const InternationlBeneficiary = ({ toggleModal, refetch, currency }) => {
	const initialValues = {
		name: "",
		country: "International",
		account_number: "",
		routing_no: "",
		routing_type: "aba",
		bank_name: "",
		currency,
		alias: "",
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Beneficiary account name is required"),
		account_number: Yup.string().required("Beneficiary account number is required"),
		routing_no: Yup.string().required("Beneficiary account routing_no is required"),
		alias: Yup.string().notRequired(),
	});

	const { mutate, isLoading: mutateLoading } = useMutation(createBeneficiary, {
		onSuccess: ({ message }) =>
			renderSuccessMessage(message).then(() => {
				refetch();
				toggleModal();
			}),
	});
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => mutate(values)}>
			{({ values, handleChange, handleSubmit, submitForm }) => (
				<form className="px-2 bg-white" onSubmit={handleSubmit}>
					<TextInput
						label="Account number"
						placeholder="Enter account number"
						name="account_number"
						value={values.account_number}
						onChange={handleChange}
					/>
					<ErrorMessage name="account_number" component="div" className="text-red-500" />

					<TextInput label="Account Routing" name="routing_no" value={values.routing_no} onChange={handleChange} />
					<ErrorMessage name="routing_no" component="div" className="text-red-500 text-[0.75rem]" />

					<TextInput label="Account Bank" name="bank_name" value={values.bank_name} onChange={handleChange} />
					<ErrorMessage name="bank_name" component="div" className="text-red-500 text-[0.75rem]" />

					<TextInput
						type="email"
						placeholder="Enter beneficiary email address"
						label="Email address (Optional)"
						name="alias"
						value={values.alias}
						onChange={handleChange}
					/>
					<ErrorMessage name="alias" component="div" className="text-red-500" />

					<TextInput label="Recipient Name" value={values.name} name="name" onChange={handleChange} />
					<ErrorMessage name="name" component="div" className="text-red-500" />

					<div className="flex items-center w-full my-8 space-between gap-x-4">
						<SecondaryBtn type="button" placeholder="Cancel" style={{ width: "50%" }} onClick={() => toggleModal()} />
						<PrimaryBtn
							type="button"
							placeholder="Save"
							style={{ width: "50%", height: "2.5rem" }}
							disabled={mutateLoading}
							loading={mutateLoading}
							onClick={() => submitForm()}
						/>
					</div>
				</form>
			)}
		</Formik>
	);
};
