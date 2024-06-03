/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import CustomDataTable from "../../components/CustomDataTable";
import add from "../../assets/svg/add.svg";
import { DeleteIcon, EditIcon, InformationIcon } from "../../assets/svg";
import AddMember from "../../components/transactions/beneficiary/AddMember";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTeamMember, getTeamMembers } from "../../server";
import { renderConfirmDialogue, renderSuccessMessage } from "../../helpers/functions";
import CreateTeam from "../../components/transactions/beneficiary/CreateTeam";
import MemberPermission from "../../components/transactions/beneficiary/MemberPermision";
import { Tooltip } from "react-tooltip";

const Teams = () => {
	const [isMemberOpen, setIsMemberOpen] = useState(false);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isError, setIsError] = useState(false);
	const toggleModal = () => setIsMemberOpen((prevState) => !prevState);
	const toggleCreateModal = () => setIsCreateOpen((prevState) => !prevState);

	const columns = [
		{
			name: "Email",
			selector: (row) => row.email,
			compact: true,
		},
		{
			name: (
				<a className="flex items-center gap-2 my-anchor-element" href="#">
					Permision Level <InformationIcon />
				</a>
			),
			selector: (row) => row.permission_level,
			compact: true,
		},
		{
			name: "",
			cell: (row) => <ActionButtons refetch={refetch} row={row} />,
			compact: true,
			width: "100px",
		},
	];

	const { data, refetch } = useQuery({
		queryKey: ["team-members"],
		queryFn: getTeamMembers,
		retry: 0,
		onSuccess: () => {
			setIsError(false);
		},
		onError: (error) => {
			if (error.message === "You are not the owner of this business or business does not exists") {
				setIsError(true);
			}
		},
	});

	return (
		<DashboardLayout title="Teams" >
			<div className="max-w-[900px] mx-auto">
				<div className="flex flex-col overflow-x-scroll">
					{isError ? (
						<button
							className="flex items-center py-[12px] rounded-lg cursor-pointer bg-primary px-[10px] justify-evenly ml-auto"
							onClick={toggleCreateModal}
						>
							<img alt="cover" src={add} size={24} />
							<span className="text-white">Create Team</span>
						</button>
					) : (
						<button
							className="flex items-center py-[12px] rounded-lg cursor-pointer bg-primary px-[10px] justify-evenly ml-auto"
							onClick={toggleModal}
						>
							<img alt="cover" src={add} size={24} />
							<span className="text-white">Add Member</span>
						</button>
					)}
					<CustomDataTable data={data?.data} columns={columns} />
				</div>
				<AddMember status={isMemberOpen} toggleModal={toggleModal} refetch={refetch} />
				<CreateTeam status={isCreateOpen} toggleModal={toggleCreateModal} refetch={refetch} />
				<Tooltip anchorSelect=".my-anchor-element" place="top">
					<div>
						Level 1: Make Transactions All Forms Of Transactions, View Transaction
						<br />
						Level 2. Make Local Transactions (NGN - NGN, NGN Wallet - USD Wallet)
						<br />
						Level 3: View Transactions Only
					</div>
				</Tooltip>
			</div>
		</DashboardLayout>
	);
};

const ActionButtons = ({ refetch, row }) => {
	const queryClient = useQueryClient();

	const [isPermissionOpen, setIsPermissionOpen] = useState(false);
	const toggleModal = () => setIsPermissionOpen((prevState) => !prevState);

	const { mutate, isLoading } = useMutation(deleteTeamMember, {
		onSuccess: ({ message }) =>
			renderSuccessMessage(message).then(() => {
				refetch();
				queryClient.invalidateQueries(
					{
						queryKey: ["user"],
						refetchType: "all",
					},
					{ throwOnError: true }
				);
			}),
	});

	return (
		<>
			<div className="flex gap-4">
				<button className="bg-transparent border-0" disabled={isLoading} onClick={() => toggleModal()}>
					<EditIcon className="fill-primary" title="Edit Permission" />
				</button>
				<button
					className="bg-transparent border-0"
					disabled={isLoading}
					onClick={() =>
						renderConfirmDialogue().then((result) => {
							if (result.isConfirmed) {
								mutate({ id: row.id });
							}
						})
					}
				>
					<DeleteIcon className="fill-red-500" title="Delete" />
				</button>
				<MemberPermission status={isPermissionOpen} toggleModal={toggleModal} refetch={refetch} row={row} />
			</div>
		</>
	);
};

export default Teams;
