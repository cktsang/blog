"use client";

import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion";

export default function Providers({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null!);

  return (
    <TransitionRouter
      auto
      leave={(next, from, to) => {
        if (from === to) {
          return;
        }
        animate(
          wrapperRef.current,
          { opacity: [1, 0] },
          { duration: 0.5, onComplete: next },
        );
      }}
      enter={(next) => {
        animate(
          wrapperRef.current,
          { opacity: [0, 1] },
          { duration: 0.5, onComplete: next },
        );
      }}
    >
      <div ref={wrapperRef}>{children}</div>
    </TransitionRouter>
  );
}
