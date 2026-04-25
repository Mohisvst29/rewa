import mongoose, { Schema, models, Model } from 'mongoose';

export interface IBlogPost {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    category: string;
    tags: string[];
    status: 'published' | 'draft';
    views: number;
    // SEO Fields
    autoSEO: boolean;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    manualSEO?: {
        title?: string;
        description?: string;
        keywords?: string[];
        ogImage?: string;
        canonicalUrl?: string;
        noIndex?: boolean;
        noFollow?: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    category: { type: String, default: 'General' },
    tags: [{ type: String }],
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
    views: { type: Number, default: 0 },
    // SEO Fields
    autoSEO: { type: Boolean, default: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: [String] },
    manualSEO: {
        title: String,
        description: String,
        keywords: [String],
        ogImage: String,
        canonicalUrl: String,
        noIndex: Boolean,
        noFollow: Boolean,
    },
}, { timestamps: true });

// Index for faster slug lookups
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ status: 1, createdAt: -1 });

export const BlogPost: Model<IBlogPost> = models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
