import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		if (context.auth.data?.session) {
			return redirect({ to: "/dashboard" });
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
