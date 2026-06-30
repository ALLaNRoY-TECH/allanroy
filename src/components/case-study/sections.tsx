import React, { useState } from "react";
import { CaseStudyHero as ICaseStudyHero, EngineeringOverview as IEngineeringOverview, Overview, ProblemStatement, Solution, EngineeringDecision, Feature, Architecture, ApiEndpoint, DatabaseDesign, SecurityInfo, PerformanceInfo, AiIntegration, Challenge, TimelinePhase, RepositoryInfo, Metric } from "@/types/case-study";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";

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
      
      <div className="flex gap-4 mt-8">
        <a href={hero.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors flex items-center gap-2">
          <LucideIcons.Github className="w-4 h-4" /> View Repository
        </a>
        {hero.liveUrl && (
          <a href={hero.liveUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20 flex items-center gap-2">
            <LucideIcons.ExternalLink className="w-4 h-4" /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

// --- ENGINEERING OVERVIEW (Premium Dashboard) ---
export function EngineeringOverview({ data }: { data: IEngineeringOverview }) {
  const cards = [
    { icon: LucideIcons.FolderGit2, label: "Project Type", value: data.projectType },
    { icon: LucideIcons.UserCog, label: "Role", value: "Full-Stack Engineer" }, // Hardcoded or passed from hero
    { icon: LucideIcons.Clock, label: "Complexity", value: data.complexity },
    { icon: LucideIcons.LayoutTemplate, label: "Frontend", value: data.frontend },
    { icon: LucideIcons.Server, label: "Backend", value: data.backend },
    { icon: LucideIcons.Database, label: "Database", value: data.database },
    { icon: LucideIcons.Bot, label: "AI Model", value: data.ai },
    { icon: LucideIcons.Cloud, label: "Deployment", value: data.deployment },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-2 text-white/40 mb-1">
              <c.icon className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">{c.label}</span>
            </div>
            <span className="text-white font-medium text-sm md:text-base">{c.value}</span>
          </div>
        ))}
      </div>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {data.metrics.map((m, i) => (
          <AnimatedCounter key={i} metric={m} />
        ))}
      </div>
    </div>
  );
}

function AnimatedCounter({ metric }: { metric: Metric }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
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
              <li key={i} className="flex gap-3 items-start">
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
export function SolutionSection({ data }: { data: Solution }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
      <div className="grid gap-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10">
          <h3 className="text-white font-semibold mb-3">Architecture & Workflow</h3>
          <p className="text-white/70 leading-relaxed font-light mb-4">{data.architecture}</p>
          <div className="bg-black/40 px-4 py-3 rounded-lg border border-white/5 font-mono text-sm text-accent/80">
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
          <div key={i} className="flex flex-col gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
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
                  <p className="text-white/80 font-light text-sm italic">"{d.lessonsLearned}"</p>
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
          // @ts-ignore - dynamic icon loading
          const Icon = LucideIcons[f.icon] || LucideIcons.Code;
          return (
            <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
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

// --- INTERACTIVE ARCHITECTURE ---
export function ArchitectureSection({ architecture }: { architecture: Architecture }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    { id: "frontend", icon: LucideIcons.LayoutTemplate, label: "Frontend", data: architecture.frontend },
    { id: "backend", icon: LucideIcons.Server, label: "Backend", data: architecture.backend },
    { id: "database", icon: LucideIcons.Database, label: "Database", data: architecture.database },
    ...(architecture.ai ? [{ id: "ai", icon: LucideIcons.Brain, label: "AI Model", data: architecture.ai }] : []),
    ...(architecture.external ? [{ id: "external", icon: LucideIcons.Globe, label: "External API", data: architecture.external }] : []),
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6">System Architecture</h2>
      <p className="text-white/50 font-light">Hover over any component to view its responsibilities and tech stack.</p>
      
      <div className="p-8 md:p-12 rounded-3xl bg-[#0a0a0a] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        
        {/* Nodes Column */}
        <div className="flex flex-col gap-6 relative z-10 w-full md:w-1/2">
          {nodes.map((node, i) => (
            <div key={node.id} className="relative group">
              <div 
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                  hoveredNode === node.id || (!hoveredNode && i === 0)
                  ? 'bg-accent/10 border-accent/50 shadow-[0_0_30px_rgba(109,93,254,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onMouseEnter={() => setHoveredNode(node.id)}
              >
                <div className={`p-3 rounded-xl ${hoveredNode === node.id || (!hoveredNode && i === 0) ? 'bg-accent/20 text-accent' : 'bg-white/10 text-white/50'}`}>
                  <node.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{node.label}</h4>
                  <p className="text-white/40 text-xs font-mono mt-1">{node.data.name}</p>
                </div>
              </div>
              
              {/* Animated Connection Line (Desktop) */}
              {i < nodes.length - 1 && (
                <div className="hidden md:block absolute left-10 top-full w-[2px] h-6 bg-white/10 overflow-hidden">
                  <motion.div 
                    className="w-full h-full bg-accent"
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: i * 0.2 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Panel Column */}
        <div className="w-full md:w-1/2 relative z-10">
          <AnimatePresence mode="wait">
            {nodes.map((node, i) => {
              const isActive = hoveredNode === node.id || (!hoveredNode && i === 0);
              if (!isActive) return null;
              
              return (
                <motion.div 
                  key={node.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-3 text-accent mb-2">
                    <node.icon className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">{node.label} Details</h3>
                  </div>
                  
                  <div>
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Responsibility</span>
                    <p className="text-white/80 font-light leading-relaxed">{node.data.description}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {node.data.technologies.split(',').map(t => (
                        <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/80">{t.trim()}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Global Flow Indicator */}
        <div className="absolute bottom-4 right-8 text-xs font-mono text-white/20">
          Data Flow: {architecture.communicationFlow}
        </div>
      </div>
    </div>
  );
}

// --- API TABLE ---
export function ApiTable({ apis }: { apis: ApiEndpoint[] }) {
  if (!apis || apis.length === 0) return null;
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">API Documentation</h2>
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs tracking-widest uppercase bg-black/40">
                <th className="p-4 font-bold">Endpoint</th>
                <th className="p-4 font-bold">Purpose</th>
                <th className="p-4 font-bold">Auth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80 font-light text-sm">
              {apis.map((api, i) => (
                <React.Fragment key={i}>
                  <tr className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 align-top">
                      <div className="flex flex-col gap-2">
                        <span className="font-mono text-accent bg-accent/10 px-2 py-1 rounded w-fit text-xs font-bold">{api.endpoints.split(' ')[0]}</span>
                        <span className="font-mono text-white/70">{api.endpoints.split(' ').slice(1).join(' ')}</span>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="mb-2">{api.purpose}</p>
                      <p className="text-xs text-white/40 italic">"{api.reason}"</p>
                    </td>
                    <td className="p-4 align-top">
                      <span className="bg-white/10 px-2 py-1 rounded-full text-xs">{api.authentication}</span>
                    </td>
                  </tr>
                  {/* Example Usage Row */}
                  <tr className="bg-black/20">
                    <td colSpan={3} className="px-4 py-3 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <LucideIcons.Terminal className="w-4 h-4 text-white/30" />
                        <code className="font-mono text-xs text-white/50 break-all">{api.exampleUsage}</code>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- OTHER SECTIONS ---
export function DatabaseSection({ db }: { db: DatabaseDesign }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Database Design</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/70 font-light">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><LucideIcons.Table className="w-4 h-4 text-accent"/> Tables & Relationships</h3>
            <p className="mb-2"><strong className="text-white/40 text-sm">Schema:</strong> {db.tables.join(', ')}</p>
            <p><strong className="text-white/40 text-sm">Rel:</strong> {db.relationships}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><LucideIcons.ShieldCheck className="w-4 h-4 text-accent"/> Constraints & Security</h3>
            <p className="mb-2"><strong className="text-white/40 text-sm">Rules:</strong> {db.constraints}</p>
            <p><strong className="text-white/40 text-sm">Security:</strong> {db.security}</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><LucideIcons.Zap className="w-4 h-4 text-accent"/> Optimization & Indexing</h3>
          <p className="mb-4 text-sm leading-relaxed">{db.optimization}</p>
          <div className="p-4 bg-black/40 rounded-lg border border-white/5">
            <strong className="text-white/40 text-xs uppercase tracking-widest block mb-1">Index Strategy</strong>
            <p className="text-sm font-mono text-white/60">{db.indexes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SecuritySection({ security }: { security: SecurityInfo }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <LucideIcons.Shield className="text-emerald-500" /> Security Implementation
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/70 font-light">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <strong className="text-white block mb-2 font-semibold">Authentication & Authz</strong>
          <p className="text-sm mb-2">{security.authentication}</p>
          <p className="text-sm">{security.authorization}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <strong className="text-white block mb-2 font-semibold">Validation & Sanitization</strong>
          <p className="text-sm">{security.validation}</p>
          <p className="text-sm mt-2">{security.sanitization}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 md:col-span-2 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <strong className="text-white block mb-2 font-semibold">OWASP Mitigation</strong>
            <ul className="list-disc pl-4 text-sm space-y-1">
              {security.owasp.map((o,i)=><li key={i}>{o}</li>)}
            </ul>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <strong className="text-white/40 text-xs uppercase tracking-widest block mb-1">Rate Limiting</strong>
              <p className="text-sm">{security.rateLimiting}</p>
            </div>
            <div>
              <strong className="text-white/40 text-xs uppercase tracking-widest block mb-1">Encryption</strong>
              <p className="text-sm">{security.encryption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PerformanceSection({ performance }: { performance: PerformanceInfo }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Performance Optimizations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/70 font-light text-sm">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <div><strong className="text-white block mb-1 font-semibold">Caching</strong>{performance.caching}</div>
          <div><strong className="text-white block mb-1 font-semibold">Code Splitting</strong>{performance.codeSplitting}</div>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <div><strong className="text-white block mb-1 font-semibold">Rendering</strong>{performance.renderOptimization}</div>
          <div><strong className="text-white block mb-1 font-semibold">Lazy Loading</strong>{performance.lazyLoading}</div>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <div><strong className="text-white block mb-1 font-semibold">Database</strong>{performance.databaseOptimization}</div>
          <div><strong className="text-white block mb-1 font-semibold">Memory</strong>{performance.memoryOptimization}</div>
        </div>
      </div>
    </div>
  );
}

export function AiIntegrationSection({ ai }: { ai: AiIntegration }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <LucideIcons.Sparkles className="text-purple-400"/> AI Engineering
      </h2>
      <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20 grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80 font-light">
        <div className="space-y-6">
          <div>
            <strong className="text-white/40 text-xs uppercase tracking-widest block mb-2">Model</strong>
            <p className="font-mono text-purple-300">{ai.model}</p>
          </div>
          <div>
            <strong className="text-white/40 text-xs uppercase tracking-widest block mb-2">Prompt Engineering</strong>
            <p className="text-sm leading-relaxed">{ai.promptEngineering}</p>
          </div>
          <div>
            <strong className="text-white/40 text-xs uppercase tracking-widest block mb-2">Token Optimization</strong>
            <p className="text-sm leading-relaxed">{ai.tokenOptimization}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-4 bg-black/40 rounded-xl border border-white/5">
            <strong className="text-white/40 text-xs uppercase tracking-widest block mb-2">Structured Output Schema</strong>
            <code className="text-xs font-mono text-emerald-400 break-all">{ai.structuredOutput}</code>
          </div>
          <div>
            <strong className="text-white/40 text-xs uppercase tracking-widest block mb-2">Parsing & Validation</strong>
            <p className="text-sm leading-relaxed">{ai.responseParsing}</p>
          </div>
          <div>
            <strong className="text-white/40 text-xs uppercase tracking-widest block mb-2">Fallbacks & Rate Limits</strong>
            <p className="text-sm leading-relaxed">{ai.fallbackLogic} • {ai.rateLimits}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChallengesTimeline({ challenges }: { challenges: Challenge[] }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-6">Engineering Challenges</h2>
      <div className="space-y-8">
        {challenges.map((c, i) => (
          <div key={i} className="pl-8 border-l-2 border-white/10 relative">
            <div className="absolute w-4 h-4 bg-black border-2 border-accent rounded-full -left-[9px] top-1" />
            <h3 className="text-xl font-bold text-white mb-4">{c.problem}</h3>
            <div className="grid gap-4 text-white/70 font-light text-sm">
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                <strong className="text-red-400 block mb-1 font-semibold">Root Cause</strong>
                <p>{c.rootCause}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <strong className="text-emerald-400 block mb-1 font-semibold">Solution & Outcome</strong>
                <p className="mb-2">{c.solution}</p>
                <p className="text-white/50 italic">Result: {c.outcome}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-accent block mb-1 font-semibold">Lesson Learned</strong>
                <p>{c.lessons}</p>
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
          <div key={i} className="flex items-center gap-6">
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
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        {lessons.map((l, i) => (
          <li key={i} className="flex gap-4 items-start text-white/80 font-light">
            <LucideIcons.CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FutureRoadmap({ roadmap }: { roadmap: string[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Future Roadmap</h2>
      <div className="flex flex-wrap gap-3">
        {roadmap.map((r, i) => (
          <div key={i} className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white/80 font-medium text-sm flex items-center gap-3 hover:bg-white/10 transition-colors">
            <LucideIcons.Milestone className="w-4 h-4 text-white/40" />
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- PREMIUM REPOSITORY CARD ---
export function RepositorySection({ repo }: { repo: RepositoryInfo }) {
  return (
    <div className="w-full mt-12 pb-12">
      <div className="p-10 rounded-[2rem] bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-white/10 relative overflow-hidden shadow-2xl">
        <LucideIcons.Github className="absolute -right-8 -bottom-8 w-64 h-64 text-white/5 rotate-12 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LucideIcons.BookMarked className="w-6 h-6 text-white/50" />
              <h2 className="text-3xl font-bold text-white">{repo.name}</h2>
              <span className="px-2 py-0.5 rounded-full border border-white/20 text-xs font-medium text-white/60">Public</span>
            </div>
            <p className="text-white/60 font-light max-w-lg">{repo.description}</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => navigator.clipboard.writeText(repo.url)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
            >
              <LucideIcons.Copy className="w-4 h-4" /> Copy Link
            </button>
            <a 
              href={repo.url} 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-white/90 transition-colors flex items-center gap-2 text-sm"
            >
              <LucideIcons.Github className="w-4 h-4" /> Open
            </a>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-6 text-sm text-white/60 items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            {repo.primaryLanguage}
          </div>
          <div className="flex items-center gap-2">
            <LucideIcons.Scale className="w-4 h-4" />
            {repo.license} License
          </div>
          <div className="flex items-center gap-2">
            <LucideIcons.History className="w-4 h-4" />
            Updated {repo.lastUpdated}
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
          {repo.techStack.map(t => (
            <span key={t} className="px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs font-medium text-white/70">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
