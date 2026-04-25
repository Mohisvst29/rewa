import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "outline";
    className?: string;
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
    const baseStyles = "px-8 py-3 rounded-md transition-all duration-300 font-medium tracking-wide";
    const variants = {
        primary: "bg-gradient-to-r from-gold-primary to-gold-dark text-white hover:opacity-90 shadow-md",
        outline: "border border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-white",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
