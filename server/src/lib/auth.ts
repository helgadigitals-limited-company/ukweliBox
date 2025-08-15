import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins"
import db from "@/db/index.js";
import {createAuthMiddleware, APIError} from 'better-auth/api';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	telemetry: {
		enabled: false,
	},
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		openAPI()
	],
	hooks: {
		before: createAuthMiddleware(async (ctx) => {
			if (ctx.path !== "/sign-up/email") {
				return;
			}
			if (!ctx.body?.email.endsWith("@helgadigitals.co.tz")) {
				throw new APIError("BAD_REQUEST", {
					message: "Email must end with @helgadigitals.co.tz",
				});
			}
		}),
	},
});