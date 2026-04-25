"use client";

import BlogEditor from "@/app/admin/blog/new/page";

export default function EditBlogPage({ params }: { params: { id: string } }) {
    return <BlogEditor params={params} />;
}
