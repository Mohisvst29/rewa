import mongoose, { Schema, models } from 'mongoose';

const SiteContentSchema = new Schema({
    key: { type: String, required: true, unique: true }, // e.g., 'hero_bg', 'hero_main'
    value: { type: String, required: true }, // The image URL
    label: { type: String, required: true }, // Human readable label
    type: { type: String, default: 'image' } // 'image', 'text'
}, { timestamps: true });

export const SiteContent = models.SiteContent || mongoose.model('SiteContent', SiteContentSchema);
