"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ProjectId } from "@/types/case-study";
import { useState, useEffect } from "react";
import { Shield, ShieldAlert, Cpu, Lock, Brain, TrendingDown, RefreshCcw, Bell, LockKeyhole, Mail, Users, CheckCircle2 } from "lucide-react";

export default function ProjectPreviewBoard({ projectId }: { projectId: ProjectId }) {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [5, -5]);
  const rotateY = useTransform(x, [0, 400], [-5, 5]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <div className="px-6 md:px-16 w-full max-w-6xl mx-auto -mt-16 mb-16 perspective-1000">
      <motion.div
        className="w-full aspect-video md:aspect-[16/9] lg:aspect-[21/9] rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden relative"
        onMouseMove={handleMouse}
        onMouseLeave={() => {
          x.set(200);
          y.set(200);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Soft floating glow that follows mouse */}
        <motion.div
          className="absolute w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none"
          style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        />
        
        {/* Content Router */}
        <div className="absolute inset-0 z-10 p-6 md:p-8 flex items-center justify-center">
          {projectId === "securescan" && <SecureScanPreview />}
          {projectId === "subsense" && <SubSensePreview />}
          {projectId === "ventpod" && <VentPodPreview />}
          {projectId === "hostel-cms" && <HostelCmsPreview />}
        </div>
      </motion.div>
    </div>
  );
}

// ----------------- PREVIEW SIMULATIONS -----------------

