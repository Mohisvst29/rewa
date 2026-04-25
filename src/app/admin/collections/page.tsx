"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Edit, Loader2, ArrowRight, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface IItem {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
}

export default function CollectionsAdmin() {
    const [items, setItems] = useState<IItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IItem | null>(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        category: "jalabiya",
        image: ""
    });
    const [uploading, setUploading] = useState(false);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/collections");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("هل أنت متأكد من الحذف؟")) return;
        try {
            await fetch(`/api/collections/${id}`, { method: "DELETE" });
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            alert("Error deleting item");
        }
    };

    /* ================= EDIT LOGIC ================= */
    const openEditModal = (item: IItem) => {
        setEditingItem(item);
        setEditForm({
            title: item.title,
            description: item.description,
            category: item.category,
            image: item.image
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingItem(null);
        setEditForm({ title: "", description: "", category: "jalabiya", image: "" });
    };

    const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);

        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (!uploadRes.ok) throw new Error("Upload failed");
            const { url } = await uploadRes.json();

            setEditForm(prev => ({ ...prev, image: url }));
        } catch (error) {
            alert("فشل تحديث الصورة");
        } finally {
            setUploading(false);
        }
    };

    const handleSaveEdit = async () => {
        if (!editingItem) return;

        try {
            const res = await fetch(`/api/collections/${editingItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                const updatedItem = await res.json();
                setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item));
                closeEditModal();
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            alert("فشل تحديث العنصر");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#C5A038]" size={40} /></div>;

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm transition-all hover:scale-110">
                            <ArrowRight />
                        </Link>
                        <h1 className="text-4xl font-bold text-[#5A4A42] font-arabic">إدارة المجموعة</h1>
                    </div>

                    <Link href="/admin/collections/new">
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            <span>إضافة جديد</span>
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 text-gray-600 font-bold">الصورة</th>
                                <th className="p-6 text-gray-600 font-bold">العنوان</th>
                                <th className="p-6 text-gray-600 font-bold">التصنيف</th>
                                <th className="p-6 text-gray-600 font-bold">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {items.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-6 font-medium text-[#5A4A42]">{item.title}</td>
                                    <td className="p-6">
                                        <span className="bg-[#FFF8E7] text-[#C5A038] px-3 py-1 rounded-lg text-sm font-bold">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-6 flex items-center gap-3">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-gray-400">لا توجد عناصر مضافة بعد.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={closeEditModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-[#5A4A42] mb-6 font-arabic text-center">تعديل العنصر</h2>

                        <div className="space-y-6">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="block font-bold text-gray-700">صورة العرض</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-[#C5A038] transition-colors relative group">
                                    {editForm.image ? (
                                        <div className="relative h-48 w-full rounded-xl overflow-hidden">
                                            <Image
                                                src={editForm.image}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload className="text-white" />
                                                <span className="text-white mr-2">تغيير الصورة</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                            <Upload size={32} />
                                            <span>اضغط لرفع صورة</span>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleEditImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none"
                                    />
                                </div>

                                {/* Category Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">التصنيف</label>
                                    <select
                                        value={editForm.category}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
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

                            {/* Description Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                                <textarea
                                    rows={4}
                                    value={editForm.description}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A038] outline-none resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <Button
                                    onClick={handleSaveEdit}
                                    className="flex-1 bg-[#5A4A42] hover:bg-[#4A3A32]"
                                    disabled={uploading}
                                >
                                    {uploading ? "جاري الحفظ..." : "حفظ التغييرات"}
                                </Button>
                                <button
                                    onClick={closeEditModal}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
