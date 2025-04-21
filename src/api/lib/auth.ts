import { betterAuth } from "better-auth";
import { drizzle } from "drizzle-orm/d1";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { lazy } from "./utils";
import * as schema from "../db/schema";

export const auth = lazy((env: Env) =>
	betterAuth({
		database: drizzleAdapter(drizzle(env.DB), {
			provider: "sqlite",
			schema: schema,
			usePlural: true,
		}),
		//   trustedOrigins: [env.CORS_ORIGIN],
		secret: env.BETTER_AUTH_SECRET,
		emailAndPassword: {
			enabled: true,
		},
		//   socialProviders: {
		//     google: {
		//       clientId: env.GOOGLE_CLIENT_ID,
		//       clientSecret: env.GOOGLE_CLIENT_SECRET,
		//     },
		//   },
	}),
);

// To perform a better-auth migration, run:
// bunx @better-auth/cli@latest migrate
// Uncomment the following line
// export const auth = getAuth({} as any);
