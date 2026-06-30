import React from "react";
import { ApiEndpoint } from "@/types/case-study";
import * as LucideIcons from "lucide-react";

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
