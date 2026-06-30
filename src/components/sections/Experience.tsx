"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ExperienceCursorHint from "../experience/ExperienceCursorHint";
import MemoryArchiveModal from "../experience/MemoryArchiveModal";

export default function Experience() {
  const [isHovering, setIsHovering] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  const [isOpening, setIsOpening] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [displayText, setDisplayText] = useState("Coding Ninjas 10X SRM");

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  const handleArchiveClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // 0ms: Dot expands (handled by state isOpening)
    // 200ms: Text changes
    setTimeout(() => {
      setDisplayText("Opening Memory Archive...");
    }, 200);

    // 500ms: Trigger modal (modal has 0.8s fade in, so it takes over)
    setTimeout(() => {
      setModalOpen(true);
    }, 500);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    // Reverse sequence
    setTimeout(() => {
      setDisplayText("Coding Ninjas 10X SRM");
      setIsOpening(false);
    }, 800); // Wait for modal fade out
  };

  // Generate tiny sparkle particles for the hover effect using lazy initialization
  // Safe from hydration mismatch because it only renders when isHovering is true (which is false initially)
  const [sparkles] = useState<{id: number, x: number, y: number, delay: number}[]>(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      delay: Math.random() * 0.5,
    }));
  });

  return (
    <>
      <section id="experience" className="relative w-full py-32 overflow-hidden bg-black/80">
        <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Education Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold">Education</h2>
              <div className="w-16 h-1 bg-accent mt-6"></div>
            </motion.div>

            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute -top-10 -left-10 text-[15vw] lg:text-[8vw] font-black text-white/5 select-none pointer-events-none"
              >
                SRM
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 p-8 md:p-10 rounded-3xl bg-card-bg border border-card-border backdrop-blur-md"
              >
                <h3 className="text-2xl font-bold text-white mb-2">SRM Institute of Science & Technology</h3>
                <h4 className="text-xl text-accent font-medium mb-6">B.Tech Computer Science (Cyber Security)</h4>
                
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-secondary">Expected Graduation</span>
                    <span className="font-semibold text-white">2028</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-secondary">CGPA</span>
                    <span className="font-semibold text-white">7.98</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Status</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">In Progress</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Experience Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
              <div className="w-16 h-1 bg-accent mt-6"></div>
            </motion.div>

            <div className="relative border-l-2 border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 py-4">
              {/* Timeline Dot (Expands on click) */}
              <motion.div 
                animate={{ 
                  scale: isOpening ? 3 : 1, 
                  backgroundColor: isOpening ? "#fff" : "var(--color-accent)",
                  boxShadow: isOpening ? "0 0 30px rgba(255,255,255,1)" : (isHovering ? "0 0 25px rgba(109,93,254,1)" : "0 0 15px rgba(109,93,254,0.6)") 
                }}
                transition={{ duration: 0.3 }}
                className={`absolute top-0 -left-[9px] w-4 h-4 rounded-full ${!isOpening && 'animate-pulse'}`}
              />

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                animate={{ y: isHovering ? -5 : 0 }} // Slight upward lift
                className="group"
              >
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">Corporate Head</h3>
                
                {/* Interactive Memory Archive Trigger */}
                <div 
                  className="relative inline-block mb-4"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onMouseMove={handleMouseMove}
                  onClick={handleArchiveClick}
                >
                  <motion.h4 
                    className={`text-lg md:text-xl font-bold transition-all duration-300 ${isOpening ? 'text-white' : 'text-secondary'} ${isHovering && !isOpening ? 'text-white cursor-none text-shadow-glow' : ''}`}
                    animate={{ textShadow: isHovering ? "0 0 15px rgba(255,255,255,0.4)" : "none" }}
                  >
                    {displayText}
                  </motion.h4>
                  
                  {/* Left-to-right underline animation */}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-[2px] bg-white origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: (isHovering || isOpening) ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ width: "100%" }}
                  />

                  {/* Tiny Sparkle Particles */}
                  <AnimatePresence>
                    {isHovering && !isOpening && sparkles.map((sparkle) => (
                      <motion.div
                        key={sparkle.id}
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -15 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, delay: sparkle.delay, repeat: Infinity }}
                        className="absolute w-1 h-1 bg-white rounded-full pointer-events-none shadow-[0_0_5px_#fff]"
                        style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                
                {/* NEW LEADERSHIP JOURNEY BUTTON */}
                <div className="mb-6">
                  <button 
                    onClick={handleArchiveClick}
                    className="group relative inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/90 font-medium text-sm transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-in-out"></div>
                    <span className="relative z-10">📸 View Leadership Journey</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <ul className="flex flex-col gap-3 text-white/70">
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">✦</span>
                    <p>Organized a massive national hackathon successfully.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">✦</span>
                    <p>Managed and coordinated over <strong className="text-white">1000+ participants</strong> from 20+ colleges across the country.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">✦</span>
                    <p>Spearheaded sponsorship management and secured key partnerships.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">✦</span>
                    <p>Demonstrated exceptional leadership and event execution under high-pressure scenarios.</p>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Global Cursor Hint (Only visible when hovering over the trigger and modal is closed) */}
      <ExperienceCursorHint isVisible={isHovering && !isOpening} mouseX={mouseX} mouseY={mouseY} />

      {/* Memory Archive Modal */}
      <MemoryArchiveModal isOpen={modalOpen} onClose={handleModalClose} />
    </>
  );
}
