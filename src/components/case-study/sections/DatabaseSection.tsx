import React from "react";
import { DatabaseDesign } from "@/types/case-study";
import * as LucideIcons from "lucide-react";

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
