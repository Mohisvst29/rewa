"use client";

import Link from "next/link";
import { BookOpen, Image as ImageIcon, Layers, LayoutGrid, Settings, Scissors, Search, Star } from "lucide-react";

export default function AdminDashboard() {
    const cards = [
        {
            title: "إدارة المجموعة",
            description: "إضافة وتعديل وحذف منتجات المجموعة",
            icon: <Layers size={32} />,
            href: "/admin/collections",
            color: "bg-blue-50 text-blue-600 border-blue-100"
        },
        {
            title: "إدارة المدونة",
            description: "كتابة ونشر المقالات والأخبار",
            icon: <BookOpen size={32} />,
            href: "/admin/blog",
            color: "bg-green-50 text-green-600 border-green-100"
        },
        {
            title: "معرض الصور",
            description: "إدارة صور المعرض العام",
            icon: <LayoutGrid size={32} />,
            href: "/admin/gallery",
            color: "bg-purple-50 text-purple-600 border-purple-100"
        },
        {
            title: "إدارة الخدمات",
            description: "تعديل قسم الخدمات المعروضة",
            icon: <Scissors size={32} />,
            href: "/admin/services",
            color: "bg-pink-50 text-pink-600 border-pink-100"
        },
        {
            title: "صور الموقع",
            description: "تغيير صور الهيرو والأقسام الرئيسية",
            icon: <ImageIcon size={32} />,
            href: "/admin/content",
            color: "bg-amber-50 text-amber-600 border-amber-100"
        },
        {
            title: "إعدادات SEO",
            description: "ضبط عناوين ووصف الموقع لمحركات البحث",
            icon: <Search size={32} />,
            href: "/admin/seo",
            color: "bg-teal-50 text-teal-600 border-teal-100"
        },
        {
            title: "التقييمات",
            description: "إدارة تقييمات وآراء العملاء",
            icon: <Star size={32} />,
            href: "/admin/reviews",
            color: "bg-orange-50 text-orange-600 border-orange-100"
        },
    ];

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-[#5A4A42] font-arabic mb-4">لوحة التحكم</h1>
                    <p className="text-gray-500">أهلاً بك في لوحة تحكم خياطة رواء. اختر قسماً للبدء.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <Link href={card.href} key={index}>
                            <div className={`
                                h-full p-8 rounded-[2rem] border transition-all duration-300
                                ${card.color} hover:shadow-xl hover:-translate-y-1 bg-white
                            `}>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-sm border border-gray-50`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800">{card.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {card.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

