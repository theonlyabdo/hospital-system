
export interface PatientRecord {
    id: string;
    title: string;
    date: string;
    details: string;
}

export interface PatientLab {
    id: string | number;
    test?: string;
    status: string;
    result?: string;
}

export interface PatientImaging {
    id: string | number;
    type: string;
    status?: string;
    result?: string;
    date?: string;
    img?: string;
}

export interface PatientMedication {
    id: string | number;
    text?: string;
    drug?: string;
    dose?: string;
    due?: string;
    status?: string;
}

export interface PatientTask {
    id: string | number;
    text: string;
    due: string;
    status: string;
}

export interface PatientNote {
    id: string | number;
    author: string;
    text: string;
    time: string;
}

export interface PatientVitals {
    time: string;
    bp: string;
    hr: number;
    rr: number;
    temp: number;
    o2: number;
}

export interface EncounterInfo {
    admissionDate: string;
    attendingPhysician: string;
    diagnosis: string;
    insurance: {
        provider: string;
        plan: string;
        policyNumber: string;
        coverage: string;
    };
    financial: {
        estimatedCost: number;
        balance: number;
        lastPayment: {
            date: string;
            amount: number;
            method: string;
        };
    };
}

export interface FamilyContact {
    name: string;
    phone: string;
    relation: string;
}

export interface Patient {
    id: string | number;
    name: string;
    age: number;
    bed: string;
    reason: string;
    allergies?: string;
    code: string;
    avatar: string;

    priority: string;
    status: string;

    encounter?: EncounterInfo;

    familyContacts?: FamilyContact[];

    meds?: PatientMedication[];

    labs: PatientLab[];
    imaging: PatientImaging[];

    tasks?: PatientTask[];

    vitalsHistory: PatientVitals[];

    notes?: PatientNote[];

    records: PatientRecord[];
    pharmacy: PatientMedication[];
}

