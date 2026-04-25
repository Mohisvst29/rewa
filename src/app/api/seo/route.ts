import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { SiteContent } from '@/models/SiteContent';

export async function GET() {
    await dbConnect();
    try {
        const titleSuffix = await SiteContent.findOne({ key: 'seo_title_suffix' });
        const description = await SiteContent.findOne({ key: 'seo_default_description' });
        const keywords = await SiteContent.findOne({ key: 'seo_keywords' });

        return NextResponse.json({
            titleSuffix: titleSuffix?.value || '',
            description: description?.value || '',
            keywords: keywords?.value || '',
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { titleSuffix, description, keywords } = body;

        await SiteContent.findOneAndUpdate(
            { key: 'seo_title_suffix' },
            { value: titleSuffix, label: 'SEO Title Suffix', type: 'text' },
            { upsert: true }
        );

        await SiteContent.findOneAndUpdate(
            { key: 'seo_default_description' },
            { value: description, label: 'SEO Default Description', type: 'text' },
            { upsert: true }
        );

        await SiteContent.findOneAndUpdate(
            { key: 'seo_keywords' },
            { value: keywords, label: 'SEO Keywords', type: 'text' },
            { upsert: true }
        );

        return NextResponse.json({ message: 'SEO settings updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update SEO settings' }, { status: 500 });
    }
}
