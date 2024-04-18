import { Disclosure, Transition } from "@headlessui/react";
import toggle from "../assets/svg/home/toggle.svg";
import add from "../assets/svg/home/add.svg";
import minus from "../assets/svg/home/minus.svg";
import usa from "../assets/svg/home/usa-card.svg";
import naija from "../assets/svg/home/naija-card.svg";
import canada from "../assets/svg/home/canada-card.svg";
import beneficiary from "../assets/png/beneficiary.png";
import transaction_history from "../assets/png/transaction_history.png";

import { million_things, questions } from "../helpers/constants";
import StepOne from "../components/transactions/sendmoney/StepOne";
// import TextInput from "../components/inputs/TextInput";
import { useState } from "react";
// import { CgSpinner } from "react-icons/cg";
import EmailSuccessModal from "../components/success/Email";
import { Link } from 'react-router-dom';

// constant 
import { imgs, constants } from "../helpers/constants";

export default function Home() {
	const [modalStatus, setModalStatus] = useState(false);
	const handleModalStatus = () => {
		setModalStatus(false);
	};

	return (
		<div className="font-outfit">
			<nav className="flex items-center justify-between px-12 py-6 bg-white md:px-24">
				<div className="flex space-x-2">
					<img alt="logo" src={imgs.logo} />
				</div>
				<div className="flex items-center text-[16px] gap-2">
					<Link to="/" className="px-2">Features</Link>
					<Link to="/" className="px-2">Pricing</Link>
					<Link to="/" className="px-2">Company</Link>
					<Link to="/" className="px-2">Blog</Link>
					<Link to="/" className="px-2">Case Studies</Link>
					<Link to="/" className="px-2">Contact Us</Link>
				</div>
				<div>
					<Link to="/login" className="px-5 py-2 text-white border border-primary flex justify-center items-center w-[121px] h-[48px] rounded-8 bg-primary">
						Login
					</Link>
				</div>
			</nav>

			<main className="min-h-screen px-8 pt-8 bg-white md:overflow-x-hidden">
				<div className="grid items-center content-center my-8 ">
					<div className="max-w-[935px] mx-auto text-center">
						<h1 className="">Powering Efficient B2B Remittance & Procurement Globally</h1>
						<div className="max-w-[500px] mx-auto my-10">
							<p className="text-lg text-black">
								Cross-border transactions made easy. Send & receive payments, find & pay suppliers seamlessly.
							</p>
						</div>
						<div className="flex justify-center">
							<Link to="/signup" className="px-5 py-2 text-white border border-primary flex justify-center items-center w-[182px] h-[48px] rounded-8 bg-primary mr-2">
								Create Account
							</Link>
							<Link to="/login" className="px-5 py-2 text-black border border-black flex justify-center items-center w-[182px] h-[48px] rounded-8 bg-white ml-2">
								Talk to a specialist
							</Link>
						</div>
						
					</div>
					<div className="max-w-[1076px] mx-auto my-28">
						<img
							src={imgs.store}
							className=""
							width="100%"
							height="100%"
							alt="Settla Preview"
							layout="responsive"
							objectFit="contain"
						/>
					</div>
				</div>

				<div className="max-w-[990px] mx-auto">
					<div className="mb-8 text-center max-w-[665px] mx-auto">
						<h2 className="mb-2">Smart multi-currency payment for your business</h2>
						<div className="max-w-[508px] mx-auto">
							<p className="mt-4">Accept payments in various currencies, providing a seamless experience for your global audience.</p>
						</div>
					</div>
					<div className="flex justify-between py-14">
						{constants.converts?.map(item => (
						<div key={item.id} className="h-[151px] w-[151px] rounded-2xl bg-[#E8F6F3] ">
							<img src={item.icon} alt="usd" className="h-[77px] w-[77px] absolute z-10 ml-24 -mt-8" />
							<div className="text-[16px] font-medium px-5 pt-24">
								<small className="leading-none block">Converts</small>
								<small className="leading-none">NGN to {item.currency}</small>
							</div>
						</div>
						))}
					</div>
					<div className="flex justify-center">
						<Link to="/signup" className="px-5 py-2 text-white border border-primary flex justify-center items-center w-[182px] h-[48px] rounded-8 bg-primary mr-2">
							Create Account
						</Link>
						<Link to="/login" className="px-5 py-2 text-black border border-black flex justify-center items-center w-[182px] h-[48px] rounded-8 bg-white ml-2">
							Talk to a specialist
						</Link>
					</div>
				</div>

				<section className="max-w-[1076px] mx-auto my-28">
					<div className="mb-8 text-center max-w-[790px] mx-auto">
						<h2 className="mb-12">Create an Account in 3 minutes</h2>
						<div className="flex justify-center">
							<div className="text-center px-4 py-3 cursor-pointer">
								<div className="h-[41px] w-[41px] rounded-full bg-primary flex justify-center items-center mx-auto mb-2">
									<img src={imgs.createAccount} alt="icon" />
								</div>
								<p className="text-primary font-semibold">Create Account</p>
							</div>
							<div className="text-center px-4 py-3 cursor-pointer">
								<div className="h-[41px] w-[41px] rounded-full bg-primary/10 flex justify-center items-center mx-auto mb-2">
									<img src={imgs.quick} alt="icon" />
								</div>
								<p className="text-black">Quick KYB</p>
							</div>
							<div className="text-center px-4 py-3 cursor-pointer">
								<div className="h-[41px] w-[41px] rounded-full bg-primary/10 flex justify-center items-center mx-auto mb-2">
									<img src={imgs.payIn} alt="icon" />
								</div>
								<p className="text-black">Pay In</p>
							</div>
							<div className="text-center px-4 py-3 cursor-pointer">
								<div className="h-[41px] w-[41px] rounded-full bg-primary/10 flex justify-center items-center mx-auto mb-2">
									<img src={imgs.payOut} alt="icon" />
								</div>
								<p className="text-black">Pay Out</p>
							</div>
							<div className="text-center px-4 py-3 cursor-pointer">
								<div className="h-[41px] w-[41px] rounded-full bg-primary/10 flex justify-center items-center mx-auto mb-2">
									<img src={imgs.conversion} alt="icon" />
								</div>
								<p className="text-black">Conversion</p>
							</div>
							<div className="text-center px-4 py-3 cursor-pointer">
								<div className="h-[41px] w-[41px] rounded-full bg-primary/10 flex justify-center items-center mx-auto mb-2">
									<img src={imgs.receipt} alt="icon" />
								</div>
								<p className="text-black">Receipt</p>
							</div>
						</div>
					</div>

					<div className="grid items-center content-center my-10 md:grid-cols-2">
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
							<h3 className="mb-4">Create an account for your business in 3 minutes</h3>
							<p className="text-black">
								Quickest way pay your international supplier, pay school fees, and keep your business moving.  Quickest way pay your international supplier, pay school fees, and keep your business moving
							</p>
							<div className="flex mt-8">
								<Link to="/signup" className="px-5 py-2 text-white border border-primary flex justify-center items-center w-[182px] h-[48px] rounded-8 bg-primary mr-2">
									Create Account
								</Link>
								<Link to="/login" className="px-5 py-2 text-black border border-black flex justify-center items-center w-[182px] h-[48px] rounded-8 bg-white ml-2">
									Talk to a specialist
								</Link>
							</div>
						</div>
					</div>

					<div className="my-28">
						<div className="mb-8 text-center max-w-[665px] mx-auto">
							<h2 className="mb-2">Convert and Payout effortlessly</h2>
							<div className="max-w-[508px] mx-auto">
								<p className="mt-4">Quickest way pay your international supplier, pay school fees, and keep your business moving forward.</p>
							</div>
						</div>
						<div className="flex justify-center">
							<Link to="/signup" className="px-5 py-2 text-white border border-primary flex justify-center items-center w-[182px] h-[48px] rounded-8 bg-primary mr-2">
								Create Account
							</Link>
							<Link to="/login" className="px-5 py-2 text-black border border-black flex justify-center items-center w-[182px] h-[48px] rounded-8 bg-white ml-2">
								Talk to a specialist
							</Link>
						</div>
						<div className="mt-20">
							<img
							src={imgs.store}
							className=""
							width="100%"
							height="100%"
							alt="Settla Preview"
							layout="responsive"
							objectFit="contain"
						/>
						</div>
					</div>
				</section>

				

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
				<div className="items-center justify-center border-t py-7 md:px-24 md:flex">
					<p className="text-black text-[14px]">© 2024 Settla | All rights reserved.</p>
				</div>
			</nav>
			<EmailSuccessModal status={modalStatus} closeModal={handleModalStatus} />
		</div>
	);
}
