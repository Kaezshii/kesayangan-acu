import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onOpen: () => void;
}

/**
 * Envelope: click → flap opens → letter slides out with "Mau dibuka ya?"
 * → click letter → continue.
 */
export default function Envelope({ onOpen }: Props) {
  const [opened, setOpened] = useState(false);
  const [letterOut, setLetterOut] = useState(false);

  function handleEnvelopeClick() {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setLetterOut(true), 700);
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-6">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-[var(--font-hand)] text-2xl text-[color:var(--ink)]/70"
      >
        untuk Fayya
      </motion.p>

      <div className="envelope-wrap relative">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className={`envelope ${opened ? "open" : ""} envelope-body cursor-pointer`}
          onClick={handleEnvelopeClick}
          whileHover={!opened ? { scale: 1.03 } : undefined}
        >
          <div className="envelope-flap" />
          <div className="envelope-seal">♡</div>

          {letterOut && (
            <motion.div
              className="letter-out cursor-pointer"
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: -110, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={onOpen}
            >
              <p className="handwritten text-center">Mau dibuka ya?</p>
              <p className="mt-4 text-center font-[var(--font-sans)] text-xs uppercase tracking-[0.3em] text-[color:var(--ink)]/50">
                ketuk untuk lanjut
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-[var(--font-sans)] text-xs uppercase tracking-[0.3em] text-[color:var(--ink)]/50"
        >
          ketuk amplopnya
        </motion.p>
      )}
    </div>
  );
}
