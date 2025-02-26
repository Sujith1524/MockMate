/**@type {import("drizzle-kit").Config} */

export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:zPofQerpF28K@ep-patient-mountain-a5o2jhq3.us-east-2.aws.neon.tech/Ai-interview-mocker?sslmode=require",
  },
};

// import { defineConfig } from "drizzle-kit";
// export default defineConfig({
//   out: "./drizzle",
//   schema: "./utils/schema.js",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: "postgresql://Sreejith:1kOXafxg0oYq@ep-patient-mountain-a5o2jhq3.us-east-2.aws.neon.tech/Ai-interview-mocker?sslmode=require",
//   },
// });

// import { neon } from "@neondatabase/serverless";

// console.log("Database URL:", process.env.NEXT_PUBLIC_DRIZZLE_DB_ORM);

// export default {
//   schema: "./utils/schema.js", // Adjust this path to your schema
//   out: "./drizzle-output", // Path for migrations and schema snapshots
//   driver: neon, // Use the Neon serverless driver
//   dialect: "postgresql",
//   dbCredentials: {
//     url: "postgresql://neondb_owner:zPofQerpF28K@ep-patient-mountain-a5o2jhq3.us-east-2.aws.neon.tech/Ai-interview-mocker?sslmode=require", // Pull from environment
//   },
// };
