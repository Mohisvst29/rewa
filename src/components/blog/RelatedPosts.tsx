import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import { Clock, Calendar } from "lucide-react";

export default async function RelatedPosts({ currentSlug, category }: { currentSlug: string, category: string }) {
    await dbConnect();

    // Fetch 3 related posts (same category, not current one)
    // If not enough same category, just fetch recent
    let posts = await BlogPost.find({
        category,
        slug: { $ne: currentSlug },
        status: 'published'
    })
        .sort({ createdAt: -1 })
        .limit(3);

    if (posts.length < 3) {
        const morePosts = await BlogPost.find({
            slug: { $ne: currentSlug, $nin: posts.map(p => p.slug) },
            status: 'published'
        })
            .sort({ createdAt: -1 })
            .limit(3 - posts.length);

        posts = [...posts, ...morePosts];
    }

    if (posts.length === 0) return null;

    return (
        <div className="mt-16 pt-12 border-t border-gray-100">
            <h3 className="text-2xl font-bold text-[#5A4A42] mb-8 relative inline-block">
                اقرأ أيضاً
                <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-[#C5A038] rounded-full"></span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group group-hover:scale-[1.02] transition-transform duration-300 block">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#C5A038]">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h4 className="font-bold text-lg text-[#5A4A42] mb-3 line-clamp-2 group-hover:text-[#C5A038] transition-colors">
                                    {post.title}
                                </h4>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>{new Date(post.createdAt).toLocaleDateString("ar-EG")}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>5 دقائق</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
