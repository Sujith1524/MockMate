// "use client"
// import { UserButton } from '@clerk/nextjs'
// // import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { menuData } from '../../../lib/utils'
// import Image from "next/image";
// import Link from "next/link";
// import ThemeToggler from './ThemeToggler'

// const Header = () => {

//     const path = usePathname();

//     // Navbar toggle
//     const [navbarOpen, setNavbarOpen] = useState(false);
//     const navbarToggleHandler = () => {
//         setNavbarOpen(!navbarOpen);
//     };

//     // Sticky Navbar
//     const [sticky, setSticky] = useState(false);
//     const handleStickyNavbar = () => {
//         if (window.scrollY >= 80) {
//             setSticky(true);
//         } else {
//             setSticky(false);
//         }
//     };
//     useEffect(() => {
//         window.addEventListener("scroll", handleStickyNavbar);
//     });

//     // submenu handler
//     const [openIndex, setOpenIndex] = useState(-1);
//     const handleSubmenu = (index) => {
//         if (openIndex === index) {
//             setOpenIndex(-1);
//         } else {
//             setOpenIndex(index);
//         }
//     };

//     return (
//         <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
//             <p className='font-bold'>Ai Mock Interveiwer</p>
//             <ul className='hidden md:flex gap-6'>
//                 <Link href={'/dashboard'}>
//                     <li className={`hover:text-blue-600 cursor-pointer hover:font-bold transition-all
//                     ${path === '/dashboard' && 'text-blue-600 font-bold'}
//                     `}>Dashboard</li>
//                 </Link>

//                 <li className='hover:text-blue-600 cursor-pointer hover:font-bold transition-all'>Questions</li>
//                 <li className='hover:text-blue-600 cursor-pointer hover:font-bold transition-all'>Upgrade</li>
//                 <li className='hover:text-blue-600 cursor-pointer hover:font-bold transition-all'>How it works</li>
//             </ul>
//             <UserButton />
//         </div>


// export default Header
"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
// Import react scroll
import { Link as LinkScroll } from "react-scroll";

import LogoVPN from "../../../public/assets/Logo.svg"
import ButtonOutline from "@/app/layoutcomponents/ButtonOutline";
import { UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
    const { isSignedIn } = useUser();
    const [activeLink, setActiveLink] = useState(null);
    const [scrollActive, setScrollActive] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScrollActive(window.scrollY > 20);
        });
    }, []);
    return (
        <>
            <header
                className={
                    "fixed top-0 w-full  z-50 bg-white transition-all " +
                    (scrollActive ? " shadow-md pt-0" : " pt-4")
                }
            >
                <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
                    <Link href="/" className="col-start-1 col-end-2 flex items-center text-2xl font-bold text-pretty" >

                        {/* <LogoVPN className="h-8 w-auto" /> */}
                        MockMate AI

                    </Link>

                    <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500  items-center">
                        <LinkScroll
                            activeClass="active"
                            to="about"
                            spy={true}
                            smooth={true}
                            duration={1000}
                            onSetActive={() => {
                                setActiveLink("about");
                            }}
                            className={
                                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                                (activeLink === "about"
                                    ? " text-orange-500 animation-active "
                                    : " text-black-500 hover:text-orange-500 a")
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
                            onSetActive={() => {
                                setActiveLink("feature");
                            }}
                            className={
                                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                                (activeLink === "feature"
                                    ? " text-orange-500 animation-active "
                                    : " text-black-500 hover:text-orange-500 ")
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
                    <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
                        {isSignedIn ? (
                            <UserButton />
                        ) : (
                            <>
                                <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}>
                                    <p className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                                        Sign In
                                    </p>
                                </Link>
                                <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}>
                                    <ButtonOutline>Sign Up</ButtonOutline>
                                </Link>

                            </>
                        )}
                    </div>
                </nav>
            </header>
            {/* Mobile Navigation */}

            <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
                <div className="bg-white-500 sm:px-3">
                    <ul className="flex w-full justify-between items-center text-black-500">
                        <LinkScroll
                            activeClass="active"
                            to="about"
                            spy={true}
                            smooth={true}
                            duration={1000}
                            onSetActive={() => {
                                setActiveLink("about");
                            }}
                            className={
                                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                                (activeLink === "about"
                                    ? "  border-orange-500 text-orange-500"
                                    : " border-transparent")
                            }
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            About
                        </LinkScroll>
                        <LinkScroll
                            activeClass="active"
                            to="feature"
                            spy={true}
                            smooth={true}
                            duration={1000}
                            onSetActive={() => {
                                setActiveLink("feature");
                            }}
                            className={
                                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                                (activeLink === "feature"
                                    ? "  border-orange-500 text-orange-500"
                                    : " border-transparent ")
                            }
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                            </svg>
                            Feature
                        </LinkScroll>
                        <LinkScroll
                            activeClass="active"
                            to="pricing"
                            spy={true}
                            smooth={true}
                            duration={1000}
                            onSetActive={() => {
                                setActiveLink("pricing");
                            }}
                            className={
                                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                                (activeLink === "pricing"
                                    ? "  border-orange-500 text-orange-500"
                                    : " border-transparent ")
                            }
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Pricing
                        </LinkScroll>

                    </ul>
                </div>
            </nav>
            {/* End Mobile Navigation */}
        </>
    );
};

export default Header;
