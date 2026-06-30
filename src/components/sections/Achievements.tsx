"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ from, to, duration, suffix = "" }: { from: number; to: number; duration: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className="text-5xl md:text-7xl font-black text-white">
      {count}{suffix}
    </span>
  );
}

const services = [
  "Cybersecurity",
  "Web Development",
  "AI Integrations",
  "Automation",
  "Backend APIs",
  "SaaS Development",
  "Database Design",
  "Authentication Systems",
];

export default function Achievements() {
  return (
    <section className="relative w-full py-32 overflow-hidden">
      {/* Achievements Counters */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 text-center">
          
          <div className="flex flex-col items-center gap-2">
            <Counter from={0} to={5} duration={2.5} suffix="+" />
            <span className="text-secondary font-medium tracking-wide uppercase text-sm">Production Projects</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Counter from={0} to={15} duration={2.5} suffix="+" />
            <span className="text-secondary font-medium tracking-wide uppercase text-sm">Technologies</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Counter from={0} to={18} duration={2.5} suffix="+" />
            <span className="text-secondary font-medium tracking-wide uppercase text-sm">REST APIs Built</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Counter from={0} to={1000} duration={3} suffix="+" />
            <span className="text-secondary font-medium tracking-wide uppercase text-sm">Hackathon Participants</span>
          </div>

          <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1 lg:col-span-1">
            <Counter from={0} to={100} duration={2} suffix="%" />
            <span className="text-secondary font-medium tracking-wide uppercase text-sm">Passion for Building</span>
          </div>

        </div>
      </div>

      {/* Services Marquee */}
      <div className="relative w-full py-16 bg-accent rotate-[-2deg] scale-110 flex overflow-hidden">
        <div className="absolute inset-0 bg-grain mix-blend-multiply opacity-30"></div>
        
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          {/* Double array for seamless loop */}
          {[...services, ...services].map((service, idx) => (
            <div key={`marquee-${service.substring(0, 5)}-${idx}`} className="flex items-center mx-8">
              <span className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter">
                {service}
              </span>
              <span className="mx-8 text-black text-3xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
