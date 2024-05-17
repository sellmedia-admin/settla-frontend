import TransactionsModal from "../Modal";
import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import SelectInput from "../../inputs/SelectInput";
import TextInput from "../../inputs/TextInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { editBeneficiary, listBanks, verifyBankAccount } from "../../../server";
import { renderSuccessMessage } from "../../../helpers/functions";

export default function EditBeneficiary({ status, toggleModal, refetch, beneficiary }) {
	return (
		<TransactionsModal status={status} closeModal={toggleModal}>
			<h5 className="text-xl font-medium text-grey-title">Edit Beneficiary</h5>
			<p className="mb-6 text-sm leading-7 text-grey-title">Fill in beneficiary details</p>
			{beneficiary?.currency === "NGN" ? (
				<LocalBeneficiary {...{ toggleModal, refetch, beneficiary }} />
			) : (
				<InternationlBeneficiary {...{ toggleModal, refetch, beneficiary }} />
			)}
		</TransactionsModal>
	);
}

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

const LocalBeneficiary = ({ toggleModal, refetch, beneficiary }) => {
	const { data } = useQuery({
		queryKey: ["banks"],
		queryFn: listBanks,
	});

	const banks = data?.data?.info?.data?.map((bank) => ({ key: bank.code.concat("-", bank.name), label: bank.name }));

	const initialValues = {
		id: beneficiary?.id,
		name: beneficiary?.name,
		country: beneficiary?.country,
		account_number: beneficiary?.account_number,
		bank_name: beneficiary?.bank_name,
		bank_code: beneficiary?.bank_code,
		currency: beneficiary?.currency,
		alias: beneficiary?.alias,
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Beneficiary account name is required"),
		account_number: Yup.string().required("Beneficiary account number is required"),
		bank_name: Yup.string().required("Beneficiary account bank is required"),
		bank_code: Yup.string().required("Beneficiary account bank is required"),
		alias: Yup.string().notRequired(),
	});

	const { mutate, isLoading: mutateLoading } = useMutation(editBeneficiary, {
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
					<div className="w-full my-8 space-between gap-x-4">
						<PrimaryBtn
							type="button"
							placeholder="Save"
							style={{ width: "100%", backgroundColor: "#0091FF", color: "#ffffff", height: "50px" }}
							disabled={mutateLoading}
							loading={mutateLoading}
							onClick={() => submitForm()}
						/>
						<SecondaryBtn type="button" placeholder="Cancel" style={{ width: "100%", marginTop: 10, border: "none" }} onClick={() => toggleModal()} />
					</div>
				</form>
			)}
		</Formik>
	);
};

const InternationlBeneficiary = ({ toggleModal, refetch, beneficiary }) => {
	const initialValues = {
		id: beneficiary?.id,
		name: beneficiary?.name,
		country: beneficiary?.country,
		account_number: beneficiary?.account_number,
		routing_no: beneficiary?.routing_no,
		routing_type: beneficiary?.routing_type,
		bank_name: beneficiary?.bank_name,
		currency: beneficiary?.currency,
		alias: beneficiary?.alias,
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Beneficiary account name is required"),
		account_number: Yup.string().required("Beneficiary account number is required"),
		routing_no: Yup.string().required("Beneficiary account routing_no is required"),
		alias: Yup.string().notRequired(),
	});

	const { mutate, isLoading: mutateLoading } = useMutation(editBeneficiary, {
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
