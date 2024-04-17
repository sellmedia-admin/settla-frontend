import TransactionsModal from "../Modal";
import PrimaryBtn from "../../buttons/PrimaryBtn";
import SecondaryBtn from "../../buttons/SecondaryBtn";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { addTeamMember } from "../../../server";
import { renderSuccessMessage } from "../../../helpers/functions";
import TextInput from "../../inputs/TextInput";
import { useAuthContext } from "../../../context/AuthContext";

export default function AddMember({ status, toggleModal, refetch }) {
	const { user } = useAuthContext();

	const initialValues = {
		email: "",
		teamId: user?.businessTeam?.at(0)?.id,
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Select someone to add to team"),
	});

	const { mutate, isLoading: mutateLoading } = useMutation(addTeamMember, {
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
						<h5 className="text-xl font-medium text-grey-title">Add Member to Team</h5>
						<p className="text-sm leading-7 text-grey-title">Input user email</p>

						<TextInput label="Email Address" type="email" name="email" value={values.email} onChange={handleChange} />
						<ErrorMessage name="email" component="div" className="text-red-500" />

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