export const patients: Patient[] = [
    {
        id: '1',
        bed: "A12",
        name: "Omar Khaled",
        age: 42,
        avatar: "https://i.pravatar.cc/64?img=12",
        reason: "Chest Pain",
        priority: "critical",
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
                coverage: "80%"
            },
            financial: {
                estimatedCost: 18650,
                balance: 7400,
                lastPayment: { date: "2025-11-26", amount: 2000, method: "Credit Card" }
            }
        },

        familyContacts: [
            { name: "Mona Khaled (Wife)", phone: "+20 111 222 3333", relation: "Primary" },
            { name: "Khaled Omar (Son)", phone: "+20 112 555 8888", relation: "Backup" }
        ],

        meds: [
            { id: 1, text: "Paracetamol 1g IV q8h", due: "10:00", status: "pending" },
            { id: 2, text: "Aspirin 81mg daily", due: "12:00", status: "given" },
            { id: 3, text: "Nitroglycerin IV infusion", due: "continuous", status: "running" }
        ],

        labs: [
            { 'id': 1, test: "Troponin", status: "completed", result: "0.15 ng/mL (high)" },
            { 'id': 2, test: "CBC", status: "pending" },
            { 'id': 3, test: "CMP", status: "in-progress" },

            // From second dataset
            { id: "l1", test: "Troponin I", status: "Pending" },
            { id: "l2", test: "CBC", status: "Completed" }
        ],

        imaging: [
            { id: '1', type: "Chest X-ray", status: "completed", result: "No acute findings",  date: "2025-11-23", img: 'https://www.meddean.luc.edu/lumen/meded/medicine/pulmonar/cxr/atlas/images/71bl.jpg'},
            { id: '2', type: "ECG", status: "completed", result: "ST depression noted", date: "2025-11-24", img: 'https://www.oxfordmedicaleducation.com/wp-content/uploads/2014/07/ECG-Question-9-bradycardia.jpg'},

        ],

        tasks: [
            { id: '1', text: "Repeat ECG", due: "11:00", status: "pending" },
            { id: '2', text: "Start IV fluids", due: "ASAP", status: "done" }
        ],

        vitalsHistory: [
            { time: "09:15", bp: "122/76", hr: 88, rr: 18, temp: 37.1, o2: 97 },
            { time: "06:00", bp: "118/74", hr: 82, rr: 17, temp: 36.9, o2: 98 },
            { time: "03:00", bp: "124/80", hr: 92, rr: 19, temp: 37.3, o2: 96 },

            // From second dataset
            { time: "08:00", bp: "130/80", hr: 88, rr: 18, temp: 36.8, o2: 97 },
            { time: "12:00", bp: "128/78", hr: 84, rr: 17, temp: 36.6, o2: 98 }
        ],

        notes: [
            { id: 1, author: "Nurse Sara", text: "Patient complaining of mild pain.", time: "08:45" },
            { id: 2, author: "Dr. Mahmoud", text: "Awaiting troponin repeat.", time: "09:00" }
        ],

        // Extra fields from second dataset
        records: [
            {
                id: "r1",
                title: "Admission Note",
                date: "2025-11-22",
                details: "Patient admitted with severe chest pain radiating to left arm."
            },
            {
                id: "r2",
                title: "Cardiology Consult",
                date: "2025-11-23",
                details: "Suspected unstable angina. ECG and echo ordered."
            }
        ],
        pharmacy: [
            { id: "m1", drug: "Aspirin", dose: "81mg daily" },
            { id: "m2", drug: "Atorvastatin", dose: "40mg nightly" }
        ]
    },

    // ----------------------------------------------------

    {
        id: '2',
        bed: "B03",
        name: "Sara Adel",
        age: 30,
        avatar: "https://i.pravatar.cc/64?img=5",
        reason: "High Fever",
        priority: "stable",
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
                coverage: "65%"
            },
            financial: {
                estimatedCost: 4600,
                balance: 2650,
                lastPayment: {date: "2025-11-26", amount: 500, method: "Cash"}
            }
        },

        familyContacts: [
            {name: "Adel Nabil (Father)", phone: "+20 110 225 0090", relation: "Primary"}
        ],

        meds: [
            {id: 1, text: "Paracetamol 500mg PO PRN", due: "---", status: "prn"},
            {id: 2, text: "Ibuprofen 400mg PO q8h", due: "13:00", status: "pending"}
        ],

        labs: [
            {id: 1, test: "CRP", status: "pending"},
            {id: 2, test: "Influenza A/B PCR", status: "in-progress"}
        ],

        imaging: [
            {id: 1, type: "Chest X-ray", status: "not-required", img:'https://knect365.imgix.net/uploads/bd64cf28-498e-44df-be77-3e74cd079783-featured-49f3a3c3ecd5bdb5a10037c1b80de2ff.jpg?auto=format&fit=max&w=412&dpr=5'}
        ],

        tasks: [
            {id: 1, text: "Hydration: Oral Fluids", due: "Continuous", status: "ongoing"}
        ],

        vitalsHistory: [
            {time: "08:00", bp: "110/68", hr: 102, rr: 19, temp: 39.1, o2: 98},
            {time: "04:00", bp: "112/70", hr: 98, rr: 18, temp: 38.6, o2: 97}
        ],

        notes: [
            {id: 1, author: "Nurse Laila", text: "Patient febrile. Given PO fluids.", time: "08:30"}
        ],
        records: [],
        pharmacy: []
    },

    // ----------------------------------------------------

    {
        id: '3',
        bed: "C21",
        name: "Mostafa Emam",
        age: 65,
        avatar: "https://i.pravatar.cc/64?img=55",
        reason: "Post-op Care",
        priority: "observation",
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
                coverage: "90%"
            },
            financial: {
                estimatedCost: 31200,
                balance: 3350,
                lastPayment: { date: "2025-11-25", amount: 5000, method: "Credit Card" }
            }
        },

        familyContacts: [
            { name: "Hoda Emam (Wife)", phone: "+20 111 899 4421", relation: "Primary" },
            { name: "Emam Mostafa (Son)", phone: "+20 114 008 7711", relation: "Backup" }
        ],

        meds: [
            { id: 1, text: "Morphine 2mg IV PRN", status: "prn" },
            { id: 2, text: "Ceftriaxone 1g IV q24h", due: "15:00", status: "pending" },
            { id: 3, text: "Enoxaparin 40mg SC daily", due: "09:00", status: "given" }
        ],

        labs: [
            { id: 1, test: "Electrolytes", status: "completed", result: "Normal" },
            { id: 2, test: "CBC", status: "in-progress" },
            { id: 3, test: "Renal Function", status: "pending" },
            { id: "l5", test: "ABG", status: "Completed" }
        ],

        imaging: [
            { id: 1, type: "Abdominal CT", status: "completed", result: "Post-op changes noted", img:'https://medlineplus.gov/images/Xray_share.jpg' },

            // from second dataset
            { id: "i4", type: "CT Angio", date: "2025-11-22", img:'https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/medical-tests/hero/ct-angiography-head-and-neck-2x.jpg?rev=ed81b8d16414455aa0286673bfa185c8' }
        ],

        tasks: [
            { id: 1, text: "Drain output monitoring", due: "Hourly", status: "ongoing" },
            { id: 2, text: "Pain assessment", due: "14:00", status: "pending" }
        ],

        vitalsHistory: [
            { time: "09:00", bp: "100/60", hr: 94, rr: 22, temp: 37.8, o2: 95 },
            { time: "06:00", bp: "98/62", hr: 90, rr: 20, temp: 37.5, o2: 96 },
            { time: "03:00", bp: "102/64", hr: 92, rr: 21, temp: 37.7, o2: 95 },

            // extra from second dataset
            { time: "07:00", bp: "142/85", hr: 102, rr: 24, temp: 36.9, o2: 92 },
            { time: "11:00", bp: "138/82", hr: 98, rr: 22, temp: 36.7, o2: 94 }
        ],

        notes: [
            { id: 1, author: "Nurse Ahmed", text: "Drain output increased slightly.", time: "07:10" },
            { id: 2, author: "Dr. Youssef", text: "Will re-evaluate in 3 hours.", time: "08:30" }
        ],

        // From second dataset
        records: [
            {
                id: "r4",
                title: "Progress Note",
                date: "2025-11-20",
                details: "Worsening SOB overnight. Increased oxygen requirement."
            }
        ],
        pharmacy: [
            { id: "m4", drug: "Furosemide", dose: "20mg IV" }
        ]
    }
];
