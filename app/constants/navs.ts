// constants/navs.ts
import {
    Home,
    UserPlus,
    Syringe,
    Stethoscope,
    Pill,
    FlaskConical,
    Calendar,
    FileSearch,
    HandCoins,
    Microscope,
} from "lucide-react";

export const topNav = [
    { name: "Home", path: "/", icon: Home },
    { name: "Patient access", path: "/pas", icon: UserPlus },
    { name: "Nurse", path: "/nurse", icon: Syringe },
    { name: "Doctor", path: "/doctor", icon: Stethoscope },
    { name: "Pharmacy", path: "/pharmacy", icon: Pill },
    { name: "Laboratory", path: "/laboratory", icon: FlaskConical },
];

// -------------------------
// Per-module sidebar groups
// -------------------------

export const sidebarNavs = {
    pas: [
        { label: "Dashboard", icon: Home, path: "/pas" },
        { label: "New Patient", icon: UserPlus, path: "/pas/new" },
        { label: "Financials", icon: HandCoins, path: "/pas/financials" },
        { label: "Insurance", icon: FileSearch, path: "/pas/insurance" },
        { label: "Appointments", icon: Calendar, path: "/pas/appointments" },
        { label: "Walk-ins", icon: Stethoscope, path: "/pas/walk-ins" },
        { label: "Future Orders", icon: FileSearch, path: "/pas/orders" },
        { label: "Lab Estimator", icon: Microscope, path: "/pas/lab" },
    ],

    nurse: [
        { label: "Dashboard", icon: Syringe, path: "/nurse" },
        { label: "Tasks", icon: Calendar, path: "/nurse/tasks" },
        { label: "Patients", icon: UserPlus, path: "/nurse/patients" },
    ],

    doctor: [
        { label: "Dashboard", icon: Stethoscope, path: "/doctor" },
        { label: "Visits", icon: Calendar, path: "/doctor/visits" },
        { label: "Patients", icon: UserPlus, path: "/doctor/patients" },
    ],
};
