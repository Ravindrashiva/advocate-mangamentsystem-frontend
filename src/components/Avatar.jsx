import React from "react";
import { ACCENTS } from "../data/mockData";

const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

export default function Avatar({ name, size = 44 }) {
  const color = ACCENTS[Math.abs((name || "x").split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % ACCENTS.length];
  return (
    <div
      className="flex items-center justify-center rounded-2xl font-bold text-white shrink-0 shadow-lg"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        boxShadow: `0 8px 20px -6px ${color}88`,
        fontSize: size * 0.36,
      }}
    >
      {initials(name) || "?"}
    </div>
  );
}
