import TransactionsModal from "../Modal";
import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { createTeam } from "../../../server";
import { renderSuccessMessage } from "../../../helpers/functions";
import TextInput from "../../inputs/TextInput";

export default function CreateTeam({ status, toggleModal, refetch }) {
	const initialValues = {
		name: "",
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Input team name"),
	});

	const { mutate, isLoading: mutateLoading } = useMutation(createTeam, {
		onSuccess: ({ message }) =>
			renderSuccessMessage(message).then(() => {
				refetch();
				toggleModal();
			}),
	});

	return (
		<TransactionsModal status={status} closeModal={toggleModal}>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => mutate(values)}>
				{({ handleChange, handleSubmit, submitForm, values }) => (
					<form className="px-2 bg-white" onSubmit={handleSubmit}>
						<h5 className="text-xl font-medium text-grey-title">Create Team</h5>
						<p className="text-sm leading-7 text-grey-title">Create your team</p>
						<TextInput label="Enter team name" placeholder="Enter team name" name="name" value={values.name} onChange={handleChange} />
						<ErrorMessage name="name" component="div" className="text-red-500" />
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
