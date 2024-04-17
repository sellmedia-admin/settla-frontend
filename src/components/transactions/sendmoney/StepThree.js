import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSendContext } from ".";
import { isValidFileType, renderCurrency, renderSuccessMessage } from "../../../helpers/functions";
import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import { createBeneficiary, finalizeLocalTransfer, finalizeTransfer, transferFromUSD, uploadSupportingDocument } from "../../../server";
import CURRENCIES from "../../../helpers/currencies";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { TableRow2 } from "../../upload-modal/TableRow";

export default function StepThree({ toggleModal, updateStep, reset }) {
	const { currencies } = useSendContext();

	return currencies?.destination === "NGN" ? (
		<LocalTransfer {...{ toggleModal, updateStep, reset }} />
	) : (
		<InternationalTransfer {...{ toggleModal, updateStep, reset }} />
	);
}

const InternationalTransfer = ({ toggleModal, updateStep, reset }) => {
	const { destinationInfo, amount, description, currencies, save } = useSendContext();
	const queryClient = useQueryClient();

	const closeModal = () => {
		updateStep(1);
		reset();
		toggleModal();
	};

	const { mutate: nairaToUSDTransfer, isLoading: isNairaToUSDTransferLoading } = useMutation(finalizeTransfer, {
		onSuccess: ({ message }) =>
			renderSuccessMessage(message).then(async () => {
				closeModal();
				await queryClient.invalidateQueries(
					{
						queryKey: ["wallet"],
						refetchType: "all",
					},
					{ throwOnError: true }
				);
			}),
	});

	const { mutate: USDToUSDTransfer, isLoading: isUSDToUSDTransferLoading } = useMutation(transferFromUSD, {
		onSuccess: ({ message }) =>
			renderSuccessMessage(message).then(async () => {
				closeModal();
				await queryClient.invalidateQueries(
					{
						queryKey: ["wallet"],
						refetchType: "all",
					},
					{ throwOnError: true }
				);
			}),
	});
	const { mutate: createBeneficiaryMutate } = useMutation(createBeneficiary, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(
				{
					queryKey: ["beneficiaries"],
					refetchType: "all",
				},
				{ throwOnError: true }
			);
		},
	});

	const sourceCurrency = CURRENCIES?.find((currency) => currency.AlphabeticCode === currencies?.source)?.NumericCode;
	const destinationCurrency = CURRENCIES?.find((currency) => currency.AlphabeticCode === currencies?.destination)?.NumericCode;

	const beneficiaryData = {
		name: destinationInfo?.name,
		country: "International",
		account_number: destinationInfo?.account,
		routing_no: destinationInfo?.routing,
		routing_type: "aba",
		bank_name: destinationInfo?.bank,
		currency: currencies?.destination,
		alias: "",
	};

	const initialValues = {
		doc: null,
	};
	const validationSchema = Yup.object().shape({
		doc: Yup.mixed()
			.required("Required")
			.test("is-valid-type", "Not a valid image type", (value) => {
				if (typeof value === "string" || value instanceof String) {
					return true;
				} else {
					return isValidFileType(value && value.name.toLowerCase());
				}
			}),
	});

	const { mutateAsync, isLoading } = useMutation(uploadSupportingDocument);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={async (values) => {
				const yploadResponse = await mutateAsync(values);
				const uploadUrl = yploadResponse?.data?.uploadUrl;

				if (currencies?.source === "NGN") {
					nairaToUSDTransfer({
						amount: amount.source,
						description,
						destinationInfo: { ...destinationInfo, currency: "USD", type: "wire" },
						supporting_doc: uploadUrl,
					});
				} else {
					USDToUSDTransfer({
						amount: amount.source,
						desc: description,
						...destinationInfo,
						currency: "USD",
						type: "wire",
						supporting_doc: uploadUrl,
					});
				}

				if (save) {
					createBeneficiaryMutate(beneficiaryData);
				}
			}}
		>
			{({ values, setFieldValue, handleSubmit }) => (
				<form className="px-2 bg-white" onSubmit={handleSubmit}>
					<h5 className="text-xl font-medium text-grey-title">Transaction Summary</h5>
					<div className="my-5 -m-10 border-t border-gray-100" />
					<div className="grid w-full grid-cols-2 mb-2 flex-start">
						<div className="text-left">
							<span className="block text-sm font-semibold text-gray-500">Recepient name</span>
							<span className="block text-sm text-gray-800 uppercase">{destinationInfo?.name}</span>
						</div>
						<div className="text-right">
							<span className="block text-sm font-semibold text-gray-500">Recipient Account</span>
							<span className="block text-sm text-gray-800">{destinationInfo?.account}</span>
						</div>
					</div>
					<div className="grid w-full grid-cols-2 mb-2 flex-start">
						<div className="text-left">
							<span className="block text-sm font-semibold text-gray-500">Recipient Routing</span>
							<span className="block text-sm text-gray-800">{destinationInfo?.routing}</span>
						</div>
						<div className="text-right">
							<span className="block text-sm font-semibold text-gray-500">Recipient bank</span>
							<span className="block text-sm text-gray-800">{destinationInfo?.bank}</span>
						</div>
					</div>
					<div className="grid w-full grid-cols-2 mb-2 flex-start">
						<div className="text-left">
							<span className="block text-sm font-semibold text-gray-500">You are charged</span>
							<span className="block text-sm text-gray-800">{renderCurrency(amount.source, sourceCurrency)}</span>
						</div>
						<div className="text-right">
							<span className="block text-sm font-semibold text-gray-500">Recipient recieves</span>
							<span className="block text-sm text-gray-800">{renderCurrency(amount.destination, destinationCurrency)}</span>
						</div>
					</div>
					<div>
						<p className="mt-5 mb-2 text-xs font-medium tracking-wider uppercase text-grey-lightGray">Upload Supporting Documents</p>
						{values.doc ? (
							<div className="pb-5 space-y-4 border-b border-gray-200 divide-y">
								<TableRow2 file={values.doc} removeFile={() => setFieldValue("doc", null)} />
							</div>
						) : (
							<div className="flex border border-gray-400 border-dashed rounded-lg">
								<label
									htmlFor="file-upload"
									className="flex items-center justify-center w-full h-24 p-24 text-sm text-center text-gray-400 cursor-pointer"
								>
									Click to browse
									<br />
									or drag and drop your file
								</label>
							</div>
						)}
						<input id="file-upload" type="file" onChange={(e) => setFieldValue("doc", e.target.files[0])} className="hidden" />
						<ErrorMessage name="doc" className="text-red-500 text-[0.8rem]" component="div" />
					</div>
					<div className="flex items-center w-full my-8 space-between gap-x-4">
						<SecondaryBtn placeholder="Back" style={{ width: "50%" }} onClick={() => updateStep(2)} />
						<PrimaryBtn
							placeholder="Continue"
							type="submit"
							style={{ width: "50%", height: "2.5rem" }}
							disabled={isNairaToUSDTransferLoading || isUSDToUSDTransferLoading || isLoading}
							loading={isNairaToUSDTransferLoading || isUSDToUSDTransferLoading || isLoading}
							onClick={() => {}}
						/>
					</div>
				</form>
			)}
		</Formik>
	);
};

