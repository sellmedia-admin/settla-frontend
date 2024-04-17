import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page" className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl">Oops!</h1>
			<p className="mt-2 text-lg">Sorry, an unexpected error has occurred.</p>
			<p className="mt-2 text-lg">
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
