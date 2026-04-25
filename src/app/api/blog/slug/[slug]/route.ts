import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import { BlogPost } from '@/models/BlogPost';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();
    const { slug } = await params;

    try {
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

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Increment views
        try {
            post.views += 1;
            await post.save();
        } catch (err) { }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}
