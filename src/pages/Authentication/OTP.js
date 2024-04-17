import React, { useState } from "react";
import OnboardingLayout from "../../components/layouts/OnboardingLayout";
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/buttons/PrimaryBtn";
import { useMutation } from "@tanstack/react-query";
import { resendOTP, verifyAccount } from "../../server";
import { parseError } from "../../helpers";
import { renderSuccessMessage } from "../../helpers/functions";

const OTP = () => {
	const { email } = useParams();
	const navigate = useNavigate();

	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		email,

		otp: "",
	});

	const { mutate: verify, isLoading: verifyLoading } = useMutation(verifyAccount, {
		onSuccess: () => renderSuccessMessage("Account verified, Please login").then(() => navigate("/login")),
	});
	const { mutate: resendMutate } = useMutation(resendOTP, { onSuccess: () => renderSuccessMessage("OTP Resent") });

	const handleOTPandDetailsSubmit = async () => {
		setError("");
		try {
			let empty_fields = Object.keys(formData).map((key) => !!!formData[key] && key.split("_").join(" "));
			empty_fields = empty_fields.filter((field) => !!field);

			if (empty_fields.length > 0) {
				throw Error(`Please fill in the following fields ${empty_fields.join(", ")}`);
			} else {
				if (formData.password !== formData.confirm_password) throw Error("Passwords do not match");

				verify({
					email,
					token: formData.token,
					otp: formData.otp,
				});

				// setToken(formData.token);
			}
		} catch (error) {
			setError(parseError(error));
		}
	};

	return (
		<OnboardingLayout title={`OTP`}>
			<div className="w-full">
				<div className="max-w-lg px-8 py-16 mx-auto">
					<h4 className="text-[34px] text-grey-dark">Verify Account</h4>
					<p className="mb-4 text-blue-offBlue">Please enter OTP to proceed</p>
					{!!error && (
						<div
							onClick={() => setError("")}
							className="flex items-center justify-center w-full p-2 my-4 text-sm text-white transition duration-500 transform bg-red-500"
						>
							{error}
						</div>
					)}
					<div className="w-full space-y-6">
						<OTPInput
							value={formData.otp}
							onChange={(otp) => setFormData((prevState) => ({ ...prevState, otp }))}
							numInputs={6}
							inputStyle={{
								backgroundColor: "#f6f7f9",
								border: "1px solid gray",
								borderRadius: "8px",
								aspectRatio: 1,
								width: "100%",
								marginRight: "0.5rem",
							}}
						/>
						<Button loading={verifyLoading} disabled={verifyLoading} placeholder="Verify" onClick={handleOTPandDetailsSubmit} />
						<p className="mt-4 text-center text-grey-lightGray">
							Didn't get OTP?{" "}
							<button className="" onClick={() => resendMutate({ email: formData?.email })}>
								<span className="cursor-pointer text-blue-ink">Resend OTP</span>
							</button>
						</p>
					</div>
				</div>
			</div>
		</OnboardingLayout>
	);
};

export default OTP;
