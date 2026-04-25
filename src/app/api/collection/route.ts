import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { CollectionItem } from '@/models/CollectionItem';

export async function GET() {
    try {
        await dbConnect();

        const count = await CollectionItem.countDocuments();

        if (count === 0) {
            // Seed initial data if empty
            // Using repetition of available images as requested
            const initialCollection = [
                {
                    title: "جلابية ملكية فاخرة",
                    description: "جلابية مطرزة يدوياً بتصميم عصري وأقمشة فاخرة.",
                    category: "jalabiya",
                    image: "/siteimages/5151.webp",
                    isFeatured: true
                },
                {
                    title: "طقم إحرام مريح",
                    description: "طقم إحرام قطني 100% يوفر الراحة والبرودة أثناء المناسك.",
                    category: "ihram",
                    image: "/siteimages/download (46).webp",
                    isFeatured: true
                },
                {
                    title: "فستان سهرة أنيق",
                    description: "تفصيل فستان سهرة حسب الطلب بأعلى معايير الدقة.",
                    category: "women",
                    image: "/siteimages/Sustainable Fashion Sewing, Handcrafted Production, Silky Satin Fabrics, Nightwear Sewing.webp",
                    isFeatured: true
                },
                {
                    title: "تعديل فستان زفاف",
                    description: "تضييق وتعديل طول فستان زفاف ليبدو مثالياً.",
                    category: "alteration",
                    image: "/siteimages/download.webp",
                    isFeatured: false
                },
                {
                    title: "جلابية استقبال",
                    description: "تصميم مريح وأنيق لاستقبال الضيوف.",
                    category: "jalabiya",
                    image: "/siteimages/download (45).webp",
                    isFeatured: false
                },
                {
                    title: "إسدال صلاة",
                    description: "إسدال صلاة واسع وساتر ومريح.",
                    category: "ihram",
                    image: "/siteimages/Screenshot 2026-01-19 082828.webp",
                    isFeatured: false
                },
                {
                    title: "بلوزة وتنورة",
                    description: "طقم يومي مريح وعملي بتفصيل متقن.",
                    category: "women",
                    image: "/siteimages/Screenshot 2026-01-19 075710.webp",
                    isFeatured: false
                },
                {
                    title: "تقصير بنطلون",
                    description: "خدمة تقصير احترافية مع الحفاظ على الحافة الأصلية.",
                    category: "alteration",
                    image: "/siteimages/download (47).webp",
                    isFeatured: false
                }
            ];

            await CollectionItem.insertMany(initialCollection);
        }

        const items = await CollectionItem.find({}).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching collection items:', error);
        return NextResponse.json({ error: 'Failed to fetch collection items' }, { status: 500 });
    }
}
