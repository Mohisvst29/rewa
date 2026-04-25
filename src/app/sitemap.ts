import { MetadataRoute } from "next";
import dbConnect from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  const baseUrl = "https://www.noorrawaa.com";

  // الصفحات الأساسية
  const staticRoutes = [
    "",
    "/about",
    "/collection",
    "/blog",
    "/contact",
    "/services",
    "/faq",
    "/refund-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.9,
  }));

  // صفحات الخدمات الجديدة
  const serviceRoutes = [
    "/services/مراييل",
    "/services/إحرامات-عمرة-وحج",
    "/services/إحرامات-صلاة",
    "/services/تعديلات",
    "/services/خياطة-نسائية-شاملة",
    "/services/خياطة-جلابيات",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // مقالات المدونة
  const posts = await BlogPost.find({ status: "published" }).select(
    "slug updatedAt"
  );

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
