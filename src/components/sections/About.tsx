"use client";

import Image from "next/image";
import React from "react";
import { Scissors, Ruler, CheckCircle, Award, Shirt, Star, MessageCircle, Users } from "lucide-react";
import { motion } from "framer-motion";

import { useSiteContent } from "@/hooks/useSiteContent";
import { getInquiryWhatsAppUrl } from "@/lib/constants";

export function About() {
    const { content } = useSiteContent();

    return (
        <section className="py-24 px-4 md:px-12 bg-[#FFFBF2] relative overflow-hidden" dir="rtl" id="about">
            {/* Background Decor */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-gold-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"
            />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gold-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"
            />

            {/* Header */}
            <div className="text-center mb-20 relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-gold-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block"
                >
                    قصتنا
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-arabic font-bold text-[#5A4A42] mb-6"
                >
                    من نحن
                </motion.h2>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 96 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-1 bg-gold-primary mx-auto rounded-full"
                />
            </div>

            {/* Main Content: Bio & Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl mx-auto items-center mb-32">
                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative group perspective-1000"
                >
                    <div className="absolute inset-0 bg-gold-primary/10 transform rotate-6 rounded-[2.5rem] transition-transform duration-500 group-hover:rotate-3" />
                    <div className="relative h-[600px] w-full bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white transform transition-transform duration-500 group-hover:scale-[1.01]">
                        <Image
                            src={content.about_image || "https://placehold.co/600x800/FAEED1/5A4A42?text=Rawaa+Sewing"}
                            alt="خياطة رواء"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] flex items-center gap-5 border border-white/50"
                    >
                        <div className="w-16 h-16 bg-gold-primary/10 rounded-2xl flex items-center justify-center text-gold-primary">
                            <Award size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[#5A4A42]">10+</p>
                            <p className="text-sm text-gray-500 font-medium mt-1">سنوات خبرة</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Text Side */}
                <div className="space-y-10">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-[#5A4A42] leading-tight"
                    >
                        نحن نخيط <span className="text-gold-primary relative inline-block">
                            الأناقة
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-gold-primary/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span> ونحيك <span className="text-gold-primary">التميز</span> في كل تفصيل.
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6 text-lg text-gray-600 leading-8"
                    >
                        <p>
                            لدينا شهادة معتمدة وخبرة عميقة تمتد لقرابة 10 سنوات في فن الخياطة النسائية، صقلتها سنوات من العمل في كبرى مصانع الخياطة. نحن لا نقدم مجرد ملابس، بل نقدم تجربة فريدة تجمع بين الحرفة التقليدية واللمسات العصرية.
                        </p>
                        <p>
                            سواء كنتِ تبحثين عن إحرامات مريحة لرحلة العمرة، أو جلابية تعكس هويتك، أو تعديل دقيق لملابسك المفضلة، نحن هنا لنحقق لكِ ما تتمنين بأعلى معايير الجودة.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap gap-3"
                    >
                        <Badge text="دقة عالية" delay={0.3} />
                        <Badge text="تسليم في الموعد" delay={0.4} />
                        <Badge text="أقمشة فاخرة" delay={0.5} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="pt-4"
                    >
                        <a href={getInquiryWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-2xl hover:bg-[#1da851] transition-all duration-300 shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1">
                            <MessageCircle size={24} fill="white" className="stroke-none" />
                            <span className="font-medium text-lg">تواصلي عبر واتساب</span>
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Services Section */}
            <div className="max-w-7xl mx-auto mb-32">
                <div className="text-center mb-16">
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold text-[#5A4A42] mb-4"
                    >
                        خدماتنا المتميزة
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-500 text-lg"
                    >
                        نقدم لكِ باقة متكاملة من خدمات الخياطة المصممة خصيصاً لكِ
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ServiceCard
                        icon={<Shirt />}
                        title="إحرامات حج وعمرة"
                        desc="خياطة ملابس إحرام مريحة وعملية بأقمشة قطنية فاخرة تناسب الأجواء الروحانية."
                        delay={0.1}
                    />
                    <ServiceCard
                        icon={<Scissors />}
                        title="خياطة جلابيات"
                        desc="تصاميم جلابيات متنوعة تجمع بين الأصالة والمعاصرة لتناسب جميع مناسباتك."
                        delay={0.2}
                    />
                    <ServiceCard
                        icon={<Ruler />}
                        title="تعديل الملابس"
                        desc="خدمات تضييق، تقصير، وتعديل المقاسات بدقة متناهية لتناسب قوامك تماماً."
                        delay={0.3}
                    />
                    <ServiceCard
                        icon={<Star />}
                        title="خياطة نسائية شاملة"
                        desc="تنفيذ كافة أنواع الموديلات والقصات النسائية بلمسة احترافية."
                        delay={0.4}
                    />
                    {/* Centered 5th Card - Full width container or just centered by grid logic if we adjust classes or just let it wrap */}
                    <div className="md:col-span-2 lg:col-span-4 flex justify-center">
                        <div className="w-full md:w-1/2 lg:w-1/4">
                            <ServiceCard
                                icon={<Users />}
                                title="زي موحد"
                                desc="تصميم وتنفيذ زي موحد للشركات والمدارس بجودة عالية وخامات عملية تتحمل الاستخدام اليومي."
                                delay={0.5}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-[#FAEED1]/50 backdrop-blur-sm rounded-[3rem] p-10 md:p-20 text-center max-w-6xl mx-auto relative overflow-hidden group"
            >
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A038_1px,transparent_1px)] [background-size:20px_20px]" />

                <h3 className="text-3xl md:text-4xl font-bold text-[#5A4A42] mb-4 relative z-10">لماذا تختارين رواء؟</h3>
                <p className="text-sm text-[#8B7355] mb-12 relative z-10">نخيط لكِ قطعة لتعيش معكِ سنوات طويلة</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                    <Feature
                        title="خبرة مصانع"
                        desc="خبرتنا العملية في المصانع تضمن لكِ جودة تصنيع احترافية."
                        delay={0.2}
                    />
                    <Feature
                        title="اتقان وسرعة"
                        desc="نلتزم بالمواعيد دون المساومة على جودة ودقة التفاصيل."
                        delay={0.4}
                    />
                    <Feature
                        title="أسعار منافسة"
                        desc="نقدم لكِ أفضل قيمة مقابل سعر مع ضمان الرضا التام."
                        delay={0.6}
                    />
                </div>
            </motion.div>
        </section>
    );
}

function ServiceCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(197,160,56,0.15)] transition-all duration-300 border border-gray-50 hover:border-gold-primary/30 group"
        >
            <div className="w-16 h-16 bg-[#FFF8E7] text-gold-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-primary group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-gold-primary/20">
                {React.cloneElement(icon as React.ReactElement<any>, { size: 30, strokeWidth: 1.5 })}
            </div>
            <h4 className="text-xl font-bold text-[#5A4A42] mb-3">{title}</h4>
            <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
        </motion.div>
    )
}

function Feature({ title, desc, delay }: { title: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="flex flex-col items-center group"
        >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gold-primary mb-6 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 border border-gold-primary/10">
                <CheckCircle size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#5A4A42] mb-3">{title}</h4>
            <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{desc}</p>
        </motion.div>
    )
}

function Badge({ text, delay }: { text: string, delay: number }) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay }}
            className="bg-[#FFF8E7] text-gold-dark px-5 py-2.5 rounded-xl text-sm font-semibold border border-gold-primary/20 hover:bg-gold-primary hover:text-white transition-colors cursor-default"
        >
            {text}
        </motion.span>
    )
}
