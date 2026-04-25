"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Upload, Loader2, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface BlogEditorProps {
    postId?: string;
}

export default function BlogEditor({ params }: { params: { id?: string } }) {
    const isEdit = !!params.id;
    const router = useRouter();

    // State
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const [uploading, setUploading] = useState(false);
    const [showSEO, setShowSEO] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        category: "General",
        tags: "",
        status: "draft",
        // SEO Fields
        slug: "",
        autoSEO: true,
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
    });

    // Generate slug preview from title
    const generateSlugPreview = (title: string) => {
        return title
            .trim()
            .replace(/[^\w\s\u0600-\u06FF-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    // Fetch existing data if edit mode
    useEffect(() => {
        if (!isEdit) return;
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/blog/${params.id}`);
                const data = await res.json();
                setFormData({
                    title: data.title,
                    excerpt: data.excerpt,
                    content: data.content,
                    image: data.image,
                    category: data.category,
                    tags: data.tags.join(", "),
                    status: data.status,
                    slug: data.slug || "",
                    autoSEO: data.autoSEO !== false,
                    metaTitle: data.metaTitle || "",
                    metaDescription: data.metaDescription || "",
                    metaKeywords: data.metaKeywords?.join(", ") || "",
                });
            } catch (err) {
                console.error("Failed to load post");
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, [isEdit, params.id]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: data });
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

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
            metaKeywords: formData.metaKeywords.split(",").map(t => t.trim()).filter(Boolean),
            slug: formData.slug || generateSlugPreview(formData.title),
        };

        try {
            const url = isEdit ? `/api/blog/${params.id}` : "/api/blog";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push("/admin/blog");
            } else {
                alert("فشل الحفظ");
            }
        } catch (error) {
            alert("Error");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#C5A038]" /></div>;

    const slugPreview = formData.slug || generateSlugPreview(formData.title);

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/blog" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm transition-all">
                        <ArrowRight />
                    </Link>
                    <h1 className="text-3xl font-bold text-[#5A4A42] font-arabic">
                        {isEdit ? "تعديل المقال" : "مقال جديد"}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-gray-100 space-y-8">

                    {/* Image Upload */}
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">صورة العرض</label>
                        <div className="relative w-full h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#C5A038] transition-colors flex flex-col items-center justify-center overflow-hidden group">
                            {formData.image ? (
                                <>
                                    <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-bold">تغيير الصورة</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center gap-2">
                                    <div className="relative w-20 h-20 opacity-30 mb-2">
                                        <Image src="https://placehold.co/400x300/EEE/999?text=Blog+Img" alt="Ph" fill className="object-cover rounded-md" />
                                    </div>
                                    <Upload />
                                    <span>اضغط لرفع صورة</span>
                                </div>
                            )}

                            {uploading && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                                    <Loader2 className="animate-spin text-[#C5A038]" />
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">عنوان المقال</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                                placeholder="عنوان جذاب للمقال..."
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">التصنيف</label>
                            <input
                                type="text"
                                list="categories"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                            />
                            <datalist id="categories">
                                <option value="General" />
                                <option value="Fashion" />
                                <option value="Tips" />
                                <option value="News" />
                            </datalist>
                        </div>
                    </div>

                    {/* Slug Preview */}
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">رابط المقال (Slug)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none font-mono text-sm"
                                placeholder={slugPreview || "يُولّد تلقائياً من العنوان"}
                                dir="ltr"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2" dir="ltr">
                            Preview: /blog/{encodeURIComponent(slugPreview) || "..."}
                        </p>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">مقتطف قصير (Summary)</label>
                        <textarea
                            rows={3}
                            required
                            value={formData.excerpt}
                            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none resize-none"
                            placeholder="وصف مختصر يظهر في قائمة المقالات..."
                        />
                    </div>

                    {/* Content Editor */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block font-bold text-gray-700">محتوى المقال (HTML مدعوم)</label>
                            <span className="text-xs text-gray-400">يمكنك استخدام وسوم HTML للتنسيق</span>
                        </div>
                        <textarea
                            rows={15}
                            required
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none font-mono text-sm leading-relaxed"
                            placeholder="<p>اكتبي محتوى المقال هنا...</p>"
                        />
                    </div>

                    {/* Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">الوسوم (Tags)</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                                placeholder="موضة، صيف، خياطة (فصل بفاصلة)"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">حالة النشر</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none bg-white"
                            >
                                <option value="draft">مسودة (Draft)</option>
                                <option value="published">منشور (Published)</option>
                            </select>
                        </div>
                    </div>

                    {/* SEO Settings Collapsible */}
                    <div className="border border-gray-100 rounded-2xl overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setShowSEO(!showSEO)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-2 font-bold text-gray-700">
                                <Settings size={18} />
                                <span>إعدادات SEO المتقدمة</span>
                            </div>
                            {showSEO ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>

                        {showSEO && (
                            <div className="p-6 space-y-6 border-t border-gray-100">
                                {/* Auto SEO Toggle */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="autoSEO"
                                        checked={formData.autoSEO}
                                        onChange={e => setFormData({ ...formData, autoSEO: e.target.checked })}
                                        className="w-5 h-5 accent-[#C5A038]"
                                    />
                                    <label htmlFor="autoSEO" className="font-medium text-gray-700">
                                        توليد SEO تلقائي (إذا لم تُحدد قيم مخصصة)
                                    </label>
                                </div>

                                {/* Meta Title */}
                                <div>
                                    <label className="block font-bold text-gray-700 mb-2">عنوان Meta (60 حرف كحد أقصى)</label>
                                    <input
                                        type="text"
                                        maxLength={60}
                                        value={formData.metaTitle}
                                        onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                                        placeholder="يُولّد تلقائياً من العنوان"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">{formData.metaTitle.length}/60 حرف</p>
                                </div>

                                {/* Meta Description */}
                                <div>
                                    <label className="block font-bold text-gray-700 mb-2">وصف Meta (160 حرف كحد أقصى)</label>
                                    <textarea
                                        rows={2}
                                        maxLength={160}
                                        value={formData.metaDescription}
                                        onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none resize-none"
                                        placeholder="يُولّد تلقائياً من المقتطف"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">{formData.metaDescription.length}/160 حرف</p>
                                </div>

                                {/* Meta Keywords */}
                                <div>
                                    <label className="block font-bold text-gray-700 mb-2">كلمات مفتاحية (Keywords)</label>
                                    <input
                                        type="text"
                                        value={formData.metaKeywords}
                                        onChange={e => setFormData({ ...formData, metaKeywords: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                                        placeholder="خياطة، أزياء، موضة (فصل بفاصلة)"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-6">
                        <Button type="submit" disabled={loading} className="w-full py-4 text-lg">
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : "حفظ التغييرات"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
