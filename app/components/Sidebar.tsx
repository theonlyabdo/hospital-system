// components/Sidebar.tsx
import React from "react";
import { useLocation, Link } from "react-router";
import { sidebarNavs } from "~/constants/navs";
import { ChevronRight } from "lucide-react";

const Sidebar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    // ---------------------------
    // Detect module: "pas", "nurse", "doctor", etc.
    // Example: "/pas/new"  → "pas"
    // ---------------------------
    const moduleKey = pathname.split("/")[1] || "";

    const items = sidebarNavs[moduleKey as keyof typeof sidebarNavs];

    // If no nav group found for this module → render nothing
    if (!items) return null;

    return (
        <aside className="w-64 bg-white border-r flex flex-col p-4 gap-4">
            <h1 className="font-bold !text-3xl tracking-tight capitalize">
                {moduleKey.replace("-", " ")}
            </h1>

            <nav className="flex flex-col gap-1 text-sm">
                {items.map((item) => {
                    const Icon = item.icon;

                    // Active if current path starts with the sidebar item's base
                    const isActive = pathname === item.path || pathname.startsWith(item.path + "/");

                    return (
                        <Link key={item.path} to={item.path}>
                            <SidebarItem
                                icon={<Icon size={18} />}
                                label={item.label}
                                active={isActive}
                            />
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

type SidebarItemProps = {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
};

const SidebarItem = ({ icon, label, active = false }: SidebarItemProps) => {
    return (
        <button
            className={`flex items-center gap-2 p-2 rounded-md transition group 
        ${active ? "bg-rose-700 text-white shadow" : "text-gray-700 hover:bg-gray-100"}`}
        >
            {icon}
            <span className="flex-1 text-left">{label}</span>
            <ChevronRight
                size={16}
                className={`opacity-0 group-hover:opacity-100 transition ${
                    active ? "opacity-100" : ""
                }`}
            />
        </button>
    );
};

export default Sidebar;
