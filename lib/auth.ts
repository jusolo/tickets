import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const db = new Database("./db.sqlite");

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: true, // Cambiar a true cuando tengas las credenciales
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      enabled: false, // Cambiar a true cuando tengas las credenciales
    },
  },
});
