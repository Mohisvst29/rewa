"use client";

import { useState, useEffect, use } from "react";
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

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        shortDescription: "",
        fullDescription: "",
        iconName: "Sparkles",
        features: "",
        image: "",
        order: 0,
        duration: "",
        pricing: "",
        showPricing: false
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(`/api/services/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        ...data,
                        features: Array.isArray(data.features) ? data.features.join('\n') : data.features || ""
                    });
                } else {
                    alert("Service not found");
                    router.push("/admin/services");
                }
            } catch (error) {
                console.error("Error fetching service:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id, router]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const featuresArray = formData.features.split('\n').filter(line => line.trim() !== "");

        const submitData = {
            ...formData,
            features: featuresArray
        };

        try {
            const res = await fetch(`/api/services/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData),
            });

            if (res.ok) {
                router.push("/admin/services");
            } else {
                alert("فشل التحديث");
            }
        } catch (error) {
            alert("Error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#C5A038]" size={40} /></div>;

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/services" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                        <ArrowRight />
                    </Link>
                    <h1 className="text-3xl font-bold text-[#5A4A42] font-arabic">تعديل الخدمة</h1>
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
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
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

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="font-bold text-[#5A4A42] mb-4 text-lg">تفاصيل إضافية</h3>

                        <div className="flex items-center gap-3 mb-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.showPricing}
                                    onChange={e => setFormData({ ...formData, showPricing: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C5A038]/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A038]"></div>
                            </label>
                            <span className="text-gray-700 font-medium">عرض تفاصيل السعر والمدة للعملاء</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-bold text-gray-700 mb-2">المدة المقدرة</label>
                                <input
                                    type="text"
                                    value={formData.duration || ""}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                                    placeholder="مثال: 3-5 أيام"
                                />
                            </div>
                            <div>
                                <label className="block font-bold text-gray-700 mb-2">السعر (نصي)</label>
                                <input
                                    type="text"
                                    value={formData.pricing || ""}
                                    onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                                    placeholder="مثال: يبدأ من 150 ريال"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" disabled={saving || !formData.image} className="w-full py-4 text-lg">
                            {saving ? <Loader2 className="animate-spin mx-auto" /> : "حفظ التغييرات"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
