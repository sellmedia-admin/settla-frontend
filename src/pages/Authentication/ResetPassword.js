import Button from "../../components/buttons/PrimaryBtn";
import OnboardingLayout from "../../components/layouts/OnboardingLayout";
import TextInput from "../../components/inputs/TextInput";
import { useState } from "react";
import { parseError } from "../../helpers";
import ErrorBox from "../../components/ErrorBox";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../server";
import { useLocation, useNavigate } from "react-router-dom";
import { renderSuccessMessage } from "../../helpers/functions";

const ResetPassword = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState("");

	const [formData, setFormData] = useState({
		password: "",
		confirm_password: "",
	});

	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const { mutate, isLoading } = useMutation(resetPassword, {
		onSuccess: ({ message }) => renderSuccessMessage(message).then(() => navigate("/login")),
	});

	const handleSubmit = (e) => {
		setErrorMessage("");
		try {
			let empty_fields = Object.keys(formData).map((key) => !!!formData[key] && key.split("_").join(" "));
			empty_fields = empty_fields.filter((field) => !!field);

			if (empty_fields.length > 0) {
				throw Error(`Please fill in the following fields ${empty_fields.join(", ")}`);
			} else if (formData.password !== formData.confirm_password) {
				throw Error(`Passwords must match`);
			} else {
				mutate({ token: location.search.token, data: formData });
			}
		} catch (err) {
			setErrorMessage(parseError(err));
		}
	};

	return (
		<OnboardingLayout title="Reset Password">
			<div className="flex flex-col justify-center w-full h-full max-w-md p-8 mx-auto">
				<div>
					<h4 className="text-[34px] text-grey-dark">Reset Password</h4>
				</div>

				<ErrorBox errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
				<div className="w-full mt-12 mb-6 space-y-4">
					<TextInput label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
					<TextInput
						label="Confirm Password"
						type="password"
						name="confirm_password"
						value={formData.confirm_password}
						onChange={handleChange}
					/>
				</div>
				<Button loading={isLoading} disabled={isLoading} placeholder="Reset Password" onClick={handleSubmit} />
			</div>
		</OnboardingLayout>
	);
};

export default ResetPassword;
