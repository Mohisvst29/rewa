import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_NUMBER, getInquiryWhatsAppUrl } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="relative bg-[#FAEED1] pt-12 pb-8 overflow-hidden">
            {/* Gradient Overlay for that soft look */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8E7] to-[#FCEBC4] opacity-80 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 md:w-40 md:h-40">
                            <Image
                                src="/logo.webp"
                                alt="Rawaa Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Center Section: Socials & Connect */}
                    <div className="flex flex-col items-center gap-6 flex-1">
                        <div className="flex gap-3">
                            <SocialIcon href={`https://wa.me/${WHATSAPP_NUMBER}`} icon={<WhatsappIcon />} />
                            <SocialIcon href="#" icon={<SnapchatIcon />} />
                            <SocialIcon href="#" icon={<XIcon />} />
                            <SocialIcon href="#" icon={<LinkedinIcon />} />
                            <SocialIcon href="https://www.instagram.com/rawaa_boutique1?utm_source=qr&igsh=dXI3cjB0MHlsNnY2" icon={<InstagramIcon />} />
                            <SocialIcon href="#" icon={<FacebookIcon />} />
                        </div>

                        <a href={getInquiryWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1da851] text-white text-lg md:text-xl font-bold py-3 px-12 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 block text-center border-2 border-[#C5A038]">
                            تواصل عبر واتساب
                        </a>

                    </div>

                    {/* Map Section Removed as per request */}

                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#D4C3A3] mb-6" />

                {/* Copyright Section */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center gap-4">
                        <Link href="/faq" className="block text-[#8B7355] hover:text-[#D4AF37] hover:underline font-medium text-sm">
                            الأسئلة الشائعة
                        </Link>
                        <Link href="#" className="block text-[#8B7355] hover:text-[#D4AF37] hover:underline font-medium text-sm">
                            الشروط والأحكام
                        </Link>
                        <Link href="/refund-policy" className="block text-[#8B7355] hover:text-[#D4AF37] hover:underline font-medium text-sm">
                            سياسة الإستبدال والإسترجاع
                        </Link>
                    </div>
                    <div className="text-[#8B7355] text-sm font-arabic">
                        <p>رواء © 2026. جميع الحقوق محفوظة.</p>
                        <a href="https://api.whatsapp.com/send/?phone=966541430116&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-xs mt-1 text-[#D4AF37] font-bold hover:underline">RWAD عن تصميم</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-700 hover:text-[#D4AF37] hover:shadow-md transition-all duration-300"
        >
            {icon}
        </a>
    );
}

// Simple SVG Icons to match the design exactly
const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);
const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
);
const SnapchatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
        <path d="M12 2.5c-4.1 0-7.5 3.1-7.5 7 0 1.6.6 3.1 1.6 4.3.4.5.3 1.3-.3 1.8-.7.6-1.4 1.2-1.4 1.2s1.8.4 2.4.5c.3.1.6.4.6.8-.1.7-.8 1.4-1.8 1.6 0 0 .5.7 1.8.7 1.3 0 2.2-.6 2.2-.6s.4 1.1 2.3 1.1c1.9 0 2.4-1.1 2.4-1.1s.9.6 2.3.6c1.3 0 1.8-.7 1.8-.7 1-.3 1.7-1.6 1.7-1.6-.9-.1-1.7-.9-1.8-1.7 0-.3.3-.7.6-.8.6-.1 2.4-.5 2.4-.5s-.7-.6-1.4-1.2c-.6-.5-.7-1.3-.3-1.8 1-1.2 1.6-2.7 1.6-4.3 0-3.9-3.4-7-7.5-7z" />
    </svg>
);
const WhatsappIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 2.109.91 2.536.728 2.982.684.665-.066 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);
