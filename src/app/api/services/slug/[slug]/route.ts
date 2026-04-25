import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Service } from '@/models/Service';
import { servicesData } from '@/data/services';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();
    const { slug } = await params;
    console.log(`[API] Fetching service with slug: '${slug}'`);
    try {
        const service = await Service.findOne({ slug: slug });
        console.log(`[API] Service found in DB: ${service ? service.title : 'NULL'}`);
        
        if (!service) {
            // Fallback to mock data
            const mockService = servicesData.find(s => s.slug === slug);
            if (mockService) {
                return NextResponse.json({ ...mockService, _id: mockService.id });
            }
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json(service);
    } catch (error) {
        console.error("Fetch failed, falling back to mock data:", error);
        const mockService = servicesData.find(s => s.slug === slug);
        if (mockService) {
            return NextResponse.json({ ...mockService, _id: mockService.id });
        }
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
    }
}
