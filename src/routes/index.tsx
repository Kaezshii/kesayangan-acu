import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Envelope from "@/components/Envelope";
import PlushieSlide from "@/components/PlushieSlide";
import RevealSlide from "@/components/RevealSlide";
import ChoiceSlide from "@/components/ChoiceSlide";
import MessageSlide from "@/components/MessageSlide";
import FinalSlide from "@/components/FinalSlide";
import { playBgm, stopBgm, pauseBgm, isPlaying } from "@/lib/audio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "untuk Fayya" },
      { name: "description", content: "Sebuah surat kecil." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Index,
});

/**
 * Slide map (edit text freely):
 *  1  Envelope
 *  2-5 Plushie messages (zig-zag)
 *  6  Dual plushie
 *  7  Personal reveal (you)
 *  8  Choice (Kabar Baik / Kabar Buruk)
 *  9  Kabar Baik
 *  10 Kabar Buruk
 *  11 Final
 */

const PLUSHIE_SLIDES = [
  {
    plushie: "p1" as const,
    side: "left" as const,
    message: "Hai Fayya... aku Domo.\nKatanya hari ini buat kamu spesial.",
    signed: "Domo",
  },
  {
    plushie: "p2" as const,
    side: "right" as const,
    message: "Aku Labubu!\nMau bilang kamu lucu hari ini... dan setiap hari.",
    signed: "Labubu",
  },
  {
    plushie: "p3" as const,
    side: "left" as const,
    message: "Psst, ini Stitch.\nKamu dipeluk dari jauh ya, hangat-hangat.",
    signed: "Stitch",
  },
  {
    plushie: "p4" as const,
    side: "right" as const,
    message: "Kelinci datang!\nJangan lupa senyum dulu sebelum lanjut, oke?",
    signed: "Kelinci",
  },
];

const DUAL_SLIDE = {
  left: "p5" as const,
  right: "p6" as const,
  message:
    "Kami berdua mau bilang...\nkamu disayang banget hari ini.\nSama dia juga.",
};

const REVEAL_MESSAGE = "Hai... akhirnya aku muncul juga di sini, Fay.";

const GOOD_MESSAGE =
  "Kabar baiknya...\naku sayang kamu.\nBeneran. Setiap hari, sedikit lebih banyak.";

const BAD_MESSAGE =
  "Kabar buruknya...\naku gak bisa berhenti mikirin kamu.\nKayaknya gak akan sembuh.";

const FINAL_MESSAGE =
  "Terima kasih sudah baca sampai habis, Fayya.\nIni semua, buat kamu. ♡";

function Index() {
  const [slide, setSlide] = useState(1);
  const [choice, setChoice] = useState<"baik" | "buruk" | null>(null);
  const [musicOn, setMusicOn] = useState(false);

  // Start music when entering slide 2 (after user interaction on slide 1).
  useEffect(() => {
    if (slide >= 2 && slide < 11) {
      playBgm().then(() => setMusicOn(isPlaying()));
    }
    if (slide === 11) {
      stopBgm();
      setMusicOn(false);
    }
  }, [slide]);

  const next = useCallback(() => {
    setSlide((s) => {
      if (s === 6) return 7;
      if (s === 7) return 8;
      if (s === 8) return s; // wait for choice
      if (s === 9 || s === 10) return 11;
      if (s === 11) return s;
      return s + 1;
    });
  }, []);

  const prev = useCallback(() => {
    setSlide((s) => {
      if (s <= 1) return 1;
      if (s === 11) return choice === "buruk" ? 10 : 9;
      if (s === 9 || s === 10) return 8;
      return s - 1;
    });
  }, [choice]);

  function handleChoose(c: "baik" | "buruk") {
    setChoice(c);
    setSlide(c === "baik" ? 9 : 10);
  }

  function toggleMusic() {
    if (musicOn) {
      pauseBgm();
      setMusicOn(false);
    } else {
      playBgm().then(() => setMusicOn(isPlaying()));
    }
  }

  // Keyboard nav (avoids the choice slide and envelope-needing-click).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (slide === 1 || slide === 8) return;
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slide, next, prev]);

  return (
    <main className="slide-stage">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0"
        >
          {slide === 1 && <Envelope onOpen={next} />}

          {slide >= 2 && slide <= 5 && (
            <PlushieSlide
              message={PLUSHIE_SLIDES[slide - 2].message}
              signed={PLUSHIE_SLIDES[slide - 2].signed}
              bigBubbles={[
                {
                  plushie: PLUSHIE_SLIDES[slide - 2].plushie,
                  side: PLUSHIE_SLIDES[slide - 2].side,
                },
              ]}
            />
          )}

          {slide === 6 && (
            <PlushieSlide
              message={DUAL_SLIDE.message}
              bigBubbles={[
                { plushie: DUAL_SLIDE.left, side: "left" },
                { plushie: DUAL_SLIDE.right, side: "right" },
              ]}
            />
          )}

          {slide === 7 && <RevealSlide message={REVEAL_MESSAGE} />}

          {slide === 8 && <ChoiceSlide onChoose={handleChoose} />}

          {slide === 9 && <MessageSlide message={GOOD_MESSAGE} tone="warm" />}

          {slide === 10 && <MessageSlide message={BAD_MESSAGE} tone="cool" />}

          {slide === 11 && <FinalSlide message={FINAL_MESSAGE} />}
        </motion.div>
      </AnimatePresence>

      {/* Controls overlay */}
      {slide > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-40 flex items-center justify-between px-6">
          <button
            className="btn-soft pointer-events-auto"
            onClick={prev}
            aria-label="sebelumnya"
          >
            ←
          </button>

          <div className="pointer-events-auto flex items-center gap-3">
            <button
              className="btn-soft"
              onClick={toggleMusic}
              aria-label="musik"
              title="musik"
            >
              {musicOn ? "♪ on" : "♪ off"}
            </button>
            <span className="font-[var(--font-sans)] text-xs uppercase tracking-[0.3em] text-[color:var(--ink)]/50">
              {slide} / 11
            </span>
          </div>

          {slide !== 8 && slide !== 11 ? (
            <button
              className="btn-soft pointer-events-auto"
              onClick={next}
              aria-label="lanjut"
            >
              →
            </button>
          ) : (
            <span style={{ width: 56 }} />
          )}
        </div>
      )}
    </main>
  );
}
