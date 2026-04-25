"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";


// Available Lucide Icons to choose from
const ICON_OPTIONS = [
    "Sparkles", "Shirt", "Ruler", "Scissors", "Users", "Star",
    "CheckCircle2", "Clock", "ThumbsUp", "MessageCircle", "Heart", "Gem"
];

export default function NewServicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        shortDescription: "",
        fullDescription: "",
        iconName: "Sparkles",
        features: "",
        image: "",
        order: 0
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });

            if (!res.ok) throw new Error("Upload failed");

            const result = await res.json();
            setFormData(prev => ({ ...prev, image: result.url }));
        } catch (error) {
            alert("فشل رفع الصورة");
        } finally {
            setUploading(false);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        // Auto-generate slug from title
        // We use a simple replacement for Arabic support since slugify strict mode removes Arabic
        const slug = title.trim().toLowerCase().replace(/\s+/g, '-');
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug === "" || prev.slug === prev.title.trim().toLowerCase().replace(/\s+/g, '-') ? slug : prev.slug
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const featuresArray = formData.features.split('\n').filter(line => line.trim() !== "");

        const submitData = {
            ...formData,
            features: featuresArray
        };

        try {
            const res = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData),
            });

            if (res.ok) {
                router.push("/admin/services");
            } else {
                alert("فشل الحفظ");
            }
        } catch (error) {
            alert("Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/services" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                        <ArrowRight />
                    </Link>
                    <h1 className="text-3xl font-bold text-[#5A4A42] font-arabic">إضافة خدمة جديدة</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="block font-bold text-gray-700">صورة الخدمة</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#C5A038] transition-colors relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {uploading ? (
                                <div className="flex flex-col items-center gap-2 text-[#C5A038]">
                                    <Loader2 className="animate-spin" />
                                    <span>جاري الرفع...</span>
                                </div>
                            ) : formData.image ? (
                                <div className="relative h-64 w-full rounded-xl overflow-hidden">
                                    <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                                        <span>تغيير الصورة</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3 text-gray-400">
                                    <div className="relative w-32 h-32 mb-2 opacity-50">
                                        <Image
                                            src="https://placehold.co/400x400/EEE/999?text=Service+Image"
                                            alt="Placeholder"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <Upload size={40} />
                                    <span>اسحب الصورة هنا أو اضغط للاختيار</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">عنوان الخدمة</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleTitleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                                placeholder="مثال: خياطة فساتين"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">الرابط (Slug)</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none font-mono text-left"
                                placeholder="dress-sewing"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">الأيقونة</label>
                            <select
                                value={formData.iconName}
                                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none bg-white"
                            >
                                {ICON_OPTIONS.map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">الترتيب</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 mb-2">وصف مختصر (للبطاقة)</label>
                        <textarea
                            rows={3}
                            required
                            value={formData.shortDescription}
                            onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none resize-none"
                            placeholder="وصف قصير يظهر في الصفحة الرئيسية..."
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 mb-2">وصف كامل (للصفحة التفصيلية)</label>
                        <textarea
                            rows={6}
                            required
                            value={formData.fullDescription}
                            onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none resize-none"
                            placeholder="شرح مفصل عن الخدمة..."
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 mb-2">المميزات (ميزة في كل سطر)</label>
                        <textarea
                            rows={5}
                            value={formData.features}
                            onChange={e => setFormData({ ...formData, features: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none resize-none"
                            placeholder="- دقة عالية&#10;- تسليم سريع&#10;- أسعار منافسة"
                        />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" disabled={loading || !formData.image} className="w-full py-4 text-lg">
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : "حفظ ونشر"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
