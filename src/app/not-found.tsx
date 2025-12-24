'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col">
            <NavigationHeader />

            <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0d9488]/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0d9488]/3 rounded-full blur-3xl -z-10" />

                <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Subtle 404 Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d9488]/10 border border-[#0d9488]/20 text-[#0d9488] text-[11px] font-bold uppercase tracking-wider">
                        Error 404
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-[#0a0a0b] italic font-['Playfair_Display']">
                            Lost in <span className="text-[#0d9488]">Data.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#52525b] max-w-lg mx-auto leading-relaxed font-medium">
                            The page you are looking for has been moved, removed, or never existed in our strategy framework.
                        </p>
                    </div>

                    {/* Action Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-md mx-auto">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 bg-[#0a0a0b] text-white py-4 px-6 rounded-xl font-semibold text-[14px] hover:bg-[#27272a] transition-all active:scale-[0.98] shadow-lg shadow-black/5"
                        >
                            <Home className="w-4 h-4" />
                            Return Home
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 bg-white text-[#0a0a0b] py-4 px-6 rounded-xl font-semibold text-[14px] border border-[#e4e4e7] hover:border-[#0d9488]/50 hover:bg-[#0d9488]/5 transition-all active:scale-[0.98]"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Contact Support
                        </Link>
                    </div>

                    {/* Quick Search Suggestion */}
                    <div className="pt-12 border-t border-gray-100 mt-12">
                        <p className="text-[12px] text-[#a1a1aa] font-medium uppercase tracking-widest mb-6">Popular Insights</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['Strategy', 'Memberships', 'Consulting', 'Options'].map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/solutions`}
                                    className="px-4 py-2 rounded-lg bg-white border border-[#e4e4e7] text-[13px] text-[#52525b] font-medium hover:text-[#0d9488] hover:border-[#0d9488]/30 transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
