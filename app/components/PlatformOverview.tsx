import {motion, type Variants} from "framer-motion";
import { FileText } from "lucide-react";

const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: "easeOut"
        }
    })
};

export default function PlatformOverview() {
    return (
        <section className="max-w-6xl mx-auto px-6 mt-24">
            <motion.h2
                className="text-2xl font-bold text-rose-900 text-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
            >
                Platform Overview
            </motion.h2>

            <motion.div
                className="bg-white p-8 rounded-xl shadow flex flex-col md:flex-row gap-8 items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
            >
                {/* Icon animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.6,
                        ease: "backOut",
                    }}
                    viewport={{ once: true }}
                >
                    <FileText size={60} className="text-rose-700" />
                </motion.div>

                {/* Staggered text */}
                <div>
                    <motion.p
                        custom={0}
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="text-gray-700 leading-relaxed"
                    >
                        The Aveo Hospital System is built on a modular architecture enabling
                        seamless integration between patient access, clinical care, laboratory,
                        pharmacy, and financial operations.
                    </motion.p>

                    <motion.p
                        custom={1}
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="text-gray-600 mt-3 text-sm"
                    >
                        Designed for scalability, security, and interoperability across hospital departments.
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
}
