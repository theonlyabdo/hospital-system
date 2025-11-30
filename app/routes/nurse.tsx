import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, MoreHorizontal, Calendar } from "lucide-react";

import { SAMPLE_PATIENTS, NURSE_TABS, WORKFLOW_ACTIONS } from "~/lib/nurse";
import { Button } from "~/components/ui/button";
import VitalsForm from "~/components/nurse/VitalsForm";

export const meta = () => [
    { title: "aveo | Nurse Portal — Redesigned" },
    { name: "description", content: "Modern nurse portal UI with improved workflow and UX." },
];

// -----------------------------------------------------
// UI SUBCOMPONENTS
// -----------------------------------------------------

const PriorityPill = ({ priority = "stable" }: { priority?: string }) => {
    const map: Record<string, string> = {
        critical: "bg-red-100 text-red-700",
        stable: "bg-green-100 text-green-700",
        observation: "bg-yellow-100 text-yellow-800",
    };
    return (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${map[priority]}`}>
            {priority}
        </span>
    );
};

const Tab = ({ label, active, onClick }: { active: boolean; label: string; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`py-2 px-3 rounded-md text-sm font-medium ${
            active ? "bg-rose-800 text-white" : "text-gray-700 hover:bg-gray-100"
        }`}
    >
        {label}
    </button>
);

// -----------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------

export default function NursePortalRedesign() {
    const [patients] = useState(SAMPLE_PATIENTS);
    const [selectedId, setSelectedId] = useState(patients[0]?.id ?? null);
    const [query, setQuery] = useState("");
    const [filterPriority, setFilterPriority] = useState("all");
    const [activeTab, setActiveTab] = useState("overview");

    const selectedPatient = useMemo(() => patients.find((p) => p.id === selectedId) || null, [
        patients,
        selectedId,
    ]);

    const filtered = patients.filter((p) => {
        const q = query.trim().toLowerCase();
        if (filterPriority !== "all" && p.priority !== filterPriority) return false;
        if (!q) return true;
        return [p.name.toLowerCase(), p.bed.toLowerCase(), p.reason.toLowerCase()].some((f) =>
            f.includes(q),
        );
    });

    // -----------------------------------------------------
    // TAB RENDERERS
    // -----------------------------------------------------
    const TabContent = () => {
        if (!selectedPatient) return null;

        switch (activeTab) {
            case "overview":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800">Clinical Summary</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-md shadow-sm">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Allergies</h4>
                                <p className="text-sm text-gray-700">{selectedPatient.allergies || "None"}</p>
                            </div>
                            <div className="p-4 bg-white rounded-md shadow-sm">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Code Status</h4>
                                <p className="text-sm text-gray-700">{selectedPatient.code}</p>
                            </div>
                        </div>
                    </div>
                );

            case "meds":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800">Medication List</h3>
                        <ul className="space-y-3">
                            {selectedPatient.meds.map((m) => (
                                <li
                                    key={m.id}
                                    className="p-4 bg-white rounded-md shadow-sm border flex justify-between items-center"
                                >
                                    <div className="text-gray-800 font-medium">{m.text}</div>
                                    <div className="text-xs text-gray-500">
                                        Due: {m.due} • Status: {m.status}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case "labs":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800">Lab Orders</h3>
                        <ul className="space-y-3">
                            {selectedPatient.labs.map((l) => (
                                <li
                                    key={l.id}
                                    className="p-4 bg-white rounded-md shadow-sm border flex justify-between items-center"
                                >
                                    <div className="text-gray-800 font-medium">{l.text}</div>
                                    <div className="text-xs text-gray-500">Status: {l.status}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case "vitals":
                return <VitalsForm />;

            case "notes":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800">Nursing Notes</h3>
                        {selectedPatient.notes.length === 0 ? (
                            <p className="text-sm text-gray-500">No notes added yet.</p>
                        ) : (
                            <ul className="space-y-3">
                                {selectedPatient.notes.map((n) => (
                                    <li
                                        key={n.id}
                                        className="p-4 rounded-md shadow-sm border bg-white"
                                    >
                                        <div className="font-medium text-gray-700">{n.author}</div>
                                        <p className="text-sm text-gray-600 mt-1">{n.text}</p>
                                        <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <textarea
                            className="w-full p-4 border rounded-md text-sm mt-2 shadow-sm focus:ring-1 focus:ring-rose-500 focus:outline-none"
                            placeholder="Type a new note..."
                        />
                        <div className="flex justify-end mt-2">
                            <Button className="bg-rose-800 text-white px-4 py-2 rounded-md">
                                Save Note
                            </Button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // -----------------------------------------------------
    // MAIN LAYOUT
    // -----------------------------------------------------
    return (
        <div className="min-h-screen bg-slate-50 text-gray-800 p-6">
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
                {/* LEFT SIDEBAR */}
                <aside className="col-span-12 md:col-span-4 lg:col-span-3 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="!text-2xl font-semibold">Nurse Dashboard</h1>
                            <p className="text-sm text-gray-500">Shift: Day • Ward 3A</p>
                        </div>
                        <button className="p-2 rounded-md hover:bg-gray-100">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-3">
                        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500">Tasks</p>
                            <div className="text-lg font-bold">6</div>
                        </motion.div>

                        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500">Alerts</p>
                            <div className="text-lg font-bold">2</div>
                        </motion.div>

                        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500">Patients</p>
                            <div className="text-lg font-bold">8</div>
                        </motion.div>
                    </div>

                    {/* Search */}
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center gap-2 border-b-2 border-b-rose-700">
                            <Search size={16} className={"text-rose-800"} />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name, bed, reason"
                                className="flex-1 text-sm !rounded-none focus:outline-none"
                            />
                            {query && (
                                <button onClick={() => setQuery("")} className="p-1 rounded-full hover:bg-gray-100">
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <div className="mt-3 flex gap-2 text-sm">
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="p-2 border rounded-md text-sm"
                            >
                                <option value="all">All priorities</option>
                                <option value="critical">Critical</option>
                                <option value="observation">Observation</option>
                                <option value="stable">Stable</option>
                            </select>

                            <button
                                onClick={() => {
                                    setQuery("");
                                    setFilterPriority("all");
                                }}
                                className="p-2 rounded-md hover:bg-gray-100 text-sm"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Patient List */}
                    <div className="bg-white rounded-lg shadow-sm divide-y">
                        {filtered.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">No patients found.</div>
                        ) : (
                            filtered.map((p) => (
                                <motion.button
                                    key={p.id}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => setSelectedId(p.id)}
                                    className={`w-full text-left p-3 flex items-center gap-3 ${
                                        selectedId === p.id ? "bg-rose-50 border-l-4 border-rose-700 !border-b-0" : "hover:bg-gray-50"
                                    }`}
                                >
                                    <img src={p.avatar} className="w-10 h-10 rounded-full" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-sm">
                                            {p.bed} • {p.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {p.age} yrs • {p.reason}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <PriorityPill priority={p.priority} />
                                        <div className="text-xs mt-1 text-gray-400">{p.status}</div>
                                    </div>
                                </motion.button>
                            ))
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button className="flex-1 bg-rose-800 text-white text-sm py-2 rounded-md">
                            New Task
                        </button>
                        <button className="p-2 border rounded-md hover:bg-gray-50">
                            <Calendar size={16} />
                        </button>
                    </div>
                </aside>

                {/* RIGHT EMR PANEL */}
                <main className="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
                    {!selectedPatient ? (
                        <div className="h-96 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-500">
                            Select a patient to view details
                        </div>
                    ) : (
                        <>
                            {/* Summary Header */}
                            <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={selectedPatient.avatar} className="w-16 h-16 rounded-full" />
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {selectedPatient.name}
                                            <span className="text-sm text-gray-500"> • {selectedPatient.bed}</span>
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {selectedPatient.age} yrs • {selectedPatient.reason}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <PriorityPill priority={selectedPatient.priority} />
                                            <span className="text-sm text-gray-500">{selectedPatient.status}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="text-sm py-2 px-3 border rounded-md hover:bg-gray-50">
                                        {WORKFLOW_ACTIONS.assign.label}
                                    </button>
                                    <button className="text-sm py-2 px-3 border rounded-md hover:bg-gray-50">
                                        {WORKFLOW_ACTIONS.handover.label}
                                    </button>
                                    <button className="text-sm py-2 px-3 bg-rose-800 text-white rounded-md">
                                        {WORKFLOW_ACTIONS.signoff.label}
                                    </button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex gap-2 border-b pb-3">
                                    {NURSE_TABS.map((t) => (
                                        <Tab
                                            key={t.key}
                                            label={t.label}
                                            active={activeTab === t.key}
                                            onClick={() => setActiveTab(t.key)}
                                        />
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <TabContent />
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
