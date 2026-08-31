let ctx = null;
let enabled = true;
try { enabled = localStorage.getItem("impostor-sound") !== "off"; } catch (e) {}

const getCtx = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

export const setSoundEnabled = v => { enabled = v; try { localStorage.setItem("impostor-sound", v ? "on" : "off"); } catch (e) {} };
export const isSoundEnabled = () => enabled;

const tone = (freq, duration = 0.15, type = "sine", vol = 0.15, delay = 0) => {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  const start = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(vol, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain); gain.connect(c.destination);
  osc.start(start); osc.stop(start + duration);
};

const sounds = {
  click: () => tone(420, 0.08, "triangle", 0.12),
  toggle: () => tone(560, 0.1, "square", 0.08),
  reveal: () => { tone(440, 0.12, "sine", 0.18); tone(660, 0.18, "sine", 0.15, 0.08); },
  start: () => { tone(523, 0.12, "triangle", 0.15); tone(659, 0.12, "triangle", 0.15, 0.1); tone(784, 0.2, "triangle", 0.15, 0.2); },
  vote: () => tone(330, 0.15, "sawtooth", 0.1),
  tick: () => tone(880, 0.05, "square", 0.06),
  countdown: () => tone(700, 0.1, "sine", 0.12),
  win: () => { tone(523, 0.15, "triangle", 0.2); tone(659, 0.15, "triangle", 0.2, 0.12); tone(784, 0.15, "triangle", 0.2, 0.24); tone(1047, 0.4, "triangle", 0.2, 0.36); },
  lose: () => { tone(330, 0.2, "sawtooth", 0.15); tone(247, 0.4, "sawtooth", 0.15, 0.2); },
  select: () => tone(600, 0.06, "triangle", 0.1),
};

export default sounds;