import React, { useEffect, useState } from "react";
import Verification from "../../components/layouts/Verification";
import MiniBtn from "../../components/buttons/MiniBtn";
import { updateUserWhenLoggedIn, uploadKYC } from "../../server";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { ErrorMessage, Formik } from "formik";
import { TableRow2 } from "../../components/upload-modal/TableRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UploadSuccessModal from "../../components/success/Upload";
import TextInput from "../../components/inputs/TextInput";
import * as Yup from "yup";
import { isValidFileType } from "../../helpers/functions";
import SelectInput from "../../components/inputs/SelectInput";

const businessTypes = [
	{ key: "", label: "Select business Type" },
	{ key: "soleProprietor", label: "Sole Proprietorship" },
	{ key: "singleMemberLLC", label: "Single Member LLC" },
	{ key: "limitedLiabilityCompany", label: "Limited Liability Company" },
	{ key: "generalPartnership", label: "General Partnership" },
	{ key: "unlistedCorporation", label: "Unlisted Corporation" },
	{ key: "publiclyTradedCorporation", label: "Publicly Traded Corporation" },
	{ key: "association", label: "Association" },
	{ key: "nonProfit", label: "NonProfit" },
	{ key: "governmentOrganization", label: "Government Organization" },
	{ rekey: "vocableTrust", label: "Vocable Trust" },
	{ key: "irrevocableTrust", label: "Irrevocable Trust" },
	{ key: "estate", label: "Estate" },
	{ key: "limitedPartnership", label: "Limited Partnership" },
	{ key: "limited", label: "Limited" },
	{ key: "LiabilityPartnership", label: "Liability Partnership" },
];

const PersonalVerification = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!(user?.paymentAccountDetails?.length >= 1) && !!user?.docs_kyc?.upload_link) navigate("/dashboard");
	}, [navigate, user]);

	const [modalStatus, setModalStatus] = useState(false);

	const { mutateAsync: uploadAsync, isLoading } = useMutation(uploadKYC);
	const { mutateAsync: updateAsync, isLoading: updateLoading } = useMutation(updateUserWhenLoggedIn);

	const initialValues = {
		id: user?.kyc?.id,
		doc: null,
		type: "passport",
		bvn: "",
		id_number: "",
		business_id: "",
		business_type: "",
		dof: "",
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
		type: Yup.string().required("Please provide the type of your ID"),
		id_number: Yup.string().required("Please provide the unique number of your ID"),
		bvn: Yup.string().required("Please provide your bvn"),
		business_id: Yup.string().required("Please provide your business EIN").length(9, "Please provide a valid EIN"),
		business_type: Yup.string().required("Please provide your business type"),
		dof: Yup.string().required("Please provide your businesses founding data"),
	});

	return (
		<Verification>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async ({ business_id, business_type, dof, ...values }) => {
					await updateAsync({ business_id, business_type, dof });
					await uploadAsync(values);
					setModalStatus(true);
				}}
			>
				{({ values, handleSubmit, handleChange, setFieldValue, submitForm }) => (
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col items-center justify-center space-y-4">
							<div className="w-full space-y-4">
								<div className="space-y-2 text-center">
									<h4 className="text-[20px]">Verify my Account</h4>
								</div>

								<div>
									<TextInput
										label="Business EIN"
										type="text"
										name="business_id"
										value={values.business_id}
										onChange={handleChange}
									/>
									<ErrorMessage name="business_id" className="text-red-500 text-[0.8rem]" component="div" />
								</div>

								<div>
									<SelectInput
										label="Business type"
										data={businessTypes}
										name="business_type"
										value={values.business_type}
										onChange={handleChange}
									/>
									<ErrorMessage name="business_type" className="text-red-500 text-[0.8rem]" component="div" />
								</div>

								<div>
									<TextInput label="Date of Founding" type="date" name="dof" value={values.dof} onChange={handleChange} />
									<ErrorMessage name="dof" className="text-red-500 text-[0.8rem]" component="div" />
								</div>

								<div>
									<TextInput label="Passport ID" type="text" name="id_number" value={values.id_number} onChange={handleChange} />
									<ErrorMessage name="id_number" className="text-red-500 text-[0.8rem]" component="div" />
								</div>

								<div>
									<TextInput label="BVN" type="text" name="bvn" value={values.bvn} onChange={handleChange} />
									<ErrorMessage name="bvn" className="text-red-500 text-[0.8rem]" component="div" />
								</div>

								<div>
									<p className="my-2 text-xs font-medium tracking-wider uppercase text-grey-lightGray">Upload Passport Data Page</p>
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
									<input
										id="file-upload"
										type="file"
										onChange={(e) => setFieldValue("doc", e.target.files[0])}
										className="hidden"
									/>
									<ErrorMessage name="doc" className="text-red-500 text-[0.8rem]" component="div" />
								</div>

								<div className="flex justify-center w-full">
									<MiniBtn loading={isLoading || updateLoading} placeholder="Continue" onClick={submitForm} type="button" />
								</div>
							</div>
						</div>

						<UploadSuccessModal
							status={modalStatus}
							closeModal={async () => {
								await queryClient.invalidateQueries(
									{
										queryKey: ["user"],
										refetchType: "all",
									},
									{ throwOnError: true }
								);
								navigate("/verification/info");
								setModalStatus(false);
							}}
						/>
					</form>
				)}
			</Formik>
		</Verification>
	);
};

export default PersonalVerification;
