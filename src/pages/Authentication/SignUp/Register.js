import { useEffect, useState } from "react";
import OnboardingLayout from "../../../components/layouts/OnboardingLayout";
import TextInput from "../../../components/inputs/TextInput";
import SelectInput from "../../../components/inputs/SelectInput";
import Button from "../../../components/buttons/PrimaryBtn";
import { Countries } from "../../../helpers/constants";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  register,
  resendOTP,
  updateUser,
  verifyAccount,
} from "../../../server";
import { useAuthContext } from "../../../context/AuthContext";
import OTPInput from "react-otp-input";
import { renderSuccessMessage } from "../../../helpers/functions";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

const sortBy = (label) => {
  return function (a, b) {
    if (a[label] < b[label]) return -1;
    if (a[label] > b[label]) return 1;
    return 0;
  };
};
const signupInitialValues = {
  email: "",
  password: "",
  confirm_password: "",
  country: "Nigeria",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  business_name: "",

  business_id_type: "ein",
  industry: "",
  zip: "",
  agree_to_terms: false,
};
const otpInitialValues = {
  otp: "",
};
const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please provide a valid email")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
  confirm_password: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password")], "Passwords dont match"),
  country: Yup.string().required("This field is required"),
  phoneNumber: Yup.string().required("This field is required"),
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  business_name: Yup.string().required("This field is required"),

  business_id_type: Yup.string().required("This field is required"),
  industry: Yup.string().required("This field is required"),
  zip: Yup.string().required("This field is required"),
  agree_to_terms: Yup.boolean().required("This field is required"),
});
const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("This field is required")
    .length(6, "Otp must be 6 digits long"),
});

const country_arr = Object.values(Countries).map((code) => ({
  label: code,
  key: code,
}));

