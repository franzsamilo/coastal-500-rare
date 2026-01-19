"use client";

import { Map } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import FlowingMenu from "./FlowingMenu";

const networkRegions = [
  {
    link: "#latin-america",
    text: "Latin America",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop"
  },
  {
    link: "#asia-pacific",
    text: "Asia Pacific",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    link: "#africa",
    text: "Africa",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop"
  },
  {
    link: "#caribbean",
    text: "Caribbean",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
  }
];

export default function InteractiveMap() {
  return (
    <section
      id="network"
      className="relative overflow-hidden bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-900"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <Map className="w-6 h-6 sm:w-8 sm:h-8 text-[#00A8A8] mr-2" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#002A4E]">
                Global Network
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto px-4">
              Our network spans across tropical coastal regions worldwide
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* Full-width FlowingMenu */}
      <RevealOnScroll delay={0.2}>
        <div className="w-full relative bg-gradient-to-br from-[#002A4E] to-[#003d6b]">
          <div className="h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
            <FlowingMenu
              items={networkRegions}
              speed={20}
              textColor="#ffffff"
              bgColor="#002A4E"
              marqueeBgColor="#ffffff"
              marqueeTextColor="#002A4E"
              borderColor="rgba(255, 255, 255, 0.2)"
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
