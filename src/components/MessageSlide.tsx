import { motion } from "framer-motion";

interface Props {
  message: string;
  tone: "warm" | "cool";
}

const SMALL_BUBBLES = [
  { top: "10%", left: "8%", size: 50, anim: "float-slow" },
  { top: "20%", right: "10%", size: 38, anim: "float-med" },
  { top: "60%", left: "12%", size: 34, anim: "float-fast" },
  { bottom: "10%", right: "8%", size: 56, anim: "float-slow" },
  { bottom: "18%", left: "30%", size: 26, anim: "float-med" },
  { top: "40%", right: "22%", size: 28, anim: "float-fast" },
  { top: "75%", right: "30%", size: 22, anim: "float-slow" },
  { top: "30%", left: "30%", size: 24, anim: "float-med" },
];

export default function MessageSlide({ message, tone }: Props) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center px-6 ${
        tone === "cool" ? "cool-bg" : ""
      }`}
    >
      {SMALL_BUBBLES.map((b, i) => (
        <span
          key={i}
          className={`bubble ${b.anim}`}
          style={{
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
            width: b.size,
            height: b.size,
          }}
        />
      ))}

      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="paper-card relative z-10 max-w-[520px]"
        style={{ transform: "rotate(-0.4deg)" }}
      >
        <p className="handwritten whitespace-pre-line text-center">{message}</p>
      </motion.div>
    </div>
  );
}
