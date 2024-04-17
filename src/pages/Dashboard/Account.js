import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PrimaryBtn from "../../components/buttons/PrimaryBtn";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import { renderErrorMessage } from "../../helpers/functions";
import { useAuthContext } from "../../context/AuthContext";

const Account = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const DOCUMENTPERCENTAGE = !!user?.docs_kyc?.upload_link ? 100 : 25;
	const PERSONALPERCENTAGE = user?.paymentAccountDetails?.length >= 1 ? 100 : 0;

	return (
		<DashboardLayout title="Account" sidebar="inner">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="flex items-start mb-6 flex-start gap-x-10">
					<div className="w-28 h-28">
						<CircularProgressbar
							value={DOCUMENTPERCENTAGE}
							text={`${DOCUMENTPERCENTAGE}%`}
							counterClockwise
							styles={buildStyles({
								// Rotation of path and trail, in number of turns (0-1)
								rotation: 0.25,
								// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
								strokeLinecap: "round",
								// Text size
								textSize: "1.5rem",
								// How long animation takes to go from one percentage to another, in seconds
								pathTransitionDuration: 0.5,
								// Can specify path transition in more detail, or remove it entirely
								// pathTransition: 'none',
								// Colors
								pathColor: `rgba(0, 188, 176, ${DOCUMENTPERCENTAGE / 100})`,
								textColor: "#5630FF",
								trailColor: "#DADEE3",
								backgroundColor: "#FAFAFA",
							})}
						/>
					</div>
					<div className="w-full max-w-xs">
						<h3 className="mb-3 text-sm font-medium uppercase text-title">Document Upload</h3>
						<p>Upload your means of identification to have full access to Mondu</p>
						<div className="my-4">
							{!(user?.paymentAccountDetails?.length >= 1) && !user?.docs_kyc?.upload_link && (
								<PrimaryBtn placeholder="Upload Document" width="w-56" onClick={() => navigate(`/verification/upload`)} />
							)}
						</div>
					</div>
				</div>
				<div className="flex items-start mb-6 flex-start gap-x-10">
					<div className="w-28 h-28">
						<CircularProgressbar
							value={PERSONALPERCENTAGE}
							text={`${PERSONALPERCENTAGE}%`}
							counterClockwise
							styles={buildStyles({
								// Rotation of path and trail, in number of turns (0-1)
								rotation: 0.25,
								// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
								strokeLinecap: "round",
								// Text size
								textSize: "1.5rem",
								// How long animation takes to go from one percentage to another, in seconds
								pathTransitionDuration: 0.5,
								// Can specify path transition in more detail, or remove it entirely
								// pathTransition: 'none',
								// Colors
								pathColor: `rgba(0, 188, 176, ${PERSONALPERCENTAGE / 100})`,
								textColor: "#5630FF",
								trailColor: "#DADEE3",
								backgroundColor: "#FAFAFA",
							})}
						/>
					</div>
					<div className="w-full max-w-xs">
						<h3 className="mb-3 text-sm font-medium uppercase text-title">Personal Information</h3>
						<p>Complete your personal information to have full access to Mondu</p>
						<div className="my-4">
							{!(user?.paymentAccountDetails?.length >= 1) && (
								<PrimaryBtn
									placeholder="Add Personal Information"
									width="w-56"
									onClick={() => {
										!!user?.docs_kyc?.upload_link
											? navigate(`/verification/info`)
											: renderErrorMessage("Please upload documents to continue");
									}}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Account;
