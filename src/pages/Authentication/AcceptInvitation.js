import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { acceptMembership } from "../../server";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import { renderSuccessMessage } from "../../helpers/functions";

const AcceptInvitation = () => {
	const { email } = useParams();
	const navigate = useNavigate();

	const { mutate } = useMutation(acceptMembership, {
		onSuccess: ({ message }) => renderSuccessMessage(message).then(() => navigate("/login")),
	});

	useEffect(() => {
		mutate({ email });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Loader full />;
};

export default AcceptInvitation;
