import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Service';
import { servicesData } from '@/data/services';

export async function GET() {
    await dbConnect();
    try {
        const services = await Service.find({}).sort({ order: 1, createdAt: -1 });
        
        // Fallback to mock data if database is empty
        if (!services || services.length === 0) {
            const mappedData = servicesData.map(s => ({ ...s, _id: s.id }));
            return NextResponse.json(mappedData);
        }
        
        return NextResponse.json(services);
    } catch (error) {
        console.error("Database fetch failed, falling back to mock data:", error);
        const mappedData = servicesData.map(s => ({ ...s, _id: s.id }));
        return NextResponse.json(mappedData);
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
