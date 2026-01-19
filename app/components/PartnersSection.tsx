"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const partners = [
  { name: "Rare", type: "Founding Partner" },
  { name: "Ocean Conservancy", type: "Strategic Partner" },
  { name: "WWF", type: "Implementation Partner" },
  { name: "The Nature Conservancy", type: "Strategic Partner" },
  { name: "Conservation International", type: "Knowledge Partner" },
  { name: "Blue Ventures", type: "Research Partner" },
  { name: "Marine Stewardship Council", type: "Certification Partner" },
  { name: "Global Fishing Watch", type: "Technology Partner" },
];

export default function PartnersSection() {
  // Duplicate partners for seamless infinite loop (need at least 2 sets)
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center gap-2 mb-4"
            >
              <HeartHandshake className="w-6 h-6 sm:w-8 sm:h-8 text-[#00A8A8]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#002A4E] mb-4 px-4">
              Our Partners
            </h2>
            <p className="text-lg sm:text-xl text-zinc-700 max-w-2xl mx-auto px-4">
              Working together with leading organizations to amplify coastal
              community impact
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* Infinite flowing ticker */}
      <div className="relative w-full overflow-hidden py-8 border-y-2 border-zinc-100">
        <motion.div
          className="flex gap-12 md:gap-16 items-center whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"], // Move by exactly half the width for seamless loop
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center gap-4 px-6 md:px-8 shrink-0"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#002A4E]">
                {partner.name}
              </span>
              <span className="text-sm sm:text-base text-zinc-500 font-medium">
                {partner.type}
              </span>
              <div className="w-1 h-8 bg-zinc-300 rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <RevealOnScroll delay={0.4}>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#002A4E] to-[#00A8A8] text-white rounded-full font-semibold text-base sm:text-lg shadow-lg shadow-[#00A8A8]/30 hover:shadow-xl transition-shadow"
            >
              Become a Partner
            </motion.button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
