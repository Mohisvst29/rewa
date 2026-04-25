"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, RefreshCw, AlertCircle, Clock, CheckCircle2 } from "lucide-react";

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF2] pt-24 pb-20" dir="rtl">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-20 h-20 bg-[#FFF8E7] rounded-full flex items-center justify-center mx-auto mb-6 text-[#C5A038] shadow-sm border border-[#C5A038]/20"
                    >
                        <RefreshCw size={40} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-arabic font-bold text-[#5A4A42] mb-6"
                    >
                        سياسة الإستبدال والإسترجاع
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
                    >
                        نحن في رواء نحرص على رضاكم التام عن خدماتنا ومنتجاتنا. نوضح لكم أدناه الشروط والأحكام المتعلقة بعملية الإستبدال والإسترجاع لضمان حقوقكم.
                    </motion.p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* General Policy */}
                    <PolicySection
                        title="شروط عامة"
                        icon={FileText}
                        delay={0.3}
                    >
                        <ul className="space-y-4 text-gray-600 leading-relaxed list-disc list-inside marker:text-[#C5A038]">
                            <li>يجب أن تكون القطعة بحالتها الأصلية ولم يتم استخدامها أو غسلها أو كيّها.</li>
                            <li>يجب وجود فاتورة الشراء الأصلية أو إثبات الدفع.</li>
                            <li>يشمل الاستبدال والاسترجاع الأخطاء المصنعية أو وجود عيب واضح في القماش أو الخياطة من طرفنا.</li>
                        </ul>
                    </PolicySection>

                    {/* Return Period */}
                    <PolicySection
                        title="المدة الزمنية"
                        icon={Clock}
                        delay={0.4}
                    >
                        <ul className="space-y-4 text-gray-600 leading-relaxed list-disc list-inside marker:text-[#C5A038]">
                            <li>يمكن طلب <strong>الاسترجاع</strong> خلال يوم  من تاريخ استلام الطلب.</li>
                            <li>يمكن طلب <strong>الاستبدال</strong> خلال 3 أيام من تاريخ استلام الطلب.</li>
                            <li>في حال التفصيل الخاص (تصميم حسب الطلب)، لا يمكن استرجاع المبلغ إلا في حال وجود عيب مصنعي أو مخالفة واضحة للمواصفات المتفق عليها.</li>
                        </ul>
                    </PolicySection>

                    {/* Non-returnable Items */}
                    <PolicySection
                        title="حالات لا تشمل الإستبدال أو الإسترجاع"
                        icon={AlertCircle}
                        delay={0.5}
                    >
                        <ul className="space-y-4 text-gray-600 leading-relaxed list-disc list-inside marker:text-[#C5A038]">
                            <li>القطع التي تم تفصيلها بمقاسات خاصة بناءً على طلب العميل (إلا في حال وجود خطأ في التنفيذ).</li>
                            <li>القطع التي تعرضت لسوء استخدام أو تلف ناتج عن العميل.</li>
                            <li>الطلبات المستعجلة التي تم البدء في تنفيذها لا يمكن إلغاؤها بعد مرور 24 ساعة.</li>
                        </ul>
                    </PolicySection>

                    {/* Process */}
                    <PolicySection
                        title="طريقة تقديم الطلب"
                        icon={CheckCircle2}
                        delay={0.6}
                    >
                        <p className="text-gray-600 leading-relaxed mb-4">
                            لتقديم طلب استبدال أو استرجاع، يرجى التواصل معنا عبر واتساب خدمة العملاء مع إرفاق:
                        </p>
                        <ul className="space-y-2 text-gray-600 list-disc list-inside marker:text-[#C5A038]">
                            <li>رقم الطلب / صورة الفاتورة.</li>
                            <li>صورة واضحة للمنتج توضح سبب الاسترجاع (في حال وجود عيب).</li>
                        </ul>
                    </PolicySection>
                </div>
            </div>
        </main>
    );
}

function PolicySection({ title, children, icon: Icon, delay }: { title: string, children: React.ReactNode, icon: any, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex items-center gap-4 mb-6 border-b border-gray-50 pb-4">
                <div className="w-12 h-12 bg-[#FFF8E7] rounded-xl flex items-center justify-center text-[#C5A038]">
                    <Icon size={24} />
                </div>
                <h2 className="text-2xl font-bold text-[#5A4A42]">{title}</h2>
            </div>
            <div className="pr-4">
                {children}
            </div>
        </motion.div>
    );
}
