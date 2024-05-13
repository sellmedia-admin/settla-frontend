import React, { useState } from "react";
import SendMoney from "./transactions/sendmoney";
import { flags, imgs } from "../helpers/constants";

const Beneficiary = ({ person, refetch }) => {
	const [editModalOpen, setEditModalOpen] = useState(false);

	const toggleModal = () => setEditModalOpen((prevState) => !prevState);

	// const full_name = person.name.split(" ").slice(0, 2);
	// const initials = full_name.map((name) => name[0]);

	return (
		<>
			<div
				className="h-[109px] w-[109px] gap-2 px-2 bg-white border border-[#BFE3FF] rounded-[10.65px] cursor-pointer max-w-[215px]"
				onClick={() => setEditModalOpen(true)}
			>
				<div className="flex items-start justify-between pb-1">
					{/* <div className="flex items-center justify-center w-8 h-8 mt-1 rounded-full bg-grey-graySuit">
						<span className="text-xs tracking-widest text-white">{initials}</span>
					</div> */}
					<img src={imgs.avatar} alt='icon' className="mt-1" />
					<div className="rounded-full object-cover h-[16px] w-[16px]">{flags?.NGN.icon}</div>
				</div>
				<span className="mb-0 overflow-hidden text-[0.58rem] text-clip" style={{ marginTop: 0 }}>
					{person.name.substr(0, 17)}
				</span>
				<p className="text-[8.5px] text-[#979797]">{person.bank_name.substr(0, 17)}</p>
			</div>
			<SendMoney status={editModalOpen} toggleModal={toggleModal} beneficiary={person} />
		</>
	);
};

export default Beneficiary;
