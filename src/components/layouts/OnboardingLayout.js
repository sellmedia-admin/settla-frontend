import bullet from "../../assets/svg/bullet.svg";
import { Link } from "react-router-dom";
import mondu from "../../assets/png/mondu.png";

const OnboardingLayout = ({ title, children }) => {
	return (
		<>
			<main className="flex flex-col h-screen">
				<div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
					<div className="flex-col hidden h-full p-12 md:flex">
						<h4 className="p-8 md:p-0">
							<Link to="/">
								<img alt="cover" src={mondu} width={80} height={80} />
							</Link>
						</h4>
						<div className="flex flex-col justify-center h-[calc(100vh-6rem-80px)]">
							<div className="max-w-md xl:max-w-2xl">
								<h2 className="text-2xl text-grey-dark xl:text-5xl xl:leading-relaxed">
									A <span className="text-secondary">secure and seamless</span> cross-border payment solution
								</h2>
							</div>
							<div className="max-w-lg mt-12">
								<div className="flex items-start my-4 space-x-4">
									<div className="mt-1">
										<img alt="" src={bullet} height={16} width={16} />
									</div>
									<p className="text-lg">Implement third-party integrations to facilitate collection of naira</p>
								</div>
								<div className="flex items-start my-4 space-x-4">
									<div className="mt-1">
										<img alt="" src={bullet} height={16} width={16} />
									</div>
									<p className="text-lg">Implement third-party integrations to facilitate collection of naira</p>
								</div>
								<div className="flex items-start my-4 space-x-4">
									<div className="mt-1">
										<img alt="" src={bullet} height={16} width={16} />
									</div>
									<p className="text-lg">Implement third-party integrations to facilitate collection of naira</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center flex-shrink-0 w-full h-full bg-white">{children}</div>
				</div>
			</main>
		</>
	);
};

export default OnboardingLayout;
