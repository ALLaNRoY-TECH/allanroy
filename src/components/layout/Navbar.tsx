"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 bg-black/40 backdrop-blur-md border-b border-white/10" : "py-8 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-widest magnetic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">
          ALLAN ROY
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="#about" className="hover:text-accent transition-colors magnetic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">ABOUT</Link>
          <Link href="#skills" className="hover:text-accent transition-colors magnetic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">STACK</Link>
          <Link href="#projects" className="hover:text-accent transition-colors magnetic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">PROJECTS</Link>
          <Link href="#experience" className="hover:text-accent transition-colors magnetic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">EXPERIENCE</Link>
          <Link href="#contact" className="hover:text-accent transition-colors magnetic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">CONTACT</Link>
        </nav>
        <div className="md:hidden">
           {/* Mobile menu toggle could go here */}
           <button className="magnetic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1">MENU</button>
        </div>
      </div>
    </motion.header>
  );
}
