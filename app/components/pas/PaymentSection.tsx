import React, { useState } from "react";
import { Button } from "~/components/ui/button";

type PaymentRecord = {
    paymentType: string;
    method: string;
    amount: number;
    cc4?: string;
    auth?: string;
    createdAt: string;
};

const PaymentSection = ({ patient }: { patient: any }) => {
    const [addingPayment, setAddingPayment] = useState(false);

    const [paymentType, setPaymentType] = useState("copay");
    const [method, setMethod] = useState("cash");
    const [amount, setAmount] = useState("");
    const [cc4, setCc4] = useState("");
    const [auth, setAuth] = useState("");

    const [payments, setPayments] = useState<PaymentRecord[]>([]);

    const estimatedCost = 330;
    const balance = patient.balance ?? 0;

    const resetForm = () => {
        setPaymentType("copay");
        setMethod("cash");
        setAmount("");
        setCc4("");
        setAuth("");
    };

    const handleSubmit = () => {
        if (!amount) {
            alert("Amount is required.");
            return;
        }

        if (method === "credit" && (!cc4 || !auth)) {
            alert("Credit card fields are required.");
            return;
        }

        const record: PaymentRecord = {
            paymentType,
            method,
            amount: Number(amount),
            cc4: method === "credit" ? cc4 : undefined,
            auth: method === "credit" ? auth : undefined,
            createdAt: new Date().toLocaleString(),
        };

        setPayments((prev) => [...prev, record]);

        resetForm();
        setAddingPayment(false);
    };

    return (
        <div className="space-y-4 border rounded-xl p-4 bg-white shadow-sm">

            {/* ASK FIRST */}
            {!addingPayment && (
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">Do you want to add a payment?</p>
                    <Button
                        onClick={() => setAddingPayment(true)}
                        className="bg-rose-700 hover:bg-rose-800 text-white"
                    >
                        Add Payment
                    </Button>
                </div>
            )}

            {/* PAYMENT FORM */}
            {addingPayment && (
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Payment Type</label>
                        <select
                            className="border rounded px-3 py-2 w-full mt-1"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                        >
                            <option value="copay">Co-payment</option>
                            <option value="self">Self-pay</option>
                            <option value="lab">Lab Payment</option>
                            <option value="extra">Extras</option>
                        </select>
                    </div>

                    <div className="space-y-1 text-gray-700 text-sm">
                        <p><b>Estimated Cost:</b> {estimatedCost} EGP</p>
                        <p><b>Outstanding Balance:</b> {balance} EGP</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Payment Method
                            </label>
                            <select
                                className="border rounded px-3 py-2 w-full mt-1"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                            >
                                <option value="cash">Cash</option>
                                <option value="credit">Credit Card</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Amount *</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="border rounded px-3 py-2 w-full mt-1"
                                required
                            />
                        </div>
                    </div>

                    {method === "credit" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Last 4 Digits of Card *
                                </label>
                                <input
                                    type="text"
                                    maxLength={4}
                                    value={cc4}
                                    onChange={(e) => setCc4(e.target.value)}
                                    className="border rounded px-3 py-2 w-full mt-1"
                                    placeholder="1234"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Authorization Number *
                                </label>
                                <input
                                    type="text"
                                    value={auth}
                                    onChange={(e) => setAuth(e.target.value)}
                                    placeholder="Auth Number"
                                    className="border rounded px-3 py-2 w-full mt-1"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            onClick={handleSubmit}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            Save Payment
                        </Button>

                        <Button
                            onClick={() => {
                                resetForm();
                                setAddingPayment(false);
                            }}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* PAYMENT LIST */}
            {payments.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Payments Added</h3>

                    <div className="space-y-2">
                        {payments.map((p, i) => (
                            <div
                                key={i}
                                className="border rounded-lg p-3 bg-gray-50 text-sm flex justify-between"
                            >
                                <div>
                                    <p><b>{p.paymentType}</b> — {p.method.toUpperCase()}</p>
                                    <p>Amount: {p.amount} EGP</p>
                                    {p.method === "credit" && (
                                        <>
                                            <p>Card: **** {p.cc4}</p>
                                            <p>Auth: {p.auth}</p>
                                        </>
                                    )}
                                    <p className="text-xs text-gray-500">{p.createdAt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentSection;
