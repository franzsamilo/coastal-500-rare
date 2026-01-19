"use client";

import { useState, useEffect } from "react";
import CardNav, { CardNavItem } from "./CardNav";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: CardNavItem[] = [
    {
      label: "Impact",
      bgColor: "#002A4E",
      textColor: "#ffffff",
      links: [
        { label: "Global Statistics", href: "#impact", ariaLabel: "View global impact statistics" },
        { label: "Success Stories", href: "#impact", ariaLabel: "Read success stories" },
        { label: "Our Reach", href: "#impact", ariaLabel: "Learn about our global reach" },
      ],
    },
    {
      label: "Initiatives",
      bgColor: "#00A8A8",
      textColor: "#ffffff",
      links: [
        { label: "Sustainable Fisheries", href: "#initiatives", ariaLabel: "Learn about sustainable fisheries" },
        { label: "Climate Resilience", href: "#initiatives", ariaLabel: "Explore climate resilience programs" },
        { label: "Ocean Protection", href: "#initiatives", ariaLabel: "Discover ocean protection efforts" },
      ],
    },
    {
      label: "Network",
      bgColor: "#003d6b",
      textColor: "#ffffff",
      links: [
        { label: "Global Map", href: "#network", ariaLabel: "View global network map" },
        { label: "Member Cities", href: "#network", ariaLabel: "Browse member cities" },
        { label: "Join Us", href: "#network", ariaLabel: "Join the Coastal 500 network" },
      ],
    },
  ];

  return (
    <CardNav
      logo="/icon.png"
      logoAlt="Coastal 500 Logo"
      items={navItems}
      baseColor={scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.05)"}
      menuColor={scrolled ? "#002A4E" : "#ffffff"}
      buttonBgColor={scrolled ? "#002A4E" : "rgba(255, 255, 255, 0.2)"}
      buttonTextColor="#ffffff"
      scrolled={scrolled}
      ease="power3.out"
    />
  );
}
