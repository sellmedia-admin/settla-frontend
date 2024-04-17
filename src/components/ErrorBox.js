import React from "react";

const ErrorBox = ({ errorMessage, setErrorMessage }) => {
	return (
		!!errorMessage && (
			<div
				onClick={() => setErrorMessage("")}
				className="flex items-center justify-center w-full p-2 my-4 text-sm text-white transition duration-500 transform bg-red-500"
			>
				{errorMessage}
			</div>
		)
	);
};

export default ErrorBox;
