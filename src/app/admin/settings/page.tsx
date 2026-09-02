"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, KeyRound, Mail, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
    const [currentEmail, setCurrentEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!currentPassword) {
            setMessage({ type: "error", text: "يرجى إدخال كلمة المرور الحالية للتأكيد" });
            return;
        }

        if (!newPassword) {
            setMessage({ type: "error", text: "يرجى إدخال كلمة المرور الجديدة" });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: "error", text: "كلمة المرور الجديدة يجب أن تحتوي على 6 أحرف على الأقل" });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "كلمة المرور الجديدة وتأكيدها غير متطابقين" });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/change-credentials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentEmail: currentEmail.trim() || undefined,
                    newEmail: newEmail.trim() || undefined,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage({ type: "error", text: data.error || "حدث خطأ أثناء تغيير البيانات" });
            } else {
                setMessage({ type: "success", text: data.message || "تم تحديث البيانات بنجاح!" });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                if (data.email) {
                    setNewEmail(data.email);
                }
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFBF2] p-4 md:p-8" dir="rtl">
            <div className="max-w-3xl mx-auto">

                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/admin/dashboard"
                        className="inline-flex items-center gap-2 text-[#5A4A42] hover:text-amber-700 transition-colors font-medium bg-white px-4 py-2 rounded-xl shadow-sm border border-amber-100/50"
                    >
                        <ArrowRight size={18} />
                        العودة للوحة التحكم
                    </Link>
                </div>

                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-sm">
                            <KeyRound size={24} />
                        </div>
                        <h1 className="text-3xl font-bold text-[#5A4A42] font-arabic">إعدادات الحساب وكلمة المرور</h1>
                    </div>
                    <p className="text-gray-500 mr-15">تغيير البريد الإلكتروني وكلمة المرور الخاصة بتسجيل دخول لوحة التحكم</p>
                </header>

                {/* Main Card */}
                <div className="bg-white rounded-3xl border border-amber-100/60 p-6 md:p-10 shadow-lg shadow-amber-900/5">

                    {message && (
                        <div
                            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border ${
                                message.type === "success"
                                    ? "bg-green-50 text-green-800 border-green-200"
                                    : "bg-red-50 text-red-800 border-red-200"
                            }`}
                        >
                            {message.type === "success" ? (
                                <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                            ) : (
                                <AlertCircle size={20} className="text-red-600 shrink-0" />
                            )}
                            <span className="text-sm font-medium">{message.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Section 1: Email */}
                        <div className="border-b border-gray-100 pb-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Mail size={18} className="text-amber-600" />
                                تعديل البريد الإلكتروني (اختياري)
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        البريد الإلكتروني الحالي
                                    </label>
                                    <input
                                        type="email"
                                        value={currentEmail}
                                        onChange={(e) => setCurrentEmail(e.target.value)}
                                        placeholder="اتركه فارغاً للاستعلام التلقائي"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-gray-50/50 text-gray-800 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        البريد الإلكتروني الجديد
                                    </label>
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        placeholder="أدخل البريد الإلكتروني الجديد"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-gray-800 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Password */}
                        <div className="space-y-4 pt-2">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Lock size={18} className="text-amber-600" />
                                تغيير كلمة المرور
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    كلمة المرور الحالية <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-gray-800 text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        كلمة المرور الجديدة <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-gray-800 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        تأكيد كلمة المرور الجديدة <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-gray-800 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto px-8 py-3.5 bg-[#5A4A42] hover:bg-[#433630] text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        جارٍ الحفظ...
                                    </>
                                ) : (
                                    "حفظ التغييرات"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
