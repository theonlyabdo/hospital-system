import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { Stethoscope, Syringe, Pill, FileText, UserPlus, Hospital } from "lucide-react";
import { Link } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "aveo hospitals system" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-28 ">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 text-center">
                <div className="flex flex-col items-center gap-3">
                    <Hospital size={48} className="text-rose-800" />
                    <h1 className="text-4xl font-bold ">Aveo Hospitals Portal</h1>
                    <p className="text-gray-600 max-w-xl text-lg">
                        A unified hospital information system built to streamline patient care,
                        improve workflows, and support clinical decisions.
                    </p>

                    <Link
                        to="/registration"
                        className="mt-4 bg-rose-800 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-rose-700 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Feature Icons */}
            <section className="max-w-7xl mx-auto px-6 mt-20">
                <h2 className="text-2xl font-bold text-rose-900 text-center mb-10">
                    Quick Access Modules
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Registration */}
                    <Link
                        to="/registration"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition group"
                    >
                        <UserPlus size={40} className="text-rose-800 group-hover:scale-110 transition" />
                        <h3 className="mt-4 text-xl font-semibold text-rose-900">Patient Registration</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Register new patients and manage demographic information.
                        </p>
                    </Link>

                    {/* Nursing */}
                    <Link
                        to="/nurse"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition group"
                    >
                        <Syringe size={40} className="text-rose-800 group-hover:scale-110 transition" />
                        <h3 className="mt-4 text-xl font-semibold text-rose-900">Nursing Portal</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Record vitals, assessments, and nursing interventions.
                        </p>
                    </Link>

                    {/* Doctor */}
                    <Link
                        to="/doctor"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition group"
                    >
                        <Stethoscope size={40} className="text-rose-800 group-hover:scale-110 transition" />
                        <h3 className="mt-4 text-xl font-semibold text-rose-900">Doctor Portal</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Access EMR, write notes, and manage clinical orders.
                        </p>
                    </Link>

                    {/* Pharmacy */}
                    <Link
                        to="/pharmacy"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition group"
                    >
                        <Pill size={40} className="text-rose-800 group-hover:scale-110 transition" />
                        <h3 className="mt-4 text-xl font-semibold text-rose-900">Pharmacy</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Dispense medications and review prescriptions.
                        </p>
                    </Link>

                    {/* Labs */}
                    <Link
                        to="/labs"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition group"
                    >
                        <FileText size={40} className="text-rose-800 group-hover:scale-110 transition" />
                        <h3 className="mt-4 text-xl font-semibold text-rose-900">Laboratory</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            View and manage laboratory orders and reports.
                        </p>
                    </Link>

                    {/* More */}
                    <div className="bg-white p-6 rounded-xl shadow opacity-60">
                        <h3 className="text-lg font-semibold text-gray-500">More modules coming soon…</h3>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <div className="mt-20 text-center pb-10 text-gray-600 text-sm">
                © {new Date().getFullYear()} Aveo Hospitals system • Powered by <span className={'font-bold'}>aveo</span>
            </div>
        </div>
    );
};

export default Home;
