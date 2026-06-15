import { motion } from "framer-motion";
import { PLUSHIES, YOU_IMG } from "@/lib/assets";

// Mid-sized bubbles gathered together
const GATHER = [
  { src: PLUSHIES.bear, top: "12%", left: "12%", size: 110 },
  { src: PLUSHIES.bunny, top: "8%", left: "38%", size: 95 },
  { src: PLUSHIES.cat, top: "14%", right: "14%", size: 105 },
  { src: PLUSHIES.duck, bottom: "26%", left: "8%", size: 90 },
  { src: PLUSHIES.fox, bottom: "28%", right: "10%", size: 100 },
  { src: YOU_IMG, top: "20%", left: "62%", size: 120 },
];

interface Props {
  onChoose: (path: "baik" | "buruk") => void;
}

export default function ChoiceSlide({ onChoose }: Props) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-10 px-6">
      {GATHER.map((g, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="bubble-img float-slow absolute"
          style={{
            width: g.size,
            height: g.size,
            top: g.top,
            bottom: g.bottom,
            left: g.left,
            right: g.right,
          }}
        >
          <img src={g.src} alt="" />
        </motion.div>
      ))}

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="paper-card relative z-10 max-w-[460px]"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        <p className="handwritten text-center">
          Aku punya dua kabar...
          <br />
          mau dengar yang mana dulu?
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-5"
      >
        <button className="btn-choice" onClick={() => onChoose("baik")}>
          Kabar Baik
        </button>
        <button className="btn-choice" onClick={() => onChoose("buruk")}>
          Kabar Buruk
        </button>
      </motion.div>
    </div>
  );
}
