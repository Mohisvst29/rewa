"use client";

import { useState, useEffect } from "react";
import { Loader2, Check, X, Trash2, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Review {
    _id: string;
    name: string;
    text: string;
    rating: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}

export default function ReviewsAdminPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/reviews?role=admin");
            const data = await res.json();
            setReviews(data);
        } catch (error) {
            console.error("Failed to fetch reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setReviews(reviews.map(r => r._id === id ? { ...r, status: newStatus as any } : r));
            }
        } catch (error) {
            alert("فشل تحديث الحالة");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("هل أنت متأكد من حذف هذا التقييم؟")) return;
        try {
            const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setReviews(reviews.filter(r => r._id !== id));
            }
        } catch (error) {
            alert("فشل الحذف");
        }
    };

    const filteredReviews = reviews.filter(r => r.status === filter);

    if (loading && reviews.length === 0) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#C5A038]" size={40} /></div>;

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <Link href="/admin/dashboard" className="text-gray-400 hover:text-[#C5A038] mb-2 inline-flex items-center gap-2 transition-colors">
                            <ArrowRight size={16} />
                            <span>العودة للوحة التحكم</span>
                        </Link>
                        <h1 className="text-4xl font-bold text-[#5A4A42] font-arabic mt-2">إدارة التقييمات</h1>
                    </div>
                    <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                        {(['pending', 'approved', 'rejected'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${filter === status
                                        ? 'bg-[#C5A038] text-white shadow-md'
                                        : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {status === 'pending' && 'بانتظار الموافقة'}
                                {status === 'approved' && 'منشور'}
                                {status === 'rejected' && 'مرفوض'}
                                <span className="mr-2 text-xs opacity-80 bg-black/10 px-2 py-0.5 rounded-full">
                                    {reviews.filter(r => r.status === status).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {filteredReviews.length === 0 ? (
                        <div className="text-center py-20 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                            لا توجد تقييمات في هذه القائمة حالياً
                        </div>
                    ) : (
                        filteredReviews.map((review) => (
                            <div key={review._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg text-[#5A4A42]">{review.name}</h3>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < review.rating ? "fill-[#C5A038] text-[#C5A038]" : "text-gray-200"}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400 mr-2">{new Date(review.createdAt).toLocaleDateString('ar-EG')}</span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        "{review.text}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    {review.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(review._id, 'approved')}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors font-bold text-sm"
                                            >
                                                <Check size={18} />
                                                <span>قبول</span>
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(review._id, 'rejected')}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-bold text-sm"
                                            >
                                                <X size={18} />
                                                <span>رفض</span>
                                            </button>
                                        </>
                                    )}

                                    {review.status === 'approved' && (
                                        <button
                                            onClick={() => handleStatusUpdate(review._id, 'rejected')}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-bold text-sm"
                                        >
                                            <X size={18} />
                                            <span>إلغاء النشر</span>
                                        </button>
                                    )}

                                    {review.status === 'rejected' && (
                                        <button
                                            onClick={() => handleStatusUpdate(review._id, 'approved')}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors font-bold text-sm"
                                        >
                                            <Check size={18} />
                                            <span>إعادة نشر</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                        title="حذف نهائي"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
