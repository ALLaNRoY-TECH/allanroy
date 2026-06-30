import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { X } from "lucide-react";
import { CaseStudy } from "@/types/case-study";
import {
  CaseStudyHero,
  EngineeringOverview,
  OverviewSection,
  ProblemSection,
  SolutionSection,
  EngineeringDecisions,
  FeaturesGrid,
  ArchitectureSection,
  ApiTable,
  DatabaseSection,
  SecuritySection,
  PerformanceSection,
  AiIntegrationSection,
  ChallengesTimeline,
  DevelopmentTimeline,
  LessonsSection,
  FutureRoadmap,
  RepositorySection
} from "./sections";
import ProjectPreviewBoard from "./previews/ProjectPreviewBoard";

interface CaseStudyModalProps {
  project: CaseStudy | null;
  onClose: () => void;
}

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem Statement" },
  { id: "solution", label: "Solution" },
  { id: "features", label: "Features" },
  { id: "architecture", label: "Architecture" },
  { id: "apis", label: "API Documentation" },
  { id: "database", label: "Database" },
  { id: "security", label: "Security" },
  { id: "challenges", label: "Engineering Challenges" },
  { id: "lessons", label: "Lessons Learned" },
  { id: "repository", label: "Repository" },
];

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && <InnerCaseStudyModal project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}

function InnerCaseStudyModal({ project, onClose }: { project: CaseStudy, onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("overview");

  // Reading Progress Bar
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Intersection Observer for Sticky Nav
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: container,
        rootMargin: "-20% 0px -80% 0px", // Trigger when element hits top 20% of screen
        threshold: 0,
      }
    );

    const sections = container.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [project]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      // Get relative position within the scroll container
      const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const currentScroll = scrollContainerRef.current.scrollTop;
      
      scrollContainerRef.current.scrollTo({
        top: currentScroll + elementTop - containerTop - 100, // 100px offset for breathing room
        behavior: "smooth"
      });
    }
  };

  const validNavSections = NAV_SECTIONS;

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[9999] flex justify-center bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
      >
        {/* Top Reading Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] md:h-[3px] bg-accent z-[10000] origin-left shadow-[0_0_10px_rgba(109,93,254,0.8)]"
          style={{ scaleX }}
        />

        <motion.div
          ref={modalRef}
          initial={{ y: 50, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-[1400px] h-screen bg-[#050505] md:my-8 md:h-[calc(100vh-4rem)] md:rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors group"
            >
              <X size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative custom-scrollbar"
          >
            {/* Hero & Overview (Full Width) */}
            <CaseStudyHero hero={project.hero} />
            <ProjectPreviewBoard projectId={project.id} />
            <div className="px-6 md:px-12 lg:px-24 mb-32">
              <EngineeringOverview data={project.engineeringOverview} />
            </div>

            {/* Split Layout for Document Body */}
            <div className="px-6 md:px-12 lg:px-24 pb-32 flex items-start gap-16">
              
              {/* Sticky Sidebar Navigation (Desktop Only) */}
              <aside className="hidden lg:block sticky top-24 w-64 shrink-0 border-r border-white/10 pr-8">
                <nav className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4 px-3">Contents</span>
                  {validNavSections.map((nav) => (
                    <button
                      key={nav.id}
                      onClick={() => scrollToSection(nav.id)}
                      className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeSection === nav.id 
                          ? "bg-accent/10 text-accent" 
                          : "text-white/50 hover:text-white/80 hover:bg-white/5"
                      }`}
                    >
                      {nav.label}
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Main Document Content */}
              <div className="flex-1 max-w-4xl flex flex-col gap-24 md:gap-32">
                <section id="overview" className="scroll-mt-32">
                  <OverviewSection data={project.overview} />
                </section>
                
                <section id="problem" className="scroll-mt-32">
                  <ProblemSection data={project.problemStatement} />
                </section>

                <section id="solution" className="scroll-mt-32">
                  <SolutionSection data={project.solution} decisions={project.engineeringDecisions} />
                </section>

                <section id="features" className="scroll-mt-32">
                  <FeaturesGrid features={project.features} />
                </section>

                <section id="architecture" className="scroll-mt-32">
                  <ArchitectureSection architecture={project.architecture} performance={project.performance} />
                </section>

                <section id="apis" className="scroll-mt-32">
                  <ApiTable apis={project.apiDocumentation} />
                </section>

                <section id="database" className="scroll-mt-32">
                  <DatabaseSection db={project.databaseDesign} />
                </section>

                <section id="security" className="scroll-mt-32">
                  <SecuritySection security={project.security} />
                </section>

                <section id="challenges" className="scroll-mt-32">
                  <ChallengesTimeline challenges={project.challenges} />
                </section>

                <section id="timeline" className="scroll-mt-32">
                  <DevelopmentTimeline timeline={project.developmentTimeline} />
                </section>

                <section id="lessons" className="scroll-mt-32">
                  <LessonsSection lessons={project.lessonsLearned} />
                </section>

                <section id="roadmap" className="scroll-mt-32">
                  <FutureRoadmap roadmap={project.futureRoadmap} />
                </section>

                <section id="repository" className="scroll-mt-32">
                  <RepositorySection repo={project.repository} />
                </section>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
  );
}
