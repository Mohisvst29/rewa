"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({ content }: { content: string }) {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Parse content string to find headings (h2, h3)
        // Note: In a real app with dangerouslySetInnerHTML, we might better parse the DOM elements
        // after render. Since we are in a separate component and 'content' is passed, 
        // we can try regex or wait for DOM. Parsing text is safer for server/client mismatch, 
        // but 'content' props might not reflect final DOM if other transforms happen.
        // Better approach: Query selector on the article content.

        const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3'));
        const items = elements.map((elem) => ({
            id: elem.id || elem.innerHTML.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            text: elem.textContent || "",
            level: parseInt(elem.tagName.substring(1))
        }));

        // Assign IDs if missing
        elements.forEach((elem, index) => {
            if (!elem.id) {
                elem.id = items[index].id;
            }
        });

        setHeadings(items);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => observer.disconnect();
    }, [content]); // Re-run if content changes

    if (headings.length === 0) return null;

    return (
        <nav className="hidden lg:block sticky top-24 self-start max-h-[80vh] overflow-y-auto w-64 p-4 ml-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#C5A038]/10">
            <h4 className="font-bold text-[#5A4A42] mb-4 text-lg border-b border-[#C5A038]/20 pb-2">محتويات المقال</h4>
            <ul className="space-y-3">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingRight: heading.level === 3 ? '1rem' : '0' }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`block text-sm transition-all duration-300 border-r-2 pr-3 py-1 ${activeId === heading.id
                                    ? "border-[#C5A038] text-[#C5A038] font-bold bg-[#C5A038]/5"
                                    : "border-transparent text-gray-500 hover:text-[#5A4A42]"
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
