import React from 'react';
import Sidebar from "~/components/Sidebar";
import {Link} from "react-router";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";
import {sidebarNavs} from "~/constants/navs";

export const meta = ()=>([
    {title: 'aveo | Doctor Portal'},
    {name:'description', content:"Doctor Portal where a doctor can open patient's records." },
])

const dashboardCards = sidebarNavs.doctor;

const Doctor = ()=>  {
    return (
        <div className="flex flex-col items-center space-y-3 min-h-screen bg-gray-50">
            <h1>Doctor Portal</h1>
            <div className={"flex flex-wrap justify-center items-center p-6 gap-6"}>
                {dashboardCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <Link key={index} to={card.path} className="w-60">
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
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Doctor;