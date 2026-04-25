import { useState, useEffect } from 'react';

export function useSiteContent() {
    const [content, setContent] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/site-content');
                if (!res.ok) return;
                const data = await res.json();
                const map: Record<string, string> = {};
                data.forEach((item: any) => {
                    map[item.key] = item.value;
                });
                setContent(map);
            } catch (error) {
                console.error('Failed to fetch site content');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    return { content, loading };
}
