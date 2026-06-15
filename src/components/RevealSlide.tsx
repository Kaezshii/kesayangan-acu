import { motion } from "framer-motion";
import { PLUSHIES, YOU_IMG } from "@/lib/assets";

const SURROUND = [
  { key: "bear" as const, top: "8%", left: "10%", size: 110 },
  { key: "bunny" as const, top: "18%", right: "8%", size: 130 },
  { key: "cat" as const, bottom: "10%", left: "8%", size: 120 },
  { key: "duck" as const, bottom: "8%", right: "10%", size: 110 },
  { key: "fox" as const, top: "50%", left: "2%", size: 90 },
];

// Confetti pieces
const CONFETTI = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 0.6,
  duration: 2.2 + Math.random() * 1.4,
  rotate: Math.random() * 360,
  color: ["#f9c2cf", "#f4a6b8", "#e7b78a", "#fce4d6", "#f1c0c0"][i % 5],
  shape: i % 2 === 0 ? "rect" : "circle",
}));

interface Props {
  message: string;
}

export default function RevealSlide({ message }: Props) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-6">
      {/* Curtains */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-110%" }}
        transition={{ delay: 0.2, duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
        className="absolute inset-y-0 left-0 z-30 w-1/2"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.55 0.18 22) 0%, oklch(0.7 0.16 22) 60%, oklch(0.78 0.14 22) 100%)",
          boxShadow: "inset -30px 0 60px oklch(0.3 0.18 22 / 0.6)",
        }}
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "110%" }}
        transition={{ delay: 0.2, duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
        className="absolute inset-y-0 right-0 z-30 w-1/2"
        style={{
          background:
            "linear-gradient(270deg, oklch(0.55 0.18 22) 0%, oklch(0.7 0.16 22) 60%, oklch(0.78 0.14 22) 100%)",
          boxShadow: "inset 30px 0 60px oklch(0.3 0.18 22 / 0.6)",
        }}
      />

      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {CONFETTI.map((c) => (
          <motion.span
            key={c.id}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: c.rotate }}
            transition={{ delay: 1.2 + c.delay, duration: c.duration, ease: "easeIn" }}
            className="absolute top-0"
            style={{
              left: `${c.left}%`,
              width: c.shape === "rect" ? 8 : 10,
              height: c.shape === "rect" ? 14 : 10,
              borderRadius: c.shape === "circle" ? "9999px" : "2px",
              background: c.color,
            }}
          />
        ))}
      </div>

      {/* Surrounding plushie bubbles */}
      {SURROUND.map((s, i) => (
        <motion.div
          key={s.key}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.6 + i * 0.12, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="bubble-img float-slow absolute z-10"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
          }}
        >
          <img src={PLUSHIES[s.key]} alt="" />
        </motion.div>
      ))}

      {/* Big "you" bubble */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10"
      >
        <span className="glow-ring" />
        <div
          className="bubble-img float-med relative"
          style={{ width: 320, height: 320 }}
        >
          <img src={YOU_IMG} alt="you" />
        </div>
      </motion.div>

      {/* Paper message */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
        className="paper-card absolute bottom-[8%] z-20 max-w-[520px]"
        style={{ transform: "rotate(0.8deg)" }}
      >
        <p className="handwritten text-center">{message}</p>
      </motion.div>
    </div>
  );
}
