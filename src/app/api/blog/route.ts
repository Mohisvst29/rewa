import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { BlogPost } from '@/models/BlogPost';

export const dynamic = 'force-dynamic';
import { generateSlug, generateSEOMetadata } from '@/lib/seo-utils';

const DEFAULT_POSTS = [
    {
        title: "نصائح لاختيار القماش المناسب لفستان السهرة",
        slug: "tips-for-choosing-evening-dress-fabric",
        excerpt: "تعرفي على أفضل أنواع الأقمشة التي تمنحك إطلالة ملكية في مناسباتك الخاصة وكيفية العناية بها.",
        content: "اختيار القماش هو الخطوة الأولى والأهم في تصميم أي فستان سهرة...",
        image: "/siteimages/download (47).webp",
        category: "نصائح وخياطة",
        status: "published",
        createdAt: new Date().toISOString()
    },
    {
        title: "موضة الجلابيات لعام 2026",
        slug: "jalabiya-fashion-trends-2026",
        excerpt: "اكتشفي أحدث التصاميم والألوان في عالم الجلابيات العصرية والتقليدية لهذا العام.",
        content: "تتنوع صيحات الموضة هذا العام بين التصاميم البسيطة والتطريزات اليدوية الفخمة...",
        image: "/siteimages/5151.webp",
        category: "موضة",
        status: "published",
        createdAt: new Date().toISOString()
    }
];

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role'); // Check if admin is requesting

    let query = {};
    if (role !== 'admin') {
        query = { status: 'published' };
    }

    try {
        const posts = await BlogPost.find(query).sort({ createdAt: -1 });
        
        if (!posts || posts.length === 0) {
            return NextResponse.json(DEFAULT_POSTS);
        }

        return NextResponse.json(posts, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            }
        });
    } catch (error) {
        console.error("Database fetch failed, falling back to mock posts:", error);
        return NextResponse.json(DEFAULT_POSTS);
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();

        // Generate Arabic-friendly slug from title
        let slug = body.slug || generateSlug(body.title);

        // Check if slug exists, if so add a unique suffix
        const existingPost = await BlogPost.findOne({ slug });
        if (existingPost) {
            slug = `${slug}-${Date.now()}`;
        }

        // Auto-generate SEO metadata if autoSEO is enabled (default true)
        let seoData = {};
        if (body.autoSEO !== false) {
            const generated = generateSEOMetadata(body.title, body.content, body.excerpt);
            seoData = {
                metaTitle: body.metaTitle || generated.metaTitle,
                metaDescription: body.metaDescription || generated.metaDescription,
                metaKeywords: body.metaKeywords?.length ? body.metaKeywords : generated.metaKeywords,
            };
        }

        const post = await BlogPost.create({
            ...body,
            slug,
            ...seoData,
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
