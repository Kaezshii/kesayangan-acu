import p1 from "@/assets/plushie1.jpg.asset.json";
import p2 from "@/assets/plushie2.jpg.asset.json";
import p3 from "@/assets/plushie3.jpg.asset.json";
import p4 from "@/assets/plushie4.jpg.asset.json";
import p5 from "@/assets/plushie5.jpg.asset.json";
import p6 from "@/assets/plushie6.jpg.asset.json";
import you from "@/assets/you.jpg.asset.json";

export const PLUSHIES = {
  p1: p1.url,
  p2: p2.url,
  p3: p3.url,
  p4: p4.url,
  p5: p5.url,
  p6: p6.url,
} as const;

export const YOU_IMG = you.url;

export type PlushieKey = keyof typeof PLUSHIES;
