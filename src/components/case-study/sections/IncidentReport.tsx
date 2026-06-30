import React from "react";
import { Challenge, TimelinePhase } from "@/types/case-study";
import * as LucideIcons from "lucide-react";

export function ChallengesTimeline({ challenges }: { challenges: Challenge[] }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6">Engineering Challenges</h2>
      <div className="space-y-12">
        {challenges.map((c, i) => (
          <div key={`challenge-${i}`} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-xl relative overflow-hidden">
            {/* Header: Incident Report */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
              <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                <LucideIcons.Siren className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Incident Report</h3>
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest mt-1">Severity: High • Resolution: Complete</p>
              </div>
            </div>

            <div className="relative pl-6 md:pl-10 space-y-8 border-l-2 border-white/5">
              
              {/* Problem */}
              <div className="relative">
                <div className="absolute -left-[33px] md:-left-[49px] top-1 w-4 h-4 bg-black border-2 border-red-500 rounded-full" />
                <strong className="text-red-400 text-sm font-bold uppercase tracking-widest block mb-2">Problem</strong>
                <p className="text-white/80 font-light leading-relaxed">{c.problem}</p>
              </div>

              {/* Root Cause */}
              <div className="relative">
                <div className="absolute -left-[33px] md:-left-[49px] top-1 w-4 h-4 bg-black border-2 border-amber-500 rounded-full" />
                <strong className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-2">Root Cause</strong>
                <p className="text-white/80 font-light leading-relaxed">{c.rootCause}</p>
              </div>

              {/* Solution */}
              <div className="relative">
                <div className="absolute -left-[33px] md:-left-[49px] top-1 w-4 h-4 bg-black border-2 border-blue-500 rounded-full" />
                <strong className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-2">Solution</strong>
                <p className="text-white/80 font-light leading-relaxed">{c.solution}</p>
              </div>

              {/* Outcome & Lesson */}
              <div className="relative">
                <div className="absolute -left-[33px] md:-left-[49px] top-1 w-4 h-4 bg-black border-2 border-emerald-500 rounded-full" />
                <strong className="text-emerald-400 text-sm font-bold uppercase tracking-widest block mb-2">Outcome & Lesson Learned</strong>
                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                  <p className="text-white/90 font-medium italic">&quot;{c.outcome}&quot;</p>
                  <p className="text-white/60 text-sm font-light">{c.lessons}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DevelopmentTimeline({ timeline }: { timeline: TimelinePhase[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Development Timeline</h2>
      <div className="flex flex-col gap-4 relative">
        {timeline.map((t, i) => (
          <div key={`timeline-${t.phase}-${i}`} className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-white/40 text-sm shrink-0">
              0{i + 1}
            </div>
            <div className="flex-1 p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-1">{t.phase}</h3>
              <p className="text-white/60 font-light text-sm">{t.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LessonsSection({ lessons }: { lessons: string[] }) {
  if (!lessons || lessons.length === 0) return null;
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6">Lessons Learned</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((l, i) => (
          <div key={`lesson-${i}`} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative group hover:border-white/20 transition-colors">
            <LucideIcons.Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-white/10 transition-colors" />
            <div className="flex gap-4 items-start text-white/80 font-light relative z-10">
              <div className="mt-1">
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold border border-accent/30">
                  {i + 1}
                </span>
              </div>
              <p className="leading-relaxed italic text-white/90">&quot;{l}&quot;</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
