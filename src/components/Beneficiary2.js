import React, { useState } from "react";
import SendMoney from "./transactions/sendmoney";
import { flags, imgs } from "../helpers/constants";
import { deleteBeneficiary } from "../server";
import { renderConfirmDialogue, renderSuccessMessage } from "../helpers/functions";
import { useMutation } from "@tanstack/react-query";
import EditBeneficiary from "./transactions/beneficiary/EditBeneficiary";

const Beneficiary = ({ person, refetch }) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const toggleModal = () => setEditModalOpen((prevState) => !prevState);

    const [sendMoney, setSendMoney] = useState(false);
	const toggleSendModal = () => setSendMoney((prevState) => !prevState);

    const confirmAndDelete = (id) =>
	renderConfirmDialogue().then((result) => {
		if (result.isConfirmed) deleteMutate(id);
	});

    const { mutate: deleteMutate } = useMutation(deleteBeneficiary, {
		onSuccess: ({ message }) => renderSuccessMessage(message).then(() => refetch()),
	});

	// const full_name = person.name.split(" ").slice(0, 2);
	// const initials = full_name.map((name) => name[0]);

	return (
		<>
			<div
				className="h-[126px] w-[205px] gap-2 px-2 bg-white border border-[#BFE3FF] rounded-[10.65px] cursor-pointer max-w-[215px]"
				onClick={() => setEditModalOpen(true)}
			>
				<div className="flex items-start justify-between pb-1">
					{/* <div className="flex items-center justify-center w-8 h-8 mt-1 rounded-full bg-grey-graySuit">
						<span className="text-xs tracking-widest text-white">{initials}</span>
					</div> */}
                    <div className="flex items-center mt-2">
					    <img src={imgs.avatar} alt='icon' className="w-[64px]" />
                        <div className="ml-2">
                            <span className="mb-0 overflow-hidden text-[0.58rem] text-clip" style={{ marginTop: 0 }}>
                            {person.name.substr(0, 17)}
                        </span>
                        <p className="text-[8.5px] text-[#979797]">{person.bank_name.substr(0, 17)}</p>
                        </div>
                    </div>
					<div className="rounded-full object-cover h-[16px] w-[16px]">{flags?.NGN.icon}</div>
				</div>
				<div className="flex gap-2 mt-2">
                    <div className="cursor-pointer"
                        onClick={() => { toggleSendModal(); }}>
                        <img src={imgs.payout} alt="icon" className="w-[29px]" />
                    </div>
                    <div className="cursor-pointer"
                        onClick={() => { toggleModal(); }}>
                        <img src={imgs.edit} alt="icon" className="w-[29px]" />
                    </div>
                    <div className="cursor-pointer" onClick={() => confirmAndDelete(person.id)}>
                       <img src={imgs.delete_} alt="icon" className="w-[29px]" />
                    </div>
                    <SendMoney status={sendMoney} toggleModal={toggleSendModal} beneficiary={person} />
                    <EditBeneficiary status={editModalOpen} toggleModal={toggleModal} refetch={refetch} beneficiary={person} />
                </div>
			</div>
			<SendMoney status={editModalOpen} toggleModal={toggleModal} beneficiary={person} />
		</>
	);
};

export default Beneficiary;
