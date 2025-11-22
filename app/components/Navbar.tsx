import {
    ArrowLeft,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import {topNav} from "~/constants/navs";

const Navs = topNav;

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/";

    // Scroll-based visibility (ONLY for homepage)
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        if (!isHome) return; // disable scroll behavior on other pages

        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current) {
                setShow(false); // scrolling down
            } else {
                setShow(true); // scrolling up
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    return (
        <nav
            className={`
        w-full bg-white  p-5 z-50 transition-all duration-300
        ${isHome ? "fixed shadow-md top-0 left-0" : "border-b sticky top-0 left-0"}
        ${isHome ? (show ? "translate-y-0" : "-translate-y-full") : ""}
      `}
        >
            <div className={`${isHome? 'max-w-7xl': ''} mx-auto flex items-center justify-between`}>
                {/* ---- OTHER PAGES NAVBAR ---- */}
                {/*
                    !isHome && (
                    <Button
                        variant="outline"
                        className="hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Button>
                )*/}
                <h1
                    className="font-extrabold !text-3xl cursor-pointer p-1"
                    onClick={() => navigate("/")}
                >
                    {/* isHome? 'Aveo Hospital System':''*/ }
                    Aveo Hospital System
                </h1>

                {/* ---- HOMEPAGE NAVBAR ---- */}
                {//isHome && (
                    <div className="flex items-center gap-6">
                        {Navs.map((nav, index) => {
                            const Icon = nav.icon;
                            const isActive = location.pathname === nav.path;
                            return (
                                <Link
                                    key={index}
                                    to={nav.path}
                                    className={`font-semibold flex items-center gap-1 py-2 px-3 rounded-xl
                                       ${isActive ? "bg-rose-800 text-white shadow" : 
                                        "text-rose-800 hover:bg-gray-100"}`}>
                                    {Icon && <Icon size={18} />}
                                    {nav.name}
                                </Link>
                            );
                        })}
                    </div>
                }
            </div>
        </nav>
    );
};

export default Navbar;
