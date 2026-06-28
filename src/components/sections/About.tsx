"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center py-32 overflow-hidden">
      {/* Background Typography */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
        style={{ y: yBackground, opacity: opacityBackground }}
      >
        <h2 className="text-[15vw] leading-none font-black text-white/5 whitespace-nowrap">BUILD.</h2>
        <h2 className="text-[15vw] leading-none font-black text-white/5 whitespace-nowrap">SECURE.</h2>
        <h2 className="text-[15vw] leading-none font-black text-white/5 whitespace-nowrap">SHIP.</h2>
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side - Large Editorial Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">
              Engineering <span className="text-accent italic">Secure</span> Systems &amp; Next-Gen <span className="text-accent italic">SaaS</span>.
            </h3>
            <p className="mt-6 text-xl text-secondary max-w-lg leading-relaxed">
              I don&apos;t just write code. I architect resilient, production-grade applications that prioritize security from day one.
            </p>
          </motion.div>

          {/* Right Side - The Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-8 text-lg text-white/80"
          >
            <div className="flex gap-4">
              <div className="w-[2px] bg-accent shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-white mb-2">The Background</h4>
                <p>
                  Pursuing a B.Tech in Computer Science with a specialization in Cyber Security at <span className="text-accent font-semibold">SRM Institute of Science & Technology</span>. I bridge the gap between aggressive software development and robust security protocols.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-[2px] bg-white/20 shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-white mb-2">The Expertise</h4>
                <p>
                  As a Full Stack Developer and AI Builder, I thrive on solving complex problems. Whether it&apos;s building an AI-powered vulnerability scanner or an intelligent subscription management platform, I focus on delivering seamless, high-performance user experiences backed by scalable backend architectures.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-[2px] bg-white/20 shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-white mb-2">The Philosophy</h4>
                <p>
                  Security shouldn&apos;t be an afterthought. It should be embedded in the DNA of every product. I am passionate about creating tools that empower users while keeping their data completely safe.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
