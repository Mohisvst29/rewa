import mongoose, { Schema, Model, models } from 'mongoose';

export interface ICollectionItem {
    title: string;
    description: string;
    category: 'jalabiya' | 'ihram' | 'alteration' | 'women' | 'prayer_ihram' | 'uniform';
    image: string;
    isFeatured: boolean;
    createdAt: Date;
}

const CollectionItemSchema = new Schema<ICollectionItem>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['jalabiya', 'ihram', 'alteration', 'women', 'prayer_ihram', 'uniform']
    },
    image: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export const CollectionItem: Model<ICollectionItem> = models.CollectionItem || mongoose.model('CollectionItem', CollectionItemSchema);
