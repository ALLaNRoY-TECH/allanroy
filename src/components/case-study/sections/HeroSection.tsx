import React, { useEffect, useRef, useState } from "react";
import { CaseStudyHero as ICaseStudyHero, EngineeringOverview as IEngineeringOverview, Metric } from "@/types/case-study";
import * as LucideIcons from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// --- HERO ---
export function CaseStudyHero({ hero }: { hero: ICaseStudyHero }) {
  return (
    <div className="pt-24 px-6 md:px-16 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        {hero.status} • {hero.completed}
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">{hero.title}</h1>
      <p className="text-xl md:text-3xl text-white/60 max-w-3xl font-light mb-12">{hero.subtitle}</p>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
        <a href={hero.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
          <FaGithub className="w-4 h-4" /> View Repository
        </a>
        {hero.liveUrl && (
          <a href={hero.liveUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20 flex items-center justify-center gap-2">
            <FaExternalLinkAlt className="w-4 h-4" /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

// --- ENGINEERING OVERVIEW (Premium Dashboard) ---
export function EngineeringOverview({ data }: { data: IEngineeringOverview }) {
  const isPlaceholder = (val?: string) => !val || val === "[To Be Documented]";

  const fields = [
    { icon: LucideIcons.FolderGit2, label: "Project Type", value: data.projectType },
    { icon: LucideIcons.Clock, label: "Complexity", value: data.complexity },
    { icon: LucideIcons.LayoutTemplate, label: "Frontend", value: data.frontend },
    { icon: LucideIcons.Server, label: "Backend", value: data.backend },
    { icon: LucideIcons.Database, label: "Database", value: data.database },
    { icon: LucideIcons.Bot, label: "AI & APIs", value: data.ai },
    { icon: LucideIcons.Cloud, label: "Deployment", value: data.deployment },
  ].filter(f => !isPlaceholder(f.value));

  return (
    <div className="w-full">
      <div className="p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Tech Stack / Meta */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2">Technical Overview</h3>
            <div className="grid grid-cols-1 gap-4">
              {fields.map((c, i) => (
                <div key={`overview-card-${i}`} className="flex items-center justify-between border-b border-white/5 pb-3 group">
                  <div className="flex items-center gap-3 text-white/50 group-hover:text-white/80 transition-colors">
                    <c.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{c.label}</span>
                  </div>
                  <span className="text-white font-semibold text-sm text-right max-w-[60%] truncate">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Metrics */}
          {data.metrics && data.metrics.length > 0 && (
            <div className="flex flex-col gap-6 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-8">
              <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2">Project Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {data.metrics.map((m, i) => (
                  <AnimatedCounter key={`metric-${m.label}-${i}`} metric={m} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnimatedCounter({ metric }: { metric: Metric }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * metric.value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) requestAnimationFrame(animate);
    });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [metric.value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-2xl">
      <div className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
        {metric.prefix}{count}{metric.suffix}
      </div>
      <div className="text-xs font-bold text-accent uppercase tracking-widest">{metric.label}</div>
    </div>
  );
}
