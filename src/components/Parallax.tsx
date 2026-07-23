"use client";

import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  offset?: number;
  className?: string;
  rotate?: boolean;
};

export function Parallax({ children, offset = 60, className, rotate = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        style={
          reduce
            ? undefined
            : {
                y: y as MotionValue<number>,
                rotateX: (rotate ? rotateX : 0) as MotionValue<number> | number,
                transformStyle: "preserve-3d",
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
