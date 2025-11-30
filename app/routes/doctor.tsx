import React, { useState } from "react";
import Sidebar from "~/components/Sidebar";
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { patients } from '~/lib/patients';
import DoctorTabs from "~/components/doctor/DoctorTabs";

export const meta = () => ([
    { title: "aveo | Doctor Portal" },
    { name: "description", content: "Doctor Portal where a doctor can open patient records." }
]);

const Doctor = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(false);

    // Triggered when selecting a patient
    const handleSelectPatient = (p) => {
        setLoading(true);
        setSelectedPatient(null);

        setTimeout(() => {
            setSelectedPatient(p);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">

            <div className="flex-1 p-6 space-y-6 overflow-auto">
                <h1 className="!text-4xl w-sm !font-bold text-gray-800 mb-4">Doctor Portal</h1>

                {/* ----------------------------- TOP ROW ----------------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* --------------------------- PATIENT LIST ------------------------ */}
                    <Card className="shadow-sm">
                        <CardHeader className={'flex items-center justify-between'}>
                            <CardTitle className="text-lg font-semibold">Patient List</CardTitle>
                            <Button
                                className={'bg-rose-800 hover:bg-rose-700'}
                                onClick={() => setSelectedPatient(null)}
                            >
                                Clear
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            {patients.map((p) => (
                                <Button
                                    key={p.id}
                                    onClick={() => handleSelectPatient(p)}
                                    className={`w-full justify-start p-5 text-left ${
                                        selectedPatient?.id === p.id
                                            ? "bg-rose-700 text-white hover:bg-rose-600"
                                            : "bg-gray-100 text-gray-800 hover:bg-rose-50"
                                    }`}
                                    variant="ghost"
                                >
                                    <img src={p.avatar} className="w-9 h-9 rounded-full" />
                                    {p.name} — Bed {p.bed}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* --------------------------- PATIENT SUMMARY ----------------------- */}
                    {loading ? (
                        <Card className="shadow-sm animate-pulse">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Patient Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </CardContent>
                        </Card>
                    ) : selectedPatient ? (
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Patient Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1 text-sm text-gray-700">
                                <p><strong>Name:</strong> {selectedPatient.name}</p>
                                <p><strong>Age:</strong> {selectedPatient.age}</p>
                                <p><strong>Reason:</strong> {selectedPatient.reason}</p>
                                <p><strong>Allergies:</strong> {selectedPatient.allergies || "None"}</p>
                                <p><strong>Code Status:</strong> {selectedPatient.code}</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="shadow-sm opacity-60">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Patient Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-500 text-sm">
                                Select a patient to view details.
                            </CardContent>
                        </Card>
                    )}

                    {/* ------------------------------ KPIs ------------------------------- */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">My KPIs</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-700 space-y-1">
                            <p>Open Consultations: 4</p>
                            <p>Pending Lab Reviews: 3</p>
                            <p>New Imaging Reports: 2</p>
                            <p>Unfinished Notes: 1</p>
                        </CardContent>
                    </Card>
                </div>

                {/* ------------------------------ WORKSPACE ---------------------------- */}
                <div className="mt-6">
                    {!selectedPatient && !loading ? (
                        <p className="text-gray-500 text-center mt-40 text-lg">
                            Select a patient to view their medical record.
                        </p>
                    ) : loading ? (
                        /* ------------------------- FULL-WIDTH SKELETON ------------------------ */
                        <Card className="shadow-sm animate-pulse p-6 space-y-4">
                            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/6"></div>
                        </Card>
                    ) : (
                        <DoctorTabs patient={selectedPatient} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctor;
