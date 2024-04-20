import { Suspense } from "react";
import "./App.css";
import "react-circular-progressbar/dist/styles.css";
import ErrorPage from "./ErrorPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AcceptInvitation, ForgotPassword, Login, OTP, Register, ResetPassword } from "./pages/Authentication";
import Dashboard, { Account, Beneficiaries, Profile, Teams, Transactions } from "./pages/Dashboard";
import Home from "./pages";
import AuthLayout from "./components/layouts/AuthLayout";
import NoAuthLayout from "./components/layouts/NoAuthLayout";
import { AuthContextProvider } from "./context/AuthContext";
import { Information, PersonalVerification } from "./pages/Verification";
import Loader from "./components/Loader";
import Logout from "./pages/Logout";
import Features from "./pages/Features";
import AboutCompany from "./pages/Company";
import CaseStudy from "./pages/CaseStudy";
import Contact from "./pages/Contact";
import Case1 from "./pages/CaseStudy/case1";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <NoAuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/features",
				element: <Features />,
			},
			{
				path: "/about",
				element: <AboutCompany />,
			},
			{
				path: "/case-study",
				element: <CaseStudy />,
			},
			{
				path: "/case-study/case1",
				element: <Case1 />
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "signup",
				element: <Register />,
			},
			{
				path: "otp/:email",
				element: <OTP />,
			},
			{
				path: "forgot-password",
				element: <ForgotPassword />,
			},
			{
				path: "reset-password",
				element: <ResetPassword />,
			},
			{
				path: "accept-invitation/:email",
				element: <AcceptInvitation />,
			},
		],
	},
	{
		path: "/",
		element: <AuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "dashboard",
				children: [
					{
						index: true,
						element: <Dashboard />,
					},
					{
						path: "account",
						element: <Account />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
					{
						path: "transactions",
						element: <Transactions />,
					},
					{
						path: "beneficiaries",
						element: <Beneficiaries />,
					},
					{
						path: "teams",
						element: <Teams />,
					},
				],
			},
			{
				path: "verification",
				children: [
					{
						path: "upload",
						element: <PersonalVerification />,
					},
					{
						path: "info",
						element: <Information />,
					},
				],
			},
			{
				path: "/logout",
				element: <Logout />,
			},
		],
	},
]);

function App() {
	return (
		<AuthContextProvider>
			<Suspense fallback={<Loader full />}>
				<RouterProvider router={router} />
			</Suspense>
		</AuthContextProvider>
	);
}

export default App;
