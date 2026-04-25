import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { SiteContent } from '@/models/SiteContent';

export async function GET() {
    await dbConnect();
    try {
        const count = await SiteContent.countDocuments();
        if (count === 0) {
            const defaults = [
                { key: "hero_bg", label: "صورة خلفية الهيرو (Hero Background)", value: "/siteimages/5151.webp", type: "image" },
                { key: "hero_main", label: "صورة الهيرو الرئيسية (Hero Main Image)", value: "/siteimages/download (46).webp", type: "image" },
                { key: "about_image", label: "صورة قسم من نحن (About Section Image)", value: "/siteimages/download.webp", type: "image" },
            ];
            await SiteContent.insertMany(defaults);
        }

        const content = await SiteContent.find({});
        return NextResponse.json(content, {
            headers: {
                'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=59',
            }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { key, value, label, type } = body;

        const updated = await SiteContent.findOneAndUpdate(
            { key },
            { value, label, type },
            { upsert: true, new: true }
        );

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
}