function SecureScanPreview() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        setStage(0); // Idle
        await new Promise(r => setTimeout(r, 1000));
        setStage(1); // Scanning
        await new Promise(r => setTimeout(r, 3000));
        setStage(2); // AI Analyzing
        await new Promise(r => setTimeout(r, 2000));
        setStage(3); // Report Ready
        await new Promise(r => setTimeout(r, 4000));
      }
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-6 font-mono text-sm">
      {/* Header */}
      <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-4">
          <Shield className="text-emerald-500 w-6 h-6" />
          <span className="text-white font-bold text-lg tracking-widest">SECURE<span className="text-white/50">SCAN</span></span>
        </div>
        <div className="flex items-center gap-3 w-1/2 bg-black/50 border border-white/10 rounded-full px-4 py-2">
          <Lock className="w-4 h-4 text-emerald-500" />
          <span className="text-white/70 truncate">https://example-client.com</span>
        </div>
        <button className="bg-emerald-500 text-black px-6 py-2 rounded-full font-bold relative overflow-hidden">
          {stage === 0 ? "START SCAN" : (stage === 1 ? "SCANNING..." : "VIEW REPORT")}
          {stage === 1 && <motion.div className="absolute inset-0 bg-white/30" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} />}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6">
        {/* Left Column: Progress & Modules */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-black/40 p-5 rounded-xl border border-white/5 flex-1">
            <h4 className="text-white/50 uppercase tracking-widest mb-4 text-xs">Active Modules</h4>
            <div className="space-y-3">
              {[
                { icon: Lock, name: "SSL Inspection" },
                { icon: Cpu, name: "Tech Detection" },
                { icon: ShieldAlert, name: "OWASP Mapper" }
              ].map((mod, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <mod.icon className="w-4 h-4 text-white/70" />
                    <span className="text-white/80">{mod.name}</span>
                  </div>
                  {stage >= 1 ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.5 }} className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ) : <span className="w-2 h-2 rounded-full bg-white/20" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Visual Output */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col items-center justify-center flex-1 relative overflow-hidden">
            {stage === 0 && <span className="text-white/20 text-lg">Awaiting Target...</span>}
            
            {stage === 1 && (
              <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between text-white/50 text-xs">
                  <span>Executing Payloads</span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity }}>67%</motion.span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "linear" }} className="h-full bg-emerald-500" />
                </div>
              </div>
            )}

            {stage >= 2 && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-black mb-4 border-4 ${stage === 3 ? 'border-emerald-500 text-emerald-500' : 'border-amber-500 text-amber-500'}`}>
                  {stage === 3 ? "A+" : "C-"}
                </div>
                <h3 className="text-white text-xl font-bold">Security Score</h3>
                {stage === 2 && <p className="text-amber-500 text-xs mt-2 flex items-center gap-2"><Brain className="w-3 h-3 animate-pulse" /> AI GENERATING REPORT...</p>}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubSensePreview() {
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      setSynced(s => !s);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex gap-6">
      {/* Sidebar */}
      <div className="w-64 bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <TrendingDown className="w-6 h-6 text-indigo-400" />
          <span className="text-white font-bold text-xl">SubSense</span>
        </div>
        
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-auto relative overflow-hidden">
          <p className="text-white/60 text-xs uppercase mb-1">Monthly Spend</p>
          <motion.div className="text-3xl font-black text-white" key={synced ? 'a' : 'b'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            ${synced ? "142.99" : "0.00"}
          </motion.div>
          {synced && <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} className="absolute right-0 bottom-0 w-1 bg-indigo-500" />}
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 transition-colors">
          <RefreshCcw className={`w-4 h-4 ${!synced ? 'animate-spin text-white' : ''}`} />
          {synced ? "Synced" : "Syncing Gmail..."}
        </button>
      </div>

      {/* Main Board */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-black/40 rounded-xl border border-white/5 p-6 flex-1 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold">Active Subscriptions</h3>
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/50">{synced ? '4 detected' : 'Scanning...'}</span>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {synced && [
                { name: "Netflix", price: "$15.99", alert: true },
                { name: "Spotify", price: "$9.99", alert: false },
                { name: "Adobe CC", price: "$54.99", alert: true },
                { name: "Gym Membership", price: "$62.02", alert: false },
              ].map((sub, i) => (
                <motion.div 
                  key={sub.name}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10" />
                    <div>
                      <p className="text-white font-medium">{sub.name}</p>
                      <p className="text-white/40 text-xs">Renews in {14 - i} days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {sub.alert && <span className="text-amber-500 text-xs flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-full"><Brain className="w-3 h-3"/> AI: Price +$2.00</span>}
                    <span className="text-white font-mono">{sub.price}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function HostelCmsPreview() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
            <Users className="w-4 h-4 text-black" />
          </div>
          <span className="text-white font-bold text-lg">Warden Dashboard</span>
        </div>
        <div className="flex gap-4">
          <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/70 text-sm border border-white/10">Block A</span>
          <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/70 text-sm border border-white/10">Block B</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 h-full">
        {/* KPI Cards */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-5 rounded-xl border border-orange-500/20 flex-1 flex flex-col justify-center">
            <p className="text-white/60 text-xs uppercase mb-2">Total Occupancy</p>
            <p className="text-4xl font-black text-white">482<span className="text-white/20 text-xl">/500</span></p>
          </div>
          <div className="bg-black/40 p-5 rounded-xl border border-white/5 flex-1 flex flex-col justify-center">
            <p className="text-white/60 text-xs uppercase mb-2">Open Complaints</p>
            <p className="text-4xl font-black text-white">12</p>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="col-span-3 bg-black/40 rounded-xl border border-white/5 p-6 overflow-hidden relative">
          <h3 className="text-white font-bold mb-6">Recent Tickets</h3>
          <div className="space-y-2">
            {[
              { id: "TKT-101", room: "A-204", issue: "Broken Fan", status: "PENDING" },
              { id: "TKT-102", room: "B-105", issue: "Wi-Fi Down", status: "RESOLVED" },
              { id: "TKT-103", room: "A-312", issue: "Leaking Pipe", status: "ASSIGNED" },
            ].map((tkt, i) => (
              <div key={i} className="flex justify-between items-center p-3 border-b border-white/5 text-sm">
                <span className="text-white/50 font-mono w-20">{tkt.id}</span>
                <span className="text-white font-medium w-16">{tkt.room}</span>
                <span className="text-white/80 flex-1">{tkt.issue}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  tkt.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-500' : 
                  tkt.status === 'ASSIGNED' ? 'bg-blue-500/10 text-blue-500' : 
                  'bg-orange-500/10 text-orange-500'
                }`}>{tkt.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VentPodPreview() {
  const [messages, setMessages] = useState([
    { id: 1, text: "I've been feeling really overwhelmed with exams lately.", mine: false },
  ]);

  useEffect(() => {
    const seq = async () => {
      await new Promise(r => setTimeout(r, 2000));
      setMessages(m => [...m, { id: 2, text: "I totally get that. Taking breaks helps a lot.", mine: true }]);
      await new Promise(r => setTimeout(r, 3000));
      setMessages(m => [...m, { id: 3, text: "Yeah, I should probably step away from the screen for a bit.", mine: false }]);
    };
    seq();
  }, []);

  return (
    <div className="w-full max-w-2xl h-full flex flex-col bg-black/60 rounded-2xl border border-white/10 overflow-hidden relative backdrop-blur-3xl">
      {/* Secure Header */}
      <div className="bg-[#0a0a0a] p-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0a0a0a] rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Anonymous User #8492</p>
            <p className="text-emerald-500 text-xs flex items-center gap-1"><LockKeyhole className="w-3 h-3" /> End-to-End Encrypted</p>
          </div>
        </div>
        <button className="text-white/40 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-hidden">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`max-w-[70%] p-3 rounded-2xl ${m.mine ? 'bg-indigo-600 text-white self-end rounded-br-sm' : 'bg-white/10 text-white/90 self-start rounded-bl-sm'}`}
            >
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing indicator */}
        {messages.length < 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 items-center self-start bg-white/5 px-3 py-2 rounded-2xl rounded-bl-sm">
            {[0, 1, 2].map(i => (
              <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, delay: i * 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            ))}
          </motion.div>
        )}
      </div>

      {/* Input Area (Fake) */}
      <div className="p-4 border-t border-white/5 bg-black/40">
        <div className="w-full bg-white/5 rounded-full py-3 px-4 border border-white/10 flex items-center justify-between">
          <span className="text-white/20 text-sm">Type an anonymous message...</span>
          <div className="w-6 h-6 rounded-full bg-indigo-600/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
