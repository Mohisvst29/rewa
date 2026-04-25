import mongoose, { Schema, models } from 'mongoose';

const ServiceSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    iconName: { type: String, required: true, default: 'Sparkles' },
    features: { type: [String], default: [] },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] }, // Additional images
    duration: { type: String, required: false }, // e.g., "3-5 أيام"
    pricing: { type: String, required: false }, // e.g., "يبدأ من 200 ريال"
    showPricing: { type: Boolean, default: false }, // Toggle price visibility
    order: { type: Number, default: 0 },
}, { timestamps: true });

export const Service = models.Service || mongoose.model('Service', ServiceSchema);
