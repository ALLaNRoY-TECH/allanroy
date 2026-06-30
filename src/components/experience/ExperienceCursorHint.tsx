import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool } from "lucide-react"; // Using PenTool as a pencil/sketch icon placeholder

const ALTERNATIVE_TEXTS = [
  "✏️ Click to see my journey",
  "📸 Explore my memories",
  "🚀 Behind the scenes",
  "💜 My CN 10X Story",
  "👀 Take a look"
];

interface ExperienceCursorHintProps {
  isVisible: boolean;
  mouseX: number;
  mouseY: number;
}

export default function ExperienceCursorHint({ isVisible, mouseX, mouseY }: ExperienceCursorHintProps) {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ALTERNATIVE_TEXTS.length);
    }, 3000); // Rotate every 3 seconds
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: mouseX + 20, // Offset to not block the actual click target
            top: mouseY + 20,
          }}
        >
          <div className="relative flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-2xl">
            {/* Gentle bounce for the pencil icon */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <PenTool className="w-5 h-5 text-accent" />
            </motion.div>
            
            {/* Text that rotates */}
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.8, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm font-medium text-white tracking-wide"
                style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }} // Fallback handwriting fonts
              >
                {ALTERNATIVE_TEXTS[textIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
