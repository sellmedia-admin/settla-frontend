import { Link } from "react-router-dom";
import { imgs } from "../../helpers/constants";

const OnboardingLayout = ({ children }) => {
	return (
		<>
			<main className="flex flex-col lg:h-screen">
				<div className="py-3 px-4 bg-[#EBFFED] h-[64px] lg:mb-16 mb-4">
					<div className="max-w-default mx-auto flex justify-between items-center">
						<Link to="/"><img alt="logo" src={imgs.logo} /></Link>
						<Link to="/login" className="text-black text-[14px]">Sign In</Link>
					</div>
				</div>
				<div className="flex flex-col justify-center flex-shrink-0 w-full bg-white">{children}</div>
				{/* <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
					<div className="flex-col hidden h-full p-12 md:flex">
						
						<div className="flex flex-col justify-center h-[calc(100vh-6rem-80px)]">
							<div className="max-w-md xl:max-w-2xl">
								<h2 className="text-2xl text-grey-dark xl:text-5xl xl:leading-relaxed">
									Powering Efficient B2B Remittance & Procurement Globally
								</h2>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center flex-shrink-0 w-full h-full bg-white">{children}</div>
				</div> */}
				<footer className="text-center text-[#969696] p-4 lg:mt-10">Settla a product of BOSS Global</footer>
			</main>
		</>
	);
};

export default OnboardingLayout;
