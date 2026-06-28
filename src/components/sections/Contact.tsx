"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full py-32 md:py-48 bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Huge Typography */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter uppercase text-white mb-4">
            LET&apos;S BUILD
          </h2>
          <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-accent to-glow">
            SOMETHING
          </h2>
          <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter uppercase text-white mt-4">
            SECURE.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 w-full max-w-6xl mt-12 text-left">
          
          {/* Left - Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">Start a conversation</h3>
              <a href="mailto:hello@allanroy.com" className="text-xl md:text-2xl text-secondary hover:text-accent transition-colors magnetic inline-block">
                hello@allanroy.com
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm text-secondary font-semibold uppercase tracking-widest mb-2">Connect</h4>
              <a href="#" className="text-xl text-white hover:text-accent transition-colors w-fit magnetic">LinkedIn</a>
              <a href="#" className="text-xl text-white hover:text-accent transition-colors w-fit magnetic">GitHub</a>
              <a href="#" className="text-xl text-white hover:text-accent transition-colors w-fit magnetic">Download Resume</a>
            </div>
          </motion.div>

          {/* Right - Animated Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative group">
              <input 
                type="text" 
                id="name" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-accent transition-colors peer"
                placeholder="Name"
                required
              />
              <label htmlFor="name" className="absolute left-0 top-4 text-secondary text-lg transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-accent peer-valid:-top-4 peer-valid:text-sm">
                What&apos;s your name?
              </label>
            </div>

            <div className="relative group">
              <input 
                type="email" 
                id="email" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-accent transition-colors peer"
                placeholder="Email"
                required
              />
              <label htmlFor="email" className="absolute left-0 top-4 text-secondary text-lg transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-accent peer-valid:-top-4 peer-valid:text-sm">
                What&apos;s your email address?
              </label>
            </div>

            <div className="relative group mt-4">
              <textarea 
                id="message" 
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-accent transition-colors peer resize-none"
                placeholder="Message"
                required
              ></textarea>
              <label htmlFor="message" className="absolute left-0 top-4 text-secondary text-lg transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-accent peer-valid:-top-4 peer-valid:text-sm">
                Tell me about your project...
              </label>
            </div>

            <button 
              type="submit"
              className="magnetic self-start mt-8 px-10 py-5 rounded-full bg-accent text-white font-bold tracking-widest uppercase hover:bg-glow transition-colors"
            >
              Send Message
            </button>
          </motion.form>

        </div>
      </div>
      
      {/* Footer Text */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-secondary text-sm">
        &copy; {new Date().getFullYear()} Allan Roy. All rights reserved.
      </div>
    </section>
  );
}
