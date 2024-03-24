import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, varchar, longtext, int, unique, serial, timestamp, float } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const rohiAccount = mysqlTable("rohi_account", {
	userId: varchar("userId", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refreshToken: longtext("refresh_token"),
	accessToken: longtext("access_token"),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: varchar("id_token", { length: 255 }),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => {
	return {
		userIdIdx: index("userId_idx").on(table.userId),
		rohiAccountProviderProviderAccountId: primaryKey({ columns: [table.provider, table.providerAccountId], name: "rohi_account_provider_providerAccountId"}),
	}
});

export const rohiAnime = mysqlTable("rohi_anime", {
	id: serial("id").notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	image: varchar("image", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).onUpdateNow(),
	episodes: int("episodes").notNull(),
	anilistId: int("anilist_id").notNull(),
},
(table) => {
	return {
		slugIdx: index("slug_idx").on(table.slug),
		anilistIdx: index("anilist_idx").on(table.anilistId),
		rohiAnimeId: primaryKey({ columns: [table.id], name: "rohi_anime_id"}),
		id: unique("id").on(table.id),
		rohiAnimeAnilistIdUnique: unique("rohi_anime_anilist_id_unique").on(table.anilistId),
	}
});

export const rohiComments = mysqlTable("rohi_comments", {
	id: serial("id").notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	episodeNumber: int("episode_number").notNull(),
	text: varchar("text", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).onUpdateNow(),
},
(table) => {
	return {
		slugIdx: index("slug_idx").on(table.slug),
		userIdx: index("user_idx").on(table.userId),
		rohiCommentsId: primaryKey({ columns: [table.id], name: "rohi_comments_id"}),
		id: unique("id").on(table.id),
	}
});

export const rohiHistory = mysqlTable("rohi_history", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 255 }),
	slug: varchar("slug", { length: 255 }).notNull(),
	pathname: varchar("pathname", { length: 255 }).notNull(),
	episodeNumber: int("episode_number").notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	image: varchar("image", { length: 255 }),
	progress: float("progress").notNull(),
	duration: float("duration").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).onUpdateNow(),
},
(table) => {
	return {
		pathIdx: index("path_idx").on(table.pathname),
		slugIdx: index("slug_idx").on(table.slug),
		rohiHistoryId: primaryKey({ columns: [table.id], name: "rohi_history_id"}),
		id: unique("id").on(table.id),
	}
});

export const rohiSession = mysqlTable("rohi_session", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		userIdIdx: index("userId_idx").on(table.userId),
		rohiSessionSessionToken: primaryKey({ columns: [table.sessionToken], name: "rohi_session_sessionToken"}),
	}
});

export const rohiUser = mysqlTable("rohi_user", {
	id: varchar("id", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { fsp: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP(3)`),
	image: varchar("image", { length: 255 }),
},
(table) => {
	return {
		rohiUserId: primaryKey({ columns: [table.id], name: "rohi_user_id"}),
	}
});

export const rohiVerificationToken = mysqlTable("rohi_verificationToken", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		rohiVerificationTokenIdentifierToken: primaryKey({ columns: [table.identifier, table.token], name: "rohi_verificationToken_identifier_token"}),
	}
});