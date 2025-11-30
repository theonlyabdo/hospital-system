import React, { useReducer } from "react";
import { Button } from "~/components/ui/button";

const vitalsFields = ["bp", "hr", "rr", "temp", "o2", "pain"];

const initialVitals = {
    bp: "",
    hr: "",
    rr: "",
    temp: "",
    o2: "",
    pain: "",
};

function vitalsReducer(state, action) {
    return { ...state, [action.field]: action.value };
}

export default function VitalsForm() {
    const [vitals, dispatch] = useReducer(vitalsReducer, initialVitals);

    const handleChange = (field) => (e) => {
        dispatch({ field, value: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Saved vitals: ${JSON.stringify(vitals)}`);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Record New Vitals</h3>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md shadow-sm"
            >
                <div className={'grid grid-cols-3 gap-4'}>
                {vitalsFields.map((field) => (
                    <div key={field} className="flex flex-col">
                        <label className="text-sm text-gray-600 capitalize mb-1">{field}</label>
                        <input
                            type="text"
                            value={vitals[field]}
                            onChange={handleChange(field)}
                            className="border rounded-md p-2 focus:ring-1 focus:ring-rose-500 focus:outline-none text-sm"
                        />
                    </div>
                ))}
                </div>
                <div className="col-span-2 flex justify-end mt-2">
                    <Button className="bg-rose-800 text-white px-4 py-2 rounded-md">
                        Save Vitals
                    </Button>
                </div>
            </form>
        </div>
    );
}
