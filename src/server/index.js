import axios from "axios";
import { getFromStorage, renderErrorMessage } from "../helpers/functions";

const server = axios.create({
	// baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	// baseURL: "https://api.mondu.io/development/api/v1",
	baseURL: "http://localhost:3333/api/v1",
	timeoutErrorMessage: "Network Error",
});

server.interceptors.request.use((config) => {
	const token = getFromStorage("auth")?.token;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

server.interceptors.response.use(
	(response) => response.data,
	(error) => {
		if (error.response.status === 401 || error.response.data.message === "401 Unauthorized") {
			renderErrorMessage(error.response.data.error, 2000).then(() => {
				localStorage.clear();
				// window.location.reload();
			});
			return null;
		} else {
			renderErrorMessage(error.response.data.message);
			throw new Error(error.response.data.message, {
				cause: error.response.data.data,
			});
		}
	}
);

export default server;

export const resend_otp = async (otp_id) => {
	let response = await server.post(`/signup/otp/resend/:${otp_id}`);
	return response.data;
};

export const verify_otp = async (otp) => {
	let response = await server.post(`/signup/otp/verify`, {
		otp,
	});
	return response.data;
};

export const updateKYC = async (params) => {
	const formData = new FormData();
	Object.keys(params).map((param) => formData.append(param, params[param]));

	/*   for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  } */

	let response = await server.patch(`/kyc?submit=yes`, formData);
	return response.data;
};

export const updateProfile = async (params) => {
	const formData = new FormData();
	Object.keys(params).map((param) => formData.append(param, params[param]));

	let response = await server.patch(`/profile`, formData);
	return response.data;
};

export const earlyAccess = async (email) => {
	let response = await server.post(`/early-access?email=${email}`);
	return response.data;
};

// NEW

export const login = (data) => server.post("/auth/login", data);

export const register = (data) => server.post("/auth/signup", data);

export const forgotPassword = (data) => server.post("/auth/forget-password", data);

export const resendOTP = (data) => server.post("/auth/resend-otp", data);

export const acceptMembership = (data) => server.post("/user/team/accept-memebership", data);

export const resetPassword = ({ token, data }) => server.patch(`/auth/reset-password/${token}`, data);

export const verifyAccount = ({ token, ...data }) => server.post("auth/verify-account", data, { headers: { Authorization: `Bearer ${token}` } });

export const updateUser = ({ token, ...data }) => {
	return server.patch("/user/profile", data, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateUserWhenLoggedIn = (data) => server.patch("/user/profile", data);

export const updateUserPassword = (data) => server.patch("/user/updatePassword", data);

export const getUser = () => server.get("/user");

export const getAllUsers = (params) => server.get("/users", { params });

export const getUserProfile = () => server.get("/user/profile");

export const getTeamMembers = () => server.get("/user/team/getMembers");

export const createTeam = (data) => server.post("/user/team/create", data);

export const addTeamMember = (data) => server.post("/user/team/addMembers", data);

export const editPermission = (data) => server.post("/user/team/add-permissions", data);

export const deleteTeamMember = (data) => server.delete("/user/team/delete", data);

export const getBeneficiaries = (params) => server.get("/user/beneficiary", { params });

export const createBeneficiary = (data) => server.post("/user/beneficiary", data);

export const editBeneficiary = ({ id, ...data }) => server.patch(`/user/beneficiary/${id}`, data);

export const deleteBeneficiary = (id) => server.delete(`/user/beneficiary/${id}`);

export const uploadKYC = ({ id, ...data }) => server.post(`/upload/kyc/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });

export const createFintechPerson = (data) => server.post(`/account/create`, data);

export const createFintechBusiness = (data) => server.post(`/account/create-business`, data);

export const createVirtualAccount = (data) => server.post(`/account/create-virtual`, data);

export const createPayoutDestination = () => server.post(`/account/payout`);

export const initializeTransfer = (data) => server.post(`/account/initialize-transfer`, data);

export const finalizeTransfer = (data) => server.post(`/account/finalize-transfer`, data);

export const finalizeLocalTransfer = (data) => server.post(`/account/finalize-local-transfer`, data);

export const initializeLocalTransfer = (data) => server.post(`/account/initialize-local-transfer`, data);

export const getConversionRates = () => server.get(`/account/get-rate`);

export const getVirtualAccount = (id) => server.get(`/account/fetch-virtual/${id}`);

export const getWalletBalance = (params) => server.get(`/account/get-balance`, { params });

export const getTransactions = (params) => server.get(`/account/transactions`, { params });

export const swapCurrencies = (params) => server.post(`/account/swap-currency`, params);

export const transferFromUSD = (params) => server.post(`/account/transfer-from-usd-wallet`, params);

export const listBanks = () =>
	server.get("/account/list-banks", {
		params: { country: "Nigeria" },
	});

export const verifyBankAccount = (data) => server.post("/account/resolve-bank", data);

export const uploadSupportingDocument = (data) =>
	server.post("/account/upload-supporting-doc", data, { headers: { "Content-Type": "multipart/form-data" } });

export const getNotifications = (params) => server.get("/user/notifications", { params });
