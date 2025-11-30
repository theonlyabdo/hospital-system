// /constants/nurse.ts

import {
    Activity,
    AlertTriangle,
    ClipboardList,
    HeartPulse,
    Pill,
    Syringe,
    Thermometer,
} from "lucide-react";

export type PatientPriority = "critical" | "observation" | "stable";
export type PatientTab = "overview" | "meds" | "labs" | "vitals" | "notes";

export const NURSE_TABS: { key: PatientTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "meds", label: "Meds" },
    { key: "labs", label: "Labs" },
    { key: "vitals", label: "Vitals" },
    { key: "notes", label: "Notes" },
];

export const WORKFLOW_ACTIONS = {
    assign: { label: "Assign to me", requireConfirm: true },
    handover: { label: "Handover", requireConfirm: true },
    signoff: { label: "Sign Off Patient", requireConfirm: true },
};

export const SAMPLE_PATIENTS = [
    {
        id: 1,
        bed: "A12",
        name: "Omar Khaled",
        age: 42,
        avatar: "https://i.pravatar.cc/64?img=12",
        reason: "Chest Pain",
        priority: "critical" as PatientPriority,
        status: "Under Observation",
        allergies: "None",
        code: "Full Code",

        encounter: {
            admissionDate: "2025-11-25 14:22",
            attendingPhysician: "Dr. Mahmoud Ibrahim",
            diagnosis: "Suspected Acute Coronary Syndrome",
            insurance: {
                provider: "AXA Health",
                plan: "Gold Tier",
                policyNumber: "AXA-458382992",
                coverage: "80%",
            },
            financial: {
                estimatedCost: 18650,
                balance: 7400,
                lastPayment: { date: "2025-11-26", amount: 2000, method: "Credit Card" },
            },
        },

        familyContacts: [
            { name: "Mona Khaled (Wife)", phone: "+20 111 222 3333", relation: "Primary" },
            { name: "Khaled Omar (Son)", phone: "+20 112 555 8888", relation: "Backup" },
        ],

        meds: [
            { id: 1, text: "Paracetamol 1g IV q8h", due: "10:00", status: "pending" },
            { id: 2, text: "Aspirin 81mg daily", due: "12:00", status: "given" },
            { id: 3, text: "Nitroglycerin IV infusion", due: "continuous", status: "running" },
        ],

        labs: [
            { id: 1, text: "Troponin", status: "completed", result: "0.15 ng/mL (high)" },
            { id: 2, text: "CBC", status: "pending" },
            { id: 3, text: "CMP", status: "in-progress" },
        ],

        imaging: [
            { id: 1, type: "Chest X-ray", status: "completed", result: "No acute findings" },
            { id: 2, type: "ECG", status: "completed", result: "ST depression noted" },
        ],

        tasks: [
            { id: 1, text: "Repeat ECG", due: "11:00", status: "pending" },
            { id: 2, text: "Start IV fluids", due: "ASAP", status: "done" },
        ],

        vitalsHistory: [
            { time: "09:15", bp: "122/76", hr: 88, rr: 18, temp: 37.1, o2: 97 },
            { time: "06:00", bp: "118/74", hr: 82, rr: 17, temp: 36.9, o2: 98 },
            { time: "03:00", bp: "124/80", hr: 92, rr: 19, temp: 37.3, o2: 96 },
        ],

        notes: [
            { id: 1, author: "Nurse Sara", text: "Patient complaining of mild pain.", time: "08:45" },
            { id: 2, author: "Dr. Mahmoud", text: "Awaiting troponin repeat.", time: "09:00" },
        ],
    },

    // -------------------------------------------------------------------

    {
        id: 2,
        bed: "B03",
        name: "Sara Adel",
        age: 30,
        avatar: "https://i.pravatar.cc/64?img=5",
        reason: "High Fever",
        priority: "stable" as PatientPriority,
        status: "Stable",
        allergies: "Penicillin",
        code: "Full Code",

        encounter: {
            admissionDate: "2025-11-26 09:10",
            attendingPhysician: "Dr. Reem Samir",
            diagnosis: "Suspected Viral Infection",
            insurance: {
                provider: "MetLife",
                plan: "Silver Care",
                policyNumber: "MET-8839281",
                coverage: "65%",
            },
            financial: {
                estimatedCost: 4600,
                balance: 2650,
                lastPayment: { date: "2025-11-26", amount: 500, method: "Cash" },
            },
        },

        familyContacts: [
            { name: "Adel Nabil (Father)", phone: "+20 110 225 0090", relation: "Primary" },
        ],

        meds: [
            { id: 1, text: "Paracetamol 500mg PO PRN", due: "---", status: "prn" },
            { id: 2, text: "Ibuprofen 400mg PO q8h", due: "13:00", status: "pending" },
        ],

        labs: [
            { id: 1, text: "CRP", status: "pending" },
            { id: 2, text: "Influenza A/B PCR", status: "in-progress" },
        ],

        imaging: [
            { id: 1, type: "Chest X-ray", status: "not-required" },
        ],

        tasks: [
            { id: 1, text: "Hydration: Oral Fluids", due: "Continuous", status: "ongoing" },
        ],

        vitalsHistory: [
            { time: "08:00", bp: "110/68", hr: 102, rr: 19, temp: 39.1, o2: 98 },
            { time: "04:00", bp: "112/70", hr: 98, rr: 18, temp: 38.6, o2: 97 },
        ],

        notes: [
            { id: 1, author: "Nurse Laila", text: "Patient febrile. Given PO fluids.", time: "08:30" },
        ],
    },

    // -------------------------------------------------------------------

    {
        id: 3,
        bed: "C21",
        name: "Mostafa Emam",
        age: 65,
        avatar: "https://i.pravatar.cc/64?img=20",
        reason: "Post-op Care",
        priority: "observation" as PatientPriority,
        status: "Critical",
        allergies: "None",
        code: "DNR",

        encounter: {
            admissionDate: "2025-11-24 07:50",
            attendingPhysician: "Dr. Youssef Hany",
            diagnosis: "Postoperative Monitoring – Abdominal Surgery",
            insurance: {
                provider: "Vodafone Insurance",
                plan: "Premium Care",
                policyNumber: "VF-39499211",
                coverage: "90%",
            },
            financial: {
                estimatedCost: 31200,
                balance: 3350,
                lastPayment: { date: "2025-11-25", amount: 5000, method: "Credit Card" },
            },
        },

        familyContacts: [
            { name: "Hoda Emam (Wife)", phone: "+20 111 899 4421", relation: "Primary" },
            { name: "Emam Mostafa (Son)", phone: "+20 114 008 7711", relation: "Backup" },
        ],

        meds: [
            { id: 1, text: "Morphine 2mg IV PRN", status: "prn" },
            { id: 2, text: "Ceftriaxone 1g IV q24h", due: "15:00", status: "pending" },
            { id: 3, text: "Enoxaparin 40mg SC daily", due: "09:00", status: "given" },
        ],

        labs: [
            { id: 1, text: "Electrolytes", status: "completed", result: "Normal" },
            { id: 2, text: "CBC", status: "in-progress" },
            { id: 3, text: "Renal Function", status: "pending" },
        ],

        imaging: [
            { id: 1, type: "Abdominal CT", status: "completed", result: "Post-op changes noted" },
        ],

        tasks: [
            { id: 1, text: "Drain output monitoring", due: "Hourly", status: "ongoing" },
            { id: 2, text: "Pain assessment", due: "14:00", status: "pending" },
        ],

        vitalsHistory: [
            { time: "09:00", bp: "100/60", hr: 94, rr: 22, temp: 37.8, o2: 95 },
            { time: "06:00", bp: "98/62", hr: 90, rr: 20, temp: 37.5, o2: 96 },
            { time: "03:00", bp: "102/64", hr: 92, rr: 21, temp: 37.7, o2: 95 },
        ],

        notes: [
            { id: 1, author: "Nurse Ahmed", text: "Drain output increased slightly.", time: "07:10" },
            { id: 2, author: "Dr. Youssef", text: "Will re-evaluate in 3 hours.", time: "08:30" },
        ],
    },
];


// Dialog definitions (simple mocks for MVP)
export const DIALOGS = {
    confirmAssign: {
        title: "Assign Patient",
        text: "Are you sure you want to assign this patient to your shift?",
    },
    confirmHandover: {
        title: "Handover Patient",
        text: "Confirm patient handover to another staff member?",
    },
    confirmSignOff: {
        title: "Sign Off",
        text: "You are about to finalize care documentation.",
    },
};

