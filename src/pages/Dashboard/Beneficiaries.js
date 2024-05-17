import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
// import CustomDataTable from "../../components/CustomDataTable";
import { deleteBeneficiary, getBeneficiaries } from "../../server";
import { renderConfirmDialogue, renderSuccessMessage } from "../../helpers/functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeleteIcon, EditIcon, SendIcon } from "../../assets/svg";
import EditBeneficiary from "../../components/transactions/beneficiary/EditBeneficiary";
import SendMoney from "../../components/transactions/sendmoney";
import Loader from "../../components/Loader";
import AddBeneficiary from "../../components/transactions/beneficiary/AddBeneficiary";
import { DebounceInput } from "react-debounce-input";
import Beneficiary from "../../components/Beneficiary2";
import { imgs } from "../../helpers/constants";

const Beneficiaries = () => {
	const [alias, setAlias] = useState("");

	const [addBeneficiaryStatus, setAddBeneficiary] = useState(false);
	const addBeneficiary = () => setAddBeneficiary(!addBeneficiaryStatus);

	const {
		data: beneficiaries, refetch: refetchBeneficiaries,
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["beneficiaries", alias],
		queryFn: () => getBeneficiaries({ searchText: alias }),
	});

	// const columns = [
	// 	{
	// 		name: "Beneficiary",
	// 		selector: (row) => row.name,
	// 		compact: true,
	// 		grow: 2,
	// 	},
	// 	{
	// 		name: "Bank",
	// 		selector: (row) => row.bank_name,
	// 		compact: true,
	// 	},
	// 	{
	// 		name: "Account Number",
	// 		selector: (row) => row.account_number,
	// 		compact: true,
	// 	},
	// 	{
	// 		name: "Action",
	// 		cell: (row) => <Actions row={row} refetch={refetch} />,
	// 		compact: true,
	// 		width: "80px",
	// 	},
	// ];

	if (isLoading) return <Loader full />;

	// const { data: beneficiaries, refetch: refetchBeneficiaries } = useQuery({
	// 	queryKey: ["beneficiaries"],
	// 	queryFn: () => getBeneficiaries(),
	// 	suspense: true,
	// 	enabled: team?.role !== "team",
	// 	refetchOnWindowFocus: false,
	// });

	return (
		<DashboardLayout title="Beneficiaries">
			<div className="flex items-center justify-between">
				<DebounceInput
					className={`w-full h-10 border border-[#DEDEDE] rounded text-sm px-4 outline-none focus:ring-1 focus:ring-primary`}
					placeholder="Search"
					name="account_number"
					debounceTimeout={500}
					value={alias}
					onChange={(event) => setAlias(event.target.value)}
					style={{ border: "1px solid #DEDEDE", width: 250 }}
				/>
				<div onClick={addBeneficiary} className="flex items-center cursor-pointer">
					<img alt="cover" src={imgs.add2} size={24} />
					<span className="text-black text-[12px] ml-1">Add Beneficiary</span>
				</div>
			</div>

			<div className="flex flex-wrap gap-4 item-center mt-6">
				{beneficiaries?.data?.beneficiary?.map((beneficiary, index) => (
					<Beneficiary person={beneficiary} refetch={refetchBeneficiaries} key={index} />
				))}
			</div>
			<div className="overflow-x-scroll">
				{/* <CustomDataTable data={beneficiaries?.data?.beneficiary} columns={columns} /> */}
			</div>
			<AddBeneficiary status={addBeneficiaryStatus} toggleModal={addBeneficiary} refetch={refetch} />
		</DashboardLayout>
	);
};

const Actions = ({ row, refetch }) => {
	const [sendMoney, setSendMoney] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const toggleModal = () => setEditModalOpen((prevState) => !prevState);
	const toggleSendModal = () => setSendMoney((prevState) => !prevState);

	const { mutate: deleteMutate } = useMutation(deleteBeneficiary, {
		onSuccess: ({ message }) => renderSuccessMessage(message).then(() => refetch()),
	});

	const confirmAndDelete = (id) =>
	renderConfirmDialogue().then((result) => {
		if (result.isConfirmed) deleteMutate(id);
	});

	return (
		<div className="flex gap-4">
			<button
				className="bg-transparent border-0"
				onClick={() => {
					toggleSendModal();
				}}
			>
				<SendIcon className="stroke-[#49BCB0]" title="Send Money" />
			</button>
			<button
				className="bg-transparent border-0"
				onClick={() => {
					toggleModal();
				}}
			>
				<EditIcon className="stroke-[#49BCB0] fill-[#49BCB0]" title="Edit" />
			</button>
			<button className="bg-transparent border-0" onClick={() => confirmAndDelete(row.id)}>
				<DeleteIcon className="fill-red-500" title="Delete" />
			</button>
			<SendMoney status={sendMoney} toggleModal={toggleSendModal} beneficiary={row} />
			<EditBeneficiary status={editModalOpen} toggleModal={toggleModal} refetch={refetch} beneficiary={row} />
		</div>
	);
};

export default Beneficiaries;
