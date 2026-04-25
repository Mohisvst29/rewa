"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) return null;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-12 flex justify-between items-center
            ${isScrolled ? "bg-[#F2EFE9]/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"}`}
        >
            {/* Mobile Menu Button - Left Side on Mobile */}
            <button
                className="md:hidden text-[#5A4A42] hover:text-gold-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-base font-bold text-[#5A4A42]">
                <NavLink href="/" active={pathname === "/"}>الرئيسية</NavLink>
                <NavLink href="/services" active={pathname.startsWith("/services")}>خدماتنا</NavLink>
                <NavLink href="/collection" active={pathname === "/collection"}>التشكيلة</NavLink>
                <NavLink href="/about" active={pathname === "/about"}>من نحن</NavLink>
                <NavLink href="/blog" active={pathname.startsWith("/blog")}>المدونة</NavLink>
                <NavLink href="/contact" active={pathname === "/contact"}>تواصل معنا</NavLink>
            </div>

            {/* Logo - Center/Right layout adjustment - Logo is now visually on the other side if flex order is kept or we just swapped placement in code */}
            <Link href="/" className="flex items-center relative w-16 h-16 md:w-20 md:h-20 transition-all duration-300">
                <Image
                    src="/logo.webp"
                    alt="Rawaa Logo"
                    fill
                    className="object-contain"
                />
            </Link>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col items-center gap-6 py-8 md:hidden overflow-hidden"
                    >
                        <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>الرئيسية</MobileNavLink>
                        <MobileNavLink href="/services" onClick={() => setIsMobileMenuOpen(false)}>خدماتنا</MobileNavLink>
                        <MobileNavLink href="/collection" onClick={() => setIsMobileMenuOpen(false)}>التشكيلة</MobileNavLink>
                        <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>من نحن</MobileNavLink>
                        <MobileNavLink href="/blog" onClick={() => setIsMobileMenuOpen(false)}>المدونة</MobileNavLink>
                        <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>تواصل معنا</MobileNavLink>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        <Link href={href} className="relative group">
            <span className={`hover:text-gold-primary transition-colors ${active ? "text-gold-primary" : ""}`}>
                {children}
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A038] transition-all duration-300 group-hover:w-full" />
            {active && (
                <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C5A038]"
                />
            )}
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-lg font-bold text-[#5A4A42] hover:text-gold-primary w-full text-center py-2 hover:bg-gray-50 transition-colors"
        >
            {children}
        </Link>
    );
}
