"use client";

import { motion } from "framer-motion";

export default function Experience() {
  return (
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
            {/* Timeline Dot */}
            <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-accent animate-pulse shadow-[0_0_15px_rgba(109,93,254,0.6)]"></div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">Corporate Head</h3>
              <h4 className="text-lg text-secondary font-medium mb-4">Coding Ninjas 10X SRM</h4>
              
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
  );
}
