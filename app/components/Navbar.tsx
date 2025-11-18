import { Home, UserPlus, Stethoscope, Syringe, Pill , FlaskConical} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";

const Navs = [
    { name: "Home", path: "/", icon: Home },
    { name: "Register", path: "/registration", icon: UserPlus },
    { name: "Nurse", path: "/nurse", icon: Syringe },
    { name: "Doctor", path: "/doctor", icon: Stethoscope },
    { name: "Pharmacy", path: "/pharmacy", icon: Pill },
    { name: "Laboratory", path: "/laboratory", icon: FlaskConical },
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current) {
                // Scrolling down
                setShow(false);
            } else {
                // Scrolling up
                setShow(true);
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`
        w-full bg-white shadow-md p-5 sticky top-0 left-0 z-50 transform transition-transform duration-300
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1
                    className="font-extrabold !text-3xl cursor-pointer p-1"
                    onClick={() => navigate("/")}
                >
                    Aveo Hospital System
                </h1>

                <div className="flex items-center gap-6">
                    {Navs.map((nav, index) => {
                        const Icon = nav.icon;
                        const isActive = location.pathname === nav.path;

                        return (
                            <Link
                                key={index}
                                to={nav.path}
                                className={`
                  font-semibold flex items-center gap-1 py-2 px-3 rounded-xl
                  ${isActive ? "bg-rose-800 text-white shadow" : "text-rose-800 hover:bg-gray-100"}
                `}
                            >
                                {Icon && <Icon size={18} />}
                                {nav.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
