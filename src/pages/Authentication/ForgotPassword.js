import Button from "../../components/buttons/PrimaryBtn";
import OnboardingLayout from "../../components/layouts/OnboardingLayout";
import TextInput from "../../components/inputs/TextInput";
import { useState } from "react";
import { parseError } from "../../helpers";
import ErrorBox from "../../components/ErrorBox";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../server";
import { renderSuccessMessage } from "../../helpers/functions";

const ForgotPassword = () => {
	const [errorMessage, setErrorMessage] = useState("");

	const [formData, setFormData] = useState({
		email: "",
	});

	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const { mutate, isLoading } = useMutation(forgotPassword, {
		onSuccess: ({ message }) => renderSuccessMessage(message),
	});

	const handleSubmit = (e) => {
		setErrorMessage("");
		try {
			let empty_fields = Object.keys(formData).map((key) => !!!formData[key] && key.split("_").join(" "));
			empty_fields = empty_fields.filter((field) => !!field);

			if (empty_fields.length > 0) {
				throw Error(`Please fill in the following fields ${empty_fields.join(", ")}`);
			} else {
				mutate(formData);
			}
		} catch (err) {
			setErrorMessage(parseError(err));
		}
	};

	return (
		<OnboardingLayout title="Forgot Password">
			<div className="flex flex-col justify-center w-full h-[70vh] max-w-md p-8 mx-auto">
				<div>
					<h4 className="text-[34px] text-grey-dark">Forgot Password</h4>
					<p className="text-blue-offBlue">Please enter your email to proceed.</p>
				</div>

				<ErrorBox errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
				<div className="w-full mt-12 mb-6 space-y-4">
					<TextInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
				</div>
				<Button loading={isLoading} disabled={isLoading} placeholder="Reset Password" onClick={handleSubmit} />
				<p className="mt-4 text-center text-grey-lightGray">
					Remembered your password?{" "}
					<Link to="/login/">
						<span className="cursor-pointer text-blue-ink">Login</span>
					</Link>
				</p>
			</div>
		</OnboardingLayout>
	);
};

export default ForgotPassword;
