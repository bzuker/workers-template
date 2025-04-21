import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@components/ui/sonner";
import { sessionQueryOptions } from "@/lib/auth-client";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	beforeLoad: async ({ context }) => {
		const auth = await context.queryClient.ensureQueryData(
			sessionQueryOptions(),
		);

		return {
			auth,
		};
	},
	component: () => (
		<>
			<Outlet />
			<Toaster />
			<ReactQueryDevtools buttonPosition="top-right" />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	),
});
