"use client";

import { motion } from "framer-motion";
import RevealOnScroll from "./RevealOnScroll";
import CircularGallery from "./CircularGallery";

const initiatives = [
  {
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
    text: "Sustainable Fisheries"
  },
  {
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    text: "Climate Resilience"
  },
  {
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    text: "Ocean Protection"
  },
  {
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
    text: "Community Engagement"
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    text: "Marine Conservation"
  },
  {
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    text: "Coastal Restoration"
  }
];

export default function InitiativesSection() {
  return (
    <section
      id="initiatives"
      className="relative overflow-hidden bg-gradient-to-b from-white via-zinc-50 to-white dark:from-black dark:via-zinc-900 dark:to-black"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00A8A8] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#002A4E] rounded-full blur-3xl" />
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-1 bg-gradient-to-r from-[#00A8A8] to-[#002A4E] mx-auto rounded-full" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#002A4E] mb-4">
              Our Initiatives
            </h2>
            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto px-4">
              Four pillars driving change across coastal communities worldwide
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* Full-width Gallery */}
      <RevealOnScroll delay={0.2}>
        <div className="w-full relative z-10">
          <CircularGallery
            items={initiatives}
            bend={3}
            textColor="#002A4E"
            borderRadius={0.05}
            font="bold 28px sans-serif"
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </RevealOnScroll>
    </section>
  );
}
