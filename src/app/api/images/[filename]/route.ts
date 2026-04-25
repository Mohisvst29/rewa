import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    await dbConnect();
    const { filename } = await params;

    try {
        const db = mongoose.connection.db;
        const bucket = new mongoose.mongo.GridFSBucket(db!, {
            bucketName: 'images',
        });

        const files = await bucket.find({ filename }).toArray();
        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const file = files[0];
        const stream = bucket.openDownloadStreamByName(filename);

        // Convert Node ReadableStream to Web ReadableStream
        const webStream = new ReadableStream({
            start(controller) {
                stream.on('data', (chunk) => controller.enqueue(chunk));
                stream.on('end', () => controller.close());
                stream.on('error', (err) => controller.error(err));
            },
        });

        return new NextResponse(webStream, {
            headers: {
                'Content-Type': (file.metadata as any)?.contentType || 'image/jpeg',
                'Cache-Control': 'public, max-age=1800',
            },
        });
    } catch (error) {
        console.error('Image fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}
