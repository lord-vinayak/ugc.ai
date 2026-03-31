import React from 'react'

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
    <button className={`relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95 btn-glow bg-black/50 border border-white/10 backdrop-blur-md overflow-hidden group ${className}`} {...props} >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
);

export const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
    <button className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-xl active:scale-95 transition-all text-gray-300 hover:text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] ${className}`} {...props} >
        {children}
    </button>
);