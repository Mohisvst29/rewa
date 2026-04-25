import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { GalleryItem } from '@/models/Gallery';

export async function GET() {
    try {
        await dbConnect();

        const count = await GalleryItem.countDocuments();

        if (count === 0) {
            // Seed initial data if empty
            const initialGallery = [
                {
                    title: "Royal Jalabiya",
                    image: "/siteimages/5151.webp",
                    order: 1
                },
                {
                    title: "Elegant Detail",
                    image: "/siteimages/download.webp",
                    order: 2
                },
                {
                    title: "Measurement Taking",
                    image: "/siteimages/download (46).webp",
                    order: 3
                },
                {
                    title: "Quality Fabrics",
                    image: "/siteimages/download (47).webp",
                    order: 4
                },
                {
                    title: "Sewing Process",
                    image: "/siteimages/download (45).webp",
                    order: 5
                },
                {
                    title: "Fashion Design",
                    image: "/siteimages/Screenshot 2026-01-19 075710.webp",
                    order: 6
                },
                {
                    title: "Custom Fitting",
                    image: "/siteimages/Screenshot 2026-01-19 082828.webp",
                    order: 7
                },
                {
                    title: "Final Touches",
                    image: "/siteimages/Sustainable Fashion Sewing, Handcrafted Production, Silky Satin Fabrics, Nightwear Sewing.webp",
                    order: 8
                }
            ];

            await GalleryItem.insertMany(initialGallery);
        }

        const galleryItems = await GalleryItem.find({}).sort({ order: 1 });

        // Cleanup duplicates based on image URL
        const uniqueItems = [];
        const seenImages = new Set();
        const duplicatesToDelete = [];

        for (const item of galleryItems) {
            if (seenImages.has(item.image)) {
                duplicatesToDelete.push(item._id);
            } else {
                seenImages.add(item.image);
                uniqueItems.push(item);
            }
        }

        if (duplicatesToDelete.length > 0) {
            await GalleryItem.deleteMany({ _id: { $in: duplicatesToDelete } });
            console.log(`Cleaned up ${duplicatesToDelete.length} duplicate gallery items.`);
        }

        return NextResponse.json(uniqueItems, {
            headers: {
                'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=59',
            }
        });
    } catch (error) {
        console.error('Error fetching gallery items:', error);
        return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const newItem = await GalleryItem.create(body);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
    }
}
