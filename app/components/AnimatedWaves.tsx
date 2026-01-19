"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AnimatedWaves() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number; xOffset: number }>>([]);

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    setParticles(
      Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 2,
        xOffset: Math.random() * 20 - 10,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wave Layer 1 */}
      <motion.svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <path
          fill="#00A8A8"
          fillOpacity="0.1"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </motion.svg>

      {/* Wave Layer 2 */}
      <motion.svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <path
          fill="#00A8A8"
          fillOpacity="0.15"
          d="M0,192L48,208C96,224,192,256,288,256C384,256,480,224,576,208C672,192,768,192,864,208C960,224,1056,256,1152,256C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </motion.svg>

      {/* Floating particles - only render on client */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#00A8A8] rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
