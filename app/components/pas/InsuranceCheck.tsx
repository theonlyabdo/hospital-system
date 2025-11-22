import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
    PAYERS,
    getPlansByPayer,
    type HealthPlan,
    getMemberEligibility,
    type InsuranceMember
} from "~/lib/insurance";
import { Loader2, ClipboardCheck } from "lucide-react";

const InsuranceCheck = ({ uid }: { uid: string }) => {
    const [selectedPayer, setSelectedPayer] = useState<number | "">("");
    const [selectedPlan, setSelectedPlan] = useState<HealthPlan | null>(null);

    const [memberInfo, setMemberInfo] = useState<InsuranceMember | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<"Verified" | "Unverified" | "">("");
    const [isLoading, setIsLoading] = useState(false);

    const plans = selectedPayer !== "" ? getPlansByPayer(selectedPayer) : [];

    const handlePlanSelect = (value: string) => {
        const plan = plans.find(p => `${p.payerId}-${p.category}` === value);
        setSelectedPlan(plan ?? null);
    };

    const handleEligibility = () => {
        if (!selectedPlan) {
            alert("Please choose a plan first.");
            return;
        }

        setIsLoading(true);
        setVerificationStatus("");
        setMemberInfo(null);

        setTimeout(() => {
            const member = getMemberEligibility(uid);

            if (member) {
                setVerificationStatus("Verified");
                setMemberInfo(member);
            } else {
                setVerificationStatus("Unverified");
                setMemberInfo({
                    uid,
                    memberId: "",
                    policyNumber: "",
                    effectiveStart: "",
                    expiryDate: "",
                    verified: false,
                });
            }

            setIsLoading(false);
        }, 2000);
    };

    const updateManual = (field: keyof InsuranceMember, value: string) => {
        if (!memberInfo) return;
        setMemberInfo({ ...memberInfo, [field]: value });
    };

    const isReadOnly = verificationStatus === "Verified" || isLoading;

    // -----------------------
    // Skeleton Component
    // -----------------------
    const SkeletonBox = () => (
        <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-3">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4 border p-4 rounded-xl bg-white shadow-sm">

            <div className="flex flex-col gap-3 opacity-100">

                {/* PAYER SELECT */}
                <div>
                    <label className="text-xs text-gray-600">Payer</label>
                    <select
                        disabled={isLoading}
                        className="border rounded px-2 py-1 w-full"
                        value={selectedPayer}
                        onChange={(e) => {
                            setSelectedPayer(e.target.value ? Number(e.target.value) : "");
                            setSelectedPlan(null);
                        }}
                    >
                        <option value="">-- Select Payer --</option>
                        {PAYERS.map((payer) => (
                            <option key={payer.id} value={payer.id}>
                                {payer.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* PLAN SELECT */}
                <div>
                    <label className="text-xs text-gray-600">Health Plan</label>
                    <select
                        disabled={selectedPayer === "" || plans.length === 0 || isLoading}
                        className="border rounded px-2 py-1 w-full"
                        onChange={(e) => handlePlanSelect(e.target.value)}
                    >
                        <option value="">-- Select Plan --</option>
                        {plans.map((plan, index) => (
                            <option key={index} value={`${plan.payerId}-${plan.category}`}>
                                {plan.category} (PC{plan.pc} - PH{plan.ph} - LR{plan.lr})
                            </option>
                        ))}
                    </select>
                </div>

                {/* ELIGIBILITY */}
                <div>
                    <Button
                        size="sm"
                        disabled={!selectedPlan || isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2"
                        onClick={handleEligibility}
                    >
                        {isLoading ? (
                            <>
                                Checking
                                <Loader2 className="animate-spin" size={18} />
                            </>
                        ) : (
                            <>
                                <ClipboardCheck size={18} />
                                Check Eligibility
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* SELF PAY LABEL */}
            <p className="text-gray-500 text-sm">
                Self-pay if no valid insurance: <strong>330 EGP</strong>
            </p>

            {/* LOADING SKELETON */}
            {isLoading && (
                <div className="border rounded-lg p-4 bg-gray-50">
                    <SkeletonBox />
                </div>
            )}

            {/* MEMBER DETAILS */}
            {!isLoading && verificationStatus && (
                <div className="border rounded-lg p-4 space-y-3 bg-gray-50">

                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-700">Member Details</h3>

                        <select
                            disabled={isLoading}
                            className="border rounded px-2 py-1 text-sm"
                            value={verificationStatus}
                            onChange={(e) =>
                                setVerificationStatus(e.target.value as "Verified" | "Unverified")
                            }
                        >
                            <option value="Verified">Verified</option>
                            <option value="Unverified">Unverified</option>
                        </select>
                    </div>

                    {memberInfo && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

                            <div>
                                <label className="text-xs text-gray-600">Member ID *</label>
                                <input
                                    className={`border rounded px-2 py-1 w-full`}
                                    readOnly={isReadOnly}
                                    value={memberInfo.memberId}
                                    onChange={(e) => updateManual("memberId", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-600">Policy Number</label>
                                <input
                                    className="border rounded px-2 py-1 w-full"
                                    readOnly={isReadOnly}
                                    value={memberInfo.policyNumber}
                                    onChange={(e) => updateManual("policyNumber", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-600">Effective Start *</label>
                                <input
                                    type="date"
                                    className="border rounded px-2 py-1 w-full"
                                    readOnly={isReadOnly}
                                    value={memberInfo.effectiveStart}
                                    onChange={(e) => updateManual("effectiveStart", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-xs text-gray-600">Expiry Date *</label>
                                <input
                                    type="date"
                                    className="border rounded px-2 py-1 w-full"
                                    readOnly={isReadOnly}
                                    value={memberInfo.expiryDate}
                                    onChange={(e) => updateManual("expiryDate", e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default InsuranceCheck;
