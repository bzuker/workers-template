import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { users } from "./db/schema";
import { auth } from "./lib/auth";

const app = new Hono<{ Bindings: Env }>();

app.on(["POST", "GET"], "/api/auth/**", (c) => {
	console.log("auth", c.req.path);
	return auth(c.env).handler(c.req.raw);
});

app.get("/api/", async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.select().from(users);

	console.log("result", result);
	return c.json({
		name: `Cloudflare ${Math.random()}`,
	});
});

app.get("/api/test", async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db
		.insert(users)
		.values({
			id: `${Math.random() * 1000000}`.slice(0, 10),
			name: "test2",
			email: "test2@test.com",
			emailVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		})
		.returning();

	console.log("result", result);
	return c.json({
		result,
	});
});
app.get("*", (c) => {
	return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
