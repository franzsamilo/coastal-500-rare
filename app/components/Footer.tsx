"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  network: ["About", "Members", "Initiatives", "Impact"],
  resources: ["Stories", "Resources", "Events", "News"],
  connect: ["Contact", "Join", "Partner", "Media"],
};

export default function Footer() {
  return (
    <footer className="bg-[#002A4E] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A8A8] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Logo and Description */}
          <div className="sm:col-span-2 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 sm:gap-4 mb-4"
            >
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <Image
                  src="/icon.png"
                  alt="Coastal 500 Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold">
                COASTAL<span className="text-[#00A8A8]">500</span>
              </span>
            </motion.div>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              A global network of mayors building prosperous coastal communities
              that protect and benefit from ocean resources.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/90 hover:text-[#00A8A8] transition-colors text-sm font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social and Contact */}
        <div className="border-t border-white/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.a
              href="mailto:info@coastal500.org"
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 text-white/90 hover:text-[#00A8A8] transition-colors font-medium text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm break-all">info@coastal500.org</span>
            </motion.a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {[
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#00A8A8] flex items-center justify-center transition-colors"
              >
                <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 sm:pt-8 mt-6 sm:mt-8 text-center text-white/70 text-xs sm:text-sm px-4">
          <p>© {new Date().getFullYear()} Coastal 500. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
