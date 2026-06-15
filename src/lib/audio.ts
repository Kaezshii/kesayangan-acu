// Soft background music controller. Drop your file at /public/audio/bgm.mp3
let audio: HTMLAudioElement | null = null;

function get(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio("/audio/bgm.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
  }
  return audio;
}

export async function playBgm() {
  try {
    const a = get();
    if (a.paused) await a.play();
  } catch {
    // Browser blocked autoplay; ignore. Will retry on next interaction.
  }
}

export function pauseBgm() {
  if (audio && !audio.paused) audio.pause();
}

export function stopBgm() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

export function isPlaying() {
  return !!audio && !audio.paused;
}
