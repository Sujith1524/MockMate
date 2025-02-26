import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";
const sql = neon(
  "postgresql://neondb_owner:zPofQerpF28K@ep-patient-mountain-a5o2jhq3.us-east-2.aws.neon.tech/Ai-interview-mocker?sslmode=require"
);
console.log(sql, "sql");

console.log("Schema Loaded:", schema);

export const db = drizzle(sql, { schema });
