import { Dialog } from "@headlessui/react";
import MiniBtn from "../buttons/MiniBtn";

import success from "../../assets/svg/success.svg";

export default function EmailSuccessModal({ status, closeModal }) {
	return (
		<>
			<Dialog open={status} as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
				<div className="min-h-screen px-4 text-center">
					<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="inline-block h-screen align-middle" aria-hidden="true">
						&#8203;
					</span>

					<div className="inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
						<img alt="" src={success} className="w-full h-auto" />
						<h4 className="my-3 text-xl font-medium text-center text-grey-title">Your Email has been received!!</h4>
						<p className="mb-3 text-grey-title">
							Hey <span className="font-semibold"></span>
						</p>
						<p className="leading-7 text-grey-title">
							Welcome to Settla, your email has been received and you will soon be ready to get started. Settla is your simple solution to
							a secure and seamless cross-border payment service for inbound and outbound money transfers between Nigeria, the U.S, and
							Canada.
						</p>
						<p className="mb-3 leading-7 text-grey-title">
							Now you are equiped with all you need, but if you need help getting started, contact info@usesettla.com and you'll be up and
							running in no time.
						</p>

						<p>The Settla team.</p>
						<div className="my-4">
							<MiniBtn placeholder="Return" onClick={closeModal} width="w-full" />
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}
