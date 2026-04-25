import mongoose, { Schema, models } from 'mongoose';

const GallerySchema = new Schema({
    title: { type: String, required: false },
    image: { type: String, required: true },
    category: { type: String, default: 'general' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export const GalleryItem = models.GalleryItem || mongoose.model('GalleryItem', GallerySchema);
