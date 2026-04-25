"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SEOSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        titleSuffix: "",
        description: "",
        keywords: "",
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/seo");
                if (res.ok) {
                    const data = await res.json();
                    setSettings(data);
                }
            } catch (error) {
                console.error("Failed to fetch SEO settings");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/seo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                alert("تم حفظ إعدادات المحركات بنجاح");
            } else {
                alert("حدث خطأ أثناء الحفظ");
            }
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء الحفظ");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#C5A038]" size={40} /></div>;

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <Link href="/admin/dashboard" className="text-gray-400 hover:text-[#C5A038] mb-2 inline-flex items-center gap-2 transition-colors">
                            <ArrowRight size={16} />
                            <span>العودة للوحة التحكم</span>
                        </Link>
                        <h1 className="text-4xl font-bold text-[#5A4A42] font-arabic mt-2">إعدادات محركات البحث (SEO)</h1>
                    </div>
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-[#C5A038]">
                        <Search size={32} />
                    </div>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-[#5A4A42] font-bold mb-3 text-lg">لاحقة عنوان الموقع (Title Suffix)</label>
                            <p className="text-gray-400 text-sm mb-3">النص الذي يظهر بجانب اسم الصفحة في عنوان المتصفح. مثال: " | خياطة رواء"</p>
                            <input
                                type="text"
                                name="titleSuffix"
                                value={settings.titleSuffix}
                                onChange={handleChange}
                                placeholder="مثال: | خياطة رواء"
                                className="w-full h-14 px-6 rounded-xl border border-gray-200 focus:border-[#C5A038] focus:ring-4 focus:ring-[#C5A038]/10 outline-none transition-all text-right"
                            />
                        </div>

                        <div>
                            <label className="block text-[#5A4A42] font-bold mb-3 text-lg">وصف الموقع الافتراضي (Default Description)</label>
                            <p className="text-gray-400 text-sm mb-3">الوصف الذي يظهر في نتائج البحث للصفحات التي ليس لها وصف مخصص.</p>
                            <textarea
                                name="description"
                                value={settings.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="اكتبي وصفاً جذاباً للموقع..."
                                className="w-full p-6 rounded-xl border border-gray-200 focus:border-[#C5A038] focus:ring-4 focus:ring-[#C5A038]/10 outline-none transition-all text-right resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-[#5A4A42] font-bold mb-3 text-lg">الكلمات المفتاحية العامة (Keywords)</label>
                            <p className="text-gray-400 text-sm mb-3">افصلي بين الكلمات بفاصلة (,). مثال: خياطة, فساتين, جلابيات, الدمام</p>
                            <input
                                type="text"
                                name="keywords"
                                value={settings.keywords}
                                onChange={handleChange}
                                placeholder="خياطة, تصميم أزياء, فساتين..."
                                className="w-full h-14 px-6 rounded-xl border border-gray-200 focus:border-[#C5A038] focus:ring-4 focus:ring-[#C5A038]/10 outline-none transition-all text-right"
                            />
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <Button type="submit" disabled={saving} className="px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                                {saving ? <Loader2 className="animate-spin" /> : <div className="flex items-center gap-2"><Save size={20} /><span>حفظ الإعدادات</span></div>}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
