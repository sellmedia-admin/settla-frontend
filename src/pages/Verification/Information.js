import React, { useEffect, useState } from "react";
import Verification from "../../components/layouts/Verification";
import MiniBtn from "../../components/buttons/MiniBtn";
import { createFintechBusiness, createFintechPerson, createVirtualAccount } from "../../server";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { ErrorMessage, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UploadSuccessModal from "../../components/success/Upload";
import TextInput from "../../components/inputs/TextInput";
import * as Yup from "yup";
import { renderErrorMessage } from "../../helpers/functions";

const validationSchema = Yup.object().shape({
	dob: Yup.date().required("Please provide your date of birth"),
	addressLine: Yup.string().required("Please provide your adress"),
	addressCity: Yup.string().required("Please provide your address city"),
	addressState: Yup.string().required("Please provide your address state"),
});

const Information = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [modalStatus, setModalStatus] = useState(false);

	useEffect(() => {
		if (user?.paymentAccountDetails?.length >= 1) navigate("/dashboard");
	}, [navigate, user]);

	const { mutateAsync: createFintechPersonAsync, isLoading: isCreateFintechPersonLoading } = useMutation(createFintechPerson);
	const { mutateAsync: createFintechBusinessAsync, isLoading: isCreateFintechBusinessLoading } = useMutation(createFintechBusiness);
	const { mutateAsync: createVirtualAccountAsync, isLoading: isCreateVirtualAccountLoading } = useMutation(createVirtualAccount, {
		onSuccess: () => setModalStatus(true),
	});

	const initialValues = {
		firstName: user?.profile?.firstName,
		lastName: user?.profile?.lastName,
		phoneNumber: user?.profile?.phoneNumber,
		email: user?.email,

		countryId: "NG",
		addressCountry: "NG",

		IDLevel: "primary",
		IdType: user?.docs_kyc?.type,
		IDnumber: user?.docs_kyc?.id_number,
		bvn: user?.docs_kyc?.bvn,

		dob: "",
		addressLine: "",
		addressCity: "",
		addressState: "",
		addressZip: "",
	};

	return (
		<Verification>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					const { addressLine, addressCity, addressState, addressCountry, addressZip } = values;
					try {
						await createFintechPersonAsync(values);
						await createFintechBusinessAsync({
							dof: user?.profile?.dof,
							addressLine: addressLine,
							addressCity: addressCity,
							addressState: addressState,
							addressCountry: addressCountry,
							addressZip: addressZip,
						});
						await createVirtualAccountAsync({
							type: "business_virtual",
							label: `${user?.profile?.business_name} Virtual`,
							currency: "NGN",
							autosweep_enabled: false,
							business: true,
						});
					} catch (error) {
						renderErrorMessage(error.message ?? "An error occured", 5000);
						await queryClient.invalidateQueries(
							{
								queryKey: ["user"],
								refetchType: "all",
							},
							{ throwOnError: true }
						);
					}
				}}
			>
				{({ values, handleSubmit, handleChange, submitForm }) => (
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col items-center justify-center space-y-4">
							<div className="w-full space-y-4">
								<div className="space-y-2 text-center">
									<h4 className="text-[20px]">Personal Information</h4>
									<p className="text-[18px] mb-4 text-blue-offBlue pb-5">Complete registration process with valid information</p>
								</div>

								<div>
									<TextInput label="Date of Birth" type="date" name="dob" value={values.dob} onChange={handleChange} />
									<ErrorMessage name="dob" className="text-red-500 text-[0.8rem]" component="div" />
								</div>

								<div>
									<TextInput label="Address" type="text" name="addressLine" value={values.addressLine} onChange={handleChange} />
									<ErrorMessage name="addressLine" className="text-red-500 text-[0.8rem]" component="div" />
								</div>
								
								<div>
									<TextInput label="State" type="text" name="addressState" value={values.addressState} onChange={handleChange} />
									<ErrorMessage name="addressState" className="text-red-500 text-[0.8rem]" component="div" />
								</div>

								<div className="grid gap-4 min-[800px]:grid-cols-2">
									<div>
										<TextInput label="City" type="text" name="addressCity" value={values.addressCity} onChange={handleChange} />
										<ErrorMessage name="addressCity" className="text-red-500 text-[0.8rem]" component="div" />
									</div>

									<div>
										<TextInput label="Zip Code" type="text" name="addressZip" value={values.addressZip} onChange={handleChange} />
										<ErrorMessage name="addressZip" className="text-red-500 text-[0.8rem]" component="div" />
									</div>
								</div>

								<div className="flex justify-center w-full">
									<MiniBtn
										loading={isCreateFintechPersonLoading || isCreateVirtualAccountLoading || isCreateFintechBusinessLoading}
										placeholder="Continue"
										onClick={submitForm}
										type="button"
									/>
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
								navigate("/dashboard");
								setModalStatus(false);
							}}
						/>
					</form>
				)}
			</Formik>
		</Verification>
	);
};

export default Information;
