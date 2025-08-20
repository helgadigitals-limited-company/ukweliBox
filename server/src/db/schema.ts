import {
	pgTable,
	text,
	timestamp,
	boolean,
	integer,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified")
		.$defaultFn(() => false)
		.notNull(),
	image: text("image"),
	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
	updatedAt: timestamp("updated_at").$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
});


export const feedback = pgTable("feedback", {
	id: text("id").primaryKey(),
	fullname: text("fullname").notNull(),
	gender: text("gender").notNull(),
	phoneNo: text("phoneNo").notNull(),
	email: text("email"),
	feedbackTypeId: text("feedbackType").notNull().references(() => feedbackType.id, { onDelete: "cascade" }),
	message: text("message").notNull(),
	attachmentId: text("attachmentId").references(() => attachment.id, { onDelete: "set null" }),
	responseId: text("responseId").references(() => response.id, { onDelete: "set null" }),
	createdAt: timestamp("created_at").notNull(),
})

export const feedbackType = pgTable("feedbackType", {
	id: text("id").primaryKey(),
	feedbackType: text("feedbackType").notNull(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
})


export const attachment = pgTable("attachment", {
	id: text("id").primaryKey(),
	attachmentUrl: text("attachmentUrl").notNull(),
	attachmentName: text("attachmentName").notNull(),
	attachmentType: text("attachmentType").notNull(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
})

export const response = pgTable("response", {
	id: text("id").primaryKey(),
	response: text("response").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull(),
})