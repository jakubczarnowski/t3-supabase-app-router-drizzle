import {
  unique,
  uuid,
  timestamp,
  text,
  varchar,
  index,
  jsonb,
  uniqueIndex,
  boolean,
  smallint,
  pgSchema,
} from "drizzle-orm/pg-core";

export const auth = pgSchema("auth");

export const users = auth.table(
  "users",
  {
    instanceId: uuid("instance_id"),
    id: uuid("id").primaryKey().notNull(),
    aud: varchar("aud", { length: 255 }),
    role: varchar("role", { length: 255 }),
    email: varchar("email", { length: 255 }),
    encryptedPassword: varchar("encrypted_password", { length: 255 }),
    emailConfirmedAt: timestamp("email_confirmed_at", {
      withTimezone: true,
      mode: "string",
    }),
    invitedAt: timestamp("invited_at", { withTimezone: true, mode: "string" }),
    confirmationToken: varchar("confirmation_token", { length: 255 }),
    confirmationSentAt: timestamp("confirmation_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    recoveryToken: varchar("recovery_token", { length: 255 }),
    recoverySentAt: timestamp("recovery_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    emailChangeTokenNew: varchar("email_change_token_new", { length: 255 }),
    emailChange: varchar("email_change", { length: 255 }),
    emailChangeSentAt: timestamp("email_change_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    lastSignInAt: timestamp("last_sign_in_at", {
      withTimezone: true,
      mode: "string",
    }),
    rawAppMetaData: jsonb("raw_app_meta_data"),
    rawUserMetaData: jsonb("raw_user_meta_data"),
    isSuperAdmin: boolean("is_super_admin"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    phone: text("phone").default(""),
    phoneConfirmedAt: timestamp("phone_confirmed_at", {
      withTimezone: true,
      mode: "string",
    }),
    phoneChange: text("phone_change").default(""),
    phoneChangeToken: varchar("phone_change_token", { length: 255 }).default(
      "",
    ),
    phoneChangeSentAt: timestamp("phone_change_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    confirmedAt: timestamp("confirmed_at", {
      withTimezone: true,
      mode: "string",
    }),
    emailChangeTokenCurrent: varchar("email_change_token_current", {
      length: 255,
    }).default(""),
    emailChangeConfirmStatus: smallint("email_change_confirm_status").default(
      0,
    ),
    bannedUntil: timestamp("banned_until", {
      withTimezone: true,
      mode: "string",
    }),
    reauthenticationToken: varchar("reauthentication_token", {
      length: 255,
    }).default(""),
    reauthenticationSentAt: timestamp("reauthentication_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    isSsoUser: boolean("is_sso_user").default(false).notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
  },
  (table) => {
    return {
      instanceIdIdx: index("users_instance_id_idx").on(table.instanceId),
      instanceIdEmailIdx: index("users_instance_id_email_idx").on(
        table.instanceId,
      ),
      confirmationTokenIdx: uniqueIndex("confirmation_token_idx").on(
        table.confirmationToken,
      ),
      recoveryTokenIdx: uniqueIndex("recovery_token_idx").on(
        table.recoveryToken,
      ),
      emailChangeTokenCurrentIdx: uniqueIndex(
        "email_change_token_current_idx",
      ).on(table.emailChangeTokenCurrent),
      emailChangeTokenNewIdx: uniqueIndex("email_change_token_new_idx").on(
        table.emailChangeTokenNew,
      ),
      reauthenticationTokenIdx: uniqueIndex("reauthentication_token_idx").on(
        table.reauthenticationToken,
      ),
      emailPartialKey: uniqueIndex("users_email_partial_key").on(table.email),
      usersPhoneKey: unique("users_phone_key").on(table.phone),
    };
  },
);
