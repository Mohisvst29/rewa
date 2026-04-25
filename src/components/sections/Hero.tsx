"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

export function Hero() {
    const { content } = useSiteContent();

    return (
        <section className="relative min-h-screen w-full overflow-hidden pt-20 flex flex-col md:flex-row items-center">
            {/* Background Image - with parallax-like subtle scale effect on load */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={content.hero_bg || "/Rectangle.png"}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>
                </motion.div>
            </div>

            {/* Curved Line Decoration SVG - Animated path drawing */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
                <svg viewBox="0 0 1440 800" className="w-full h-full text-gold-primary/30 fill-none stroke-current stroke-1">
                    <motion.path
                        d="M -100 400 Q 400 600 800 500 T 1500 800"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            {/* Right Content - Text (Now First for RTL) */}
            <div className="w-full md:w-1/2 px-8 md:px-16 lg:px-24 flex flex-col justify-center items-start z-10 mt-10 md:mt-0 order-2 md:order-1">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Star decoration - Spinning animation */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-10 -left-10 text-[#C5A038]"
                    >
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-arabic font-bold text-gold-primary leading-tight">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="block ml-4 text-[#5A4A42]"
                        >
                            أناقة
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="block mr-8 text-gold-dark"
                        >
                            وفخامة
                        </motion.span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-2 text-lg text-gold-primary font-medium"
                >
                    {content.hero_subtitle || "أناقة هادئة بتفاصيل متقنة"}
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="mt-6 text-xl text-[#5A4A42] font-medium max-w-md leading-relaxed"
                >
                    تصاميم خياطة راقية تليق بجمالكِ وتبرز هويتكِ بلمسة عصرية.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-10"
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/collection">
                            <Button className="font-arabic text-lg px-8 py-6 shadow-xl hover:shadow-[#C5A038]/30">تصفحي التشكيلة</Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1.5, y: { repeat: Infinity, duration: 1.5 } }}
                    className="absolute bottom-10 left-20 text-gold-primary hidden md:block"
                >
                    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="1" width="22" height="38" rx="11" />
                        <line x1="12" y1="10" x2="12" y2="20" />
                    </svg>
                </motion.div>
            </div>

            {/* Left Content - Image (Now Second for RTL) */}
            <div className="relative w-full md:w-1/2 h-[60vh] md:h-[80vh] z-10 order-1 md:order-2">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="absolute right-0 top-10 w-[90%] h-full rounded-l-[100px] overflow-hidden border-l-4 border-b-4 border-white/50 shadow-2xl"
                >
                    <div className="w-full h-full bg-gray-200 relative">
                        <Image
                            src={content.hero_main || "https://placehold.co/800x1200/e2e2e2/a0a0a0?text=Woman+in+Hijab"}
                            alt="سيدة أنيقة"
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
