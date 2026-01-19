"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Users, Globe, Heart } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedWaves from "./AnimatedWaves";

interface CounterProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

function Counter({ value, suffix, label, icon }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useSpring(count, {
    damping: 50,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [rounded]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="flex flex-col items-center text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, -5, 0] }}
        className="mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-br from-[#00A8A8]/10 to-[#002A4E]/10 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      </motion.div>
      
      <motion.div
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <span className="bg-gradient-to-r from-white to-[#00A8A8] bg-clip-text text-transparent font-display">
          {displayValue}{suffix}
        </span>
      </motion.div>
      <p className="text-base sm:text-lg text-white/90 font-medium font-display drop-shadow-md">{label}</p>
    </motion.div>
  );
}

export default function GlobalImpact() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="impact"
      className="relative min-h-[120vh] flex items-center justify-center bg-[#002A4E] overflow-hidden pt-24 sm:pt-32"
    >
      {/* Clean transition from Hero - ensure no visual artifacts */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#002A4E] z-30 pointer-events-none" />
      
      {/* Animated Background Waves */}
      <AnimatedWaves />

      {/* Parallax Background Layers */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y }}
        className="absolute inset-0 z-0"
      >
        <div className="w-full h-full bg-gradient-to-br from-[#002A4E] via-[#004a7a] to-[#00A8A8]/20">
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A8A8]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00A8A8]/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 relative z-10 w-full">
        <RevealOnScroll>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 px-4 drop-shadow-lg">
              Global Impact
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto px-4 drop-shadow-md">
              A network spanning continents, united by a shared vision for
              coastal resilience
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 pb-8">
          <Counter
            value={500}
            suffix="+"
            label="Mayors"
            icon={<Users className="w-8 h-8 text-[#00A8A8]" />}
          />
          <Counter
            value={25}
            suffix="+"
            label="Countries"
            icon={<Globe className="w-8 h-8 text-[#00A8A8]" />}
          />
          <Counter
            value={100}
            suffix="M+"
            label="People Impacted"
            icon={<Heart className="w-8 h-8 text-[#00A8A8]" />}
          />
        </div>
      </div>
    </section>
  );
}
