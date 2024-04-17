import React, { useState } from "react";
import SendMoney from "./transactions/sendmoney";

const Beneficiary = ({ person, refetch }) => {
	const [editModalOpen, setEditModalOpen] = useState(false);

	const toggleModal = () => setEditModalOpen((prevState) => !prevState);

	const full_name = person.name.split(" ").slice(0, 2);
	const initials = full_name.map((name) => name[0]);

	return (
		<>
			<div
				className="flex items-center h-16 gap-2 px-2 bg-white border border-gray-400 rounded-lg cursor-pointer max-w-[215px]"
				onClick={() => setEditModalOpen(true)}
			>
				<div className="flex items-center justify-center w-8 h-8 rounded-full bg-grey-graySuit">
					<span className="text-xs tracking-widest text-white">{initials}</span>
				</div>
				<span className="mt-0 overflow-hidden text-[0.85rem] text-clip" style={{ marginTop: 0 }}>
					{person.name.substr(0, 12)}
				</span>
			</div>
			<SendMoney status={editModalOpen} toggleModal={toggleModal} beneficiary={person} />
		</>
	);
};

export default Beneficiary;
