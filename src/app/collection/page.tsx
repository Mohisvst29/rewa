"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Share2, Heart, MessageCircle, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getOrderWhatsAppUrl, WHATSAPP_NUMBER } from "@/lib/constants";


// Removed Mock Data

const categories = [
    { id: "all", label: "الكل" },
    { id: "ihram", label: "إحرامات عمرة وحج" },
    { id: "prayer_ihram", label: "إحرامات صلاة" },
    { id: "jalabiya", label: "خياطة جلابيات" },
    { id: "uniform", label: "زي موحد(مراييل)" },
    { id: "alteration", label: "تعديلات" },
    { id: "women", label: "خياطة نسائية شاملة" },
];

export default function CollectionPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [collectionItems, setCollectionItems] = useState<any[]>([]); // Using any for simplicity or define interface
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch('/api/collection');
                if (res.ok) {
                    const data = await res.json();
                    setCollectionItems(data);
                }
            } catch (error) {
                console.error("Failed to fetch collection items", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const filteredItems = activeCategory === "all"
        ? collectionItems
        : collectionItems.filter(item => item.category === activeCategory);


    return (
        <main className="min-h-screen pt-24 bg-[#FFFBF2]" dir="rtl">

            {/* Hero Section */}
            <section className="relative px-4 md:px-8 text-center pb-16 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gold-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"
                />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-[#8B6F21] font-bold tracking-[0.2em] text-sm uppercase mb-4 block"
                    >
                        معرض أعمالنا
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-7xl font-arabic font-bold text-[#5A4A42] mb-6"
                    >
                        تشكيلة <span className="text-[#C5A038] relative inline-block">
                            فريدة
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#C5A038]/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span> من إبداعنا
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                    >
                        تصفحي أحدث أعمالنا في الخياطة والتفصيل، حيث تلتقي دقة التنفيذ مع جمال التصميم لنقدم لكِ قطعاً تليق بتميزك.
                    </motion.p>
                </div>
            </section>

            {/* Content Wrapper for Sticky Filter */}
            <div className="relative min-h-[100vh]">
                {/* Filter Tabs */}
                <section className="px-4 md:px-8 mb-8 md:mb-16 sticky top-24 md:top-28 z-40 py-2 md:py-4 transition-all" id="filter-section">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-1.5 md:p-3 rounded-[2rem] md:rounded-full shadow-sm border border-white/50 ring-1 ring-gray-100">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`
                                    relative px-3 py-1.5 md:px-6 md:py-2.5 rounded-full font-medium transition-colors duration-300 text-xs md:text-base cursor-pointer
                                    ${activeCategory === cat.id ? "text-white" : "text-gray-500 hover:text-[#C5A038]"}
                                `}
                            >
                                {activeCategory === cat.id && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-[#C5A038] rounded-full shadow-lg shadow-[#C5A038]/30"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="px-4 md:px-8 pb-32 max-w-[1600px] mx-auto min-h-[600px]">
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden bg-white shadow-sm hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 group-hover:border-[#C5A038]/30">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Hover Content */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <span className="text-[#FAEED1] text-xs font-bold uppercase tracking-widest mb-3 block">
                                                        {categories.find(c => c.id === item.category)?.label}
                                                    </span>
                                                    <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-[#C5A038] hover:border-[#C5A038] transition-colors duration-300">
                                                    <ArrowRight size={20} className="transform rotate-180" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 px-2">
                                        <div className="flex justify-between items-center opacity-100 group-hover:opacity-50 transition-opacity duration-300">
                                            <h3 className="text-[#5A4A42] font-bold text-lg">{item.title}</h3>
                                            <p className="text-gray-400 text-sm">{categories.find(c => c.id === item.category)?.label}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredItems.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32"
                        >
                            <p className="text-gray-400 text-xl font-medium">لا توجد عناصر في هذا التصنيف حالياً.</p>
                        </motion.div>
                    )}
                </section>
            </div>

            {/* Item Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                    >
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setSelectedItem(null)}
                        />
                        <motion.div
                            layoutId={`item-${selectedItem.id}`}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                            className="bg-white rounded-[3rem] w-full max-w-6xl h-[85vh] md:h-[650px] overflow-hidden relative z-10 shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 left-6 z-20 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-800 transition-all hover:scale-110 shadow-lg backdrop-blur-md"
                            >
                                <X size={24} />
                            </button>

                            {/* Image (Left on RTL desktop) */}
                            <div className="w-full md:w-1/2 h-[40%] md:h-full relative bg-gray-100">
                                <Image
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
                            </div>

                            {/* Content Details */}
                            <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto bg-white flex flex-col justify-center relative">
                                {/* Decorative BG Icon */}
                                <Star className="absolute top-10 left-10 text-[#C5A038]/5 w-64 h-64 -rotate-12 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-4 py-1.5 bg-[#FFF8E7] text-[#C5A038] text-sm font-bold rounded-full border border-[#C5A038]/20">
                                            {categories.find(c => c.id === selectedItem.category)?.label}
                                        </span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-[#C5A038] text-[#C5A038]" />)}
                                        </div>
                                    </div>

                                    <h2 className="text-3xl md:text-5xl font-arabic font-bold text-[#5A4A42] mb-6 leading-tight">{selectedItem.title}</h2>
                                    <p className="text-gray-500 text-lg leading-relaxed mb-8">{selectedItem.description}</p>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                            <span className="font-medium">جودة تنفيذ عالية</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                            <span className="font-medium">أقمشة فاخرة</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                            <span className="font-medium">خياطة دقيقة</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                            <span className="font-medium">تسليم في الوقت</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <a
                                            href={selectedItem ? getOrderWhatsAppUrl(selectedItem.title, categories.find(c => c.id === selectedItem.category)?.label, window.location.origin + selectedItem.image) : '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-[#25D366] hover:bg-[#1da851] text-white text-center py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1 relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                <MessageCircle size={24} fill="white" className="stroke-none" />
                                                اطلبي هذا التصميم عبر واتساب
                                            </span>
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </a>

                                        <div className="flex gap-4">
                                            <button className="flex-1 border-2 border-gray-100 hover:border-[#C5A038] text-gray-500 hover:text-[#C5A038] hover:bg-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group">
                                                <Heart size={20} className="group-hover:scale-110 transition-transform" />
                                                <span>حفظ</span>
                                            </button>
                                            <button className="flex-1 border-2 border-gray-100 hover:border-[#C5A038] text-gray-500 hover:text-[#C5A038] hover:bg-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group">
                                                <Share2 size={20} className="group-hover:scale-110 transition-transform" />
                                                <span>مشاركة</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </main>
    );
}
