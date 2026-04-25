"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

interface GalleryData {
    _id: string;
    image: string;
    title: string;
}

export function Gallery() {
    const { content } = useSiteContent();
    const [galleryItems, setGalleryItems] = useState<GalleryData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/gallery');
                if (res.ok) {
                    const data = await res.json();
                    setGalleryItems(data);
                }
            } catch (error) {
                console.error("Failed to fetch gallery items", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Helper to get image or placeholder
    const getImage = (index: number) => {
        if (galleryItems[index]) return galleryItems[index].image;
        return `https://placehold.co/400x600/f0eee6/808080?text=Gallery+${index + 1}`;
    };

    return (
        <section className="py-24 px-4 overflow-hidden relative" id="gallery">
            {/* Static Background Image */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/Rectangle 20.png"
                    alt="Gallery Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                    sizes="100vw"
                />
            </div>

            {/* Soft Overlay for blending */}
            <div className="absolute inset-0 bg-[#FFFBF2]/30 -z-10" />

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative text-center mb-10 z-10"
            >
                {/* Curved Gold Line */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-[600px] h-32 pointer-events-none opacity-80">
                    <svg viewBox="0 0 400 100" fill="none" className="w-full h-full stroke-[#C5A038] stroke-[1px]">
                        <motion.path
                            d="M0 60 Q 150 10 200 50 T 400 40"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                <h2 className="text-5xl md:text-7xl font-arabic font-bold text-[#1a1a1a] relative inline-block">
                    {content.gallery_title || "تصفحي أحدث أعمال رواء"}
                    {/* Pink Sparkle on Title */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -top-4 -right-12 text-[#C5A038]"
                    >
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                    </motion.div>
                </h2>
                {/* English Subtitle */}
                <p className="mt-4 text-xl text-[#8B7355] font-script tracking-wide text-4xl">Gallery</p>
            </motion.div>

            {/* Collage Container */}
            <div className="relative w-full max-w-7xl mx-auto h-[800px] md:h-[1000px]">

                {/* Decorative background pearls */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.3, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl opacity-60"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-[#fff5e6] rounded-full blur-3xl opacity-50"
                />

                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A038]"></div>
                    </div>
                ) : (
                    <>
                        {/* Mobile Grid */}
                        <div className="grid grid-cols-2 gap-4 lg:hidden pb-10">
                            {galleryItems.map((item, i) => (
                                <motion.div
                                    key={item._id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white"
                                >
                                    <Image src={item.image} alt={item.title || "Gallery"} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Desktop Collage - First 8 Images Layout */}
                        <div className="hidden lg:block relative w-full h-full transform scale-90 xl:scale-100 origin-top">

                            {/* 1. Top Center - Beige Abaya */}
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute left-1/2 -translate-x-1/2 top-0 w-64 h-80 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-20 hover:scale-105 transition-transform duration-500"
                            >
                                <Image src={getImage(0)} alt="Gallery 1" fill className="object-cover" sizes="300px" />
                            </motion.div>

                            {/* 2. Top Left - Sewing Machine */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                animate={{ y: [0, -10, 0] }}
                                className="absolute left-[25%] top-[10%] w-60 h-60 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-10 hover:z-30 hover:rotate-2 transition-transform duration-500"
                                style={{ transition: "transform 0.5s, z-index 0s" }}
                            >
                                <Image src={getImage(1)} alt="Gallery 2" fill className="object-cover" sizes="300px" />
                            </motion.div>

                            {/* 3. Top Right - Two Women */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                animate={{ y: [0, -12, 0] }}
                                className="absolute right-[25%] top-[10%] w-60 h-80 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white z-10 hover:z-30 hover:-rotate-2 transition-transform duration-500"
                            >
                                <Image src={getImage(2)} alt="Gallery 3" fill className="object-cover" sizes="300px" />
                            </motion.div>

                            {/* 4. Left Middle - White Rack */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="absolute left-[15%] top-[35%] w-64 h-96 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-20 hover:scale-105 transition-transform duration-500"
                            >
                                <Image src={getImage(3)} alt="Gallery 4" fill className="object-cover" sizes="300px" />
                            </motion.div>

                            {/* 5. Right Middle - Haram Scene */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="absolute right-[15%] top-[35%] w-64 h-80 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-20 hover:scale-105 transition-transform duration-500"
                            >
                                <Image src={getImage(4)} alt="Gallery 5" fill className="object-cover" sizes="300px" />
                            </motion.div>

                            {/* 6. Bottom Left - Hands Cutting */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                animate={{ y: [0, -8, 0] }}
                                className="absolute left-[28%] bottom-[15%] w-60 h-60 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-30 hover:rotate-2 transition-transform duration-500"
                            >
                                <Image src={getImage(5)} alt="Gallery 6" fill className="object-cover" sizes="300px" />
                            </motion.div>

                            {/* 7. Bottom Center - Three Girls */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-64 h-96 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white z-40 hover:scale-105 transition-transform duration-500"
                            >
                                <Image src={getImage(6)} alt="Gallery 7" fill className="object-cover" sizes="300px" />
                            </motion.div>

                            {/* 8. Bottom Right - Clothes Rack */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                animate={{ y: [0, -10, 0] }}
                                className="absolute right-[28%] bottom-[15%] w-60 h-80 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-20 hover:-rotate-2 transition-transform duration-500"
                            >
                                <Image src={getImage(7)} alt="Gallery 8" fill className="object-cover" sizes="300px" />
                            </motion.div>

                            {/* Decorative Stars */}
                            <div className="absolute left-[10%] top-[25%] text-[#C5A038] animate-bounce delay-700">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                            </div>
                            <div className="absolute right-[10%] bottom-[10%] text-[#C5A038] animate-pulse">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

