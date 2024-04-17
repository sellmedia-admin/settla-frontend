import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import Button from "../../../components/buttons/PrimaryBtn";
import OnboardingLayout from "../../../components/layouts/OnboardingLayout";
import Selector from "../../../components/Selector";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();
	const [type_of_user, setTypeOfUser] = useState("");

	return (
		<OnboardingLayout title="Sign Up">
			<div className="max-w-lg px-8 py-16 mx-auto">
				<h4 className="text-[34px] text-grey-dark">Sign up</h4>
				<p className="text-blue-offBlue">Tell us about how you want to use Mondu</p>

				<div className="grid grid-cols-2 gap-8 mt-12 mb-6">
					<Selector
						icon={<FaUser className={type_of_user === "personal" ? "text-primary" : "text-gray-400"} height={16} width={16} />}
						isActive={type_of_user === "personal"}
						title="For myself"
						body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cras scelerisque elit."
						setActive={() => setTypeOfUser("personal")}
					/>
					<Selector
						icon={<HiUserGroup className={type_of_user === "business" ? "text-primary" : "text-gray-400"} height={16} width={16} />}
						isActive={type_of_user === "business"}
						title="For my business"
						body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cras scelerisque elit."
						setActive={() => setTypeOfUser("business")}
					/>
				</div>
				<Button placeholder="Continue" disabled={!!!type_of_user} onClick={() => navigate(`/signup/${type_of_user}/`)} />
			</div>
		</OnboardingLayout>
	);
};

export { Register };

export default Signup;
