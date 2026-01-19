"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Initiative {
  image: string;
  text: string;
}

interface InitiativesMobileProps {
  items: Initiative[];
}

export default function InitiativesMobile({ items }: InitiativesMobileProps) {
  return (
    <div className="w-full px-4 sm:px-6 pb-8">
      <div className="flex flex-col gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <Image
                src={item.image}
                alt={item.text}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 100vw"
                quality={90}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                  {item.text}
                </h3>
                <div className="flex items-center gap-2 text-white/90 group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
