"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Link as LinkScroll } from "react-scroll";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { isSignedIn, user } = useUser();

  const pathname = usePathname(); // Get current page URL
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window?.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);

  return (
    <>
      <header
        className={
          "fixed top-0 w-full z-50 bg-white transition-all " +
          (scrollActive ? "shadow-md pt-0" : "pt-4")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <Link
            href="/"
            className="col-start-1 col-end-2 flex items-center text-2xl font-bold text-pretty"
          >
            MockMate AI
          </Link>

          {/* Show About, Features, Pricing only if NOT on the Dashboard */}
          {pathname !== "/dashboard" && (
            <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500 items-center">
              <LinkScroll
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => setActiveLink("about")}
                className={
                  "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                  (activeLink === "about"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:text-orange-500")
                }
              >
                About
              </LinkScroll>
              <LinkScroll
                activeClass="active"
                to="feature"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => setActiveLink("feature")}
                className={
                  "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                  (activeLink === "feature"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:text-orange-500")
                }
              >
                Feature
              </LinkScroll>
              <Link
                href="/dashboard"
                className={
                  "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                  (activeLink === "pricing"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:text-orange-500 ")
                }
              >
                Dashboard
              </Link>
            </ul>
          )}

          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                {/* Show Name if available */}
                {user && (
                  <span className="text-black-600 font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                )}
                {/* Profile Button */}
                <UserButton />
              </div>
            ) : (
              <>
                <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}>
                  <p className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                    Sign In
                  </p>
                </Link>
                <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}>
                  <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:text-black transition-all">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
