"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projectIndex";
import { ProjectId } from "@/types/case-study";
import CaseStudyModal from "../case-study/CaseStudyModal";
import { getCaseStudy } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    // Calculate how far to scroll horizontally
    // It's the total width of the container minus the viewport width
    const getScrollAmount = () => {
      let scrollWidth = scrollContainer.scrollWidth;
      return -(scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollContainer, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative h-screen bg-[#050505] overflow-hidden">
      
      {/* Absolute Header inside the pinned section */}
      <div className="absolute top-24 left-6 md:left-12 z-20 mix-blend-difference pointer-events-none">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">FEATURED WORK</h2>
        <div className="w-24 h-1 bg-accent mt-4"></div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef} 
        className="flex items-center h-full w-[max-content] px-6 md:px-24 gap-12 lg:gap-32 pt-24"
      >
        {projects.map((project, idx) => (
          <div 
            key={project.title} 
            className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] shrink-0 relative group"
          >
            {/* Glass Card */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.color} border border-white/10 p-8 md:p-12 flex flex-col justify-between backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-4`}>
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-4xl md:text-5xl font-black text-white">{project.title}</h3>
                  <span className="text-6xl font-black text-white/10">0{idx + 1}</span>
                </div>
                <h4 className="text-xl text-accent font-medium mb-4">{project.subtitle}</h4>
                <p className="text-white/70 text-lg leading-relaxed max-w-lg">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-6">
                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-white/20 text-sm font-medium text-white/80 bg-black/30">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => setSelectedProjectId(project.id as ProjectId)}
                  className="magnetic w-fit px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform duration-300"
                >
                  VIEW CASE STUDY
                </button>
              </div>

            </div>
          </div>
        ))}

        {/* End padding for aesthetic scrolling */}
        <div className="w-[10vw] shrink-0"></div>
      </div>

      <CaseStudyModal 
        project={selectedProjectId ? getCaseStudy(selectedProjectId) || null : null} 
        onClose={() => setSelectedProjectId(null)} 
      />
    </section>
  );
}
