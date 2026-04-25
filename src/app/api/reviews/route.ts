import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import { Review } from '@/models/Review';

const DEFAULT_REVIEWS = [
    {
        name: "سارة محمد",
        text: "تعامل راقي جداً وشغل نظيف، الفستان طلع أجمل مما توقعت بكثير. شكراً لكم على هذا الإبداع.",
        rating: 5,
        status: 'approved'
    },
    {
        name: "نورة العتيبي",
        text: "الخياطة متقنة والمقاسات مضبوطة 100٪. أول مرة أخيط وما أحتاج أي تعديل. أنصح الجميع بالتعامل معكم.",
        rating: 5,
        status: 'approved'
    },
    {
        name: "أم عبدالله",
        text: "تفصيل الجلابيات عندهم ولا غلطة، القماش والخياطة والتطريز كله بيرفكت. الله يبارك لكم في رزقكم.",
        rating: 5,
        status: 'approved'
    }
];

export async function GET(request: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role'); // 'admin' or undefined

    try {
        // Simple seeding check on first load
        const count = await Review.countDocuments();
        if (count === 0) {
            await Review.insertMany(DEFAULT_REVIEWS);
        }

        let query = {};
        if (role !== 'admin') {
            query = { status: 'approved' };
        }

        const reviews = await Review.find(query).sort({ createdAt: -1 });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.text || !body.rating) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const review = await Review.create({
            name: body.name,
            text: body.text,
            rating: body.rating,
            status: 'pending' // Default status
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
    }
}
