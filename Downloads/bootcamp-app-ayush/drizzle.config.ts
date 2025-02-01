// drizzle.config.ts
import type { Config } from "drizzle-kit"

export default {
    dialect: "sqlite",
    schema: "./src/db/schema.ts",
    out: "./src/db",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    }
} satisfies Config;