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
        
        if (!items || items.length === 0) {
            // Apply filtering to mock data if needed
            let filteredMock = DEFAULT_ITEMS;
            if (category && category !== 'all') filteredMock = filteredMock.filter(i => i.category === category);
            if (featured === 'true') filteredMock = filteredMock.filter(i => i.isFeatured);
            return NextResponse.json(filteredMock);
        }

        return NextResponse.json(items, {
            headers: {
                'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=59',
            }
        });
    } catch (error) {
        console.error("Database fetch failed, falling back to mock items:", error);
        return NextResponse.json(DEFAULT_ITEMS);
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
