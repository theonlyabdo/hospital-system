import React, { useState } from "react";
import { Link } from "react-router";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
    UserPlus,
    FileSearch,
    Calendar as CalendarIcon,
    Stethoscope,
} from "lucide-react";
import PasArea from "~/components/pas/PasArea";
import DoctorsArea from "~/components/pas/DoctorsArea";

export const meta = () => [
    { title: "aveo | Pas Portal" },
    { name: "description", content: "Patient Access Portal to register patients." },
];


const Pas = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] min-h-screen bg-gray-50">
            {/* LEFT SIDE — MAIN WORKSPACE */}
            <PasArea/>

            {/* RIGHT SIDE — DOCTOR BROWSER */}
            <DoctorsArea/>

        </div>
    );
};

export default Pas;
