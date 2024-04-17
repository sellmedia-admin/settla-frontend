import { addDays, format } from "date-fns";
import { Formik } from "formik";
import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { useSearchParams } from "react-router-dom";

const filterDateUrlKeys = ["endDate", "startDate"];

const FilterByDate = React.forwardRef((props, ref) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const initialValues = {
		range: [
			{
				startDate: null,
				endDate: null,
				key: "selection",
				color: "var(--primary-color)",
			},
		],
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values) => {
				const data = {
					startDate: !!values.range[0].startDate ? format(values.range[0].startDate, "yyyy-MM-dd") : null,
					endDate: !!values.range[0].endDate ? format(values.range[0].endDate, "yyyy-MM-dd") : null,
				};

				// remove keys that have empty strings
				for (const key in data) {
					if (!data[key]) {
						delete data[key];
					}
				}

				// remove all keys
				filterDateUrlKeys.forEach((key) => searchParams.delete(key));

				// save to url
				Object.entries(data).forEach((entry) => {
					const [key, value] = entry;
					searchParams.set(key, value);
				});
				setSearchParams(searchParams);
			}}
		>
			{({ values, handleSubmit, setFieldValue, resetForm, submitForm }) => {
				return (
					<form onSubmit={handleSubmit} ref={ref}>
						<DateRange
							editableDateInputs={true}
							color="var(--primary)"
							onChange={(item) => {
								setFieldValue("range", [item.selection]);
							}}
							moveRangeOnFirstSelection={false}
							dateDisplayFormat="dd-MM-yyyy"
							ranges={values.range}
							maxDate={addDays(new Date(), 1)}
						/>
						<div className="flex gap-1">
							<button
								type="button"
								className="px-4 py-2 m-0 ml-auto border rounded-md btn-form-neutral border-primary text-primary"
								onClick={() => {
									resetForm();
									submitForm();
								}}
							>
								Clear
							</button>
							<button type="submit" className="px-4 py-2 m-0 text-white rounded-md btn-form-primary h-fit bg-primary">
								Apply
							</button>
						</div>
					</form>
				);
			}}
		</Formik>
	);
});

export default FilterByDate;
