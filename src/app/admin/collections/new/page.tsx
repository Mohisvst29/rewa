"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function NewCollectionItem() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "jalabiya",
        image: "",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/collections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
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
                    <Link href="/admin/dashboard" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                        <ArrowRight />
                    </Link>
                    <h1 className="text-3xl font-bold text-[#5A4A42] font-arabic">إضافة عنصر جديد</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="block font-bold text-gray-700">صورة العرض</label>
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
                                            src="https://placehold.co/400x400/EEE/999?text=Image+Place"
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
                            <label className="block font-bold text-gray-700 mb-2">عنوان التصميم</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                                placeholder="مثال: جلابية ملكية"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">التصنيف</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none bg-white"
                            >
                                <option value="ihram">إحرامات عمرة وحج</option>
                                <option value="prayer_ihram">إحرامات صلاة</option>
                                <option value="jalabiya">خياطة جلابيات</option>
                                <option value="uniform">زي موحد(مراييل)</option>
                                <option value="alteration">تعديلات</option>
                                <option value="women">خياطة نسائية شاملة</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 mb-2">الوصف</label>
                        <textarea
                            rows={4}
                            required
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none resize-none"
                            placeholder="اكتبي وصفاً جذاباً للتصميم..."
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
