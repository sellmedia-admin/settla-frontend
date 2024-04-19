import { Disclosure, Transition } from "@headlessui/react";

import { questions } from "../helpers/constants";
// import StepOne from "../components/transactions/sendmoney/StepOne";
// import TextInput from "../components/inputs/TextInput";
// import { useState } from "react";
// import { CgSpinner } from "react-icons/cg";
// import EmailSuccessModal from "../components/success/Email";
import { Link } from 'react-router-dom';
// import Tabs from "../components/tab-component/Tab";

// constant 
import { imgs, constants } from "../helpers/constants";
import Tabs from "../components/tabs";

export default function Home() {
	// const [modalStatus, setModalStatus] = useState(false);
	// const handleModalStatus = () => {
	// 	setModalStatus(false);
	// };

	return (
		<div className="font-outfit">
			<nav className="nav_links flex items-center justify-between max-w-default mx-auto px-4 py-6 bg-white md:px-0">
				<div className="flex space-x-2">
					<Link to="/"><img alt="logo" src={imgs.logo} className="logo" /></Link>
				</div>
				<div className="flex items-center text-[16px] gap-2 ">
					<Link to="/features" className="px-2 hover:text-primary">Features</Link>
					<Link to="/pricing" className="px-2 hover:text-primary">Pricing</Link>
					<Link to="/about" className="px-2 hover:text-primary">Company</Link>
					<Link to="/blog" className="px-2 hover:text-primary">Blog</Link>
					<Link to="/case-studies" className="px-2 hover:text-primary">Case Studies</Link>
					<Link to="/contact" className="px-2 hover:text-primary">Contact Us</Link>
				</div>
				<Link to="/login" className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center w-[121px] h-[48px] rounded-8">
					Login
				</Link>
			</nav>
			<nav className="responsive_nav_mobile">
				<div className="container">
					<input id="responsive-menu" type="checkbox" />
					<label htmlFor="responsive-menu"><Link href="/"><img src={imgs.logo} alt="settla logo" className='logo' /></Link> <span id="menu-icon"></span></label>
					<div id="overlay"></div>
					<ul>
						<li><Link to="/features" className="px-2 hover:text-primary">Features</Link></li>
						<li><Link to="/pricing" className="px-2 hover:text-primary">Pricing</Link></li>
						<li><Link to="/about" className="px-2 hover:text-primary">Company</Link></li>
						<li><Link to="/blog" className="px-2 hover:text-primary">Blog</Link></li>
						<li><Link to="/case-studies" className="px-2 hover:text-primary">Case Studies</Link></li>
						<li><Link to="/contact" className="px-2 hover:text-primary">Contact Us</Link></li>
						<li><Link to="/login" className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center w-[121px] h-[48px] mx-auto rounded-8">
							Login
						</Link></li>
					</ul>
				</div>
			</nav>

			<main className="min-h-screen pt-8 bg-white">
				<div className="grid items-center content-center my-8 px-4">
					<div className="max-w-[935px] mx-auto text-center">
						<h1 className="">Powering Efficient B2B Remittance & Procurement Globally</h1>
						<div className="max-w-[800px] mx-auto mt-5 mb-12">
							<p className="text-lg text-black">
								Cross-border transactions made easy. Send & receive payments, find & pay suppliers seamlessly.
							</p>
						</div>
						<div className="flex justify-center">
							<Link to="/signup" className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 mr-2">
								Create Account
							</Link>
							<Link to="/contact" className="px-5 py-2 text-black border border-black flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 bg-white hover:bg-primary hover:text-white hover:border-primary ml-2">
								Talk to a specialist
							</Link>
						</div>
						
					</div>
					<div className="max-w-default mx-auto md:my-24 my-10">
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

				<div className="max-w-[990px] mx-auto px-4">
					<div className="mb-8 text-center max-w-[665px] mx-auto">
						<h2 className="mb-2">Smart multi-currency payment for your business</h2>
						<div className="max-w-[508px] mx-auto">
							<p className="mt-4">Accept payments in various currencies, providing a seamless experience for your global audience.</p>
						</div>
					</div>
					<div className="flex justify-between flex-wrap py-9">
						{constants.converts?.map(item => (
						<div key={item.id} className="h-[151px] w-[151px] rounded-2xl bg-[#E8F6F3] my-5">
							<img src={item.icon} alt="usd" className="md:h-[77px] h-[54px] md:w-[77px] w-[54px] absolute z-10 ml-24 -mt-8" />
							<div className="text-[16px] font-medium px-5 pt-24">
								<small className="leading-none block">Converts</small>
								<small className="leading-none">NGN to {item.currency}</small>
							</div>
						</div>
						))}
					</div>
					<div className="flex justify-center">
						<Link to="/signup" className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 mr-2">
							Create Account
						</Link>
						<Link to="/contact" className="px-5 py-2 text-black border border-black flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 bg-white hover:bg-primary hover:text-white hover:border-primary ml-2">
							Talk to a specialist
						</Link>
					</div>
				</div>

				<section className="max-w-default mx-auto my-28 px-4">
					<div className="mb-8 text-center">
						<h2 className="mb-10">Create an Account in 3 minutes</h2>

						<Tabs />
						
					</div>
					
					<div className="my-28">
						<div className="mb-8 text-center max-w-[665px] mx-auto">
							<h2 className="mb-2">Convert and Payout effortlessly</h2>
							<div className="max-w-[508px] mx-auto">
								<p className="mt-4">Quickest way pay your international supplier, pay school fees, and keep your business moving forward.</p>
							</div>
						</div>
						<div className="flex justify-center">
							<Link to="/signup" className="px-5 py-2 bg-primary text-white border border-primary hover:bg-white hover:text-black hover:border-black flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 mr-2">
								Create Account
							</Link>
							<Link to="/contact" className="px-5 py-2 text-black border border-black flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 bg-white hover:bg-primary hover:text-white hover:border-primary ml-2">
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
				
				<div className="grid items-center content-center my-16 px-4 md:grid-cols-2">
					<div className="max-w-md col-span-1 mx-auto">
						<h2 className="mb-4">Freedom Without Borders </h2>
						<p className="text-lg text-blue-bodyLighter">
							We design our products and services to be fully manageable online and on mobile, providing access to global financial
							payment markets wherever our clients maybe.
						</p>
					</div>

					{/* <div className="col-span-1 md:rounded-tl-[127px] md:rounded-bl-[127px] bg-grey-another py-16">
						<div className="max-w-sm p-4 mx-auto bg-white rounded-2xl">
							<StepOne toggleModal={() => {}} updateStep={() => {}} reset={() => {}} enabled={false} />
						</div>
					</div> */}
					<div className="max-w-md col-span-1 mx-auto py-16">
						<img src={imgs.flag} width="331px" height="100%" alt="Preview" layout="responsive" objectFit="contain" />
					</div>
				</div>

				<section className="bg-primary/10 py-16">
					<h2 className="mb-12 text-center">Settla in 3 steps</h2>
					<div className="grid content-center px-4 my-8 md:grid-cols-2">
						<div className="col-span-1 ">
							<div className="max-w-md mx-auto pb-4">
								<img src={imgs.happy} width="100%" height="100%" alt="Preview" layout="responsive" objectFit="contain" />
							</div>
						</div>
						<div className="max-w-lg col-span-1">
							{constants.settlaSteps?.map(item => (
							<div key={item.id}>
								<h3 className="mb-2">{item.title}</h3>
								<p className="text-lg mb-6">{item.subtitle}</p>
							</div>
							))}
						</div>
					</div>
				</section>

				<section className="px-4 py-16">
					<div className="grid content-center items-center my-8 md:grid-cols-2">
						<div className="col-span-1 max-w-md mx-auto">
							<div className="py-4">
								<h3 className="mb-2">Onboard with our specialist, ask them anything</h3>
								<p className="text-lg mb-10">Need Help Getting Started? Our Team is Here to Guide You Through Settla's Easy Sign-up.</p>
								<Link to="/contact" className="px-5 py-2 text-primary border border-primary flex justify-center items-center md:text-[16px] text-[14px] md:w-[182px] w-[162px] h-[48px] rounded-8 bg-white hover:bg-primary hover:text-white hover:border-primary">
								Talk to a specialist
							</Link>
							</div>
						</div>
						<div className="col-span-1 ">
							<div className="max-w-md mx-auto">
								<img src={imgs.smile} width="100%" height="100%" alt="Preview" layout="responsive" objectFit="contain" />
							</div>
						</div>
					</div>
				</section>

				<div className="flex flex-col items-center w-full my-16">
					<div className="mb-16 text-center">
						<h2 className="mb-2">Questions? Look here.</h2>
						<p className="text-blue-bodyLighter">
							Cant find an answer? email us at{" "}
							<a className="font-semibold" href="mailto:info@settla.io">
								{" "}
								info@settla.io{" "}
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
											}`}>
											<span>{question.question}</span>

											{open ? (
												<div className="w-5">
													<img alt="cover" src={imgs.minus} />
												</div>
											) : (
												<div className="w-5">
													<img alt="cover" src={imgs.add} />
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
			{/* <EmailSuccessModal status={modalStatus} closeModal={handleModalStatus} /> */}
		</div>
	);
}
