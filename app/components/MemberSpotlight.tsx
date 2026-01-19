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
    image: "/image1.jpg",
    title: "Mayor Sarah Chen",
    subtitle: "Bali, Indonesia",
    handle: "Coastal Leader",
    location: "Indonesia",
    borderColor: "#00A8A8",
    gradient: "linear-gradient(145deg, #00A8A8, #002A4E)",
    quote: "Building resilient coastal communities through sustainable practices and community engagement."
  },
  {
    image: "/image2.jpg",
    title: "Mayor Maria Rodriguez",
    subtitle: "Cartagena, Colombia",
    handle: "Sustainability Advocate",
    location: "Colombia",
    borderColor: "#002A4E",
    gradient: "linear-gradient(210deg, #002A4E, #003d6b)",
    quote: "Protecting our oceans means protecting our future. Every action counts."
  },
  {
    image: "/image3.jpg",
    title: "Mayor James Okonkwo",
    subtitle: "Lagos, Nigeria",
    handle: "Climate Champion",
    location: "Nigeria",
    borderColor: "#00A8A8",
    gradient: "linear-gradient(165deg, #00A8A8, #002A4E)",
    quote: "Empowering local communities to lead the fight against climate change."
  },
  {
    image: "/image4.jpg",
    title: "Mayor David Kim",
    subtitle: "Busan, South Korea",
    handle: "Marine Conservationist",
    location: "South Korea",
    borderColor: "#003d6b",
    gradient: "linear-gradient(195deg, #003d6b, #002A4E)",
    quote: "Innovation and tradition working together to preserve our marine ecosystems."
  },
  {
    image: "/image5.jpg",
    title: "Mayor Ana Silva",
    subtitle: "Recife, Brazil",
    handle: "Community Builder",
    location: "Brazil",
    borderColor: "#00A8A8",
    gradient: "linear-gradient(225deg, #00A8A8, #003d6b)",
    quote: "Connecting communities across borders to create lasting environmental impact."
  },
  {
    image: "/image6.jpg",
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
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_SCROLL_INTERVAL = 8000; // 8 seconds - slower and more comfortable

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Start auto-scroll
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % memberData.length);
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused]);

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      // Pause auto-scroll briefly after manual navigation, then resume
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
      }, AUTO_SCROLL_INTERVAL); // Wait full interval before resuming
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const currentMember = memberData[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.95
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
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25, duration: 0.6 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
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
                  <div className="relative aspect-square max-w-lg mx-auto w-full">
                    {/* Gradient border effect */}
                    <div
                      className="absolute inset-0 rounded-3xl blur-xl opacity-50 z-0"
                      style={{ background: currentMember.gradient }}
                    />
                    <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-zinc-100">
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={currentMember.image}
                          alt={currentMember.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                          priority={currentIndex === 0}
                          quality={95}
                          unoptimized={true}
                        />
                      </div>
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
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
            {!isPaused && (
              <motion.div
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_SCROLL_INTERVAL / 1000, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#00A8A8] to-[#002A4E]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
