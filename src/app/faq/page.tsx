"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { getInquiryWhatsAppUrl } from "@/lib/constants";

const faqs = [
    {
        question: "كيف يمكنني طلب خدمة؟",
        answer: "يمكنك طلب الخدمة بسهولة عن طريق اختيار الخدمة المناسبة من صفحة الخدمات، ثم النقر على زر 'طلب الخدمة' للتواصل معنا عبر الواتساب لتأكيد التفاصيل والمقاسات."
    },
    {
        question: "هل يوجد خدمة توصيل؟",
        answer: "نعم، نوفر خدمة استلام وتسليم الملابس من باب المنزل لراحتكم في جميع مناطق المملكة. المندوب سيصل إليكِ لاستلام الملابس وإعادتها بعد الإنتهاء."
    },
    {
        question: "كم تستغرق عملية الخياطة أو التعديل؟",
        answer: "تعتمد المدة على نوع الخدمة وضغط العمل وحجم التعديلات المطلوبة. عادةً ما تستغرق التعديلات البسيطة 2-3 أيام، بينما قد تستغرق الأعمال الكبيرة 5-7 أيام. سنخبركِ بالموعد المحدد عند الاستلام."
    },
    {
        question: "هل يمكنني التعديل على تصميم جاهز؟",
        answer: "بالتأكيد! نحن متخصصون في التعديلات الدقيقة، تقصير، تضييق، توسيع، أو حتى إعادة تدوير القطع لتناسب ذوقك ومقاسك الجديد تمامًا."
    },
    {
        question: "ما هي طرق الدفع المتاحة؟",
        answer: "نتيح الدفع نقدًا عند الاستلام، أو عبر التحويل البنكي، أو من خلال روابط الدفع الإلكتروني لراحتكم."
    },
    
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF2] pt-28 pb-20" dir="rtl">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 bg-[#C5A038]/10 text-[#C5A038] rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <HelpCircle size={32} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-arabic font-bold text-[#5A4A42]"
                    >
                        الأسئلة الشائعة
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg"
                    >
                        إليكِ إجابات على أكثر الأسئلة شيوعاً حول خدماتنا وعملية الطلب.
                    </motion.p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm border border-[#C5A038]/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A038]/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C5A038]/5 rounded-tr-full -ml-16 -mb-16 pointer-events-none" />

                    <h3 className="text-2xl font-bold text-[#5A4A42] mb-4">لم تجدي إجابة لسؤالك؟</h3>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        فريق خدمة العملاء جاهز للإجابة على جميع استفساراتك عبر الواتساب طوال أيام الأسبوع.
                    </p>
                    <a
                        href={getInquiryWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-1"
                    >
                        <MessageCircle size={20} />
                        تحدثي معنا الآن
                    </a>
                </motion.div>
            </div>
        </main>
    );
}

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-[#C5A038] shadow-md" : "border-gray-100 shadow-sm hover:border-[#C5A038]/50"
                }`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-right"
            >
                <span className={`font-bold text-lg transition-colors ${isOpen ? "text-[#C5A038]" : "text-[#5A4A42]"}`}>
                    {faq.question}
                </span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-[#C5A038] text-white" : "bg-gray-100 text-gray-400"
                    }`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
