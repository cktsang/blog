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
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const links = [
  { href: "/blog", label: "blog" },
  { href: "/activities", label: "activities" },
  { href: "/visits", label: "visits" },
  { href: "/technology", label: "technology" },
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
  const { resolvedTheme, setTheme } = useTheme();
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

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    toggleMenu();
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
      className="sticky top-0 z-50 h-14 w-full border-b bg-white/65 backdrop-blur-sm dark:bg-neutral-800/65"
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
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 512 578"
            className="min-w-fit fill-black dark:fill-white"
          >
            <path d="M 434.500 9.930 C 428.642 11.347 423.647 14.437 416.495 21.068 C 412.511 24.763 408.182 28.111 406.876 28.510 C 405.569 28.908 400.623 33.004 395.884 37.612 C 391.145 42.220 385.520 46.780 383.384 47.745 C 379.759 49.383 370.299 49.533 241.500 50.000 C 165.600 50.275 100.212 50.116 96.193 49.647 C 89.860 48.907 88.626 49.028 86.943 50.552 C 85.874 51.519 85.000 52.958 85.000 53.751 C 85.000 54.543 84.069 56.498 82.932 58.096 C 81.196 60.533 80.170 61.000 76.551 61.000 C 72.738 61.000 71.907 61.435 69.396 64.750 C 67.833 66.813 60.534 74.575 53.176 82.000 C 45.818 89.425 39.143 96.763 38.344 98.306 C 36.442 101.977 36.957 108.956 39.235 110.384 C 42.223 112.256 47.535 108.330 57.656 96.771 C 62.862 90.824 70.552 82.596 74.743 78.485 C 81.309 72.046 82.443 70.422 82.936 66.756 L 83.509 62.500 88.004 62.676 C 90.477 62.772 97.225 63.309 103.000 63.869 C 109.436 64.494 161.300 64.915 237.000 64.957 C 304.925 64.996 361.513 65.299 362.750 65.630 C 367.109 66.799 365.637 70.800 358.156 78.121 C 351.845 84.295 350.890 84.868 345.906 85.466 C 342.933 85.822 281.401 86.201 209.168 86.307 L 77.836 86.500 74.825 90.000 C 73.169 91.925 69.877 95.525 67.509 98.000 C 65.141 100.475 61.579 104.646 59.593 107.270 L 55.983 112.040 55.965 279.660 C 55.955 371.851 56.104 447.438 56.297 447.630 C 56.536 447.869 430.213 448.227 452.500 448.010 C 453.162 448.003 453.500 395.703 453.500 293.127 L 453.500 138.254 456.000 134.777 C 457.375 132.864 461.958 127.589 466.184 123.054 L 473.868 114.810 474.184 118.655 C 474.358 120.770 474.275 212.050 474.000 321.500 C 473.435 546.400 474.346 524.233 465.205 535.521 C 460.353 541.513 454.346 545.418 446.000 548.007 C 439.198 550.116 72.237 550.480 63.798 548.385 C 55.653 546.364 49.840 543.677 45.647 539.995 C 43.641 538.234 41.944 537.064 41.875 537.396 C 41.806 537.728 41.682 537.663 41.599 537.250 C 41.516 536.838 40.272 534.475 38.835 532.000 C 33.152 522.212 33.500 537.004 33.500 305.500 L 33.500 91.500 36.603 84.953 C 42.099 73.353 49.928 66.595 62.049 62.985 C 67.705 61.301 69.514 60.150 74.065 55.338 C 78.900 50.225 79.231 49.599 77.461 48.907 C 71.320 46.506 58.914 48.921 47.987 54.645 C 36.159 60.841 26.564 71.774 21.748 84.539 L 19.500 90.500 19.225 302.000 C 19.031 450.921 19.272 515.423 20.038 520.000 C 21.346 527.821 26.494 538.917 31.537 544.787 C 38.348 552.716 49.177 559.100 60.772 562.022 C 68.292 563.917 73.516 563.970 254.856 563.985 C 455.571 564.001 445.395 564.251 457.250 559.008 C 471.478 552.714 484.914 536.565 487.412 522.755 C 487.952 519.768 488.442 97.374 487.909 94.333 C 487.511 92.064 488.350 90.538 492.373 86.207 C 499.124 78.939 501.440 73.722 501.413 65.837 C 501.393 60.146 500.827 58.034 497.535 51.374 C 494.361 44.951 491.634 41.522 482.090 31.951 C 467.723 17.542 459.718 11.534 452.954 10.084 C 447.359 8.884 439.111 8.815 434.500 9.930 M 320.500 100.886 C 329.881 101.329 333.500 101.847 333.500 102.746 C 333.500 104.713 230.023 207.869 165.271 270.452 C 159.095 276.421 152.681 282.249 151.018 283.403 C 149.054 284.765 147.628 286.902 146.951 289.500 C 144.876 297.453 142.130 305.749 137.188 319.000 C 124.997 351.680 120.535 362.778 114.270 376.000 C 106.319 392.781 105.000 396.006 105.000 398.660 C 105.000 401.760 108.420 407.619 111.052 409.028 C 113.255 410.207 261.118 410.273 284.500 409.105 C 302.300 408.216 304.000 407.537 304.000 401.318 C 304.000 399.008 303.438 396.754 302.750 396.309 C 302.063 395.864 262.463 395.664 214.750 395.865 C 137.164 396.192 128.000 396.068 128.000 394.691 C 128.000 393.121 139.933 388.006 156.500 382.474 C 169.012 378.297 196.628 368.128 206.000 364.247 C 210.675 362.312 217.486 359.709 221.136 358.462 L 227.771 356.197 324.952 259.110 C 385.692 198.428 421.862 161.586 421.412 160.857 C 420.982 160.161 421.125 159.959 421.766 160.355 C 422.362 160.724 425.858 157.663 429.615 153.481 C 435.579 146.844 436.515 146.156 437.444 147.721 C 439.123 150.549 439.445 433.012 437.770 432.961 C 437.072 432.940 354.032 433.174 253.238 433.482 L 69.976 434.040 70.238 271.601 L 70.500 109.161 73.000 106.489 C 74.375 105.019 76.400 103.295 77.500 102.658 C 80.184 101.104 292.364 99.557 320.500 100.886 M 399.754 109.097 C 402.639 112.175 405.000 115.459 405.000 116.396 C 405.000 117.332 393.415 129.889 379.256 144.299 C 342.132 182.083 209.864 313.927 207.500 315.505 C 206.400 316.240 202.125 316.989 198.000 317.170 L 190.500 317.500 190.181 313.023 C 189.654 305.611 190.725 302.507 195.277 298.254 C 197.599 296.084 207.375 286.931 217.000 277.916 C 226.625 268.900 270.275 225.858 314.000 182.266 C 357.725 138.675 393.727 103.119 394.004 103.254 C 394.281 103.389 396.868 106.018 399.754 109.097 M 375.000 83.845 C 375.000 84.309 377.249 86.897 379.999 89.595 C 382.748 92.293 384.998 95.089 384.999 95.809 C 385.000 96.898 286.577 196.666 269.064 213.328 C 266.074 216.173 261.790 220.300 259.544 222.500 C 233.520 247.994 199.241 280.792 194.386 284.844 C 191.023 287.650 187.055 290.409 185.569 290.974 C 182.130 292.281 165.998 291.150 166.006 289.602 C 166.009 288.996 179.435 275.450 195.841 259.500 C 212.247 243.550 258.707 197.373 299.085 156.884 C 339.463 116.395 373.063 83.208 373.750 83.134 C 374.438 83.060 375.000 83.380 375.000 83.845 M 421.756 129.341 L 426.947 134.682 414.831 147.591 C 400.269 163.106 326.863 236.970 266.162 297.188 C 226.476 336.558 221.845 340.840 219.311 340.507 C 217.765 340.304 215.717 340.107 214.760 340.069 C 213.240 340.009 213.055 339.046 213.303 332.460 C 213.460 328.314 213.905 325.239 214.294 325.627 C 214.682 326.015 215.000 325.907 215.000 325.385 C 215.000 324.864 230.403 309.152 249.229 290.469 C 279.929 260.003 306.675 233.208 371.473 168.000 C 382.677 156.725 395.817 143.555 400.672 138.734 C 405.527 133.913 410.766 128.626 412.313 126.984 C 413.860 125.343 415.449 124.000 415.845 124.000 C 416.241 124.000 418.901 126.404 421.756 129.341 M 169.750 305.200 L 176.000 304.947 176.000 316.924 C 176.000 326.788 176.278 329.056 177.576 329.783 C 178.443 330.268 183.864 330.455 189.622 330.199 L 200.092 329.734 199.404 338.844 C 198.896 345.571 199.047 348.352 199.981 349.477 C 201.054 350.770 200.703 351.226 197.654 352.500 C 195.680 353.325 193.604 354.000 193.042 354.000 C 191.596 354.000 171.414 361.740 167.134 363.935 L 163.574 365.762 156.537 358.564 C 152.667 354.606 147.590 349.822 145.255 347.933 L 141.010 344.500 147.366 329.000 C 158.226 302.514 157.596 303.660 160.760 304.620 C 162.267 305.078 166.313 305.339 169.750 305.200 M 452.599 24.394 C 456.032 25.992 461.097 30.184 468.099 37.222 C 478.996 48.174 484.688 56.303 485.662 62.302 C 486.330 66.419 483.824 72.417 479.105 78.000 L 476.146 81.500 469.823 75.429 C 466.345 72.090 461.218 67.365 458.429 64.929 C 448.919 56.623 428.505 37.542 426.626 35.202 C 424.769 32.890 424.778 32.840 427.626 29.808 C 431.283 25.913 439.469 22.020 444.000 22.020 C 445.925 22.020 449.795 23.088 452.599 24.394 M 396.600 62.827 C 403.057 67.507 422.498 86.603 436.155 101.680 C 443.220 109.478 449.000 116.101 449.000 116.396 C 449.000 116.691 447.200 119.717 445.000 123.121 C 442.800 126.525 441.000 128.836 441.000 128.256 C 441.000 127.676 438.188 124.509 434.750 121.217 C 431.313 117.926 422.650 109.634 415.500 102.791 C 408.350 95.948 400.250 88.381 397.500 85.976 C 388.867 78.425 381.000 70.602 381.000 69.569 C 381.000 67.903 389.307 60.000 391.058 60.000 C 391.961 60.000 394.455 61.272 396.600 62.827 M 417.695 47.609 C 425.530 54.244 452.071 79.091 463.748 90.724 L 469.995 96.948 466.777 101.515 C 464.737 104.408 462.929 105.975 461.840 105.791 C 460.896 105.631 455.646 101.225 450.174 96.000 C 444.702 90.775 434.263 81.100 426.976 74.500 C 407.796 57.127 405.357 54.755 404.055 52.206 C 403.022 50.186 403.247 49.571 405.941 47.055 C 407.624 45.483 409.000 43.478 409.000 42.599 C 409.000 41.719 409.200 41.000 409.445 41.000 C 409.689 41.000 413.402 43.974 417.695 47.609 "></path>
          </svg>
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
              className="absolute h-0.5 w-6 bg-black dark:bg-white"
              style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
            />

            <motion.span
              variants={variants.middle}
              className="h- absolute h-0.5 w-6 bg-black dark:bg-white"
              style={{ y: "-50%", left: "50%", x: "-50%", top: "50%" }}
            />

            <motion.span
              variants={variants.bottom}
              className="absolute h-0.5 w-4 bg-black dark:bg-white"
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
              <li>
                <Button
                  variant={isMobile ? "outline" : "ghost"}
                  onClick={toggleTheme}
                  size="icon"
                  className="size-12 bg-transparent text-white hover:bg-transparent hover:text-yellow-500 dark:hover:text-yellow-500 lg:text-black dark:lg:text-white"
                >
                  <Sun className="hidden min-h-8 min-w-8 dark:block lg:min-h-6 lg:min-w-6" />
                  <Moon className="block min-h-8 min-w-8 dark:hidden lg:min-h-6 lg:min-w-6" />
                  <span className="sr-only">Toggle Theme</span>
                </Button>
              </li>
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
