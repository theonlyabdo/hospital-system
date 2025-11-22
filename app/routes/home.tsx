import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {Stethoscope, Syringe, Pill, FileText, UserPlus, Hospital, FlaskConical} from "lucide-react";
import { Link } from "react-router";
import CountUp from "~/components/CoutUp";
import KPIItem from "~/components/KPIItem";
import PlatformOverview from "~/components/PlatformOverview";
import {motion, type Variants} from "framer-motion";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "aveo hospitals system" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const KPIs = [
    {
        id: 0,
        title: "Patient Access",
        icon: UserPlus,
        description: "Register new patients and manage demographic information.",
    },
    {
        id: 1,
        title: "Nursing Portal",
        icon: Syringe,
        description: "Record vitals, assessments, and nursing interventions.",
    },
    {
        id: 2,
        title: "Doctor Portal",
        icon: Stethoscope,
        description: "Access EMR, write notes, and manage clinical orders.",
    },
    {
        id: 3,
        title: "Pharmacy",
        icon: Pill,
        description: "Dispense medications and review prescriptions.",
    },
    {
        id: 4,
        title: "Laboratory",
        icon: FlaskConical,
        description: "View and manage laboratory orders and reports.",
    }

]

const fadeUp :Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};



const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 pt-28 ">

            {/* Hero Section */}
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 mt-6 text-center">
                <motion.div
                    className="flex flex-col items-center gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.div variants={scaleIn}>
                        <Hospital size={48} className="text-rose-800" />
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-4xl font-bold">
                        Aveo Hospitals Portal
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-gray-600 max-w-xl text-lg">
                        A unified hospital information system built to streamline patient care,
                        improve workflows, and support clinical decisions.
                    </motion.p>

                    <motion.a
                        variants={fadeUp}
                        href="/#welcome"
                        className="mt-4 bg-rose-800 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-rose-700 transition"
                    >
                        Get Started
                    </motion.a>
                </motion.div>
            </section>

            {/* Feature Icons */}
            {/* Feature Icons */}
            <section id="welcome" className="max-w-7xl mx-auto px-6 mt-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-rose-900 text-center mb-10"
                >
                    Quick Access Modules
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {KPIs.map((kpi) => {
                        const Icon = kpi.icon;
                        return (
                            <motion.div
                                key={kpi.id}
                                variants={fadeUp}
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 120 }}
                            >
                                <Link
                                    to="/pas"
                                    className="bg-white p-6 rounded-xl shadow hover:shadow-md transition group block"
                                >
                                    <Icon size={40} className="text-rose-800 group-hover:scale-110 transition" />
                                    <h3 className="mt-4 text-xl font-semibold text-rose-900">{kpi.title}</h3>
                                    <p className="text-gray-600 text-sm mt-2">
                                        {kpi.description}
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}

                    {/* More */}
                    <motion.div
                        variants={fadeUp}
                        className="bg-white p-6 rounded-xl shadow opacity-60"
                    >
                        <h3 className="text-lg font-semibold text-gray-500">
                            More modules coming soon…
                        </h3>
                    </motion.div>
                </motion.div>
            </section>


            <section className="max-w-7xl mx-auto px-6 mt-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                    <KPIItem end={120} label="Registered Patients" delay={0} />
                    <KPIItem end={40} label="Daily Appointments" delay={150} />
                    <KPIItem end={25} label="Clinicians Active" delay={300} />
                    <KPIItem end={8} label="Modules Enabled" delay={450} />

                </div>
            </section>

            <PlatformOverview/>

            {/* Footer */}
            <div className="mt-20 text-center pb-10 text-gray-600 text-sm">
                © {new Date().getFullYear()} Aveo Hospitals system • Powered by <span className={'font-bold'}>aveo</span>
            </div>
        </div>
    );
};

export default Home;