const LocalTransfer = ({ toggleModal, updateStep, reset }) => {
	const { destinationInfo, amount, description, save } = useSendContext();
	const queryClient = useQueryClient();

	const closeModal = () => {
		updateStep(1);
		reset();
		toggleModal();
	};

	const { mutate, isLoading } = useMutation(finalizeLocalTransfer, {
		onSuccess: ({ message }) =>
			renderSuccessMessage(message).then(async () => {
				closeModal();
				await queryClient.invalidateQueries(
					{
						queryKey: ["wallet"],
						refetchType: "all",
					},
					{ throwOnError: true }
				);
			}),
	});
	const { mutate: createBeneficiaryMutate } = useMutation(createBeneficiary, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(
				{
					queryKey: ["beneficiaries"],
					refetchType: "all",
				},
				{ throwOnError: true }
			);
		},
	});

	const beneficiaryData = {
		name: destinationInfo?.name,
		country: "Nigeria",
		account_number: destinationInfo?.destinationAccount,
		bank_name: destinationInfo?.destinationBank,
		bank_code: destinationInfo?.bankCode,
		currency: "NGN",
		alias: "",
	};

	return (
		<div className="px-2 bg-white">
			<h5 className="text-xl font-medium text-grey-title">Transaction Summary</h5>
			<div className="my-5 -m-10 border-t border-gray-100" />
			<div className="grid w-full grid-cols-2 mb-2 flex-start">
				<div className="text-left">
					<span className="block text-sm font-semibold text-gray-500">Recepient name</span>
					<span className="block text-sm text-gray-800 uppercase">{destinationInfo?.name}</span>
				</div>
				<div className="text-right">
					<span className="block text-sm font-semibold text-gray-500">Recipient Account Number</span>
					<span className="block text-sm text-gray-800">{destinationInfo?.destinationAccount}</span>
				</div>
			</div>
			<div className="grid w-full grid-cols-2 mb-2 flex-start">
				<div className="text-left">
					<span className="block text-sm font-semibold text-gray-500">Recipient Bank Name</span>
					<span className="block text-sm text-gray-800">{destinationInfo?.destinationBank}</span>
				</div>
				<div className="text-right">
					<span className="block text-sm font-semibold text-gray-500">Recipient Bank Code</span>
					<span className="block text-sm text-gray-800">{destinationInfo?.bankCode}</span>
				</div>
			</div>
			<div className="grid w-full grid-cols-2 mb-2 flex-start">
				<div className="text-left">
					<span className="block text-sm font-semibold text-gray-500">You are charged</span>
					<span className="block text-sm text-gray-800">{renderCurrency(amount.source)}</span>
				</div>
				<div className="text-right">
					<span className="block text-sm font-semibold text-gray-500">Recipient recieves</span>
					<span className="block text-sm text-gray-800">{renderCurrency(amount.destination)}</span>
				</div>
			</div>
			<div className="flex items-center w-full my-8 space-between gap-x-4">
				<SecondaryBtn placeholder="Back" style={{ width: "50%" }} onClick={() => updateStep(2)} />
				<PrimaryBtn
					placeholder="Continue"
					style={{ width: "50%", height: "2.5rem" }}
					disabled={isLoading}
					loading={isLoading}
					onClick={() => {
						mutate({
							amount: amount.source,
							desc: description,
							...destinationInfo,
						});
						if (save) {
							createBeneficiaryMutate(beneficiaryData);
						}
					}}
				/>
			</div>
		</div>
	);
};
