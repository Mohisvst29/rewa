"use client";

import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
    const [copied, setCopied] = useState(false);

    // Assuming the site URL is localhost or env var, but for buttons we use window.location in client
    // or pass full URL. We'll constructs full URL properly.

    // Simplification for the example:
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareData = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };

    return (
        <div className="flex items-center gap-3">
            <span className="font-bold text-[#5A4A42]">مشاركة:</span>
            <div className="flex gap-2">
                <button
                    onClick={copyToClipboard}
                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#C5A038] hover:text-white transition-all relative"
                    title="Copy Link"
                >
                    {copied ? <Check size={18} /> : <Link2 size={18} />}
                </button>
                <a
                    href={shareData.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                >
                    <Facebook size={18} />
                </a>
                <a
                    href={shareData.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"
                >
                    <Twitter size={18} />
                </a>
                <a
                    href={shareData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all"
                >
                    <Linkedin size={18} />
                </a>
            </div>
        </div>
    );
}
