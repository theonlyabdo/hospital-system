// -----------------------------
// TYPES
// -----------------------------

export interface Payer {
    id: number;
    name: string;
}

export interface HealthPlan {
    payerId: number;
    category: "High" | "Mid" | "Low";
    pc: number;  // doctor copayment
    ph: number;  // pharmacy copayment
    lr: number;  // lab + radiology copayment
}

// -----------------------------
// LOCAL IN-MEMORY DATA
// -----------------------------

export const PAYERS: Payer[] = [
    { id: 0, name: "MedNet" },
    { id: 2, name: "MetLife" },
    { id: 3, name: "AXA" },
    { id: 4, name: "Allianz" },
    { id: 5, name: "HIO" },
    { id: 6, name: "Royal Insurance" }
];

export const HEALTH_PLANS: HealthPlan[] = [
    // MedNet
    { payerId: 0, category: "High", pc: 40, ph: 20, lr: 0 },
    { payerId: 0, category: "Low", pc: 60, ph: 30, lr: 10 },

    // MetLife
    { payerId: 2, category: "High", pc: 50, ph: 25, lr: 0 },
    { payerId: 2, category: "Mid", pc: 70, ph: 35, lr: 20 },

    // AXA
    { payerId: 3, category: "High", pc: 50, ph: 100, lr: 0 },
    { payerId: 3, category: "Low", pc: 80, ph: 120, lr: 20 },

    // Allianz
    { payerId: 4, category: "High", pc: 30, ph: 20, lr: 0 },
    { payerId: 4, category: "Mid", pc: 45, ph: 40, lr: 10 },

    // HIO
    { payerId: 5, category: "High", pc: 20, ph: 10, lr: 0 },
    { payerId: 5, category: "Low", pc: 40, ph: 20, lr: 5 },

    // Royal Insurance
    { payerId: 6, category: "High", pc: 35, ph: 15, lr: 0 },
    { payerId: 6, category: "Mid", pc: 55, ph: 25, lr: 15 }
];

// -----------------------------
// FUNCTIONS
// -----------------------------

/** Return all plans for a given payer */
export function getPlansByPayer(payerId: number): HealthPlan[] {
    return HEALTH_PLANS.filter(p => p.payerId === payerId);
}

/** Return one plan by payer + category */
export function getHealthPlan(payerId: number, category: "High" | "Mid" | "Low"): HealthPlan | undefined {
    return HEALTH_PLANS.find(p => p.payerId === payerId && p.category === category);
}

/** Calculate how much the patient should pay for a given encounter type */
export function calculateCopayment(
    payerId: number,
    category: "High" | "Mid" | "Low",
    type: "doctor" | "pharmacy" | "lab-radiology"
): number {
    const plan = getHealthPlan(payerId, category);
    if (!plan) return 0;

    switch (type) {
        case "doctor":
            return plan.pc;
        case "pharmacy":
            return plan.ph;
        case "lab-radiology":
            return plan.lr;
    }
}


export interface InsuranceMember {
    uid: string;
    memberId: string;
    policyNumber: string;
    effectiveStart: string;
    expiryDate: string;
    verified: boolean;
}

// Example test user
export const INSURANCE_MEMBERS: InsuranceMember[] = [
    {
        uid: "784-1990-1234567-0",
        memberId: "AXA-991245",
        policyNumber: "PL-778231",
        effectiveStart: "2024-01-01",
        expiryDate: "2025-01-01",
        verified: true,
    }
];

export function getMemberEligibility(uid: string): InsuranceMember | null {
    return INSURANCE_MEMBERS.find(m => m.uid === uid) ?? null;
}