"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

interface Member {
  image: string;
  title: string;
  subtitle: string;
  handle: string;
  location: string;
  borderColor: string;
  gradient: string;
  quote?: string;
}

const memberData: Member[] = [
  {
    image: "https://images.unsplash.com/photo-1562904403-a5106bef8319?q=100&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mayor Sarah Chen",
    subtitle: "Bali, Indonesia",
    handle: "Coastal Leader",
    location: "Indonesia",
    borderColor: "#00A8A8",
    gradient: "linear-gradient(145deg, #00A8A8, #002A4E)",
    quote: "Building resilient coastal communities through sustainable practices and community engagement."
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1661752215895-c0bcaf368b78?q=100&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mayor Maria Rodriguez",
    subtitle: "Cartagena, Colombia",
    handle: "Sustainability Advocate",
    location: "Colombia",
    borderColor: "#002A4E",
    gradient: "linear-gradient(210deg, #002A4E, #003d6b)",
    quote: "Protecting our oceans means protecting our future. Every action counts."
  },
  {
    image: "https://images.unsplash.com/photo-1723221906960-1c5a5febc9c3?w=1200&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmlnZXJpYW4lMjBtYW58ZW58MHx8MHx8fDA%3D",
    title: "Mayor James Okonkwo",
    subtitle: "Lagos, Nigeria",
    handle: "Climate Champion",
    location: "Nigeria",
    borderColor: "#00A8A8",
    gradient: "linear-gradient(165deg, #00A8A8, #002A4E)",
    quote: "Empowering local communities to lead the fight against climate change."
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1661774991416-ee14a1bc0d30?w=1200&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a29yZWFuJTIwbWFufGVufDB8fDB8fHww",
    title: "Mayor David Kim",
    subtitle: "Busan, South Korea",
    handle: "Marine Conservationist",
    location: "South Korea",
    borderColor: "#003d6b",
    gradient: "linear-gradient(195deg, #003d6b, #002A4E)",
    quote: "Innovation and tradition working together to preserve our marine ecosystems."
  },
  {
    image: "https://images.unsplash.com/photo-1720670751137-019756ac8414?w=1200&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJyYXppbGlhbiUyMHdvbWFufGVufDB8fDB8fHww",
    title: "Mayor Ana Silva",
    subtitle: "Recife, Brazil",
    handle: "Community Builder",
    location: "Brazil",
    borderColor: "#00A8A8",
    gradient: "linear-gradient(225deg, #00A8A8, #003d6b)",
    quote: "Connecting communities across borders to create lasting environmental impact."
  },
  {
    image: "https://images.unsplash.com/photo-1683049621511-5eb772204bc4?w=1200&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZpbGlwaW5vJTIwbWFufGVufDB8fDB8fHww",
    title: "Mayor Carlos Mendez",
    subtitle: "Manila, Philippines",
    handle: "Ocean Protector",
    location: "Philippines",
    borderColor: "#002A4E",
    gradient: "linear-gradient(135deg, #002A4E, #00A8A8)",
    quote: "Our commitment to ocean protection shapes the legacy we leave for future generations."
  }
];

export default function MemberSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Auto-scroll every 5 seconds
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % memberData.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      // Reset auto-scroll timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % memberData.length);
      }, 5000);
    }
  };

  const currentMember = memberData[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <section
      id="members"
      className="relative overflow-hidden bg-gradient-to-b from-white via-zinc-50 to-white py-16 sm:py-24 md:py-32"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00A8A8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#002A4E]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[#002A4E] mb-4">
              Member Spotlight
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto font-sans">
              Leaders driving change in coastal communities worldwide
            </p>
          </div>
        </RevealOnScroll>

        {/* Carousel Container */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              className="relative"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative"
                >
                  <div className="relative aspect-square max-w-lg mx-auto">
                    {/* Gradient border effect */}
                    <div
                      className="absolute inset-0 rounded-3xl blur-xl opacity-50"
                      style={{ background: currentMember.gradient }}
                    />
                    <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                      <Image
                        src={currentMember.image}
                        alt={currentMember.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        priority
                        quality={95}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-center md:text-left space-y-6"
                >
                  <div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "60px" }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="h-1 bg-gradient-to-r from-[#00A8A8] to-[#002A4E] mb-6 mx-auto md:mx-0 rounded-full"
                    />
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#002A4E] mb-2">
                      {currentMember.title}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-[#00A8A8] mb-4">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg font-semibold">{currentMember.subtitle}</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#00A8A8] font-medium mb-6">
                      {currentMember.handle}
                    </p>
                  </div>

                  {currentMember.quote && (
                    <motion.blockquote
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-lg sm:text-xl text-zinc-700 italic leading-relaxed border-l-4 pl-6 border-[#00A8A8]"
                    >
                      "{currentMember.quote}"
                    </motion.blockquote>
                  )}

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A8A8] text-white rounded-full font-semibold hover:bg-[#00c4c4] transition-colors shadow-lg shadow-[#00A8A8]/30"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {memberData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#00A8A8] scale-125"
                    : "bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-0 rounded-full bg-[#00A8A8]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-1 bg-zinc-200 rounded-full overflow-hidden max-w-md mx-auto">
            <motion.div
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[#00A8A8] to-[#002A4E]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
