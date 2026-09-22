"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");

    if (media.matches) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    const handlePointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactiveTarget = target?.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor='active']",
      );
      setIsHovering(Boolean(interactiveTarget));
    };

    const handlePointerOut = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactiveTarget = target?.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor='active']",
      );

      if (!interactiveTarget) {
        setIsHovering(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isVisible ? "visible" : "hidden"} ${isHovering ? "hovering" : ""} ${isPressed ? "pressed" : ""}`}
      aria-hidden="true"
    >
      <div className="custom-cursor-ring" style={{ left: position.x, top: position.y }} />
      <div className="custom-cursor-dot" style={{ left: position.x, top: position.y }} />
    </div>
  );
}
