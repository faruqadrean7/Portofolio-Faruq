"use client";

import { useEffect, useRef } from "react";

export function MatrixRain({
  opacity = 0.18,
  fontSize = 14,
  speed = 1,
  color = "#1E3A8A",
}: {
  opacity?: number;
  fontSize?: number;
  speed?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>/=+-*ƒΣΩ#$";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(width / fontSize);
      drops = Array(columns)
        .fill(0)
        .map(() => Math.random() * -height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(250, 250, 247, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    if (!reduce) draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [fontSize, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
