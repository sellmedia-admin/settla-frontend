import TransactionsModal from "../Modal";
import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { editPermission } from "../../../server";
import { renderSuccessMessage } from "../../../helpers/functions";
import TextInput from "../../inputs/TextInput";
import SelectInput from "../../inputs/SelectInput";

export default function MemberPermission({ status, toggleModal, refetch, row }) {
	const initialValues = {
		level: row?.permission_level,
		memberId: row?.id,
	};
	const validationSchema = Yup.object().shape({
		level: Yup.string().required("Select a permission level for user"),
	});

	const { mutate, isLoading: mutateLoading } = useMutation(editPermission, {
		onSuccess: ({ message }) =>
			renderSuccessMessage(message).then(() => {
				refetch();
				toggleModal();
			}),
	});

	return (
		<TransactionsModal status={status} closeModal={toggleModal}>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => mutate(values)}>
				{({ values, handleSubmit, submitForm, handleChange }) => (
					<form className="px-2 bg-white" onSubmit={handleSubmit}>
						<h5 className="text-xl font-medium text-grey-title">Edit Member Pemissions</h5>
						<p className="text-sm leading-7 text-grey-title">Input user email</p>

						<TextInput label="Email Address" type="email" name="email" value={row?.email} disabled />

						<SelectInput
							label="Permission Level"
							data={[
								{ label: 1, key: 1 },
								{ label: 2, key: 2 },
								{ label: 3, key: 3 },
							]}
							name="level"
							value={values.level}
							onChange={handleChange}
						/>
						<ErrorMessage name="level" component="div" className="text-red-500" />

						<div className="flex items-center w-full my-8 space-between gap-x-4">
							<SecondaryBtn type="button" placeholder="Cancel" style={{ width: "50%" }} onClick={() => toggleModal()} />
							<PrimaryBtn
								type="button"
								placeholder="Save"
								style={{ width: "50%", height: "2.5rem" }}
								disabled={mutateLoading}
								loading={mutateLoading}
								onClick={() => submitForm()}
							/>
						</div>
					</form>
				)}
			</Formik>
		</TransactionsModal>
	);
}
