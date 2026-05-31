"use client";

import type { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <article
      data-tilt
      className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-navy-900/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5"
    >
      {/* Hover gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon with background */}
      <div className="relative mb-5 inline-flex rounded-xl bg-blue-500/10 p-3 ring-1 ring-blue-500/20 transition-all duration-300 group-hover:bg-blue-500/15 group-hover:ring-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/10">
        {icon}
      </div>

      <h3 className="relative mb-2 text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="relative text-sm leading-relaxed text-slate-400">
        {description}
      </p>
    </article>
  );
}
