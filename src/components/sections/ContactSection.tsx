"use client";

import React, { useState } from "react";
import { Loader2, MapPin, Clock, Instagram, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function ContactSection() {
    const [formState, setFormState] = useState({
        name: "",
        phone: "",
        service: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        setFormState({ name: "", phone: "", service: "" });
        setTimeout(() => setStatus("idle"), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section className="relative py-32 px-4 flex items-center justify-center min-h-[800px] overflow-hidden">
            {/* Background Image with Blur */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/Rectangle 20 (1).png"
                    alt="Background"
                    fill
                    className="object-cover blur-[5px]" // Adding slight blur to match the soft aesthetic
                    priority
                />
            </div>
            {/* Overlay to ensure readability and match the tone */}
            <div className="absolute inset-0 bg-[#eaddcf]/20 -z-10" />

            {/* Neumorphic Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="bg-[#f0ece6]/80 backdrop-blur-md rounded-[3rem] p-8 md:p-14 w-full max-w-lg shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border border-white/40"
            >

                <h2 className="text-4xl md:text-5xl text-center text-[#5A4A42] mb-12 font-arabic font-bold">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                    >
                        تواصل معنا
                    </motion.span>
                </h2>

                <div className="flex flex-col gap-4 mb-8 text-center" dir="rtl">
                    <div className="flex items-center justify-center gap-2 text-[#8B7355]">
                        <MapPin size={20} className="text-[#C5A038]" />
                        <span className="font-arabic text-lg">المملكة العربية السعودية</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[#8B7355]">
                        <Clock size={20} className="text-[#C5A038]" />
                        <span className="font-arabic text-lg">ساعات العمل يوميا</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-2">
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-[#25D366] shadow-md hover:scale-110 transition-transform">
                            <MessageCircle size={24} />
                        </a>
                        <a href="https://www.instagram.com/rawaa_boutique1?utm_source=qr&igsh=dXI3cjB0MHlsNnY2" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-[#E4405F] shadow-md hover:scale-110 transition-transform">
                            <Instagram size={24} />
                        </a>
                        <a href={`tel:${WHATSAPP_NUMBER}`} className="p-3 bg-white rounded-full text-[#5A4A42] shadow-md hover:scale-110 transition-transform">
                            <Phone size={24} />
                        </a>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8" dir="rtl">

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                    >
                        <label htmlFor="name" className="block text-[#8B7355] text-lg font-arabic font-medium pr-2">الاسم</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full h-12 px-6 rounded-full bg-white shadow-[inset_6px_6px_10px_#d1d1d1,inset_-6px_-6px_10px_#ffffff] border-none outline-none text-gray-700 focus:shadow-[inset_2px_2px_5px_#d1d1d1,inset_-2px_-2px_5px_#ffffff] transition-shadow text-right"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                    >
                        <label htmlFor="phone" className="block text-[#8B7355] text-lg font-arabic font-medium pr-2">رقم الهاتف</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            dir="ltr" // Kept LTR for phone input usability
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full h-12 px-6 rounded-full bg-white shadow-[inset_6px_6px_10px_#d1d1d1,inset_-6px_-6px_10px_#ffffff] border-none outline-none text-gray-700 focus:shadow-[inset_2px_2px_5px_#d1d1d1,inset_-2px_-2px_5px_#ffffff] transition-shadow text-right placeholder-gray-400"
                            placeholder="05xxxxxxxx"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                    >
                        <label htmlFor="service" className="block text-[#8B7355] text-lg font-arabic font-medium pr-2">كيف يمكننا مساعدتك</label>
                        <input
                            type="text"
                            id="service"
                            name="service"
                            value={formState.service}
                            onChange={handleChange}
                            className="w-full h-12 px-6 rounded-full bg-white shadow-[inset_6px_6px_10px_#d1d1d1,inset_-6px_-6px_10px_#ffffff] border-none outline-none text-gray-700 focus:shadow-[inset_2px_2px_5px_#d1d1d1,inset_-2px_-2px_5px_#ffffff] transition-shadow text-right"
                        />
                    </motion.div>

                    <div className="pt-6 flex justify-center">
                        <motion.button
                            type="submit"
                            disabled={status === "submitting" || status === "success"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-40 h-12 rounded-xl bg-[#ffadad] text-white font-arabic font-bold text-lg shadow-[4px_4px_10px_#b8b8b8,-4px_-4px_10px_#ffffff] active:shadow-[inset_2px_2px_5px_#bfa3a3,inset_-2px_-2px_5px_#ffd5d5] hover:bg-[#ff9e9e] transition-all"
                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}
                        >
                            {status === "submitting" ? <Loader2 className="animate-spin w-6 h-6 mx-auto" /> : "إرسال"}
                        </motion.button>
                    </div>

                </form>
            </motion.div>
        </section>
    );
}
