import React, { useEffect, useRef, useState } from "react";

const CountUp = ({ end = 0, duration = 1500 }) => {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;

                    const startTime = performance.now();

                    const animate = (now:number) => {
                        const progress = Math.min((now - startTime) / duration, 1);
                        const current = Math.floor(progress * end);
                        setValue(current);

                        if (progress < 1) requestAnimationFrame(animate);
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.4 }
        );

        if (el) observer.observe(el);

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{value}</span>;
};

export default CountUp;
