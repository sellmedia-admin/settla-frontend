import { Disclosure, Transition } from "@headlessui/react";
import mondu from "../assets/png/mondu.png";
import toggle from "../assets/svg/home/toggle.svg";
import add from "../assets/svg/home/add.svg";
import minus from "../assets/svg/home/minus.svg";
import usa from "../assets/svg/home/usa-card.svg";
import naija from "../assets/svg/home/naija-card.svg";
import canada from "../assets/svg/home/canada-card.svg";
import hero from "../assets/png/hero.png";
import beneficiary from "../assets/png/beneficiary.png";
import transaction_history from "../assets/png/transaction_history.png";

import { million_things, questions } from "../helpers/constants";
import StepOne from "../components/transactions/sendmoney/StepOne";
import TextInput from "../components/inputs/TextInput";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import EmailSuccessModal from "../components/success/Email";

export default function Home() {
	const [email, setEmail] = useState("");
	const [
		loading,
		//  setLoading
	] = useState(false);
	const [modalStatus, setModalStatus] = useState(false);

	const handleWaitingList = async () => {
		// setLoading(true);
		// try {
		//	if (!!email) {
		//		const res = await earlyAccess(email);
		//		if (res.type === "success") setModalStatus(true);
		//		setEmail("");
		//	}
		// } catch (error) {
		//	console.log(error);
		// }
		// setLoading(false);
	};

	const focusOnInput = () => {
		document.getElementById("emailID").focus();
	};

	const handleModalStatus = () => {
		setModalStatus(false);
	};

	return (
		<>
			<nav className="flex items-center justify-between px-12 py-5 bg-white md:px-24">
				<div className="flex space-x-2">
					<img alt="cover" src={mondu} width={80} height={80} />
				</div>
				<div className="flex gap-2">
					<button
						onClick={focusOnInput}
						className="px-3 py-2 border border-gray-100 rounded-lg text-darkGray bg-blue-ocean max-[550px]:hidden"
					>
						Contact us
					</button>
					{/* <Link to="/signup" className="px-3 py-2 text-white border border-gray-100 rounded bg-primary">
						Register
					</Link>
					<Link to="/login" className="px-3 py-2 text-white border border-gray-100 rounded bg-primary">
						Login
					</Link> */}
				</div>
			</nav>

			<main className="min-h-screen px-8 pt-8 bg-white md:overflow-x-hidden">
				<div className="grid items-center content-center my-8 md:grid-cols-2">
					<div className="max-w-md col-span-1 mx-auto">
						<h2 className="mb-4">Simplified and seamless borderless payments for Businesses.</h2>
						<p className="text-lg text-blue-bodyLighter">
							Mondu’s suite of business payment solutions enables businesses to send global payout to 80+ countries and enables them to
							accept international payment
						</p>

						<div className="w-full gap-4 my-6 ">
							<div className="col-span-2 my-2">
								<TextInput label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} inputID="emailID" />
							</div>
							<div className="flex items-end w-full col-span-1 my-2">
								<button className="w-full px-3 py-2 text-white border rounded bg-primary" onClick={handleWaitingList}>
									{loading ? <CgSpinner className="w-5 h-5 mr-2 animate-spin" /> : "Get early access"}
								</button>
							</div>
						</div>
					</div>
					<div className="col-span-1 ">
						<div className="max-w-md mx-auto">
							<img src={hero} className="" width="100%" height="100%" alt="Mondu Preview" layout="responsive" objectFit="contain" />
						</div>
					</div>
				</div>

				<div className="grid items-center content-center my-8 md:grid-cols-2">
					<div className="hidden col-span-1 bg-no-repeat bg-contain md:block bg-blob">
						<div className="max-w-xl mx-auto">
							<img
								src={transaction_history}
								className=""
								width="100%"
								height="100%"
								alt="Mondu Preview"
								layout="responsive"
								objectFit="contain"
							/>
						</div>
					</div>
					<div className="max-w-md col-span-1 mx-auto">
						<h2 className="mb-4">Fully Functional Business Payment Tools.</h2>
						<p className="text-lg text-blue-bodyLighter">
							Mondu helps businesses,banks and Financial Institutions make OTC cross border payouts to over 80 countries across with
							world at unbeatable rates.
						</p>
					</div>
				</div>

				<div className="grid items-center content-center my-8 md:grid-cols-2">
					<div className="relative flex flex-col justify-between max-w-md col-span-1 mx-auto bg-white shadow-card rounded-3xl pt-14">
						<div className="px-5 mb-16 md:px-11">
							<h3 className="mb-4">Payments, but without the stress. </h3>
							<p className="text-blue-bodyLighter">
								We are opening up more multi-channel and flexible payment methods for business, allowing a variety of pleasant and
								customizable checkouts, and smart tools to save time and money.
							</p>
						</div>
						<div className="bottom-0 left-0 w-3/4 border-t-8 border-r-8 rounded-lg border-grey-another text-grey-title">
							{million_things.map((thing) => (
								<div key={thing.name} className="flex items-center justify-between w-full px-4 py-3">
									<div className="flex items-center space-x-4">
										<img alt="cover" src={thing.icon} layout="fixed" />
										<p className="text-lg">{thing.name}</p>
									</div>
									<div className="select-none w-7">
										<img alt="cover" src={toggle} layout="fixed" />
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="h-full max-w-md col-span-1 mx-auto bg-white shadow-card rounded-3xl px-11 py-14">
						<div>
							<h3 className="mb-4">Make all your transactions from one place.</h3>
						</div>
						<div>
							<div className="flex mt-8 space-x-4">
								<div>
									<img alt="cover" src={usa} layout="fixed" />
								</div>
								<div className="hidden md:block">
									<img alt="cover" src={naija} layout="fixed" />
								</div>
							</div>
							<div className="flex justify-center w-full mt-8">
								<img alt="cover" src={canada} layout="fixed" />
							</div>
						</div>
					</div>
				</div>

				<div className="grid items-center content-center my-16 md:grid-cols-2">
					<div className="max-w-md col-span-1 mx-auto">
						<h2 className="mb-4">Freedom Without Borders </h2>
						<p className="text-lg text-blue-bodyLighter">
							We design our products and services to be fully manageable online and on mobile, providing access to global financial
							payment markets wherever our clients maybe.
						</p>
					</div>

					<div className="col-span-1 md:rounded-tl-[127px] md:rounded-bl-[127px] bg-grey-another py-16">
						<div className="max-w-sm p-4 mx-auto bg-white rounded-2xl">
							<StepOne toggleModal={() => {}} updateStep={() => {}} reset={() => {}} enabled={false} />
						</div>
					</div>
				</div>

				<div className="grid items-center content-center my-8 md:grid-cols-2">
					<div className="col-span-1 ">
						<div className="max-w-md mx-auto">
							<img src={beneficiary} width="100%" height="100%" alt="Mondu Preview" layout="responsive" objectFit="contain" />
						</div>
					</div>
					<div className="max-w-md col-span-1 mx-auto text-right">
						<h2 className="mb-4">Trust & Compliance </h2>
						<p className="text-lg text-blue-bodyLighter">
							We are a registered Money Service Business by the Financial Transactions and Reports Analysis Centre of Canada for the
							provision of foreign exchange dealing, money transferring and virtual currencies. We’re also partnered with various other
							licensed financial institutions for the services we offer across all the jurisdiction we operate in.
						</p>
					</div>
				</div>

				<div className="flex flex-col items-center w-full my-16">
					<div className="mb-16 text-center">
						<h2 className="mb-2">Questions? Look here.</h2>
						<p className="text-blue-bodyLighter">
							Cant find an answer? email us at{" "}
							<a className="font-semibold" href="mailto:info@mondu.io">
								{" "}
								info@mondu.io{" "}
							</a>
						</p>
					</div>
					{questions.map((question) => (
						<div key={question.question} className="w-full max-w-3xl p-2 mx-auto bg-white">
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button
											className={`w-full p-4 rounded-md font-semibold text-darkGray flex justify-between text-left ${
												open ? "bg-blue-ocean" : "bg-white"
											}`}
										>
											<span>{question.question}</span>

											{open ? (
												<div className="w-5">
													<img alt="cover" src={minus} />
												</div>
											) : (
												<div className="w-5">
													<img alt="cover" src={add} />
												</div>
											)}
										</Disclosure.Button>
										<Transition
											show={open}
											enter="transition duration-100 ease-out"
											enterFrom="transform scale-95 opacity-0"
											enterTo="transform scale-100 opacity-100"
											leave="transition duration-75 ease-out"
											leaveFrom="transform scale-100 opacity-100"
											leaveTo="transform scale-95 opacity-0"
										>
											<Disclosure.Panel className={`p-4 text-xs text-darkGray ${open ? "bg-blue-ocean" : "bg-white"}`}>
												{question.answer}
											</Disclosure.Panel>
										</Transition>
									</>
								)}
							</Disclosure>
						</div>
					))}
				</div>
			</main>
			<nav className="w-full px-12 bg-white">
				<div className="items-center justify-between border-t py-7 md:px-24 md:flex">
					<p className="text-blue-bodyLighter">© 2021 Mondu.io All rights reserved.</p>
				</div>
			</nav>
			<EmailSuccessModal status={modalStatus} closeModal={handleModalStatus} />
		</>
	);
}
