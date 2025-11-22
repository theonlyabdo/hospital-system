import React from 'react';
import Sidebar from "~/components/Sidebar";
import {Link} from "react-router";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";
import {sidebarNavs} from "~/constants/navs";
import { motion } from "framer-motion";

export const meta = ()=>([
    {title: 'aveo | Nurse Portal'},
    {name:'description', content:"Nurse Portal where a nurse can open patient's records." },
])

const dashboardCards = sidebarNavs.nurse;

const Nurse = ()=>  {

    return (
        <div className="flex flex-col items-center space-y-3 min-h-screen bg-gray-50">
            <h1>Nursing Portal</h1>
            <div className={"flex flex-wrap justify-center items-center p-6 gap-6"}>
                {dashboardCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <Link key={index} to={card.path} className="w-60">
                            <motion.div  whileHover={{ scale: 1.03 }}>
                            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <Icon className="w-6 h-6 text-rose-700" />
                                        {card.label}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Go to {card.label}</p>
                                </CardContent>
                            </Card>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Nurse;