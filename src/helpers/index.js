/* Return a string based on error response received from the server */
export const parseError = (error) => {
	let err = "";

	try {
		if (error.response) {
			if (error.response.data) {
				if (error.response.data.message) {
					if (typeof error.response.data.message === "string") {
						err = error.response.data.message;
					} else {
						Object.keys(error.response.data.message).map((key) => (err += `${key.split("_")} ${error.response.data.message[key]} `));
					}
				} else {
					if (error.response.data === "string") {
						err = error.response.data;
					} else {
						Object.keys(error.response.data).map((key) => (err += `${key.split("_")} ${error.response.data[key]} `));
					}
				}
			}
		}
		return "Failure: " + typeof error === "string" ? error : err ? err : error.message || "Error";
	} catch (error) {
		return error.message;
	}
};

export const maybePluralize = (count, noun, suffix = "s") => `${count} ${noun}${count !== 1 ? suffix : ""}`;

export const decodeObject = (data) => {
	let temp = decodeURIComponent(data);
	return JSON.parse(temp);
};
