import React, { useEffect, useRef, useState } from "react";
import CountUp from "~/components/CoutUp";


const KPIItem = ({ end, label, delay = 0 }: {end:number, label: string, delay:number}) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`
                transition-all duration-700 
                opacity-0 translate-y-6 
                ${visible ? "opacity-100 translate-y-0" : ""} 
            `}
            style={{
                transitionDelay: `${delay}ms`,
            }}
        >
            <h3 className="text-3xl font-bold text-rose-800">
                <CountUp end={ end } />
                +
            </h3>

            <p className="text-gray-600 text-sm">{label}</p>
        </div>
    );
};

export default KPIItem;
