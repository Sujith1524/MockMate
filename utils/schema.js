import {
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

// Resume Table
export const Resume = pgTable("resume", {
  id: serial("id").primaryKey(),
  userEmail: varchar("userEmail").notNull().unique(), // Unique resume per user (assuming email as user identifier)
  content: text("content").notNull(), // Markdown content
  atsScore: real("atsScore"), // AI evaluation score
  feedback: text("feedback"), // AI feedback
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export default { MockInterview };
