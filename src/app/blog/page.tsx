"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    author: string;
    category: string;
    createdAt: string;
    views: number;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    // Derived state for filtering
    const categories = ["all", ...Array.from(new Set(posts.map(p => p.category)))];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "all" || post.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen pt-24 bg-[#FFFBF2] pb-24" dir="rtl">
            {/* Hero Section */}
            <section className="relative px-4 md:px-8 text-center mb-16">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#8B6F21] font-bold tracking-widest text-sm uppercase mb-3 block"
                    >
                        المجلة
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-arabic font-bold text-[#5A4A42] mb-6"
                    >
                        أحدث <span className="text-[#C5A038]">المقالات</span> والأخبار
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto mb-10"
                    >
                        اكتشفي عالم الأزياء والموضة، نصائح في العناية بالملابس، وأحدث صيحات الخياطة والتفصيل.
                    </motion.p>

                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
                        <div className="relative w-full md:w-2/3">
                            <input
                                type="text"
                                placeholder="ابحثي عن مقال..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 pr-12 rounded-2xl bg-white border border-gray-100 shadow-sm focus:shadow-md focus:border-[#C5A038] outline-none transition-all"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                        ? "bg-[#C5A038] text-white shadow-lg scale-105"
                                        : "bg-white text-gray-500 hover:text-[#C5A038] border border-gray-100"
                                    }`}
                            >
                                {cat === "all" ? "الكل" : cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white h-[500px] rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post) => (
                                <motion.article
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={post._id}
                                    className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                                >
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#C5A038] rounded-full">
                                            {post.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span>{new Date(post.createdAt).toLocaleDateString('ar-EG')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User size={14} />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BookOpen size={14} />
                                                <span>{post.views} قراءة</span>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold text-[#5A4A42] mb-3 line-clamp-2 leading-tight group-hover:text-[#C5A038] transition-colors font-arabic">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-gray-50">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center gap-2 text-[#5A4A42] font-bold text-sm group-hover:gap-3 transition-all"
                                            >
                                                <span>اقرأ المزيد</span>
                                                <ArrowRight size={16} className="text-[#C5A038] rotate-180" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && filteredPosts.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-xl">لا توجد مقالات تطابق بحثك حالياً.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
