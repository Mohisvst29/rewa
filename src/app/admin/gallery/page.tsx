"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trash2, Plus, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface IGalleryItem {
    _id: string;
    title: string;
    image: string;
}

export default function GalleryAdmin() {
    const [items, setItems] = useState<IGalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;
        try {
            await fetch(`/api/gallery/${id}`, { method: "DELETE" });
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            alert("Error deleting item");
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            // 1. Upload
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (!uploadRes.ok) throw new Error("Upload failed");
            const { url } = await uploadRes.json();

            // 2. Create Gallery Item
            const createRes = await fetch("/api/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: url,
                    title: "New Image" // Default title or ask user
                }),
            });

            if (createRes.ok) {
                const newItem = await createRes.json();
                setItems([...items, newItem]);
            }
        } catch (error) {
            alert("فشل رفع الصورة");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#C5A038]" size={40} /></div>;

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/admin/dashboard" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm transition-all hover:scale-110">
                        <ArrowRight />
                    </Link>
                    <h1 className="text-4xl font-bold text-[#5A4A42] font-arabic">إدارة معرض الصور</h1>
                </div>

                <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[#5A4A42] mb-1">إضافة صورة جديدة</h2>
                        <p className="text-gray-500 text-sm">ارفع صور عالية الدقة للمعرض</p>
                    </div>

                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            disabled={uploading}
                        />
                        <Button className="flex items-center gap-2" disabled={uploading}>
                            {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                            <span>{uploading ? "جاري الرفع..." : "رفع صورة"}</span>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item._id} className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100">
                            <div className="aspect-[3/4] relative">
                                <Image
                                    src={item.image}
                                    alt={item.title || "Gallery Item"}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            لا توجد صور في المعرض حالياً.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
