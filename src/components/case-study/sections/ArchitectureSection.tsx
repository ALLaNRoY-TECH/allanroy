import React, { useState } from "react";
import { Architecture, PerformanceInfo, AiIntegration } from "@/types/case-study";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";

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
      <p className="text-white/50 font-light">Hover or focus over any component to view its responsibilities and tech stack.</p>
      
      <div className="p-8 md:p-12 rounded-3xl bg-[#0a0a0a] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        
        {/* Nodes Column */}
        <div className="flex flex-col gap-6 relative z-10 w-full md:w-1/2">
          {nodes.map((node, i) => (
            <div key={node.id} className="relative group">
              <div 
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  hoveredNode === node.id || (!hoveredNode && i === 0)
                  ? 'bg-accent/10 border-accent/50 shadow-[0_0_30px_rgba(109,93,254,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onFocus={() => setHoveredNode(node.id)}
                onClick={() => setHoveredNode(node.id)}
                role="button"
                tabIndex={0}
                aria-label={`View ${node.label} details`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setHoveredNode(node.id);
                  }
                }}
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
        <div className="w-full md:w-1/2 relative z-10 min-h-[300px]">
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
                      {node.data.technologies.split(',').map((t, idx) => (
                        <span key={`tech-${idx}`} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/80">{t.trim()}</span>
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
