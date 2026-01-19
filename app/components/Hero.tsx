"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const words = ["Leading", "the", "Tide", "for", "Coastal", "Communities"];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#002A4E] via-[#003d6b] to-[#002A4E] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability - smooth transition to next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002A4E]/80 via-[#002A4E]/70 to-[#002A4E]/60" />
      </div>
      
      {/* Seamless transition overlay at bottom - subtle gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#002A4E] z-20 pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-20"
      >
        {/* Staggered Word Animation */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight px-2 sm:px-0">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="inline-block mr-3"
              >
                {word === "Coastal" ? (
                  <span className="text-[#00A8A8]">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>
        </div>

        <RevealOnScroll delay={0.7}>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 max-w-3xl leading-relaxed drop-shadow-lg px-2 sm:px-0">
            The world's largest global network of mayors committed to thriving
            coastal communities. Over 500 mayors across the tropics working
            together for sustainable futures.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#00A8A8] text-white rounded-full font-semibold text-base sm:text-lg flex items-center justify-center gap-2 group hover:bg-[#00c4c4] transition-colors shadow-lg shadow-[#00A8A8]/40 relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  For Mayors
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </MagneticButton>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-base sm:text-lg border-2 border-white/30 hover:bg-white/20 transition-colors flex items-center justify-center gap-2 group"
            >
              For Partners
              <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </RevealOnScroll>

        {/* Trust Indicators */}
        <RevealOnScroll delay={0.9}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-white text-xs sm:text-sm font-medium drop-shadow-md px-2 sm:px-0">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <div className="w-2 h-2 bg-[#00A8A8] rounded-full animate-pulse" />
              <span>500+ Mayors</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <div className="w-2 h-2 bg-[#00A8A8] rounded-full animate-pulse" />
              <span>25+ Countries</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <div className="w-2 h-2 bg-[#00A8A8] rounded-full animate-pulse" />
              <span className="hidden sm:inline">100M+ People Impacted</span>
              <span className="sm:hidden">100M+ Impacted</span>
            </div>
          </div>
        </RevealOnScroll>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}
