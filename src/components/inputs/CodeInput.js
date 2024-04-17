import React, { useEffect, useRef, useState } from "react";

const CodeInput = ({ setValue, value }) => {
	let boxOne = useRef();
	let boxTwo = useRef();
	let boxThree = useRef();
	let boxFour = useRef();

	const [inputBoxes, setInputBoxes] = useState({
		boxOne: "",
		boxTwo: "",
		boxThree: "",
		boxFour: "",
	});

	const handleChange = (e) => {
		setInputBoxes({
			...inputBoxes,
			[e.target.name]: e.target.value,
		});

		if (e.target.value.length === 1) {
			if (e.target.name === "boxOne") boxTwo.focus();
			if (e.target.name === "boxTwo") boxThree.focus();
			if (e.target.name === "boxThree") boxFour.focus();
		}
		if (e.target.value.length === 0) {
			if (e.target.name === "boxTwo") boxOne.focus();
			if (e.target.name === "boxThree") boxTwo.focus();
			if (e.target.name === "boxFour") boxThree.focus();
		}
	};

	useEffect(() => {
		setValue(inputBoxes);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputBoxes]);

	return (
		<div className="flex space-x-4 md:space-x-8">
			<input
				className="w-16 text-center bg-grey-offWhite h-14"
				type="tel"
				maxLength={1}
				name="boxOne"
				ref={(input) => (boxOne = input)}
				onChange={handleChange}
				value={inputBoxes.boxOne}
			/>
			<input
				className="w-16 text-center bg-grey-offWhite h-14"
				type="tel"
				maxLength={1}
				name="boxTwo"
				ref={(input) => (boxTwo = input)}
				onChange={handleChange}
				value={inputBoxes.boxTwo}
			/>
			<input
				className="w-16 text-center bg-grey-offWhite h-14"
				type="tel"
				maxLength={1}
				name="boxThree"
				ref={(input) => (boxThree = input)}
				onChange={handleChange}
				value={inputBoxes.boxThree}
			/>
			<input
				className="w-16 text-center bg-grey-offWhite h-14"
				type="tel"
				maxLength={1}
				name="boxFour"
				ref={(input) => (boxFour = input)}
				onChange={handleChange}
				value={inputBoxes.boxFour}
			/>
		</div>
	);
};

export default CodeInput;
