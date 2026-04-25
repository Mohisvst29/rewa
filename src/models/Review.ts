import mongoose, { Schema, models, Model } from 'mongoose';

export interface IReview {
    name: string;
    text: string;
    rating: number; // 1-5
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
    name: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export const Review: Model<IReview> = models.Review || mongoose.model<IReview>('Review', ReviewSchema);