const Register = () => {
  const { setToken, setUser, user } = useAuthContext();
  console.log(`get current user email context ${JSON.stringify(user)}`);

  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [apiToken, setApiToken] = useState("");

  const { mutateAsync: registerAsync, isLoading: registerLoading } =
    useMutation(register);

  const { mutateAsync: verifyAsync, isLoading: verifyLoading } =
    useMutation(verifyAccount);

  const { mutate: resendMutate } = useMutation(resendOTP, {
    onSuccess: () => renderSuccessMessage("OTP Resent"),
  });

  const { mutateAsync: updateAsync, isLoading: updateLoading } =
    useMutation(updateUser);

  useEffect(() => {
    setError(error);
  }, [error, setError]);

  return (
    <OnboardingLayout title={`Sign Up`}>
      <div className="w-full">
        <div className="max-w-lg md:px-8 px-4 md:py-10 py-4 mx-auto">
          
          {!!error && (
            <div
              onClick={() => setError("")}
              className="flex items-center justify-center w-full p-2 my-4 text-sm text-white transition duration-500 transform bg-red-500"
            >
              {error}
            </div>
          )}
          {!step ? (
            <Formik
              initialValues={signupInitialValues}
              validationSchema={signupValidationSchema}
              onSubmit={async (values) => {
                const registerResponse = await registerAsync({
                  email: values.email,
                  password: values.password,
                  role: "user",
                });

                const rawProfile = await updateAsync({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  country: values.country,
                  business_name: values.business_name,
                  business_id_type: values.business_id_type,
                  industry: values.industry,
                  zip: values.zip,
                  phoneNumber: values.phoneNumber,
                  token: registerResponse?.data?.auth_token?.token,
                });

                setApiToken(registerResponse?.data?.auth_token?.token);

                console.log(
                  `set user token and other informaton ${JSON.stringify(
                    registerResponse?.data?.profile
                  )}`
                );

                console.log(
                  `Set user Data ${JSON.stringify({
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                  })}`
                );

                setUser({
                  email: values.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                });
                setStep(1);
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                  <div className="text-center">
                    <h4 className="text-[24px] text-grey-dark">Create Account</h4>
                    <p className="text-[18px] mb-4 text-blue-offBlue">Complete registration with your valid credentials</p>
                  </div>
                  <div className="grid gap-4 min-[800px]:grid-cols-2">
                    <div>
                      <TextInput
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="firstName"
                        className="text-red-500 text-[0.8rem]"
                        component="div"
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="firstName"
                        className="text-red-500 text-[0.8rem]"
                        component="div"
                      />
                    </div>
                  </div>
                  <div>
                    <SelectInput
                      label="Country"
                      data={country_arr.sort(sortBy("label"))}
                      type="countries"
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="country"
                      className="text-red-500 text-[0.8rem]"
                      component="div"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Business Name"
                      type="text"
                      name="business_name"
                      value={values.business_name}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="business_name"
                      className="text-red-500 text-[0.8rem]"
                      component="div"
                    />
                  </div>
                  <div className="grid gap-4 min-[800px]:grid-cols-2">
                    <div>
                      <TextInput
                        label="Industry"
                        type="text"
                        name="industry"
                        value={values.industry}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="industry"
                        className="text-red-500 text-[0.8rem]"
                        component="div"
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Zip Code"
                        type="text"
                        name="zip"
                        value={values.zip}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="zip"
                        className="text-red-500 text-[0.8rem]"
                        component="div"
                      />
                    </div>
                  </div>
                  <div>
                    <TextInput
                      label="Work Email Address"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="email"
                      className="text-red-500 text-[0.8rem]"
                      component="div"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Phone Number"
                      type="text"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      className="text-red-500 text-[0.8rem]"
                      component="div"
                    />
                  </div>
                  <div className="grid gap-4 min-[800px]:grid-cols-2">
                    <div>
                      <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="password"
                        className="text-red-500 text-[0.8rem]"
                        component="div"
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Confirm Password"
                        type="password"
                        name="confirm_password"
                        value={values.confirm_password}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="confirm_password"
                        className="text-red-500 text-[0.8rem]"
                        component="div"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-4">
                      <input
                        name="agree_to_terms"
                        type="checkbox"
                        value={values.agree_to_terms}
                        onClick={handleChange}
                      />
                      <span className="text-grey-dark ">
                        I agree to the terms & conditions
                      </span>
                    </div>
                    <ErrorMessage
                      name="agree_to_terms"
                      className="text-red-500 text-[0.8rem]"
                      component="div"
                    />
                  </div>
                  <Button
                    type="submit"
                    loading={registerLoading}
                    disabled={registerLoading}
                    placeholder="Sign Up"
                  />
                  <p className="mt-4 text-center text-grey-lightGray">
                    Already have an account?{" "}
                    <Link to="/login/">
                      <span className="cursor-pointer text-blue-ink">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={otpInitialValues}
              validationSchema={otpValidationSchema}
              onSubmit={async (values) => {
                await verifyAsync({
                  token: apiToken,
                  email: user?.email,
                  otp: values.otp,
                });

                setToken(apiToken);
              }}
            >
              {({ values, setFieldValue, handleSubmit }) => (
                <form className="w-full h-[55vh] space-y-6" onSubmit={handleSubmit}>
                  <div className="text-center">
                    <h4 className="text-[24px] text-grey-dark">Verify Email</h4>
                    <p className="text-[18px] mb-4 text-blue-offBlue pb-5">An OTP has been sent to your registered email address</p>
                  </div>
                  <div>
                    <OTPInput
                      value={values.otp}
                      onChange={(otp) => setFieldValue("otp", otp)}
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
                    <ErrorMessage
                      name="otp"
                      className="text-red-500 text-[0.8rem]"
                      component="div"
                    />
                  </div>
                  <Button
                    loading={verifyLoading || updateLoading}
                    disabled={verifyLoading || updateLoading}
                    placeholder="Verify OTP"
                    type="submit"
                  />
                  <p className="mt-4 text-center text-grey-lightGray">
                    Didn't get OTP?{" "}
                    <button
                      className=""
                      onClick={() => resendMutate({ email: user?.email })}
                    >
                      <span className="cursor-pointer text-black">
                        Resend OTP
                      </span>
                    </button>
                  </p>
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Register;
