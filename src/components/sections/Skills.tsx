"use client";

import { motion } from "framer-motion";
import { 
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFramer, 
  SiPython, SiFlask, SiNodedotjs,
  SiOwasp, SiJsonwebtokens, SiAuth0,
  SiSupabase, SiPostgresql, SiMysql,
  SiGit, SiGithub, SiPostman, SiLinux, SiVercel 
} from "react-icons/si";
import { FaJava, FaShieldAlt, FaKey, FaServer } from "react-icons/fa";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "React", icon: <SiReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Framer Motion", icon: <SiFramer /> },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "Flask", icon: <SiFlask /> },
      { name: "REST APIs", icon: <FaServer /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Java", icon: <FaJava /> },
    ]
  },
  {
    title: "Security",
    skills: [
      { name: "JWT", icon: <SiJsonwebtokens /> },
      { name: "Google OAuth", icon: <SiAuth0 /> },
      { name: "OWASP Top 10", icon: <SiOwasp /> },
      { name: "RBAC", icon: <FaShieldAlt /> },
      { name: "Session Management", icon: <FaKey /> },
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "Supabase", icon: <SiSupabase /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MySQL", icon: <SiMysql /> },
    ]
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Linux", icon: <SiLinux /> },
      { name: "Vercel", icon: <SiVercel /> },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full py-32 overflow-hidden bg-black/50">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Massive Typography */}
        <div className="mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] md:text-[10vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent absolute -top-20 left-0 -z-10 select-none"
          >
            STACK
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold">Technical Arsenal</h3>
            <div className="w-24 h-1 bg-accent mt-6"></div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-16">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title} className="flex flex-col lg:flex-row gap-8 lg:items-center">
              <div className="lg:w-1/4">
                <h4 className="text-2xl font-semibold text-secondary uppercase tracking-widest">{category.title}</h4>
              </div>
              <div className="lg:w-3/4 flex flex-wrap gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: catIdx * 0.1 + skillIdx * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(109, 93, 254, 0.5)",
                      boxShadow: "0 10px 30px -10px rgba(109, 93, 254, 0.3)"
                    }}
                    className="magnetic flex items-center gap-3 px-6 py-4 rounded-2xl bg-card-bg border border-card-border backdrop-blur-sm cursor-pointer transition-colors duration-300"
                  >
                    <span className="text-2xl text-white/70 group-hover:text-accent transition-colors">
                      {skill.icon}
                    </span>
                    <span className="font-medium text-white/90 tracking-wide">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
