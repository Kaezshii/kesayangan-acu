import { motion } from "framer-motion";

interface Props {
  message: string;
}

export default function FinalSlide({ message }: Props) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(900px 700px at 50% 30%, oklch(0.96 0.04 25) 0%, transparent 60%), linear-gradient(180deg, oklch(0.94 0.035 25), oklch(0.9 0.05 35))",
      }}
    >
      {/* Floating hearts */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 1, 1, 0] }}
          transition={{
            delay: i * 0.4,
            duration: 9 + (i % 3),
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{
            left: `${(i * 7 + 5) % 100}%`,
            fontSize: 18 + (i % 4) * 6,
            color: "oklch(0.72 0.14 18 / 0.6)",
          }}
        >
          ♡
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 max-w-[640px] text-center"
      >
        <p className="font-[var(--font-hand)] text-5xl leading-tight text-[color:var(--ink)]">
          {message}
        </p>
        <p className="mt-10 font-[var(--font-sans)] text-xs uppercase tracking-[0.4em] text-[color:var(--ink)]/50">
          — selesai —
        </p>
      </motion.div>
    </div>
  );
}
