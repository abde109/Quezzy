import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const ToggleP: React.FC<{ title: string, description: string }> = ({ title, description }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-row m-20"
        >
            <div className="py-6 bg-primary w-2 rounded-lg mr-4"></div>
            <div className="flex flex-col">
                <h3 className="font-mono text-xl font-semibold">
                    {title}
                </h3>
                <p className="font-mono text-sm">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default ToggleP;
