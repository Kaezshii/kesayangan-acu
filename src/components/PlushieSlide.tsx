import { motion } from "framer-motion";
import type { PlushieKey } from "@/lib/assets";
import { PLUSHIES } from "@/lib/assets";

interface BigBubble {
  plushie: PlushieKey;
  side: "left" | "right";
}

interface Props {
  message: string;
  signed?: string;
  bigBubbles: BigBubble[]; // 1 (slides 2-5) or 2 (slide 6)
}

// Decorative bubble layout per slide. Position values are percentages.
const DECOR_LEFT = [
  { top: "12%", left: "6%", size: 70, anim: "float-slow" },
  { top: "70%", left: "10%", size: 50, anim: "float-med" },
  { top: "45%", left: "22%", size: 36, anim: "float-fast" },
  { top: "85%", left: "32%", size: 28, anim: "float-slow" },
];
const DECOR_RIGHT = [
  { top: "15%", right: "8%", size: 60, anim: "float-med" },
  { top: "65%", right: "14%", size: 44, anim: "float-fast" },
  { top: "38%", right: "26%", size: 32, anim: "float-slow" },
  { top: "82%", right: "6%", size: 70, anim: "float-med" },
];

export default function PlushieSlide({ message, signed, bigBubbles }: Props) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-6">
      {/* Decorative bubbles */}
      {DECOR_LEFT.map((b, i) => (
        <span
          key={`l${i}`}
          className={`bubble ${b.anim}`}
          style={{ top: b.top, left: b.left, width: b.size, height: b.size }}
        />
      ))}
      {DECOR_RIGHT.map((b, i) => (
        <span
          key={`r${i}`}
          className={`bubble ${b.anim}`}
          style={{ top: b.top, right: b.right, width: b.size, height: b.size }}
        />
      ))}

      {/* Big bubble(s) with plushie image */}
      {bigBubbles.map((b, idx) => {
        const isLeft = b.side === "left";
        return (
          <motion.div
            key={idx}
            initial={{ scale: 0.7, opacity: 0, x: isLeft ? -60 : 60 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + idx * 0.15, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="bubble-img float-slow absolute"
            style={{
              width: 260,
              height: 260,
              top: "50%",
              transform: "translateY(-50%)",
              [isLeft ? "left" : "right"]: "6%",
            }}
          >
            <img src={PLUSHIES[b.plushie]} alt="" />
          </motion.div>
        );
      })}

      {/* Message paper */}
      <motion.div
        initial={{ y: 30, opacity: 0, rotate: -1 }}
        animate={{ y: 0, opacity: 1, rotate: -0.6 }}
        transition={{ delay: 0.45, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="paper-card relative z-10 max-w-[460px]"
        style={{ transform: "rotate(-0.6deg)" }}
      >
        <p className="handwritten text-center">{message}</p>
        {signed && (
          <p className="mt-5 text-right font-[var(--font-hand)] text-xl text-[color:var(--ink)]/70">
            — {signed}
          </p>
        )}
      </motion.div>
    </div>
  );
}
