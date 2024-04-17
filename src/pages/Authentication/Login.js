import Button from "../../components/buttons/PrimaryBtn";
import OnboardingLayout from "../../components/layouts/OnboardingLayout";
import TextInput from "../../components/inputs/TextInput";
import { useState } from "react";
import { parseError } from "../../helpers";
import ErrorBox from "../../components/ErrorBox";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../server";

const Login = () => {
	const { setToken, setUser, setTeam } = useAuthContext();
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState("");

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const { mutate, isLoading } = useMutation(login, {
		onSuccess: ({ data }) => {
			setUser(data?.profile?.at(0));
			setToken(data?.auth_token?.token);
			if (data?.user) {
				setTeam(data?.user);
			}
		},
		onError: (error, variables) => {
			if (error.message === "Account not verified yet") {
				navigate(`/otp/${variables?.email}`);
			}
		},
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
		<OnboardingLayout title="SIgn In">
			<div className="flex flex-col justify-center w-full h-full max-w-md p-8 mx-auto">
				<div>
					<h4 className="text-[34px] text-grey-dark">Sign in</h4>
					<p className="text-blue-offBlue">Please enter your credentials to proceed.</p>
				</div>

				<ErrorBox errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
				<div className="w-full mt-12 mb-6 space-y-4">
					<TextInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
					<TextInput
						label="Password"
						type="password"
						withLink="Forgot Password?"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<Button loading={isLoading} disabled={isLoading} placeholder="Sign in" onClick={handleSubmit} />
				<p className="mt-4 text-center text-grey-lightGray">
					Don't have an account?{" "}
					<Link to="/signup/">
						<span className="cursor-pointer text-blue-ink">Sign up</span>
					</Link>
				</p>
			</div>
		</OnboardingLayout>
	);
};

export default Login;
