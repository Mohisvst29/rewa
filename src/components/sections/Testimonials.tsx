"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Star, Quote, MessageSquarePlus, X, Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface Review {
    _id: string;
    name: string;
    text: string;
    rating: number;
}

export function Testimonials() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/api/reviews');
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error("Failed to fetch reviews");
            }
        };

        fetchReviews();
    }, []);

    // Create a duplicated list for infinite seamless scrolling
    const duplicatedReviews = [...reviews, ...reviews, ...reviews];

    return (
        <section className="py-24 bg-white relative overflow-hidden" dir="rtl" id="testimonials" ref={containerRef}>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A038]/5 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFF8E7] rounded-full blur-3xl -ml-20 -mb-20" />

            {/* Header */}
            <div className="text-center mb-16 px-4 relative z-10">
                <span className="text-[#8B6F21] font-bold tracking-widest text-sm uppercase mb-3 block">آراء عملائنا</span>
                <h2 className="text-4xl md:text-5xl font-arabic font-bold text-[#5A4A42] mb-6">
                    ماذا قالوا عن <span className="text-[#C5A038]">رواء</span>
                </h2>
                <div className="flex justify-center items-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={24} fill="#C5A038" className="text-[#C5A038]" />
                    ))}
                </div>

                <Button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 bg-[#5A4A42] hover:bg-[#433b37] text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                    <MessageSquarePlus size={20} />
                    <span>أضيفي تقييمك</span>
                </Button>
            </div>

            {/* Infinite Scrolling Slider */}
            <div className="relative w-full overflow-hidden py-10 select-none" dir="ltr">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

                {reviews.length > 0 ? (
                    <div
                        className="flex w-max items-center gap-8 hover:pause"
                        style={{
                            animation: "marquee 40s linear infinite",
                        }}
                        onMouseEnter={(e) => {
                            const target = e.currentTarget;
                            target.style.animationPlayState = "paused";
                        }}
                        onMouseLeave={(e) => {
                            const target = e.currentTarget;
                            target.style.animationPlayState = "running";
                        }}
                    >
                        {/* First Copy */}
                        <div className="flex gap-8 shrink-0">
                            {reviews.map((review, index) => (
                                <TestimonialCard key={`a-${review._id}-${index}`} testimonial={review} />
                            ))}
                        </div>
                        {/* Second Copy (for seamless loop) */}
                        <div className="flex gap-8 shrink-0">
                            {reviews.map((review, index) => (
                                <TestimonialCard key={`b-${review._id}-${index}`} testimonial={review} />
                            ))}
                        </div>
                        {/* Third Copy (extra safety for wide screens) */}
                        <div className="flex gap-8 shrink-0">
                            {reviews.map((review, index) => (
                                <TestimonialCard key={`c-${review._id}-${index}`} testimonial={review} />
                            ))}
                        </div>
                        {/* Fourth Copy (extra safety) */}
                        <div className="flex gap-8 shrink-0">
                            {reviews.map((review, index) => (
                                <TestimonialCard key={`d-${review._id}-${index}`} testimonial={review} />
                            ))}
                        </div>
                    </div>
                ) : (
                    !loading && (
                        <div className="flex justify-center text-gray-400 py-10 relative z-10" dir="rtl">
                            <p>لا توجد تقييمات بعد، كوني أول من يقيمنا!</p>
                        </div>
                    )
                )}

                {loading && (
                    <div className="flex justify-center py-10 relative z-10">
                        <Loader2 className="animate-spin text-[#C5A038]" size={32} />
                    </div>
                )}

                <style jsx>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-25%); } /* Based on 4 copies, move 1 full set (1/4 = 25%) */
                    }
                `}</style>
            </div>

            {/* Review Form Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <ReviewForm onClose={() => setIsFormOpen(false)} />
                )}
            </AnimatePresence>
        </section>
    );
}

function TestimonialCard({ testimonial }: { testimonial: Review }) {
    return (
        <div
            className="w-[350px] md:w-[450px] bg-[#FFFBF2] p-8 rounded-[2rem] relative border border-[#C5A038]/10 shadow-sm hover:shadow-md transition-all shrink-0 select-none"
        >
            <Quote className="absolute top-6 left-6 text-[#C5A038]/20 w-10 h-10" />

            <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={i < testimonial.rating ? "fill-[#C5A038] text-[#C5A038]" : "text-gray-300"}
                    />
                ))}
            </div>

            <p className="text-[#5A4A42] leading-relaxed mb-6 font-medium relative z-10 text-lg line-clamp-4 min-h-[5rem]">
                "{testimonial.text}"
            </p>

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C5A038]/10 flex items-center justify-center text-[#C5A038] font-bold text-xl border border-[#C5A038]/20">
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-[#5A4A42]">{testimonial.name}</h4>
                    <span className="text-sm text-[#8B7355]">عميلة مميزة</span>
                </div>
            </div>
        </div>
    );
}

function ReviewForm({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, rating, text }),
            });

            if (res.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                alert("حدث خطأ، يرجى المحاولة لاحقاً");
                setStatus('idle');
            }
        } catch (error) {
            console.error(error);
            setStatus('idle');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 left-6 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 p-2 rounded-full"
                >
                    <X size={24} />
                </button>

                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6"
                        >
                            <CheckCircle size={40} />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-[#5A4A42] mb-2">شكراً لتقييمك!</h3>
                        <p className="text-gray-500">سيتم مراجعة تقييمك ونشره قريباً.</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-[#5A4A42] font-arabic mb-2">شاركينا تجربتك</h3>
                            <p className="text-gray-500 text-sm">رأيك يهمنا ويساعدنا على التطور</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 text-right">
                            <div className="flex justify-center gap-2 mb-2" dir="ltr">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`transition-transform hover:scale-110 focus:outline-none ${star <= rating ? "text-[#C5A038]" : "text-gray-200"}`}
                                    >
                                        <Star size={32} fill={star <= rating ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>
                            <p className="text-center text-sm font-medium text-[#C5A038] mb-6">
                                {rating === 5 ? "ممتاز" : rating === 4 ? "جيد جداً" : rating === 3 ? "جيد" : rating === 2 ? "مقبول" : "سيء"}
                            </p>

                            <div>
                                <label className="block text-sm font-bold text-[#5A4A42] mb-2 pr-2">الاسم</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#C5A038] focus:ring-4 focus:ring-[#C5A038]/10 outline-none transition-all text-right"
                                    placeholder="اسمك الكريم"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#5A4A42] mb-2 pr-2">التقييم</label>
                                <textarea
                                    required
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    className="w-full p-4 h-32 rounded-xl border border-gray-200 focus:border-[#C5A038] focus:ring-4 focus:ring-[#C5A038]/10 outline-none transition-all text-right resize-none"
                                    placeholder="اكتبي تفاصيل تجربتك معنا..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                {status === 'submitting' ? <Loader2 className="animate-spin mx-auto" /> : "إرسال التقييم"}
                            </Button>
                        </form>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}
