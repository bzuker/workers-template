import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
// import { redirect } from "@tanstack/react-router";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// baseURL: "http://localhost:3000",
});

export const sessionQueryOptions = () =>
	queryOptions({
		queryKey: ["session"],
		queryFn: () => authClient.getSession(),
	});

export function useAuthenticatedUser() {
	const { data: session, error } = useSuspenseQuery(sessionQueryOptions());

	if (!session.data || error) {
		console.log("error", error);
		return null;
	}

	return session.data;
}
