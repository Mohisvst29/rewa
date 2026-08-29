"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, ArrowRight, Plus } from "lucide-react";
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
        images: ["", "", ""], // 3 additional images
    });

    const [uploadingIndex, setUploadingIndex] = useState<number | 'main' | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: 'main' | number) => {
        if (!e.target.files?.[0]) return;

        setUploadingIndex(index);
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
            
            if (index === 'main') {
                setFormData(prev => ({ ...prev, image: result.url }));
            } else {
                const newImages = [...formData.images];
                newImages[index] = result.url;
                setFormData(prev => ({ ...prev, images: newImages }));
            }
        } catch (error) {
            alert("فشل رفع الصورة");
        } finally {
            setUploadingIndex(null);
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
                    {/* Images Section */}
                    <div className="space-y-4">
                        <label className="block font-bold text-gray-700">صور المنتج (حتى 4 صور)</label>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Main Image */}
                            <div className="md:col-span-2 relative aspect-square border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden hover:border-[#C5A038] transition-colors group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'main')}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                {uploadingIndex === 'main' ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#C5A038] bg-white/80">
                                        <Loader2 className="animate-spin" />
                                        <span className="text-sm">جاري الرفع...</span>
                                    </div>
                                ) : formData.image ? (
                                    <div className="relative w-full h-full">
                                        <Image src={formData.image} alt="Main" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white text-sm font-bold">تغيير الصورة الرئيسية</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                                        <Upload size={32} />
                                        <span className="text-xs">الصورة الرئيسية</span>
                                    </div>
                                )}
                            </div>

                            {/* Additional Images */}
                            <div className="md:col-span-2 grid grid-cols-3 md:grid-cols-1 gap-2">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square md:aspect-auto md:h-[calc((100%-1rem)/3)] border-2 border-dashed border-gray-200 rounded-xl overflow-hidden hover:border-[#C5A038] transition-colors group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, idx)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        {uploadingIndex === idx ? (
                                            <div className="absolute inset-0 flex items-center justify-center text-[#C5A038] bg-white/80">
                                                <Loader2 className="animate-spin size-4" />
                                            </div>
                                        ) : img ? (
                                            <div className="relative w-full h-full">
                                                <Image src={img} alt={`Extra ${idx}`} fill className="object-cover" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Upload size={16} className="text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full gap-1 text-gray-400">
                                                <Plus size={20} />
                                                <span className="text-[10px]">صورة {idx + 2}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
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
                        <Button type="submit" disabled={loading || !formData.image || uploadingIndex !== null} className="w-full py-4 text-lg">
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : "حفظ ونشر"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
