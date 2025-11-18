import { Home, UserPlus, Stethoscope, Syringe, Pill } from "lucide-react";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router";

const Navs = [
    { name: "Home", path: "/", icon: Home },
    { name: "Register", path: "/register", icon: UserPlus },
    { name: "Nurse", path: "/nurse", icon: Syringe },
    { name: "Doctor", path: "/doctor", icon: Stethoscope },
    { name: "Pharmacy", path: "/pharmacy", icon: Pill },
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="w-full bg-white shadow-md p-5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1
                    className="font-bold !text-3xl cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Senwell Hospital
                </h1>

                <div className="flex items-center gap-6">
                    {Navs.map((nav, index) => {
                        const Icon = nav.icon;
                        const isActive = location.pathname === nav.path;

                        return (
                            <Link
                                key={index}
                                to={nav.path}
                                className={
                                    `font-semibold flex items-center gap-1 p-2 rounded-xl
                  ${
                                        isActive
                                            ? "bg-rose-800 text-white shadow"
                                            : "text-rose-800 hover:bg-gray-100"
                                    }`
                                }
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
