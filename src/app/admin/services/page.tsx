"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Edit, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface IService {
    _id: string;
    title: string;
    slug: string;
    image: string;
}

export default function ServicesAdmin() {
    const [services, setServices] = useState<IService[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Failed to fetch services");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
        try {
            await fetch(`/api/services/${id}`, { method: "DELETE" });
            setServices(services.filter((s) => s._id !== id));
        } catch (error) {
            alert("Error deleting service");
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
                        <h1 className="text-4xl font-bold text-[#5A4A42] font-arabic">إدارة الخدمات</h1>
                    </div>

                    <Link href="/admin/services/new">
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            <span>إضافة خدمة جديدة</span>
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 text-gray-600 font-bold">الصورة</th>
                                <th className="p-6 text-gray-600 font-bold">العنوان</th>
                                <th className="p-6 text-gray-600 font-bold">الرابط (Slug)</th>
                                <th className="p-6 text-gray-600 font-bold">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {services.map((service) => (
                                <tr key={service._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                            <Image src={service.image} alt={service.title} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-6 font-medium text-[#5A4A42]">{service.title}</td>
                                    <td className="p-6 text-gray-500 font-mono text-sm">{service.slug}</td>
                                    <td className="p-6 flex items-center gap-3">
                                        <Link
                                            href={`/admin/services/${service._id}`}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit size={20} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {services.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-gray-400">لا توجد خدمات مضافة بعد.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
