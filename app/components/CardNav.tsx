"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  scrolled?: boolean;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Coastal 500 Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#ffffff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  scrolled = false
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const currentMenuColor = menuColor || (scrolled ? '#002A4E' : '#ffffff');
  const currentBaseColor = scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.05)';
  const currentButtonBg = buttonBgColor || (scrolled ? '#002A4E' : 'rgba(255, 255, 255, 0.2)');
  const currentButtonText = buttonTextColor || (scrolled ? '#ffffff' : '#ffffff');

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-[99] top-4 md:top-6 ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl relative overflow-hidden will-change-[height] backdrop-blur-xl transition-all duration-300 ${
          scrolled ? 'border border-zinc-200/50' : ''
        }`}
        style={{ backgroundColor: currentBaseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 md:px-6 z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: currentMenuColor }}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center gap-3 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-all duration-500 ${
              scrolled 
                ? "bg-[#002A4E]/10 rounded-lg p-1 ring-1 ring-[#002A4E]/20" 
                : ""
            }`}>
              <div 
                className="relative w-full h-full"
                style={scrolled ? {
                  filter: "brightness(0) saturate(100%) invert(15%) sepia(95%) saturate(2000%) hue-rotate(195deg) brightness(95%) contrast(95%)",
                  transition: "filter 0.5s ease"
                } : {
                  transition: "filter 0.5s ease"
                }}
              >
                <Image
                  src={logo}
                  alt={logoAlt}
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>
            <span className={`text-xl sm:text-2xl font-display font-bold transition-colors ${
              scrolled 
                ? "text-[#002A4E]" 
                : "text-white drop-shadow-lg"
            }`}>
              COASTAL<span className="text-[#00A8A8]">500</span>
            </span>
          </div>

          <button
            type="button"
            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-full px-5 py-2.5 items-center h-auto font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:scale-105"
            style={{ backgroundColor: currentButtonBg, color: currentButtonText }}
          >
            Join the Network
          </button>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-3 md:p-4 flex flex-col items-stretch gap-3 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-4`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-3 p-4 md:p-5 rounded-xl min-w-0 flex-[1_1_auto] h-auto min-h-[80px] md:h-full md:min-h-0 md:flex-[1_1_0%] shadow-md hover:shadow-lg transition-shadow"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-display font-bold tracking-[-0.5px] text-xl md:text-2xl">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-2">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-2 no-underline cursor-pointer transition-opacity duration-300 hover:opacity-80 text-sm md:text-base font-medium"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={() => {
                      setIsHamburgerOpen(false);
                      setIsExpanded(false);
                      if (tlRef.current) {
                        tlRef.current.reverse();
                      }
                    }}
                  >
                    <ArrowUpRight className="nav-card-link-icon shrink-0 w-4 h-4" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
