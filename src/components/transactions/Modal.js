import { useRef } from "react";
import { Dialog } from "@headlessui/react";

export default function TransactionsModal({ status, closeModal, children, width = "max-w-lg" }) {
	let trapRef = useRef(null);
	return (
		<>
			<Dialog initialFocus={trapRef} open={status} as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
				<div className="min-h-screen px-4 text-center">
					<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="inline-block h-screen align-middle" aria-hidden="true">
						&#8203;
					</span>
					<div
						className={`inline-block w-full ${width} p-4 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}
					>
						<div className="my-4" ref={trapRef}>
							{children}
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}
