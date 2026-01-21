"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PaginationButton({ href }: { href: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <Link
        href={href}
        // Manual smooth scroll to top on click
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group relative flex items-center gap-6 px-20 py-6 bg-white text-black rounded-full font-black uppercase tracking-tighter text-lg hover:bg-[#e11d48] hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(225,29,72,0.2)] active:scale-95"
      >
        <span>Explore More</span>
        <ChevronRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
      </Link>
      <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
        Click to refresh index
      </p>
    </div>
  );
}
