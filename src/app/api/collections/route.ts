import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { CollectionItem } from '@/models/CollectionItem';

const DEFAULT_ITEMS = [
    {
        title: "جلابية ملكي تطريز يدوي",
        category: "jalabiyas",
        image: "/siteimages/5151.webp",
        price: "450 ريال",
        isFeatured: true
    },
    {
        title: "فستان سهرة ناعم",
        category: "dresses",
        image: "/siteimages/download (47).webp",
        price: "850 ريال",
        isFeatured: true
    },
    {
        title: "عباية عصرية",
        category: "abayas",
        image: "/siteimages/download.webp",
        price: "350 ريال",
        isFeatured: false
    }
];

export const dynamic = 'force-dynamic';

// GET: Fetch all items (with optional filtering)
export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        let query: any = {};
        if (category && category !== 'all') query.category = category;
        if (featured === 'true') query.isFeatured = true;

        const items = await CollectionItem.find(query).sort({ createdAt: -1 });
        
        return NextResponse.json(items, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            }
        });
    } catch (error) {
        console.error("Database fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
    }
}

// POST: Create a new item (Protected - middleware should handle auth ideally, but we'll add check here or rely on middleware)
export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const newItem = await CollectionItem.create(body);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create item' }, { status: 400 });
    }
}
