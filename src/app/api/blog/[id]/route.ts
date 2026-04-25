import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import { BlogPost } from '@/models/BlogPost';
import { generateSlug, generateSEOMetadata } from '@/lib/seo-utils';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        const post = await BlogPost.findById(id);
        if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        const body = await request.json();

        // Generate/update slug if title changed and no custom slug
        if (body.title && !body.slug) {
            body.slug = generateSlug(body.title);
        }

        // Auto-generate SEO metadata if autoSEO is enabled
        if (body.autoSEO !== false) {
            const generated = generateSEOMetadata(body.title, body.content, body.excerpt);
            if (!body.metaTitle) body.metaTitle = generated.metaTitle;
            if (!body.metaDescription) body.metaDescription = generated.metaDescription;
            if (!body.metaKeywords || body.metaKeywords.length === 0) {
                body.metaKeywords = generated.metaKeywords;
            }
        }

        const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    try {
        await BlogPost.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
