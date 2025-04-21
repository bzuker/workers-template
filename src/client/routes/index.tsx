import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">some landing page</h1>
			<Link to="/login">Login</Link>
		</div>
	);
}
