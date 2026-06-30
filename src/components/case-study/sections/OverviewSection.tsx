import React from "react";
import { Overview, ProblemStatement, Solution, EngineeringDecision, Feature } from "@/types/case-study";
import * as LucideIcons from "lucide-react";

// --- OVERVIEW ---
export function OverviewSection({ data }: { data: Overview }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Executive Summary</h2>
      <div className="text-lg text-white/70 leading-relaxed font-light space-y-6">
        <p><strong className="text-white font-semibold">What:</strong> {data.what}</p>
        <p><strong className="text-white font-semibold">Who:</strong> {data.who}</p>
        <p><strong className="text-white font-semibold">Why:</strong> {data.why}</p>
        <div className="p-6 mt-8 rounded-2xl bg-accent/10 border border-accent/20">
          <p className="text-accent font-medium leading-relaxed"><strong className="text-white">Business Value:</strong> {data.businessValue}</p>
        </div>
      </div>
    </div>
  );
}

// --- PROBLEM ---
export function ProblemSection({ data }: { data: ProblemStatement }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">The Problem</h2>
      <div className="text-lg text-white/70 leading-relaxed font-light space-y-6">
        <p>{data.problem}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-sm">
            <h3 className="text-white font-semibold mb-2 uppercase tracking-wider text-xs">Technical Difficulty</h3>
            <p className="text-white/60">{data.difficulty}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-sm">
            <h3 className="text-white font-semibold mb-2 uppercase tracking-wider text-xs">Existing Limitations</h3>
            <p className="text-white/60">{data.limitations}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Core Pain Points</h3>
          <ul className="space-y-3">
            {data.painPoints.map((p, i) => (
              <li key={`painpoint-${i}`} className="flex gap-3 items-start">
                <LucideIcons.AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// --- SOLUTION ---
export function SolutionSection({ data, decisions }: { data: Solution, decisions?: EngineeringDecision[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
      <div className="grid gap-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10">
          <h3 className="text-white font-semibold mb-3">Architecture & Workflow</h3>
          <p className="text-white/70 leading-relaxed font-light mb-4 whitespace-pre-wrap">{data.architecture}</p>
          <div className="bg-black/40 px-4 py-3 rounded-lg border border-white/5 font-mono text-sm text-accent/80 whitespace-pre-wrap">
            {data.workflow}
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-white/70 font-light">
          <strong className="text-white font-semibold block mb-2">How it Fixes the Problem:</strong>
          {data.howItFixes}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="text-white font-semibold mb-2">Scalability</h3>
            <p className="text-white/70 font-light text-sm">{data.scalability}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="text-white font-semibold mb-2">Security</h3>
            <p className="text-white/70 font-light text-sm">{data.security}</p>
          </div>
        </div>
      </div>

      {decisions && decisions.length > 0 && (
        <div className="mt-16 pt-16 border-t border-white/10">
          <EngineeringDecisions decisions={decisions} />
        </div>
      )}
    </div>
  );
}

// --- ENGINEERING DECISIONS ---
export function EngineeringDecisions({ decisions }: { decisions: EngineeringDecision[] }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-2">Engineering Decisions</h2>
      <p className="text-white/50 mb-8 font-light text-lg">Detailed analysis of the technical tradeoffs and reasoning.</p>
      
      <div className="grid gap-12">
        {decisions.map((d, i) => (
          <div key={`decision-${d.technology}-${i}`} className="flex flex-col gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <LucideIcons.Code2 className="w-32 h-32" />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-2 relative z-10">{d.technology}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mt-4">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2 flex items-center gap-2">
                    <LucideIcons.CheckCircle2 className="w-4 h-4" /> Why Chosen
                  </span>
                  <p className="text-white/80 font-light leading-relaxed">{d.why}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2 flex items-center gap-2">
                    <LucideIcons.TrendingUp className="w-4 h-4" /> Benefits
                  </span>
                  <p className="text-white/80 font-light leading-relaxed">{d.benefits}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2 flex items-center gap-2">
                    <LucideIcons.GitCompare className="w-4 h-4" /> Alternatives Considered
                  </span>
                  <p className="text-white/60 font-light leading-relaxed text-sm">{d.alternativesConsidered}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-400/80 uppercase tracking-widest block mb-2 flex items-center gap-2">
                    <LucideIcons.Scale className="w-4 h-4" /> Tradeoffs
                  </span>
                  <p className="text-white/60 font-light leading-relaxed text-sm">{d.tradeoffs}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-xs font-bold text-white/60 uppercase tracking-widest block mb-1">Lesson Learned</span>
                  <p className="text-white/80 font-light text-sm italic">&quot;{d.lessonsLearned}&quot;</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- FEATURES GRID ---
export function FeaturesGrid({ features }: { features: Feature[] }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6">Core Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => {
          // @ts-expect-error - dynamic icon loading
          const Icon = LucideIcons[f.icon] || LucideIcons.Code;
          return (
            <div key={`feature-${f.title}-${i}`} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-white/60 mb-6 font-light">{f.description}</p>
              <div className="text-sm text-accent/80 font-medium">Business Value: {f.businessValue}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
