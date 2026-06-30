import React from "react";
import { SecurityInfo } from "@/types/case-study";
import * as LucideIcons from "lucide-react";

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
