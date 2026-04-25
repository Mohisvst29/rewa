"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Upload, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ContentItem {
    key: string;
    value: string;
    label: string;
    type: string;
}

const DEFAULT_SECTIONS = [
    { key: "hero_bg", label: "صورة خلفية الهيرو (Hero Background)", type: "image" },
    { key: "hero_main", label: "صورة الهيرو الرئيسية (Hero Main Image)", type: "image" },
    { key: "about_image", label: "صورة قسم من نحن (About Section Image)", type: "image" },
    { key: "hero_subtitle", label: "نص الهيرو (Hero Subtitle)", type: "text" },
    { key: "services_subtitle", label: "نص الخدمات (Services Subtitle)", type: "text" },
    { key: "gallery_title", label: "عنوان المعرض (Gallery Title)", type: "text" },
];

export default function SiteContentAdmin() {
    const [contents, setContents] = useState<Record<string, ContentItem>>({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState<string | null>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/site-content");
            const data = await res.json();
            const contentMap: Record<string, ContentItem> = {};
            data.forEach((item: ContentItem) => {
                contentMap[item.key] = item;
            });
            setContents(contentMap);
        } catch (error) {
            console.error("Failed to fetch content");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(key);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            // 1. Upload Image
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (!uploadRes.ok) throw new Error("Upload failed");
            const { url } = await uploadRes.json();

            // 2. Save URl to SiteContent
            const label = DEFAULT_SECTIONS.find(s => s.key === key)?.label || key;
            const saveRes = await fetch("/api/site-content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, value: url, label, type: "image" }),
            });

            if (saveRes.ok) {
                setContents(prev => ({
                    ...prev,
                    [key]: { key, value: url, label, type: "image" }
                }));
            }
        } catch (error) {
            alert("فشل تحديث الصورة");
        } finally {
            setUploading(null);
        }
    };

    const handleTextSave = async (key: string, value: string) => {
        setUploading(key);
        try {
            const label = DEFAULT_SECTIONS.find(s => s.key === key)?.label || key;
            const res = await fetch("/api/site-content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, value, label, type: "text" }),
            });

            if (res.ok) {
                setContents(prev => ({
                    ...prev,
                    [key]: { key, value, label, type: "text" }
                }));
                // Show success feedback (optional)
            }
        } catch (error) {
            alert("فشل تحديث النص");
        } finally {
            setUploading(null);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#C5A038]" /></div>;

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/admin/dashboard" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm transition-all hover:scale-110">
                        <ArrowRight />
                    </Link>
                    <h1 className="text-4xl font-bold text-[#5A4A42] font-arabic">إدارة محتوى الموقع</h1>
                </div>

                <div className="grid gap-8">
                    {DEFAULT_SECTIONS.map((section) => {
                        const contentItem = contents[section.key];
                        const currentVal = contentItem?.value || "";

                        return (
                            <div key={section.key} className="bg-white rounded-[2rem] p-8 shadow-md border border-gray-100/50">
                                <h3 className="text-xl font-bold text-[#5A4A42] mb-6 border-b border-gray-100 pb-4">{section.label}</h3>

                                {section.type === 'image' ? (
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        {/* Preview */}
                                        <div className="relative w-full md:w-1/2 aspect-video bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center group">
                                            {currentVal ? (
                                                <Image
                                                    src={currentVal}
                                                    alt={section.label}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="text-gray-400 flex flex-col items-center">
                                                    <Image
                                                        src="https://placehold.co/600x400/EEE/999?text=No+Image"
                                                        alt="Placeholder"
                                                        width={100}
                                                        height={100}
                                                        className="opacity-50 mb-2"
                                                    />
                                                    <span>لا توجد صورة</span>
                                                </div>
                                            )}

                                            {uploading === section.key && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white backdrop-blur-sm">
                                                    <Loader2 className="animate-spin" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="w-full md:w-1/2 space-y-4">
                                            <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                <p className="font-bold mb-1 text-blue-700">تعليمات:</p>
                                                <ul className="list-disc list-inside space-y-1">
                                                    <li>يفضل استخدام صور عالية الدقة (WebP أو JPG).</li>
                                                    <li>حجم الملف أقل من 2 ميجابايت لسرعة التحميل.</li>
                                                    <li>سيتم تحديث الصورة فوراً في الموقع.</li>
                                                </ul>
                                            </div>

                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(section.key, e)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    disabled={uploading === section.key}
                                                />
                                                <Button className="w-full py-4 flex items-center justify-center gap-2 group-hover:bg-[#8B6F21]">
                                                    <Upload size={20} />
                                                    <span>{currentVal ? "تغيير الصورة" : "رفع صورة جديدة"}</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        <div className="relative">
                                            <textarea
                                                defaultValue={currentVal}
                                                // onBlur={(e) => handleTextSave(section.key, e.target.value)}
                                                id={`input-${section.key}`}
                                                className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#C5A038] outline-none min-h-[100px] text-lg text-[#5A4A42]"
                                                placeholder={`أدخل ${section.label}`}
                                            />
                                        </div>
                                        <Button
                                            onClick={() => {
                                                const val = (document.getElementById(`input-${section.key}`) as HTMLTextAreaElement).value;
                                                handleTextSave(section.key, val);
                                            }}
                                            className="self-end py-2 px-6 flex items-center gap-2"
                                            disabled={uploading === section.key}
                                        >
                                            {uploading === section.key ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                            <span>حفظ التغييرات</span>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
