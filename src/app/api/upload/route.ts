import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;

        const db = mongoose.connection.db;
        const bucket = new mongoose.mongo.GridFSBucket(db!, {
            bucketName: 'images',
        });

        const uploadStream = bucket.openUploadStream(filename, {
            metadata: { contentType: file.type },
        });

        await new Promise<void>((resolve, reject) => {
            uploadStream.on('error', reject);
            uploadStream.on('finish', resolve);
            uploadStream.write(buffer);
            uploadStream.end();
        });

        // Return the URL that will serve this image
        const imageUrl = `/api/images/${filename}`;

        return NextResponse.json({
            url: imageUrl,
            filename: filename,
            message: 'File uploaded successfully'
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
