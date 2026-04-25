import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";

import dbConnect from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import { generateSEOMetadata, siteConfig } from "@/lib/seo-utils";
import ScrollProgress from "@/components/blog/ScrollProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogContent from "@/components/blog/BlogContent";

// Forces the page to be dynamic since we are fetching from DB
export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
    await dbConnect();

    // Try multiple decode strategies for Arabic URLs
    let post = null;

    // 1. Try exact match
    post = await BlogPost.findOne({ slug, status: 'published' });

    // 2. Try decoded slug (for URL-encoded Arabic)
    if (!post) {
        try {
            const decodedSlug = decodeURIComponent(slug);
            post = await BlogPost.findOne({ slug: decodedSlug, status: 'published' });
        } catch (e) { }
    }

    // 3. Try double decode fallback for some browsers/mobile
    if (!post) {
        try {
            const doubleDecoded = decodeURIComponent(decodeURIComponent(slug));
            post = await BlogPost.findOne({ slug: doubleDecoded, status: 'published' });
        } catch (e) { }
    }

    return post;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.slug);

    if (!post) {
        return {
            title: 'المقال غير موجود',
        }
    }

    // Use stored SEO metadata or generate dynamically
    let title = post.metaTitle || post.title;
    let description = post.metaDescription || post.excerpt;
    let keywords = post.metaKeywords || [];

    // Use manual SEO if provided
    if (post.manualSEO) {
        if (post.manualSEO.title) title = post.manualSEO.title;
        if (post.manualSEO.description) description = post.manualSEO.description;
        if (post.manualSEO.keywords && post.manualSEO.keywords.length > 0) keywords = post.manualSEO.keywords;
    }

    // Auto-generate if missing
    if (!title || !description) {
        const generated = generateSEOMetadata(post.title, post.content, post.excerpt);
        if (!title) title = generated.metaTitle;
        if (!description) description = generated.metaDescription;
        if (!keywords || keywords.length === 0) keywords = generated.metaKeywords;
    }

    const previousImages = (await parent).openGraph?.images || [];
    const ogImage = post.manualSEO?.ogImage || post.image;

    // Canonical URL - use the Arabic slug
    const canonicalUrl = post.manualSEO?.canonicalUrl || `${siteConfig.siteUrl}/blog/${encodeURIComponent(post.slug)}`;

    return {
        title: `${title} | ${siteConfig.siteName}`,
        description: description,
        keywords: keywords,
        authors: [{ name: post.author }],
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: !post.manualSEO?.noIndex,
            follow: !post.manualSEO?.noFollow,
        },
        openGraph: {
            title: title,
            description: description,
            url: canonicalUrl,
            siteName: siteConfig.siteName,
            images: [ogImage, ...previousImages],
            type: 'article',
            publishedTime: post.createdAt?.toISOString(),
            modifiedTime: post.updatedAt?.toISOString(),
            authors: [post.author],
            tags: post.tags,
            locale: siteConfig.locale,
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [ogImage],
            site: siteConfig.twitterHandle,
        },
    }
}

export default async function BlogDetail({ params }: PageProps) {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    // Calculate reading time (avg 200 words per minute)
    const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.siteName,
            "logo": {
                "@type": "ImageObject",
                "url": `${siteConfig.siteUrl}/logo.png`
            }
        },
        "datePublished": post.createdAt,
        "dateModified": post.updatedAt,
        "description": post.metaDescription || post.excerpt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.siteUrl}/blog/${encodeURIComponent(post.slug)}`
        },
        "keywords": post.metaKeywords?.join(', ') || post.tags?.join(', '),
        "articleBody": post.content.replace(/<[^>]*>/g, '')
    };

    return (
        <>
            <ScrollProgress />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-[#FFFBF2] pb-24" dir="rtl">
                {/* Hero Section */}
                <div className="relative w-full h-[60vh] min-h-[500px]">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF2] via-transparent to-black/30" />

                    <div className="absolute inset-0 flex flex-col justify-end pb-24 px-4">
                        <div className="max-w-5xl mx-auto w-full">
                            <div className="animate-fade-in-up">
                                <span className="bg-[#C5A038] text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 inline-block shadow-lg">
                                    {post.category}
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans text-white mb-8 leading-tight drop-shadow-lg">
                                    {post.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base font-medium">
                                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
                                        <div className="w-8 h-8 rounded-full bg-[#C5A038] flex items-center justify-center text-white font-bold border border-white/50">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
                                        <Calendar size={18} />
                                        <span>{new Date(post.createdAt).toLocaleDateString("ar-EG", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">
                                        <Clock size={18} />
                                        <span>{readingTime} دقائق قراءة</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Sidebar (Desktop) */}
                        <aside className="hidden lg:block lg:w-1/4">
                            <TableOfContents content={post.content} />
                        </aside>

                        {/* Article Content */}
                        <article className="lg:w-3/4">
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#C5A038]/10">
                                {/* Breadcrumbs */}
                                <div className="flex items-center flex-wrap gap-2 text-sm text-gray-400 mb-10 border-b border-gray-100 pb-6">
                                    <Link href="/" className="hover:text-[#C5A038] transition-colors">الرئيسية</Link>
                                    <span className="text-gray-300">/</span>
                                    <Link href="/blog" className="hover:text-[#C5A038] transition-colors">المدونة</Link>
                                    <span className="text-gray-300">/</span>
                                    <span className="text-[#C5A038] font-medium truncate max-w-[200px]">{post.title}</span>
                                </div>

                                {/* Content Body */}
                                <BlogContent content={post.content} />

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mt-16 pt-8 border-t border-gray-100">
                                        <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">الوسوم</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {post.tags.map((tag: string) => (
                                                <Link
                                                    key={tag}
                                                    href={`/blog?tag=${tag}`}
                                                    className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C5A038] hover:text-white transition-all shadow-sm hover:shadow-md"
                                                >
                                                    #{tag}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Share Section */}
                                <div className="mt-12 bg-[#FFFBF2] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="text-[#5A4A42] font-semibold">
                                        هل أعجبك المقال؟ شاركه مع أصدقائك
                                    </div>
                                    <ShareButtons title={post.title} slug={post.slug} />
                                </div>
                            </div>

                            {/* Related Posts */}
                            <Suspense fallback={<div className="h-64 bg-gray-100 rounded-2xl mt-16 animate-pulse" />}>
                                <RelatedPosts currentSlug={post.slug} category={post.category} />
                            </Suspense>

                            {/* Back Link */}
                            <div className="mt-12 text-center">
                                <Link href="/blog" className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-full text-[#5A4A42] font-bold hover:bg-[#C5A038] hover:text-white hover:border-[#C5A038] transition-all shadow-sm">
                                    <ArrowRight className="rotate-180" size={20} />
                                    <span>العودة لجميع المقالات</span>
                                </Link>
                            </div>

                        </article>
                    </div>
                </div>
            </main>
        </>
    );
}
