import React, { useState } from "react";
import { CaseStudyHero as ICaseStudyHero, EngineeringOverview as IEngineeringOverview, Overview, ProblemStatement, Solution, EngineeringDecision, Feature, Architecture, ApiEndpoint, DatabaseDesign, SecurityInfo, PerformanceInfo, AiIntegration, Challenge, TimelinePhase, RepositoryInfo, Metric } from "@/types/case-study";
import { motion, AnimatePresence } from "framer-motion";
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
      
      <div className="flex gap-4 mt-8">
        <a href={hero.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors flex items-center gap-2">
          <FaGithub className="w-4 h-4" /> View Repository
        </a>
        {hero.liveUrl && (
          <a href={hero.liveUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20 flex items-center gap-2">
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

// --- INTERACTIVE ARCHITECTURE ---
export function ArchitectureSection({ architecture, performance }: { architecture: Architecture, performance?: PerformanceInfo }) {
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
                        <span key={`tech-${t.trim()}-${i}`} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/80">{t.trim()}</span>
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

      {performance && (
        <div className="mt-16 pt-16 border-t border-white/10">
          <PerformanceSection performance={performance} />
        </div>
      )}
    </div>
  );
}

// --- API DOCUMENTATION (Swagger Style) ---
export function ApiTable({ apis }: { apis: ApiEndpoint[] }) {
  if (!apis || apis.length === 0) return null;

  const getMethodColor = (method: string = 'GET') => {
    switch (method.toUpperCase()) {
      case 'GET': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'POST': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'PUT': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'DELETE': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">API Documentation</h2>
      <div className="flex flex-col gap-6">
        {apis.map((api, i) => {
          // Handle both old format (endpoints) and new format (endpoint + method)
          const rawEndpoint = api.endpoint || api.endpoints || '';
          const parts = rawEndpoint.split(' ');
          const method = api.method || (parts.length > 1 ? parts[0] : 'GET');
          const route = parts.length > 1 ? parts.slice(1).join(' ') : rawEndpoint;

          return (
            <div key={`api-${i}`} className="rounded-2xl border border-white/10 overflow-hidden bg-[#0d1117] group hover:border-white/20 transition-colors">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold border ${getMethodColor(method)}`}>
                    {method.toUpperCase()}
                  </span>
                  <span className="font-mono text-white/80 text-sm">{route}</span>
                </div>
                <div className="flex gap-2">
                  {(api.authRequired !== undefined ? api.authRequired : api.authentication) ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                      <LucideIcons.Lock className="w-3 h-3" /> Auth Required
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                      <LucideIcons.Unlock className="w-3 h-3" /> Public
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Purpose</h4>
                    <p className="text-sm text-white/80 font-light">{api.purpose}</p>
                  </div>
                  
                  {(api.requestBody || api.exampleUsage) && (
                    <div>
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Request</h4>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-white/60 whitespace-pre-wrap overflow-x-auto">
                        {api.requestBody || api.exampleUsage}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {api.response && (
                    <div>
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Response</h4>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-emerald-400/80 whitespace-pre-wrap overflow-x-auto">
                        {api.response}
                      </div>
                    </div>
                  )}
                  
                  {api.errorHandling && (
                    <div>
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Error Responses</h4>
                      <p className="text-sm text-red-400/80 font-light">{api.errorHandling}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- OTHER SECTIONS ---
export function DatabaseSection({ db }: { db: DatabaseDesign }) {
  // Parse simple string formats like "users (id, email)" into object { name: "users", cols: ["id", "email"] }
  const parsedTables = db.tables.map(t => {
    const match = t.match(/^([a-zA-Z0-9_]+)\s*\((.*)\)$/);
    if (match) {
      return { name: match[1], cols: match[2].split(',').map(c => c.trim()) };
    }
    return { name: t, cols: [] };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Database Schema</h2>
      
      {/* Table Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {parsedTables.map((table, i) => (
          <div key={`table-${i}`} className="rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden group hover:border-white/20 transition-colors">
            <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-accent">{table.name}</span>
              <LucideIcons.Table className="w-4 h-4 text-white/30" />
            </div>
            <div className="p-4">
              {table.cols.length > 0 ? (
                <ul className="space-y-2">
                  {table.cols.map((col, j) => {
                    const isId = col === 'id' || col.endsWith('_id');
                    return (
                      <li key={`col-${j}`} className="flex items-center gap-2 font-mono text-xs text-white/70">
                        {isId ? <LucideIcons.Key className="w-3 h-3 text-amber-400" /> : <span className="w-3 h-3 block" />}
                        {col}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <span className="font-mono text-xs text-white/40">{table.name}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Meta Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80 font-light text-sm">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <div>
            <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2 flex items-center gap-2"><LucideIcons.Link className="w-4 h-4"/> Relationships</h3>
            <p className="leading-relaxed">{db.relationships}</p>
          </div>
          <div>
            <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2 flex items-center gap-2"><LucideIcons.ShieldCheck className="w-4 h-4"/> Constraints & Security</h3>
            <p className="leading-relaxed">{db.constraints} {db.security !== "[To Be Documented]" && db.security}</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <div>
            <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2 flex items-center gap-2"><LucideIcons.Zap className="w-4 h-4"/> Optimization & Indexes</h3>
            <p className="leading-relaxed mb-3">{db.optimization}</p>
            <div className="p-3 bg-black/40 rounded border border-white/5 font-mono text-xs text-white/60">
              {db.indexes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SecuritySection({ security }: { security: SecurityInfo }) {
  const isPlaceholder = (val: string) => !val || val === "[To Be Documented]";

  const securityCards = [
    { icon: LucideIcons.KeyRound, label: "Authentication", value: security.authentication },
    { icon: LucideIcons.UserCheck, label: "Authorization", value: security.authorization },
    { icon: LucideIcons.FileCheck2, label: "Validation", value: security.validation },
    { icon: LucideIcons.Eraser, label: "Sanitization", value: security.sanitization },
    { icon: LucideIcons.LockKeyhole, label: "Encryption", value: security.encryption },
    { icon: LucideIcons.Clock, label: "Rate Limiting", value: security.rateLimiting },
    { icon: LucideIcons.AlertTriangle, label: "Error Handling", value: security.errorHandling }
  ].filter(c => !isPlaceholder(c.value));

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <LucideIcons.Shield className="text-emerald-500" /> Security Implementation
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityCards.map((card, i) => (
          <div key={`sec-${i}`} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 group hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors">
            <div className="flex items-center gap-3 text-white/50 group-hover:text-emerald-400 transition-colors">
              <card.icon className="w-5 h-5" />
              <h3 className="font-bold text-sm tracking-wide">{card.label}</h3>
            </div>
            <p className="text-sm text-white/70 font-light leading-relaxed">{card.value}</p>
          </div>
        ))}
      </div>

      {security.owasp && security.owasp.length > 0 && security.owasp[0] !== "[To Be Documented]" && (
        <div className="mt-6 p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
          <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
            <LucideIcons.ShieldAlert className="w-5 h-5" /> OWASP Mitigations
          </h3>
          <div className="flex flex-wrap gap-3">
            {security.owasp.map((o, i) => (
              <span key={`owasp-${i}`} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium">
                {o}
              </span>
            ))}
          </div>
        </div>
      )}
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

export function FutureRoadmap({ roadmap }: { roadmap: string[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Future Roadmap</h2>
      <div className="flex flex-wrap gap-3">
        {roadmap.map((r, i) => (
          <div key={`roadmap-${i}`} className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white/80 font-medium text-sm flex items-center gap-3 hover:bg-white/10 transition-colors">
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
    <div className="w-full mt-24 pt-16 border-t border-white/5 pb-12">
      <div className="p-10 rounded-[2rem] bg-gradient-to-br from-[#0d1117] to-[#161b22] border border-white/10 relative overflow-hidden shadow-2xl">
        <FaGithub className="absolute -right-8 -bottom-8 w-64 h-64 text-white/5 rotate-12 pointer-events-none" />
        
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
              <FaGithub className="w-4 h-4" /> Open
            </a>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-6 text-sm text-white/60 items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            {repo.primaryLanguage}
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
          {repo.techStack.map((t, i) => (
            <span key={`stack-${t}-${i}`} className="px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs font-medium text-white/70">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
