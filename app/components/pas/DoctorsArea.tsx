import React, { useState } from "react";
import {
    HeartPulse, Bone, Brain, Baby, Activity, Microscope, Stethoscope, Syringe,
    Scan, Eye, Ear, Sparkles, FlaskConical, Thermometer, Radiation, Users, Smile
} from "lucide-react";
import { Calendar } from "~/components/ui/calendar";

const SPECIALTIES = [
    { id: "anesthesiology", label: "Anesthesiology", icon: Syringe },
    { id: "cardiology", label: "Cardiology", icon: HeartPulse },
    { id: "dermatology", label: "Dermatology", icon: Sparkles },
    { id: "dentistry", label: "Dentistry", icon: Smile },
    { id: "ent", label: "ENT (Ear, Nose, Throat)", icon: Ear },
    { id: "family_medicine", label: "Family Medicine", icon: Users },
    { id: "general_medicine", label: "General Medicine", icon: Stethoscope },
    { id: "infectious_diseases", label: "Infectious Diseases", icon: Thermometer },
    { id: "laboratory", label: "Laboratory", icon: FlaskConical },
    { id: "neurology", label: "Neurology", icon: Brain },
    { id: "oncology", label: "Oncology", icon: Radiation },
    { id: "ophthalmology", label: "Ophthalmology", icon: Eye },
    { id: "orthopedics", label: "Orthopedics", icon: Bone },
    { id: "pathology", label: "Pathology", icon: Microscope },
    { id: "pediatrics", label: "Pediatrics", icon: Baby },
    { id: "physiotherapy", label: "Physiotherapy", icon: Activity },
    { id: "radiology", label: "Radiology", icon: Scan },
];


const DOCTORS: Record<string, string[]> = {
    cardiology: ["Dr. Ahmed M.", "Dr. Sarah N.", "Dr. Youssef B."],
    orthopedics: ["Dr. Lina R.", "Dr. Omar S.", "Dr. Hany A."],
    neurology: ["Dr. Farida K.", "Dr. Mostafa D."],
    pediatrics: ["Dr. Mariam W.", "Dr. Amr F.", "Dr. Dalia H."],
    physiotherapy: ["Dr. Nour A.", "Dr. Rana E.", "Dr. Heba M."],
    pathology: ["Dr. Rana S.", "Dr. Adel H."],
    general_medicine: ["Dr. Salma E.", "Dr. Mohamed I.", "Dr. Tarek A."],
    anesthesiology: ["Dr. Rami Z.", "Dr. Neveen L."],
    radiology: ["Dr. Samir F.", "Dr. Dina Y."],
    ophthalmology: ["Dr. Laila O.", "Dr. Bassel R."],
    otolaryngology: ["Dr. Osama J.", "Dr. Hend P.", "Dr. Rashed M."],
    dermatology: ["Dr. Yara K.", "Dr. Injy S."],
    laboratory: ["Dr. Omar B.", "Dr. Malak T."],
    infectious_diseases: ["Dr. Reem G.", "Dr. Hossam K."],
    oncology: ["Dr. Sherif A.", "Dr. Nourhan F."],
    dentistry: ["Dr. Hoda M.", "Dr. Walid S."],
    family_medicine: ["Dr. Talia H.", "Dr. Mazen N.", "Dr. Ziad E."],
};


function DoctorsArea() {
    const [selectedSpecialty, setSelectedSpecialty] = useState("cardiology");
    const [open, setOpen] = useState(false);
    const doctors = DOCTORS[selectedSpecialty];
    const [date, setDate] = useState<Date | undefined>(new Date());

    const selected = SPECIALTIES.find(s => s.id === selectedSpecialty)!;

    return (
        <div className="border-l sticky bg-white p-8 flex flex-col gap-6 shadow-inner ">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <Stethoscope size={22} className={'text-rose-900'} /> Doctors & Availability
            </h2>

            {/* CUSTOM DROPDOWN */}
            <div className="flex flex-col relative">
                <label className="text-sm font-medium mb-1">Specialty</label>

                <button
                    className="border rounded-md p-2 bg-white flex items-center justify-between"
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex items-center gap-2">
                        <selected.icon size={18} className={'text-rose-800'}/>
                        {selected.label}
                    </div>
                </button>

                {open && (
                    <div className="absolute mt-1 w-full border rounded-md bg-white shadow z-10 max-h-60 overflow-y-auto">
                        {SPECIALTIES.map((s) => {
                            const Icon = s.icon;
                            return (
                                <div
                                    key={s.id}
                                    onClick={() => {
                                        setSelectedSpecialty(s.id);
                                        setOpen(false);
                                    }}
                                    className="p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <Icon size={18} className={'text-rose-800'} />
                                    {s.label}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* DOCTORS LIST */}
            <div>
                <h3 className="font-medium mb-2">Doctors</h3>
                <div className="flex flex-col gap-2">
                    {doctors.map((doc) => (
                        <div key={doc} className="p-2 border-b-3 border-b-rose-700 bg-gray-50 hover:bg-gray-100">
                            {doc}
                        </div>
                    ))}
                </div>
            </div>

            {/* CALENDAR */}
            <div className={'flex flex-col justify-center items-center'}>
                <h3 className="font-medium mb-2">Availability</h3>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-2/3 shadow"
                />
            </div>
        </div>
    );
}

export default DoctorsArea;
