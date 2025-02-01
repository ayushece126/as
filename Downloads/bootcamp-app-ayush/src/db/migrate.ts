// src/db/migrate.ts

import path from "path";
import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from ".";

(async () =>{
    console.log("Rinning Migration...")
    await migrate(db, {
        migrationsFolder: path.join(__dirname, "migrations"),
    });
    console.log("Migration Complete")
})();