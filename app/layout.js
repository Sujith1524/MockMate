import { Rubik, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";

const geistSans = Rubik({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MockMate AI",
  description: "Generated by create next app",
};

//  const PUBLISHABLE_KEY = process.envl.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey="pk_test_Z3Jvd24tYm9iY2F0LTc4LmNsZXJrLmFjY291bnRzLmRldiQ">
      <html lang="en">
        <link rel="icon" href="/8131880.png" sizes="any" />
        <body className={`${geistSans.variable}  antialiased`}>
          {/* <Providers>{children}</Providers> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
