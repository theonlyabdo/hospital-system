import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import InsuranceCheck from "../components/pas/InsuranceCheck";

const DEMO_PATIENTS = [
    {
        mrn: "MRN00123",
        uid: "784-1990-1234567-0",
        firstName: "Ahmed",
        lastName: "Hassan",
        gender: "Male",
        dob: "1990-05-14",
        phone: "+971526789123",
        prescriptions: [
            {
                doctor: "Dr. Sarah N.",
                medicines: [
                    { name: "Amoxicillin 500mg", dose: "500mg twice daily", refills: 2, remaining: 1 },
                    { name: "Ibuprofen 400mg", dose: "400mg every 8h", refills: 1, remaining: 1 },
                ],
            },
            {
                doctor: "Dr. Omar S.",
                medicines: [
                    { name: "Paracetamol 1g", dose: "1g every 6h", refills: 3, remaining: 2 },
                ],
            },
        ],
        balance: 50,
    },
    {
        mrn: "MRN00987",
        uid: "784-1985-7654321-0",
        firstName: "Mariam",
        lastName: "Adel",
        gender: "Female",
        dob: "1985-09-02",
        phone: "+971555982312",
        prescriptions: [
            {
                doctor: "Dr. Khaled R.",
                medicines: [
                    { name: "Lisinopril 20mg", dose: "20mg once daily", refills: 1, remaining: 0 },
                ],
            },
        ],
        balance: 0,
    },
];

const Pharmacy = () => {
    const [criteria, setCriteria] = useState({ mrn: "", uid: "", first: "", last: "" });
    const [patient, setPatient] = useState(null);

    const handleSearch = () => {
        const found = DEMO_PATIENTS.find((p) => {
            const matchMRN = criteria.mrn ? p.mrn.toLowerCase() === criteria.mrn.toLowerCase() : false;
            const matchUID = criteria.uid ? p.uid.toLowerCase() === criteria.uid.toLowerCase() : false;
            const matchName =
                criteria.first && criteria.last
                    ? p.firstName.toLowerCase() === criteria.first.toLowerCase() &&
                    p.lastName.toLowerCase() === criteria.last.toLowerCase()
                    : false;

            return matchMRN || matchUID || matchName;
        });

        setPatient(found ?? null);
    };

    return (
        <div className="flex w-full h-screen overflow-hidden">
            {/* Left - Search */}
            <div className="w-80 bg-white p-6 shadow-sm sticky top-0 h-screen flex-shrink-0">
                <h1 className="!text-4xl font-bold mb-4">Pharmacy Portal</h1>
                <div className="space-y-4">
                    <div>
                        <Label>MRN</Label>
                        <Input
                            value={criteria.mrn}
                            onChange={(e) => setCriteria({ ...criteria, mrn: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>UID</Label>
                        <Input
                            value={criteria.uid}
                            onChange={(e) => setCriteria({ ...criteria, uid: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label>First Name</Label>
                            <Input
                                value={criteria.first}
                                onChange={(e) => setCriteria({ ...criteria, first: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>Last Name</Label>
                            <Input
                                value={criteria.last}
                                onChange={(e) => setCriteria({ ...criteria, last: e.target.value })}
                            />
                        </div>
                    </div>
                    <Button
                        className="mt-2 bg-rose-700 hover:bg-rose-600 text-white w-full"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
            </div>

            {/* Right - Scrollable Patient Info */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!patient && <p className="text-gray-500">No patient selected.</p>}

                {patient && (
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl shadow-sm space-y-2">
                            <h2 className="font-semibold text-lg">{patient.firstName} {patient.lastName}</h2>
                            <p>MRN: {patient.mrn} | UID: {patient.uid}</p>
                            <p>DOB: {patient.dob} | Gender: {patient.gender}</p>
                            <p>Phone: {patient.phone} | Balance: {patient.balance} EGP</p>
                        </div>

                        {/* Prescriptions */}
                        <div className="space-y-3">
                            {patient.prescriptions.map((presc, idx) => (
                                <div key={idx} className="border rounded-md p-3 bg-gray-50">
                                    <p className="font-semibold">{presc.doctor}</p>
                                    {presc.medicines.map((med, i) => (
                                        <div key={i} className="flex justify-between mt-1 p-2 border rounded-md bg-white text-sm">
                                            <span>{med.name}</span>
                                            <span>{med.dose}</span>
                                            <span>Refills: {med.refills}</span>
                                            <span>Remaining: {med.remaining}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Insurance Check */}
                        <div className="mt-6">
                            <InsuranceCheck uid={patient.uid} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pharmacy;
