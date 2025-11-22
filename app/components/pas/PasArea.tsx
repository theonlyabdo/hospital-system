import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
    Calendar as CalendarIcon,
    FileSearch,
    UserPlus,
    ClipboardCheck,
    X,
    RotateCw,
    Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import InsuranceCheck from "~/components/pas/InsuranceCheck";
import PaymentSection from "~/components/pas/PaymentSection";

// --- Demo patients ---
const DEMO_PATIENTS = [
    {
        mrn: "MRN00123",
        uid: "784-1990-1234567-0",
        firstName: "Ahmed",
        lastName: "Hassan",
        gender: "Male",
        dob: "1990-05-14",
        phone: "+971526789123",
        appointments: [
            { date: "2025-11-25", time: "10:30 AM", doctor: "Dr. Sarah N." },
            { date: "2025-11-30", time: "2:10 PM", doctor: "Dr. Omar S." },
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
        appointments: [],
        balance: 0,
    },
];

function PasArea() {
    const [open, setOpen] = useState(false);
    const [criteria, setCriteria] = useState({ mrn: "", uid: "", first: "", last: "" });
    const [patient, setPatient] = useState<any>(null);
    const [selectedApptIndex, setSelectedApptIndex] = useState<number | null>(null);

    const handleSearch = () => {
        const found = DEMO_PATIENTS.find(
            (p) =>
                p.mrn === criteria.mrn ||
                p.uid === criteria.uid ||
                (p.firstName.toLowerCase() === criteria.first.toLowerCase() &&
                    p.lastName.toLowerCase() === criteria.last.toLowerCase())
        );
        if (found) {
            setPatient(found);
            setOpen(false);
        } else {
            alert("No patient found.");
        }
    };

    const clearPatient = () => {
        setPatient(null);
        setSelectedApptIndex(null);
    };

    const handleAppointmentAction = (action: string, index: number) => {
        switch (action) {
            case "checkin":
                alert("Checked in successfully!");
                break;
            case "cancel":
                alert("Appointment canceled.");
                break;
            case "reschedule":
                alert("Reschedule flow triggered.");
                break;
        }
    };

    return (
        <div className="p-10 flex flex-col gap-6 min-h-screen">
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold text-rose-900">
                    Patient Access Portal
                </h1>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 bg-rose-700 text-white hover:bg-rose-600">
                            <UserPlus size={18} />
                            Open Patient File
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Search Patient</DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <div>
                                <Label>MRN</Label>
                                <Input
                                    value={criteria.mrn}
                                    onChange={(e) =>
                                        setCriteria({ ...criteria, mrn: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label>UID</Label>
                                <Input
                                    value={criteria.uid}
                                    onChange={(e) =>
                                        setCriteria({ ...criteria, uid: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label>First Name</Label>
                                    <Input
                                        value={criteria.first}
                                        onChange={(e) =>
                                            setCriteria({ ...criteria, first: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <Label>Last Name</Label>
                                    <Input
                                        value={criteria.last}
                                        onChange={(e) =>
                                            setCriteria({ ...criteria, last: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <Button
                                className="mt-4 bg-rose-700 hover:bg-rose-600 text-white"
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Button variant="outline" className="flex items-center gap-2">
                    <FileSearch size={18} />
                    Open Encounter
                </Button>

                <Button variant="secondary" className="flex items-center gap-2">
                    <CalendarIcon size={18} />
                    Schedule Appointment
                </Button>
            </div>

            {!patient &&
                <Card className="mt-2 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-rose-900">Workspace</CardTitle>
                    </CardHeader>

                    <CardContent className="text-gray-700">
                        This area is where PAS users will handle:
                        <ul className="list-disc ml-6 mt-2 text-sm">
                            <li>Opening patient files</li>
                            <li>Editing demographic information</li>
                            <li>Scheduling appointments</li>
                            <li>Checking visit history</li>
                        </ul>

                        <p className="mt-4 text-gray-500 text-sm">
                            Forms will appear here as modals or inline components when an action
                            button is clicked.
                        </p>
                    </CardContent>
                </Card>}

            {/* MAIN WORK AREA */}
            <div className="space-y-6 mt-2">
                {patient && (
                    <Card className="shadow-md">
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle className="text-rose-900">Patient Info</CardTitle>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={clearPatient}
                            >
                                <X size={16} /> Clear
                            </Button>
                        </CardHeader>
                        <CardContent className="flex gap-6 items-center">
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500 uppercase">
                                {patient.firstName[0]}
                                {patient.lastName[0]}
                            </div>
                            <div className="space-y-1">
                                <p>
                                    <b>Name:</b> {patient.firstName} {patient.lastName}
                                </p>
                                <p>
                                    <b>MRN:</b> {patient.mrn}
                                </p>
                                <p>
                                    <b>UID:</b> {patient.uid}
                                </p>
                                <p>
                                    <b>DOB:</b> {patient.dob}
                                </p>
                                <p>
                                    <b>Phone:</b> {patient.phone}
                                </p>
                                <p>
                                    <b>Gender:</b> {patient.gender}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {patient && (
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-rose-900">Appointments</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {patient.appointments.length === 0 && (
                                <p className="text-gray-500 text-sm">No upcoming appointments.</p>
                            )}
                            {patient.appointments.map((appt, index:number) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center border p-3 rounded-lg bg-gray-50 cursor-pointer ${
                                        selectedApptIndex === index ? "bg-rose-50 border-rose-300" : ""
                                    }`}
                                    onClick={() =>
                                        setSelectedApptIndex(
                                            selectedApptIndex === index ? null : index
                                        )
                                    }
                                >
                                    <div>
                                        <p>
                                            <b>{appt.date}</b> at {appt.time}
                                        </p>
                                        <p className="text-sm text-gray-600">{appt.doctor}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {selectedApptIndex !== null && (
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-rose-900">
                                Encounter Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Insurance */}
                            <InsuranceCheck uid={patient.uid} />


                            {/* Financial */}
                            <PaymentSection patient={patient}/>

                            {/* Appointment Actions */}
                            <div className="flex gap-3">
                                <Button
                                    className="flex gap-2 bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleAppointmentAction("checkin", selectedApptIndex)}
                                >
                                    <ClipboardCheck size={16} /> Check In
                                </Button>
                                <Button
                                    className="flex gap-2 bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => handleAppointmentAction("cancel", selectedApptIndex)}
                                >
                                    <X size={16} /> Cancel
                                </Button>
                                <Button
                                    className="flex gap-2 bg-yellow-600 hover:bg-yellow-700 text-white"
                                    onClick={() => handleAppointmentAction("reschedule", selectedApptIndex)}
                                >
                                    <RotateCw size={16} /> Reschedule
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default PasArea;
