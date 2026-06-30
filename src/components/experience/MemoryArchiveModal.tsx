import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { journeyMemories, Memory } from "@/data/codingNinjasJourney";
import { checkImageExists } from "@/actions/checkImage";

interface MemoryArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemoryArchiveModal({ isOpen, onClose }: MemoryArchiveModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          // Inner component will handle its own escape key for image viewer, but we handle general close here
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && <InnerMemoryArchiveModal onClose={onClose} />}
    </AnimatePresence>
  );
}

function InnerMemoryArchiveModal({ onClose }: { onClose: () => void }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress for the vertical timeline
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
          e.stopPropagation();
        }
      }
    };
    window.addEventListener("keydown", handleEsc, { capture: true });
    return () => window.removeEventListener("keydown", handleEsc, { capture: true });
  }, [selectedImage]);

  return (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.8, ease: "easeInOut" } }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-[10000] bg-black/80 flex justify-center"
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[10010] p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </motion.button>

          <div 
            ref={containerRef}
            className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth relative"
          >
            <div className="max-w-4xl mx-auto pt-32 pb-64 px-6 md:px-12 relative">
              
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center mb-24"
              >
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Leadership Journey</h1>
                <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
                  &quot;Moments that shaped my growth as a leader, organizer, and engineer.&quot;
                </p>
              </motion.div>

              {/* Timeline Container */}
              <div className="relative">
                {/* Background Line (Dim) */}
                <div className="absolute left-[15px] md:left-[39px] top-0 bottom-0 w-[2px] bg-white/5" />
                
                {/* Scroll Progress Line (Glow) */}
                <motion.div 
                  className="absolute left-[15px] md:left-[39px] top-0 bottom-0 w-[2px] bg-accent origin-top shadow-[0_0_15px_rgba(109,93,254,0.8)]"
                  style={{ scaleY }}
                />

                {/* Milestones */}
                <div className="flex flex-col gap-24 md:gap-32">
                  {journeyMemories.map((memory, index) => (
                    <TimelineNode 
                      key={memory.id} 
                      memory={memory} 
                      index={index} 
                      onImageClick={() => setSelectedImage(memory.imageUrl)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fullscreen Image Viewer */}
          <ImageViewer 
            selectedImage={selectedImage} 
            onClose={() => setSelectedImage(null)} 
            memories={journeyMemories}
            setTargetImage={setSelectedImage}
          />

        </motion.div>
  );
}

// Sub-component for individual timeline nodes
function TimelineNode({ memory, index, onImageClick }: { memory: Memory, index: number, onImageClick: () => void }) {
  const [imageExists, setImageExists] = useState<boolean | null>(null);

  useEffect(() => {
    checkImageExists(memory.imageUrl)
      .then(setImageExists)
      .catch(() => setImageExists(false));
  }, [memory.imageUrl]);

  // Use framer motion's whileInView to trigger animations when scrolling
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index === 0 ? 0.7 : 0.2 }} // First card has extra delay in opening sequence
      className="relative pl-12 md:pl-24"
    >
      {/* Node Dot */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: index === 0 ? 0.8 : 0.3 }}
        className="absolute left-[9px] md:left-[33px] top-2 w-[14px] h-[14px] rounded-full bg-[#050505] border-[3px] border-accent shadow-[0_0_10px_rgba(109,93,254,1)] z-10"
      />

      {/* Year Label */}
      <div className="text-accent/80 font-mono text-sm font-bold tracking-widest mb-2 flex items-center gap-4">
        {memory.date}
        <div className="h-px bg-white/10 flex-1" />
      </div>

      {/* Memory Card */}
      <div className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        
        {/* Image Container with hover effects */}
        <div 
          className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden cursor-pointer"
          onClick={imageExists ? onImageClick : undefined}
        >
          {imageExists === null ? (
            <div className="w-full h-full bg-white/5 animate-pulse" />
          ) : imageExists ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={memory.imageUrl} 
                alt={memory.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Soft Glow Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            </>
          ) : (
            <div className="w-full h-full bg-black/60 backdrop-blur-xl border-b border-white/5 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <span className="text-2xl opacity-50">📸</span>
              </div>
              <p className="text-white/60 font-light mb-2">Leadership memories will appear here.</p>
              <p className="text-white/40 text-sm font-mono bg-black/50 px-4 py-2 rounded-lg border border-white/5">
                Upload to: <span className="text-accent/80">public/coding-ninjas/</span>
              </p>
            </div>
          )}
        </div>

        {/* Content - slides up slightly on hover */}
        <div className="relative p-6 md:p-8 transform transition-transform duration-500 group-hover:-translate-y-2 bg-black/40 backdrop-blur-sm">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{memory.title}</h3>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
            {memory.story}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-semibold">{memory.achievement}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {memory.tags.map(tag => (
                <span key={tag} className="text-xs font-medium text-white/50 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}


// Fullscreen Image Viewer Sub-component
function ImageViewer({ selectedImage, onClose, memories, setTargetImage }: { selectedImage: string | null, onClose: () => void, memories: Memory[], setTargetImage: (url: string) => void }) {
  
  // Handle keyboard navigation inside the viewer
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = memories.findIndex(m => m.imageUrl === selectedImage);
      if (e.key === "ArrowRight" && currentIndex < memories.length - 1) {
        setTargetImage(memories[currentIndex + 1].imageUrl);
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setTargetImage(memories[currentIndex - 1].imageUrl);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, memories, setTargetImage]);

  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[20000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
        >
          {/* Viewer Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[20010] p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-4 md:left-12 flex items-center pointer-events-none">
            <button 
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white pointer-events-auto backdrop-blur-md transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const idx = memories.findIndex(m => m.imageUrl === selectedImage);
                if (idx > 0) setTargetImage(memories[idx - 1].imageUrl);
              }}
              style={{ opacity: memories.findIndex(m => m.imageUrl === selectedImage) > 0 ? 1 : 0.3 }}
            >
              <ChevronLeft size={32} />
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-4 md:right-12 flex items-center pointer-events-none">
            <button 
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white pointer-events-auto backdrop-blur-md transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const idx = memories.findIndex(m => m.imageUrl === selectedImage);
                if (idx < memories.length - 1) setTargetImage(memories[idx + 1].imageUrl);
              }}
              style={{ opacity: memories.findIndex(m => m.imageUrl === selectedImage) < memories.length - 1 ? 1 : 0.3 }}
            >
              <ChevronRight size={32} />
            </button>
          </div>

          <motion.img
            key={selectedImage} // forces re-animation when image changes
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            src={selectedImage}
            alt="Fullscreen Memory"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
