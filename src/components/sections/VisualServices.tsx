"use client";


import { useState, useEffect } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceItem {
    _id: string;
    title: string;
    image: string;
}

export function VisualServices() {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                if (res.ok) {
                    const data = await res.json();
                    setServices(data);
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <section className="py-16 bg-[#FFFBF2] h-[600px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A038]"></div>
        </section>;
    }

    return (
        <section className="py-16 px-4 md:px-8 bg-[#FFFBF2]" id="visual-services">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 relative">
                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold text-[#1a1a1a] relative inline-block z-10 font-arabic"
                    >
                        خدماتنا
                    </motion.h2>

                    {/* Decorative gold line */}
                    <motion.div
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-48 md:w-64 h-8"
                    >
                        <svg viewBox="0 0 200 20" fill="none" className="w-full h-full stroke-[#C5A038] stroke-1">
                            <path d="M0 10 Q 50 20 100 10 T 200 10" />
                        </svg>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service._id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="flex flex-col items-center group"
                        >
                            {/* Image Card */}
                            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg mb-6 border-4 border-white group-hover:shadow-xl transition-shadow duration-300">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>

                            {/* Text */}
                            <h3 className="text-xl md:text-2xl text-center font-script text-[#4A4A4A] leading-tight px-2">
                                {service.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
