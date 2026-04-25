import type { Metadata, Viewport } from "next";
import { Cairo, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import dbConnect from "@/lib/db";
import { SiteContent } from "@/models/SiteContent";

const siteUrl = "https://www.noorrawaa.com/";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();

  let titleSuffix = " | خياطة رواء";

  let description =
    "مشغل خياطة رواء المتخصص في تصميم وتفصيل الأزياء النسائية والجلابيات وملابس الإحرام ومراييل المدارس وإحرامات العمرة والحج وإحرامات الصلاة والتعديلات والخياطة النسائية الشاملة في سيهات والقطيف والدمام والاحساء وجميع مدن المملكة العربية السعودية. دقة في التفصيل وجودة في الأقمشة لتناسب ذوقك الرفيع.";

  let keywordsStr =
    "خياطة نسائية السعودية, خياطة نسائية شاملة, مشغل خياطة السعودية, خياطة سيهات, خياطة القطيف, خياطة الدمام, خياطة الاحساء, مشغل نسائي سيهات, مشغل نسائي القطيف, مشغل نسائي الدمام, مشغل نسائي الاحساء, تفصيل جلابيات السعودية, تفصيل ملابس نسائية السعودية, مراييل مدارس السعودية, مراييل سيهات, مراييل الدمام, إحرامات عمرة وحج, إحرامات صلاة, تفصيل إحرام نسائي, تعديلات ملابس نسائية, خياطة شرق السعودية, خياطة المنطقة الشرقية, خياطة المملكة العربية السعودية";

  try {
    const suffixDoc = await SiteContent.findOne({ key: "seo_title_suffix" });
    if (suffixDoc?.value) titleSuffix = suffixDoc.value;

    const descDoc = await SiteContent.findOne({ key: "seo_default_description" });
    if (descDoc?.value) description = descDoc.value;

    const keysDoc = await SiteContent.findOne({ key: "seo_keywords" });
    if (keysDoc?.value) keywordsStr = keysDoc.value;
  } catch (e) {
    console.error("Failed to fetch SEO settings", e);
  }

  const keywords = keywordsStr.split(",").map((k) => k.trim());

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `خياطة رواء${titleSuffix}`,
      template: `%s${titleSuffix}`,
    },
    description: description,
    keywords: keywords,
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `خياطة رواء${titleSuffix}`,
      description: description,
      url: siteUrl,
      siteName: "خياطة رواء",
      locale: "ar_SA",
      type: "website",
      images: [
        {
          url: `${siteUrl}logo.webp`,
          width: 1200,
          height: 630,
          alt: "خياطة رواء",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `خياطة رواء${titleSuffix}`,
      description: description,
      images: [`${siteUrl}logo.webp`],
    },
    icons: {
      icon: "/logo.webp",
      shortcut: "/logo.webp",
      apple: "/logo.webp",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#FFFBF2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MJ8X123');
          `,
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ENKKMRLWT1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ENKKMRLWT1');
            `,
          }}
        />

        {/* Advanced Local SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Tailor",
                "@id": siteUrl,
                name: "خياطة رواء",
                image: `${siteUrl}logo.webp`,
                url: siteUrl,
                telephone: "+966565560831",
                priceRange: "$$",
                areaServed: [
                  { "@type": "City", "name": "سيهات" },
                  { "@type": "City", "name": "القطيف" },
                  { "@type": "City", "name": "الدمام" },
                  { "@type": "City", "name": "الاحساء" },
                  { "@type": "AdministrativeArea", "name": "المنطقة الشرقية" },
                  { "@type": "Country", "name": "المملكة العربية السعودية" }
                ],
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "SA",
                  addressRegion: "Eastern Province"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "خياطة رواء",
                url: siteUrl,
                logo: `${siteUrl}logo.webp`,
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+966565560831",
                  contactType: "customer service",
                  areaServed: "SA",
                  availableLanguage: "Arabic"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "خياطة رواء",
                url: siteUrl,
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${siteUrl}?s={search_term_string}`,
                  "query-input": "required name=search_term_string"
                }
              }
            ]),
          }}
        />

      </head>

      <body className={`${cairo.variable} ${greatVibes.variable} antialiased font-sans`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJ8X123"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />
        <main className="min-h-screen">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
