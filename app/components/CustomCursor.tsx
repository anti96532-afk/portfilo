"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      // Snap dot immediately
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      // Detect hover on interactive elements
      const target = e.target as HTMLElement;
      const isHoverable = target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]");
      setHovering(!!isHoverable);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    // Smooth ring follow loop
    const loop = () => {
      const ease = 0.12;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };

    loop();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? "48px" : clicking ? "28px" : "36px",
          height: hovering ? "48px" : clicking ? "28px" : "36px",
          borderRadius: "50%",
          border: `1.5px solid ${hovering ? "rgba(99,102,241,0.9)" : "rgba(255,255,255,0.35)"}`,
          background: hovering ? "rgba(99,102,241,0.08)" : "transparent",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease, opacity 0.3s ease",
          willChange: "transform",
          backdropFilter: hovering ? "blur(2px)" : "none",
        }}
      />

      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: clicking ? "5px" : hovering ? "6px" : "7px",
          height: clicking ? "5px" : hovering ? "6px" : "7px",
          borderRadius: "50%",
          background: hovering ? "rgb(99,102,241)" : "white",
          pointerEvents: "none",
          zIndex: 100000,
          opacity: visible ? 1 : 0,
          transition: "width 0.15s ease, height 0.15s ease, background 0.2s ease, opacity 0.3s ease",
          willChange: "transform",
          boxShadow: hovering ? "0 0 12px rgba(99,102,241,0.8)" : "0 0 6px rgba(255,255,255,0.4)",
        }}
      />
    </>
  );
}
