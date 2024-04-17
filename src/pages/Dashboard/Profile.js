import React, { useState } from "react";
import Avatar from "boring-avatars";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import SecondaryBtn from "../../components/buttons/SecondaryBtn";
import MaterialInput from "../../components/inputs/MaterialInput";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";
import UploadModal from "../../components/upload-modal";

import { useAuthContext } from "../../context/AuthContext";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updateUserPassword, updateUserWhenLoggedIn } from "../../server";
import { renderSuccessMessage } from "../../helpers/functions";

const userValidationSchema = Yup.object().shape({
	firstName: Yup.string().required("Please provide your first name"),
	lastName: Yup.string().required("Please provide your last name"),
});
const passwordValidationSchema = Yup.object().shape({
	oldPassword: Yup.string().required("Please provide your old password"),
	newPassword: Yup.string().required("Please provide your new password"),
});

const Profile = ({ query }) => {
	const { user } = useAuthContext();

	const [showUpload, setShowUpload] = useState(false);

	const userInitialValues = {
		firstName: user?.profile?.firstName ?? "",
		lastName: user?.profile?.lastName ?? "",
		email: user?.email ?? "",
	};
	const passwordInitialValues = {
		oldPassword: "",
		newPassword: "",
	};

	const { mutate: userMutate, isLoading: userLoading } = useMutation(updateUserWhenLoggedIn, {
		onSuccess: ({ message }) => renderSuccessMessage(message).then(() => window.location.reload()),
	});
	const { mutate: passwordMutate, isLoading: passwordLoading } = useMutation(updateUserPassword, {
		onSuccess: ({ message }) => renderSuccessMessage(message),
	});

	return (
		<DashboardLayout title="Profile" sidebar="inner">
			<Formik initialValues={userInitialValues} validationSchema={userValidationSchema} onSubmit={({ email, ...values }) => userMutate(values)}>
				{({ values, handleChange, handleSubmit, submitForm, setFieldValue }) => {
					const handleAvatarUpload = (upload) => {
						const file = upload[0][0];
						setFieldValue(
							"avatar",
							Object.assign(file, {
								preview: URL.createObjectURL(file),
							})
						);
						setShowUpload(false);
					};

					return (
						<form className="w-full max-w-screen-lg" onSubmit={handleSubmit}>
							<div className="flex items-center mb-6 flex-start gap-x-8">
								{values?.avatar ? (
									<img
										src={values?.avatar?.preview}
										className="w-24 h-24 rounded"
										width="96px"
										height="96px"
										objectFit="cover"
										alt="cover"
										objectPosition="top"
									/>
								) : (
									<Avatar size={"6rem"} name="Amelia Earhart" variant="beam" colors={["#00BCB0", "#5630FF"]} />
								)}
								<SecondaryBtn placeholder="Upload" color="text-primary" onClick={() => setShowUpload(true)} />
								{!!values.avatar && <SecondaryBtn placeholder="Remove" onClick={() => setFieldValue("avatar", null)} />}
							</div>
							<div>
								<p className="text-xs text-gray-400">{values.avatar && values.avatar.name}</p>
							</div>
							<div className="items-center w-full md:flex gap-x-6 md:w-1/2">
								<MaterialInput
									container="w-full md:w-1/2"
									label="First name"
									placeholder="Enter first name"
									name="firstName"
									value={values.firstName}
									onChange={handleChange}
								/>
								<MaterialInput
									container="w-full md:w-1/2 mt-8 md:mt-0"
									label="Last name"
									placeholder="Enter last name"
									name="lastName"
									value={values.lastName}
									onChange={handleChange}
								/>
							</div>
							<div className="flex items-center w-full mt-6 gap-x-6 md:w-1/2">
								<MaterialInput
									container="w-full md:w-1/2"
									label="Email address"
									placeholder="Enter Email address"
									name="email"
									value={values.email}
									disabled
								/>
							</div>
							<ErrorMessage name="firstName" component="div" className="text-red-500 text-[0.65rem]" />
							<ErrorMessage name="lastName" component="div" className="text-red-500 text-[0.65rem]" />
							<div className="my-8">
								<PrimaryBtn
									placeholder="Update"
									width="w-32"
									onClick={submitForm}
									loading={userLoading}
									disabled={userLoading}
									type="button"
								/>
							</div>
							<UploadModal
								isOpen={showUpload}
								setIsOpen={setShowUpload}
								name="personal_documents"
								handleComplete={handleAvatarUpload}
								multiple={false}
							/>
						</form>
					);
				}}
			</Formik>
			<div className="w-full h-px mb-8 border-t border-gray-200" />
			<Formik initialValues={passwordInitialValues} validationSchema={passwordValidationSchema} onSubmit={(values) => passwordMutate(values)}>
				{({ values, handleChange, handleSubmit, submitForm }) => (
					<form className="w-full max-w-screen-lg" onSubmit={handleSubmit}>
						<h3 className="mb-6 text-sm font-medium text-title">Change password</h3>
						<div className="items-center w-full md:flex gap-x-6 md:w-1/2">
							<MaterialInput
								type="password"
								container="w-full md:w-1/2"
								label="Old password"
								placeholder="Enter old password"
								name="oldPassword"
								value={values.oldPassword}
								onChange={handleChange}
							/>
							<MaterialInput
								type="password"
								container="w-full md:w-1/2 mt-8 md:mt-0"
								label="New password"
								placeholder="Enter new password"
								name="newPassword"
								value={values.newPassword}
								onChange={handleChange}
							/>
						</div>
						<ErrorMessage name="oldPassword" component="div" className="text-red-500 text-[0.65rem]" />
						<ErrorMessage name="newPassword" component="div" className="text-red-500 text-[0.65rem]" />
						<div className="my-8">
							<PrimaryBtn
								placeholder="Change password"
								width="w-48"
								onClick={submitForm}
								loading={passwordLoading}
								disabled={passwordLoading}
								type="button"
							/>
						</div>
					</form>
				)}
			</Formik>
		</DashboardLayout>
	);
};

export default Profile;
