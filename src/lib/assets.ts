import bear from "@/assets/plushie-bear.png";
import bunny from "@/assets/plushie-bunny.png";
import cat from "@/assets/plushie-cat.png";
import duck from "@/assets/plushie-duck.png";
import fox from "@/assets/plushie-fox.png";
import you from "@/assets/you-placeholder.png";

export const PLUSHIES = { bear, bunny, cat, duck, fox } as const;
export const YOU_IMG = you;

export type PlushieKey = keyof typeof PLUSHIES;
