"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  MotionConfig,
} from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const links = [
  { href: "/blog", label: "blog" },
  { href: "/activities", label: "activities" },
  { href: "/visits", label: "visits" },
  { href: "/bookmarks", label: "bookmarks" },
  { href: "/about", label: "about" },
];

const variants = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],

      top: ["35%", "50%", "50%"],
    },

    closed: {
      rotate: ["45deg", "0deg", "0deg"],

      top: ["50%", "50%", "35%"],
    },
  },

  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },

    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },

  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],

      bottom: ["35%", "50%", "50%"],

      left: "50%",
    },

    closed: {
      rotate: ["45deg", "0deg", "0deg"],

      bottom: ["50%", "50%", "35%"],

      left: "calc(50% + 4px)",
    },
  },
};

function Header() {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const ref = useRef<HTMLDivElement | null>(null!);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (ref) {
      const resizeObserver = new ResizeObserver(() => {
        const width = ref.current?.getBoundingClientRect().width;

        width && setIsMobile(width < 1024);
      });

      resizeObserver.observe(ref.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathName]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previousY = scrollY.getPrevious() || 0;
    if (latest > previousY && latest > 100) {
      if (!isMenuOpen) {
        setHidden(true);
      }
    } else {
      setHidden(false);
    }
  });

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <motion.div
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="sticky top-0 z-50 h-14 w-full border-b backdrop-blur-sm"
      ref={ref}
    >
      <header
        className={`relative flex h-full max-w-screen-xl items-center justify-between px-2 md:px-6 lg:mx-auto lg:w-fit lg:justify-center lg:space-x-10 lg:px-0`}
      >
        <Link
          href="/"
          className="z-50 hover:animate-wave"
          aria-label="Blog homepage"
        >
          <Image
            src="/logo.webp"
            alt="logo"
            width={50}
            height={50}
            className="h-10 w-10 min-w-fit"
          />
        </Link>

        <MotionConfig
          transition={{
            duration: 0.3,

            ease: "easeInOut",
          }}
        >
          <motion.button
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            onClick={toggleMenu}
            className="relative inline h-10 w-10 rounded-full transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              variants={variants.top}
              className="absolute h-0.5 w-6 bg-black"
              style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
            />

            <motion.span
              variants={variants.middle}
              className="h- absolute h-0.5 w-6 bg-black"
              style={{ y: "-50%", left: "50%", x: "-50%", top: "50%" }}
            />

            <motion.span
              variants={variants.bottom}
              className="absolute h-0.5 w-4 bg-black"
              style={{
                y: "50%",
                x: "-50%",
                bottom: "35%",
                left: "calc(50% + 10px)",
              }}
            />
          </motion.button>
        </MotionConfig>

        <nav
          className={`${isMenuOpen ? "flex" : "hidden lg:flex"} absolute left-0 top-14 w-full lg:relative lg:top-0`}
        >
          <AnimatePresence>
            <motion.ul
              variants={{
                visible: { opacity: 1, height: isMobile ? "100vh" : "auto" },
                hidden: { opacity: 0, height: 0 },
              }}
              initial={false}
              animate={isMenuOpen ? "visible" : isMobile ? "hidden" : "visible"}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={`scrollbar-hidden flex h-screen w-full flex-1 flex-col items-center gap-8 overflow-hidden overflow-y-scroll bg-black pb-64 pt-10 font-semibold lg:h-fit lg:flex-row lg:bg-transparent lg:pb-0 lg:pt-0`}
            >
              {links.map((link, index) => {
                return (
                  <HeaderLink
                    index={index}
                    key={link.href}
                    href={link.href}
                    currentPath={pathName}
                    label={link.label}
                    isMobile={isMobile}
                    isMenuOpen={isMenuOpen}
                  />
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </nav>
      </header>
    </motion.div>
  );
}

export default Header;

function HeaderLink({
  href,
  currentPath,
  label,
  isMobile,
  isMenuOpen,
  index,
}: {
  href: string;
  currentPath: string | null;
  label: string;
  isMobile: boolean;
  isMenuOpen: boolean;
  index: number;
}) {
  return (
    <motion.li
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: isMobile ? 0 : 1 },
      }}
      animate={isMenuOpen ? "visible" : isMobile ? "hidden" : "visible"}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        delay: index * 0.1,
      }}
      className="group"
    >
      <Link
        className={`${currentPath === href ? "bg-[length:100%_2px]" : ""} bg-gradient-to-r from-emerald-700 to-emerald-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-4xl font-semibold capitalize text-white no-underline transition-all duration-500 ease-out group-hover:bg-[length:100%_2px] lg:inline lg:text-lg lg:text-primary`}
        href={href}
      >
        {label}
      </Link>
    </motion.li>
  );
}
