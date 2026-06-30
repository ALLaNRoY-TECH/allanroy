import React from "react";
import { RepositoryInfo } from "@/types/case-study";
import * as LucideIcons from "lucide-react";
import { FaGithub } from "react-icons/fa";

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
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LucideIcons.Copy className="w-4 h-4" /> Copy Link
            </button>
            <a 
              href={repo.url} 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-white/90 transition-colors flex items-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
