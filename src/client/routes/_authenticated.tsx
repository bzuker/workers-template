import { AppSidebar } from "@components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		if (!context.auth.data?.user) {
			return redirect({ to: "/login" });
		}
	},
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
