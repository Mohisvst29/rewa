import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Service';

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();
    try {
        const services = await Service.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(services);
    } catch (error) {
        console.error("Database fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();

        // Basic validation
        if (!body.title || !body.slug || !body.image) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newService = await Service.create(body);
        return NextResponse.json(newService, { status: 201 });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
