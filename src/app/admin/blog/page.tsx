"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BlogPost {
    _id: string;
    title: string;
    category: string;
    status: string;
    createdAt: string;
    image: string;
}

export default function BlogAdminPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog?role=admin"); // Fetch all including drafts
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return;
        try {
            const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to delete");
            }
            setPosts(posts.filter((p) => p._id !== id));
        } catch (error: any) {
            console.error("Delete error:", error);
            alert(`حدث خطأ أثناء الحذف: ${error.message}`);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#C5A038]" size={40} /></div>;

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold text-[#5A4A42] font-arabic">إدارة المدونة</h1>
                    <Link href="/admin/blog/new">
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            <span>مقال جديد</span>
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 text-gray-600 font-bold">المقال</th>
                                <th className="p-6 text-gray-600 font-bold">التصنيف</th>
                                <th className="p-6 text-gray-600 font-bold">الحالة</th>
                                <th className="p-6 text-gray-600 font-bold">تاريخ النشر</th>
                                <th className="p-6 text-gray-600 font-bold">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {posts.map((post) => (
                                <tr key={post._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                                                <Image src={post.image} alt={post.title} fill className="object-cover" />
                                            </div>
                                            <span className="font-medium text-[#5A4A42] max-w-xs truncate" title={post.title}>{post.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="bg-[#FFF8E7] text-[#C5A038] px-3 py-1 rounded-lg text-sm font-bold">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {post.status === 'published' ? 'منشور' : 'مسودة'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-gray-500 text-sm">
                                        {new Date(post.createdAt).toLocaleDateString('ar-EG')}
                                    </td>
                                    <td className="p-6 flex items-center gap-3">
                                        <Link href={`/admin/blog/edit/${post._id}`}>
                                            <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit size={20} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-400">لا توجد مقالات مضافة بعد.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
