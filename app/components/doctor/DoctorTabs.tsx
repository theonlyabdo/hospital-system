import React, {useEffect, useState} from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogClose,
} from "~/components/ui/dialog";
import {CheckCircle, Loader2} from "lucide-react";


// Fake temp medicine list (you can replace with API later)
const fakeMedicines = [
    "Amoxicillin 500mg",
    "Ibuprofen 400mg",
    "Paracetamol 1g",
    "Aspirin 81mg",
    "Lisinopril 20mg",
    "Metformin 500mg",
    "Azithromycin 250mg",
    "Prednisone 10mg",
];


export default function DoctorTabs({ patient }) {
    const [selectedImage, setSelectedImage] = useState(null);
    if (!patient) return null;

    const [medicineQuery, setMedicineQuery] = useState("");
    const [selectedMed, setSelectedMed] = useState(null);
    const [pharmacyList, setPharmacyList] = useState(patient.pharmacy || []);
    const [dose, setDose] = useState("");
    const [refills, setRefills] = useState("");
    const [weeks, setWeeks] = useState("");
    const [openPharmacyDialog, setOpenPharmacyDialog] = useState(false);
    const [newMed, setNewMed] = useState({
        drug: "",
        dose: "",
        refills: "",
        courseWeeks: "",
    });
    const [openReferral, setOpenReferral] = useState(false);
    const [referralState, setReferralState] = useState<"loading" | "success">("loading");


    const handleSaveMedication = () => {
        const med = {
            id: Date.now(),
            ...newMed
        };

        setPharmacyList([...pharmacyList, med]);

        // Reset + Close
        setNewMed({ drug: "", dose: "", refills: "", courseWeeks: "" });
        setOpenPharmacyDialog(false);
    };

    useEffect(() => {
        if (openReferral) {
            setReferralState("loading");

            const timer = setTimeout(() => {
                setReferralState("success");
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [openReferral]);

    const [open, setOpen] = useState(false);
    const [orderType, setOrderType] = useState("");

    const [orders, setOrders] = useState([]);

    const labTests = [
        "CBC",
        "CMP",
        "Liver Function",
        "Kidney Function",
        "CRP",
        "ESR",
        "D-Dimer",
        "Lactate",
    ];

    const [selectedLabs, setSelectedLabs] = useState([]);
    function toggleLab(t) {
        setSelectedLabs((prev) =>
            prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
        );
    }

// Radiology
    const [radiologyType, setRadiologyType] = useState("");
    const [radiologyDate, setRadiologyDate] = useState("");

// Next Visit
    const [visitDate, setVisitDate] = useState("");
    const [visitDuration, setVisitDuration] = useState("");
    const [visitPriority, setVisitPriority] = useState("Normal");

    function handleSaveOrder() {
        let summary = "";

        if (orderType === "lab") {
            summary = `Tests: ${selectedLabs.join(", ")}`;
        } else if (orderType === "radiology") {
            summary = `${radiologyType} • Due: ${radiologyDate}`;
        } else if (orderType === "next-visit") {
            summary = `On ${visitDate} • ${visitDuration} • Priority: ${visitPriority}`;
        }

        const newOrder = {
            id: Date.now(),
            type:
                orderType === "lab"
                    ? "Lab Order"
                    : orderType === "radiology"
                        ? "Radiology Order"
                        : "Next Visit",
            summary,
        };

        setOrders((prev) => [...prev, newOrder]);
        setOpen(false);
        setOrderType("");
        setSelectedLabs([]);
    }




    return (
        <Tabs defaultValue="records" className="w-full space-y-4">

            {/* TAB LIST */}
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
                {[
                    "records", "condition", "labs", "imaging",
                    "pharmacy", "vitals", "referral", "orders", "notes"
                ].map((tab) => (
                    <TabsTrigger
                        key={tab}
                        value={tab}
                        className="data-[state=active]:bg-rose-700 data-[state=active]:text-white
                                   hover:bg-gray-200 hover:cursor-pointer"
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                ))}
            </TabsList>

            {/* RECORDS */}
            <TabsContent value="records">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Medical Records</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        {patient.records.map((r) => (
                            <div key={r.id} className="p-3 bg-gray-50 rounded-md border">
                                <p className="font-semibold">{r.title}</p>
                                <p className="text-xs text-gray-500">{r.date}</p>
                                <p>{r.details}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* CONDITION */}
            <TabsContent value="condition">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Condition Assessment</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {/* STATE */}
                        {/*
                You can place this at top of the component file,
                or attach to the parent if you want it shared.
            */}
                        {(() => {
                            const [conditionText, setConditionText] = useState("");
                            const [isEditing, setIsEditing] = useState(true);

                            // UI rendering wrapped in an IIFE
                            return (
                                <>
                                    {/* EDIT MODE */}
                                    {isEditing && (
                                        <>
                                <textarea
                                    value={conditionText}
                                    onChange={(e) => setConditionText(e.target.value)}
                                    className="w-full p-3 border rounded-md text-sm"
                                    placeholder="Describe the patient's current condition..."
                                />

                                            <Button
                                                className="bg-rose-600 text-white hover:bg-rose-700"
                                                onClick={() => setIsEditing(false)}
                                                disabled={!conditionText.trim()}
                                            >
                                                Save Condition
                                            </Button>
                                        </>
                                    )}

                                    {/* READ-ONLY MODE */}
                                    {!isEditing && (
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-50 border rounded-md text-sm whitespace-pre-wrap">
                                                {conditionText}
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Last updated: {new Date().toLocaleString()}
                                                </p>
                                            </div>

                                            <div className="flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="border-rose-600 text-rose-700 hover:bg-rose-50"
                                                    onClick={() => setIsEditing(true)}
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    className="bg-red-600 text-white hover:bg-red-700"
                                                    onClick={() => {
                                                        setConditionText("");
                                                        setIsEditing(true);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </CardContent>
                </Card>
            </TabsContent>


            {/* LABS */}
            <TabsContent value="labs">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Lab Results & Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {patient.labs.map((lab) => (
                            <div key={lab.id} className="border rounded-md p-3 bg-gray-50">
                                <p className="font-semibold">{lab.test}</p>
                                <p className="text-xs text-gray-500">{lab.status}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* IMAGING */}
            <TabsContent value="imaging">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Imaging & X-Ray Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {patient.imaging.map((img) => (
                            <div
                                key={img.id}
                                className="flex justify-between p-3 bg-gray-50 border rounded-md hover:bg-rose-50 cursor-pointer"
                                onClick={() => setSelectedImage(img)}
                            >
                                <div>
                                    <p className="font-semibold">{img.type}</p>
                                    <p className="text-xs text-gray-500">{img.date || img.status}</p>
                                    {img.result && <p className="text-sm text-gray-700">{img.result}</p>}
                                </div>
                                <img
                                    src={img.img}
                                    alt={img.type}
                                    className="rounded-md w-24 h-24 object-cover"
                                />
                            </div>
                        ))}

                        {/* DIALOG */}
                        {selectedImage && (
                            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                                <DialogContent
                                    className="sm:max-w-lg w-full max-h-[80vh] overflow-y-auto"
                                >
                                    <DialogHeader>
                                        <DialogTitle>{selectedImage.type}</DialogTitle>
                                        <DialogDescription>
                                            {selectedImage.date || selectedImage.status}
                                            {selectedImage.result && <p>{selectedImage.result}</p>}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <img
                                        src={selectedImage.img}
                                        alt={selectedImage.type}
                                        className="w-full h-auto mt-4 rounded-md object-cover"
                                    />
                                    <DialogClose asChild>
                                        <Button className="mt-4 bg-rose-600 hover:bg-rose-700 text-white w-full">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogContent>
                            </Dialog>
                        )}

                    </CardContent>
                </Card>
            </TabsContent>

            {/* PHARMACY */}
            <TabsContent value="pharmacy">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Pharmacy Orders</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">

                        {/* Render Saved Medications */}
                        {pharmacyList.map((m) => (
                            <div key={m.id} className="p-3 border rounded-md bg-gray-50">
                                <p className="font-semibold">{m.drug}</p>
                                <p className="text-xs text-gray-500">
                                    Dose: {m.dose} • Refills: {m.refills} • Course: {m.courseWeeks} weeks
                                </p>
                            </div>
                        ))}

                        {/* Add Medication Button */}
                        <Button
                            className="bg-rose-600 text-white hover:bg-rose-700"
                            onClick={() => setOpenPharmacyDialog(true)}
                        >
                            Add Medication
                        </Button>

                        {/* Dialog */}
                        <Dialog open={openPharmacyDialog} onOpenChange={setOpenPharmacyDialog}>
                            <DialogContent className="sm:max-w-md w-full max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Add Medication</DialogTitle>
                                    <DialogDescription>
                                        Search for medicine and enter course details.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Medicine Search */}
                                <div className="space-y-1 mb-3">
                                    <input
                                        type="text"
                                        placeholder="Search medicine..."
                                        className="w-full p-3 border rounded-md"
                                        value={newMed.drug}
                                        onChange={(e) =>
                                            setNewMed({ ...newMed, drug: e.target.value })
                                        }
                                    />

                                    {/* Suggest results */}
                                    {newMed.drug.length > 1 && (
                                        <div className="max-h-40 overflow-y-auto border rounded-md bg-white shadow-sm">
                                            {fakeMedicines
                                                .filter((m) =>
                                                    m.toLowerCase().includes(newMed.drug.toLowerCase())
                                                )
                                                .map((m, index) => (
                                                    <div
                                                        key={index}
                                                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                                        onClick={() =>
                                                            setNewMed({ ...newMed, drug: m })
                                                        }
                                                    >
                                                        {m}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>

                                {/* Dose */}
                                <input
                                    type="text"
                                    placeholder="Dose (e.g. 500mg)"
                                    className="w-full p-3 border rounded-md mb-3"
                                    value={newMed.dose}
                                    onChange={(e) =>
                                        setNewMed({ ...newMed, dose: e.target.value })
                                    }
                                />

                                {/* Refills */}
                                <input
                                    type="number"
                                    placeholder="Refills"
                                    className="w-full p-3 border rounded-md mb-3"
                                    value={newMed.refills}
                                    onChange={(e) =>
                                        setNewMed({ ...newMed, refills: e.target.value })
                                    }
                                />

                                {/* Course Weeks */}
                                <input
                                    type="number"
                                    placeholder="Course duration (weeks)"
                                    className="w-full p-3 border rounded-md mb-3"
                                    value={newMed.courseWeeks}
                                    onChange={(e) =>
                                        setNewMed({ ...newMed, courseWeeks: e.target.value })
                                    }
                                />

                                {/* SAVE BUTTON */}
                                <Button
                                    className="bg-rose-600 hover:bg-rose-700 text-white w-full"
                                    onClick={handleSaveMedication}
                                >
                                    Save Medication
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* VITALS */}
            <TabsContent value="vitals">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Patient Vitals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        {patient.vitalsHistory.map((v) => (
                            <div key={v.time} className="p-3 border rounded-md bg-gray-50">
                                <p className="font-semibold">{v.time}</p>
                                <p className="text-xs text-gray-500">
                                    BP {v.bp} • HR {v.hr} • RR {v.rr} • Temp {v.temp}°C • O₂ {v.o2}%
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* REFERRAL */}
            <TabsContent value="referral">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Refer Patient</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <select className="w-full p-3 border rounded-md text-sm">
                            <option>Select Department</option>
                            <option>Radiology</option>
                            <option>Cardiology</option>
                            <option>Neurology</option>
                        </select>

                        <Button
                            className="bg-rose-600 text-white hover:bg-rose-700"
                            onClick={() => setOpenReferral(true)}
                        >
                            Send Referral
                        </Button>

                        <Dialog open={openReferral} onOpenChange={setOpenReferral}>
                            <DialogContent className="sm:max-w-sm w-full p-6 text-center">

                                {/* LOADING STATE */}
                                {referralState === "loading" && (
                                    <div className="flex flex-col items-center space-y-3 py-6">
                                        <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
                                        <p className="text-sm text-gray-600">Sending referral...</p>
                                    </div>
                                )}

                                {/* SUCCESS STATE */}
                                {referralState === "success" && (
                                    <div className="flex flex-col items-center space-y-3 py-6">
                                        <CheckCircle className="h-10 w-10 text-green-600" />
                                        <p className="font-medium">Referral Sent Successfully</p>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </TabsContent>


            {/* ORDERS */}
            <TabsContent value="orders">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Future Orders</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        {/* SHOW SAVED ORDERS */}
                        {orders.map((o) => (
                            <div key={o.id} className="p-3 bg-gray-50 border rounded-md text-sm">
                                <p className="font-semibold">{o.type}</p>
                                <p className="text-gray-600">{o.summary}</p>
                            </div>
                        ))}

                        {/* ADD ORDER BUTTON */}
                        <Button
                            className="bg-rose-600 text-white hover:bg-rose-700"
                            onClick={() => setOpen(true)}
                        >
                            Add New Order
                        </Button>

                        {/* MAIN DIALOG */}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogContent className="sm:max-w-md w-full space-y-4">

                                <DialogHeader>
                                    <DialogTitle>Create Order</DialogTitle>
                                </DialogHeader>

                                {/* Step 1: Order Type */}
                                <select
                                    className="w-full p-3 border rounded-md text-sm"
                                    value={orderType}
                                    onChange={(e) => setOrderType(e.target.value)}
                                >
                                    <option value="">Select Order Type</option>
                                    <option value="lab">Lab Tests</option>
                                    <option value="radiology">Radiology / Imaging</option>
                                    <option value="next-visit">Next Visit</option>
                                </select>

                                {/* LAB ORDER FORM */}
                                {orderType === "lab" && (
                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold text-gray-600">Choose Lab Tests</p>

                                        <div className="border rounded-md p-3 max-h-48 overflow-y-auto divide-y">
                                            {labTests.map((t) => (
                                                <label
                                                    key={t}
                                                    className="flex items-center gap-3 py-2 cursor-pointer select-none"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4"
                                                        checked={selectedLabs.includes(t)}
                                                        onChange={() => toggleLab(t)}
                                                    />
                                                    <span className="text-sm">{t}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* RADIOLOGY ORDER FORM */}
                                {orderType === "radiology" && (
                                    <div className="space-y-3">
                                        <select
                                            className="w-full p-3 border rounded-md text-sm"
                                            value={radiologyType}
                                            onChange={(e) => setRadiologyType(e.target.value)}
                                        >
                                            <option value="">Select imaging type</option>
                                            <option>Chest X-Ray</option>
                                            <option>CT Abdomen</option>
                                            <option>MRI Spine</option>
                                            <option>Ultrasound</option>
                                        </select>

                                        <input
                                            type="date"
                                            className="w-full p-3 border rounded-md text-sm"
                                            value={radiologyDate}
                                            onChange={(e) => setRadiologyDate(e.target.value)}
                                        />
                                    </div>
                                )}

                                {/* NEXT VISIT FORM */}
                                {orderType === "next-visit" && (
                                    <div className="space-y-3">
                                        <input
                                            type="date"
                                            className="w-full p-3 border rounded-md text-sm"
                                            value={visitDate}
                                            onChange={(e) => setVisitDate(e.target.value)}
                                        />

                                        <input
                                            type="text"
                                            placeholder="Duration (e.g. 30 min)"
                                            className="w-full p-3 border rounded-md text-sm"
                                            value={visitDuration}
                                            onChange={(e) => setVisitDuration(e.target.value)}
                                        />

                                        <select
                                            className="w-full p-3 border rounded-md text-sm"
                                            value={visitPriority}
                                            onChange={(e) => setVisitPriority(e.target.value)}
                                        >
                                            <option>Normal</option>
                                            <option>High</option>
                                            <option>Critical</option>
                                        </select>
                                    </div>
                                )}

                                {/* SAVE BUTTON */}
                                {orderType !== "" && (
                                    <Button
                                        className="bg-rose-600 text-white hover:bg-rose-700 w-full"
                                        onClick={handleSaveOrder}
                                    >
                                        Save Order
                                    </Button>
                                )}
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </TabsContent>


            {/* NOTES */}
            <TabsContent value="notes">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Notes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <textarea className="w-full p-3 border rounded-md text-sm" placeholder="Write your notes..." />
                        <Button className="bg-rose-600 text-white hover:bg-rose-700">
                            Save Note
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>

        </Tabs>
    );
}
