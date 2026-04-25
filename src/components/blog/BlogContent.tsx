"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { createRoot } from "react-dom/client";

export default function BlogContent({ content }: { content: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Add copy buttons to code blocks
        const preElements = containerRef.current.querySelectorAll("pre");
        preElements.forEach((pre) => {
            if (pre.parentNode && (pre.parentNode as HTMLElement).style.position !== 'relative') {
                (pre.parentNode as HTMLElement).style.position = 'relative';
            }

            // Avoid adding multiple buttons if re-render
            if (pre.querySelector('.copy-btn-container')) return;

            const buttonContainer = document.createElement("div");
            buttonContainer.className = "copy-btn-container absolute top-2 left-2 z-10";
            pre.appendChild(buttonContainer);

            const root = createRoot(buttonContainer);
            root.render(<CopyButton text={pre.innerText} />);
        });

        // Optional: Simple scroll reveal
        const texts = containerRef.current.querySelectorAll("p, li, h2, h3, h4");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fade-in-up");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        texts.forEach(el => observer.observe(el));

        return () => observer.disconnect();

    }, [content]);

    return (
        <div
            ref={containerRef}
            className="prose prose-lg md:prose-xl max-w-none font-sans text-gray-700 leading-10 prose-headings:text-[#5A4A42] prose-headings:font-bold prose-a:text-[#C5A038] prose-img:rounded-2xl prose-strong:text-[#8B6F21] prose-pre:bg-[#282c34] prose-pre:text-gray-100 prose-pre:shadow-lg prose-pre:rounded-xl prose-pre:p-0"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10"
            title="نسخ الكود"
        >
            {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
    );
}
